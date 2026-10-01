import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  htmlLimitedBots: /.*/,

  images: {
    // Nothing uses Vercel Image Optimization: local assets are `unoptimized`
    // and Cloudinary images are resized by Cloudinary (utils/cloudinaryLoader).
    // An empty allow-list keeps /_next/image from proxying remote hosts.
    remotePatterns: [],

    // Default minus 3840. These widths still drive the Cloudinary srcset; the
    // largest image (blog detail) needs at most 2048.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
  },
};

export default withNextIntl(nextConfig);
