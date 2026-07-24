import * as pdfjsLib from "./pdfjs/pdf.min.js";

const DEFAULT_PDF_URL = new URL("../../pdf/21day-sport.pdf", import.meta.url).href;
const ASSET_ROOT = new URL("./pdfjs/", import.meta.url).href;
const pagesRoot = document.getElementById("portfolioPdfPages");
const status = document.getElementById("portfolioPdfStatus");
const errorPanel = document.getElementById("portfolioPdfError");
let currentTask = null;

pdfjsLib.GlobalWorkerOptions.workerSrc = `${ASSET_ROOT}pdf.worker.min.js`;

function setStatus(message) {
  if (status) status.textContent = message;
}

function availableWidth(root) {
  const style = getComputedStyle(root);
  const padding = (parseFloat(style.paddingLeft) || 0) + (parseFloat(style.paddingRight) || 0);
  return Math.max((root.clientWidth || document.documentElement.clientWidth || 900) - padding, 280);
}

function scaleFor(baseViewport) {
  return Math.max(availableWidth(pagesRoot) / baseViewport.width, 0.1);
}

async function renderPage(pdf, pageNumber, pageShell) {
  if (pageShell.dataset.rendered === "true") return;
  pageShell.dataset.rendered = "true";

  const page = await pdf.getPage(pageNumber);
  const baseViewport = page.getViewport({ scale: 1 });
  const scale = scaleFor(baseViewport);
  const viewport = page.getViewport({ scale });
  const outputScale = Math.min(window.devicePixelRatio || 1, 2);
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d", { alpha: false });

  if (!context) throw new Error("Canvas rendering is unavailable.");

  canvas.className = "pdf-page-canvas";
  canvas.width = Math.floor(viewport.width * outputScale);
  canvas.height = Math.floor(viewport.height * outputScale);
  canvas.style.width = `${Math.floor(viewport.width)}px`;
  canvas.style.height = `${Math.floor(viewport.height)}px`;

  pageShell.style.width = `${Math.floor(viewport.width)}px`;
  pageShell.style.height = `${Math.floor(viewport.height)}px`;
  pageShell.style.aspectRatio = `${baseViewport.width} / ${baseViewport.height}`;

  context.fillStyle = "#fff";
  context.fillRect(0, 0, canvas.width, canvas.height);

  const renderTask = page.render({
    canvasContext: context,
    canvas,
    viewport,
    transform: outputScale === 1 ? null : [outputScale, 0, 0, outputScale, 0, 0],
  });
  currentTask = renderTask;
  await renderTask.promise;
  if (currentTask === renderTask) currentTask = null;

  pageShell.replaceChildren(canvas);
  pageShell.classList.add("is-ready");
}

function observePages(pdf) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const pageShell = entry.target;
      const pageNumber = Number(pageShell.dataset.page);

      renderPage(pdf, pageNumber, pageShell).catch(showError);
      observer.unobserve(pageShell);
    });
  }, { rootMargin: "1200px 0px" });

  pagesRoot.querySelectorAll(".project-pdf-page").forEach((pageShell) => observer.observe(pageShell));
}

function showError(error) {
  console.error("Portfolio PDF preview failed.", error);
  setStatus("PDF loading failed");
  if (errorPanel) errorPanel.hidden = false;
  if (pagesRoot) pagesRoot.classList.add("pdf-error");
}

async function mountPdfPreview() {
  if (!pagesRoot) return;
  pagesRoot.classList.add("pdf-loading");
  setStatus("PDF loading...");

  const pdfUrl = pagesRoot.dataset.pdfSrc
    ? new URL(pagesRoot.dataset.pdfSrc, window.location.href).href
    : DEFAULT_PDF_URL;
  const pdf = await pdfjsLib.getDocument({
    url: pdfUrl,
    cMapUrl: `${ASSET_ROOT}cmaps/`,
    cMapPacked: true,
    standardFontDataUrl: `${ASSET_ROOT}standard_fonts/`,
  }).promise;

  const shells = Array.from({ length: pdf.numPages }, (_, index) => {
    const pageNumber = index + 1;
    const shell = document.createElement("article");

    shell.className = "project-pdf-page pdf-page";
    shell.dataset.page = String(pageNumber);
    shell.setAttribute("aria-label", `Portfolio PDF page ${pageNumber}`);
    return shell;
  });

  pagesRoot.replaceChildren(...shells);
  await renderPage(pdf, 1, shells[0]);
  pagesRoot.classList.remove("pdf-loading");
  pagesRoot.classList.add("pdf-ready");
  setStatus(`PDF loaded: ${pdf.numPages} pages`);
  observePages(pdf);
}

window.addEventListener("beforeunload", () => {
  if (currentTask && typeof currentTask.cancel === "function") currentTask.cancel();
});

mountPdfPreview().catch(showError);
