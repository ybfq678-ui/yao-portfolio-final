import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";

const root = process.cwd();
const port = Number(process.env.PORT || 4173);
const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".mp4": "video/mp4",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".pdf": "application/pdf",
};

createServer(async (request, response) => {
  const url = new URL(request.url || "/", "http://yao-portfolio.local");
  const pathname = url.pathname === "/" ? "/preview.html" : url.pathname;
  const routePath = pathname === "/projects/21-day-fitness-challenge"
    ? "/projects/21-day-fitness-challenge.html"
    : pathname === "/projects/brand-upgrade"
    ? "/projects/brand-upgrade.html"
    : pathname === "/projects/21-day-fitness-challenge/portfolio.pdf"
      ? "/pdf/21day-sport.pdf"
    : pathname === "/pdf/21day-sport.pdf"
      ? "/pdf/21day-sport.pdf"
    : pathname === "/pdf/feiji-travel-experience.pdf"
      ? "/pdf/feiji-travel-experience.pdf"
    : pathname === "/pdf/brand-upgrade.pdf"
      ? "/pdf/brand-upgrade.pdf"
    : pathname.startsWith("/projects/assets/")
      ? `/projects/assets/${pathname.slice("/projects/assets/".length)}`
    : pathname.startsWith("/projects/21-day-fitness-challenge/assets/")
      ? `/projects/assets/${pathname.slice("/projects/21-day-fitness-challenge/assets/".length)}`
    : pathname;
  const filePath = normalize(join(root, decodeURIComponent(routePath).replace(/^\/+/, "")));

  if (!filePath.startsWith(root)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  try {
    const file = await readFile(filePath);
    response.writeHead(200, { "Content-Type": mime[extname(filePath)] || "application/octet-stream" });
    response.end(file);
  } catch {
    response.writeHead(404);
    response.end("Not found");
  }
}).listen(port, () => {
  console.log(`YAO portfolio preview server running on port ${port}.`);
});
