import type { ImageLoader } from "next/image";

const UPLOAD_SEGMENT = "/image/upload/";

// Cloudinary resizes and converts (f_auto: WebP/AVIF) on its own CDN, so these
// images never go through Vercel Image Optimization or count toward its quota.
const cloudinaryLoader: ImageLoader = ({ src, width }) =>
  src.replace(UPLOAD_SEGMENT, `${UPLOAD_SEGMENT}f_auto,q_auto,c_limit,w_${width}/`);

export const getImageLoader = (src: string) =>
  src.startsWith("https://res.cloudinary.com/") && src.includes(UPLOAD_SEGMENT)
    ? cloudinaryLoader
    : undefined;
