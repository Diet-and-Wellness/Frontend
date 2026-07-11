export const detectLanguage = (text: string): "ar" | "en" => {
  const arabicChars = (text.match(/[\u0600-\u06FF]/g) || []).length;
  const englishChars = (text.match(/[A-Za-z]/g) || []).length;

  return arabicChars > englishChars ? "ar" : "en";
};
