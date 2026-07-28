export const calculateReadTime = (text: string, language: "ar" | "en") => {
  const words = text.trim().split(/\s+/).length;
  const wordsPerMinute = language === "ar" ? 180 : 200;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
};
