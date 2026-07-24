import { cpSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const dist = join(root, "dist");

for (const [from, to] of [
  ["assets", "assets"],
  ["pdf", "pdf"],
  ["projects/assets", "projects/assets"],
]) {
  const source = join(root, from);
  if (!existsSync(source)) continue;
  mkdirSync(join(dist, to, ".."), { recursive: true });
  cpSync(source, join(dist, to), { recursive: true });
}

const requiredRuntimeFiles = [
  "pdf/21day-sport.pdf",
  "pdf/brand-upgrade.pdf",
  "pdf/feiji-travel-experience.pdf",
  "projects/assets/pdfjs/pdf.min.js",
  "projects/assets/pdfjs/pdf.worker.min.js",
  "projects/assets/portfolio-pdf-viewer.js",
  "assets/pdf-pages/sport/page-01.webp",
  "assets/pdf-pages/sport/page-02.webp",
  "assets/pdf-pages/sport/page-03.webp",
  "assets/pdf-pages/sport/page-04.webp",
  "assets/pdf-pages/sport/page-05.webp",
  "assets/pdf-pages/sport/page-06.webp",
  "assets/pdf-pages/sport/page-07.webp",
  "assets/pdf-pages/sport/page-08.webp",
  "assets/pdf-pages/sport/page-09.webp",
  "assets/pdf-pages/sport/page-10.webp",
  "assets/pdf-pages/sport/page-11.webp",
  "assets/pdf-pages/sport/page-12.webp",
  "assets/pdf-pages/sport/page-13.webp",
  "assets/pdf-pages/feiji/page-01.webp",
  "assets/pdf-pages/feiji/page-02.webp",
  "assets/pdf-pages/feiji/page-03.webp",
  "assets/pdf-pages/feiji/page-04.webp",
  "assets/pdf-pages/feiji/page-05.webp",
  "assets/pdf-pages/feiji/page-06.webp",
  "assets/pdf-pages/feiji/page-07.webp",
  "assets/pdf-pages/feiji/page-08.webp",
  "assets/pdf-pages/feiji/page-09.webp",
  "assets/pdf-pages/feiji/page-10.webp",
  "assets/pdf-pages/feiji/page-11.webp",
  "assets/pdf-pages/feiji/page-12.webp",
  "assets/pdf-pages/feiji/page-13.webp",
  "assets/pdf-pages/feiji/page-14.webp",
  "assets/pdf-pages/feiji/page-15.webp",
  "assets/pdf-pages/brand/page-01.webp",
  "assets/pdf-pages/brand/page-02.webp",
  "assets/pdf-pages/brand/page-03.webp",
  "assets/pdf-pages/brand/page-04.webp",
  "assets/pdf-pages/brand/page-05.webp",
  "assets/pdf-pages/brand/page-06.webp",
  "assets/pdf-pages/brand/page-07.webp",
  "assets/pdf-pages/brand/page-08.webp",
  "assets/pdf-pages/brand/page-09.webp",
  "assets/pdf-pages/brand/page-10.webp",
  "assets/pdf-pages/brand/page-11.webp",
  "assets/pdf-pages/brand/page-12.webp",
  "assets/pdf-pages/brand/page-13.webp",
  "assets/pdf-pages/brand/page-14.webp",
  "assets/pdf-pages/brand/page-15.webp",
  "assets/pdf-pages/brand/page-16.webp",
  "assets/pdf-pages/brand/page-17.webp",
  "assets/pdf-pages/brand/page-18.webp",
  "assets/pdf-pages/brand/page-19.webp",
  "assets/pdf-pages/brand/page-20.webp",
  "assets/pdf-pages/brand/page-21.webp",
  "assets/images/robot.png",
  "assets/images/dog-warrior.png",
  "assets/images/commercial-ad.png",
  "assets/images/cycling.png",
  "assets/images/visual-playground-brand.webp",
  "assets/images/visual-playground-aigc-scene.webp",
  "assets/images/visual-playground-cinematic.webp",
  "assets/images/visual-playground-motion-ui.webp",
  "assets/images/portrait.png",
  "assets/images/hero-person-cinematic.png",
  "assets/images/aigc-monkey-king.jpg",
  "assets/videos/aigc-monkey.mp4",
  "assets/videos/robot-hover.mp4",
  "assets/videos/commercial-ad.mp4",
  "assets/videos/car-hover.mp4",
];

const missing = requiredRuntimeFiles.filter((file) => !existsSync(join(dist, file)));
if (missing.length > 0) {
  throw new Error(`Missing runtime assets after build:\n${missing.join("\n")}`);
}
