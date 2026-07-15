import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_ACTIONS === "true";
const githubPagesBasePath = "/Personal-Website";

const nextConfig: NextConfig = {
  output: isGitHubPages ? "export" : undefined,
  basePath: isGitHubPages ? githubPagesBasePath : "",
  assetPrefix: isGitHubPages ? githubPagesBasePath : "",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
