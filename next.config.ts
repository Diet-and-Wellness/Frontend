import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  htmlLimitedBots: /.*/,

  images: {
    // Every cache miss is a billable transformation on Vercel. Files in
    // /public are served with `max-age=0`, so without this the 4-hour
    // default re-optimizes them several times a day.
    minimumCacheTTL: 2678400, // 31 days

    // Default minus 3840: the largest optimized image (blog detail at 2x) needs
    // 2048, and `fill` images put the largest width in `src`, which crawlers fetch.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],

    remotePatterns: [
      {
        // Blog images and feedback screenshots uploaded by the backend.
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/qnw66mx6/image/upload/**",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
