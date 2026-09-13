/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { remotePatterns: [{ protocol: "https", hostname: "qr-official.line.me", pathname: "/gs/**" }] }
};
export default nextConfig;
