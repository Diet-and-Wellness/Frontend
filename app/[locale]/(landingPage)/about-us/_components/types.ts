export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  image: string;
};

export type Faq = {
  question: string;
  answer: string;
};

export type ValueItem = {
  title: string;
  description: string;
};

export type SectionIntroProps = {
  eyebrow: string;
  title: string;
  description: string;
  align?: "start" | "center";
  className?: string;
  descriptionClassName?: string;
};
