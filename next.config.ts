import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // GitHub Pages project sites live below /<repository>/.
  basePath: process.env.GITHUB_PAGES_ORIGIN ? "/FinEval-Atlas" : "",
};

export default nextConfig;
