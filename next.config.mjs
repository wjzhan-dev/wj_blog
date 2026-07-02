/** @type {import('next').NextConfig} */
const basePath = process.env.GITHUB_ACTIONS ? "/wj_blog" : "";

const nextConfig = {
  basePath,
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
