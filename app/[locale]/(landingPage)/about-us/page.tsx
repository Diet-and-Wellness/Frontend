"use client";

import { useTranslations } from "next-intl";
import AboutStorySection from "./_components/AboutStorySection";
import AboutVideoSection from "./_components/AboutVideoSection";
import FaqSection from "./_components/FaqSection";
import JourneyCtaSection from "./_components/JourneyCtaSection";
import PurposeSection from "./_components/PurposeSection";
import TeamSection from "./_components/TeamSection";
import ValuesSection from "./_components/ValuesSection";
import type { Faq, TeamMember, ValueItem } from "./_components/types";

const AboutUsPage = () => {
  const t = useTranslations();

  return (
    <main className="overflow-hidden bg-surface pb-20 pt-24 text-content sm:pt-28 lg:pb-28">
      <AboutVideoSection
        eyebrow={t("aboutUs.eyebrow")}
        title={t("aboutUs.videoTitle")}
        description={t("aboutUs.videoDescription")}
        videoTitle={t("aboutUs.videoPlayerTitle")}
      />

      <AboutStorySection
        eyebrow={t("aboutUs.eyebrow")}
        title={t("aboutUs.whatYouShouldKnowAboutDietAndWellness")}
        paragraphs={t.raw("aboutUs.storyParagraphs") as string[]}
        goal={t("aboutUs.ourGoal")}
        foundedValue={t("aboutUs.foundedValue")}
        foundedLabel={t("aboutUs.foundedLabel")}
        clientsValue={t("aboutUs.clientsValue")}
        clientsLabel={t("aboutUs.clientsLabel")}
        reasonsTitle={t("aboutUs.whyChooseTitle")}
        reasons={t.raw("aboutUs.whyChooseReasons") as string[]}
        philosophy={t("aboutUs.gradualChangesDescription")}
      />

      <PurposeSection
        eyebrow={t("aboutUs.purposeEyebrow")}
        title={t("aboutUs.purposeTitle")}
        description={t("aboutUs.purposeDescription")}
        missionTitle={t("aboutUs.missionTitle")}
        mission={t("aboutUs.missionDescription")}
        visionTitle={t("aboutUs.visionTitle")}
        vision={t("aboutUs.visionDescription")}
      />

      <ValuesSection
        eyebrow={t("aboutUs.valuesEyebrow")}
        title={t("aboutUs.valuesTitle")}
        description={t("aboutUs.valuesDescription")}
        values={t.raw("aboutUs.values") as ValueItem[]}
      />

      <TeamSection
        eyebrow={t("aboutUs.teamEyebrow")}
        title={t("aboutUs.teamTitle")}
        description={t("aboutUs.teamDescription")}
        members={t.raw("aboutUs.teamMembers") as TeamMember[]}
      />

      <FaqSection
        eyebrow={t("aboutUs.faqEyebrow")}
        title={t("aboutUs.faqTitle")}
        description={t("aboutUs.faqDescription")}
        faqs={t.raw("aboutUs.faqs") as Faq[]}
      />

      <JourneyCtaSection
        eyebrow={t("aboutUs.journeyEyebrow")}
        title={t("aboutUs.journeyTitle")}
        description={t("aboutUs.journeyDescription")}
        buttonLabel={t("aboutUs.getStartedNow")}
      />
    </main>
  );
};

export default AboutUsPage;
