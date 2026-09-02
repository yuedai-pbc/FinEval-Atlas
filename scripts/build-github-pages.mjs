import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";
import path from "node:path";

const projectRoot = process.cwd();
const outputRoot = path.join(projectRoot, "pages-dist");
const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "FinEval-Atlas";
const basePath = `/${repositoryName}`;
const pagesOrigin = process.env.GITHUB_PAGES_ORIGIN ?? "https://yuedai-pbc.github.io";
const appBasePath = process.env.GITHUB_PAGES_ORIGIN ? basePath : "";

await rm(outputRoot, { recursive: true, force: true });
await mkdir(outputRoot, { recursive: true });
await cp(path.join(projectRoot, "dist", "client"), outputRoot, { recursive: true });
if (appBasePath) {
  const nestedClientRoot = path.join(outputRoot, repositoryName);
  await cp(nestedClientRoot, outputRoot, { recursive: true, force: true });
  await rm(nestedClientRoot, { recursive: true, force: true });
}

const workerPath = path.join(projectRoot, "dist", "server", "index.js");
const workerUrl = pathToFileURL(workerPath);
workerUrl.searchParams.set("pages", Date.now().toString());
const { default: worker } = await import(workerUrl.href);

const assetBinding = {
  fetch: async () => new Response("Not found", { status: 404 }),
};

function rewriteForPages(html, route) {
  const canonical = `${pagesOrigin}${basePath}${route === "/" ? "/" : `${route}/`}`;
  return html
    .replaceAll("http://localhost:3000", `${pagesOrigin}${basePath}`)
    .replaceAll("http://localhost", `${pagesOrigin}${basePath}`)
    .replaceAll('href="/_next/', `href="${basePath}/_next/`)
    .replaceAll('src="/_next/', `src="${basePath}/_next/`)
    .replaceAll('href="/favicon.svg"', `href="${basePath}/favicon.svg"`)
    .replaceAll('content="/og.png"', `content="${pagesOrigin}${basePath}/og.png"`)
    .replaceAll('href="/general"', `href="${basePath}/general/"`)
    .replaceAll('href="/"', `href="${basePath}/"`)
    .replace("</head>", `<link rel="canonical" href="${canonical}"/><script>window.__FINEVAL_BASE_PATH__=${JSON.stringify(basePath)}</script></head>`);
}

async function renderRoute(route, destination) {
  const response = await worker.fetch(
    new Request(`http://localhost${appBasePath}${route}`, { headers: { accept: "text/html" } }),
    { ASSETS: assetBinding },
    { waitUntil() {}, passThroughOnException() {} },
  );
  if (!response.ok) throw new Error(`Failed to render ${route}: ${response.status}`);
  const html = rewriteForPages(await response.text(), route);
  const directory = path.dirname(destination);
  await mkdir(directory, { recursive: true });
  await writeFile(destination, html, "utf8");
}

await Promise.all([
  renderRoute("/", path.join(outputRoot, "index.html")),
  renderRoute("/general", path.join(outputRoot, "general", "index.html")),
]);

await writeFile(path.join(outputRoot, ".nojekyll"), "", "utf8");
await writeFile(
  path.join(outputRoot, "404.html"),
  `<!doctype html><meta charset="utf-8"><meta http-equiv="refresh" content="0;url=${basePath}/"><title>FinEval Atlas</title><a href="${basePath}/">Open FinEval Atlas</a>`,
  "utf8",
);

console.log(`GitHub Pages export created at ${outputRoot}`);
