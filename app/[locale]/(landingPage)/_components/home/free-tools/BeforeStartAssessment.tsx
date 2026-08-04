"use client";

import { useMemo, useState } from "react";
import ModalWrapper from "@/app/[locale]/components/Public/ModalWrapper";
import DangerIcon from "@/app/[locale]/components/icons/DangerIcon";
import ArrowDownIcon from "@/app/[locale]/components/icons/ArrowDownIcon";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { CloseBtn } from "@/app/[locale]/components/Public/CloseBtn";

const unsupportedConditions = [
  "Active cancer undergoing treatment",
  "Patients undergoing dialysis",
  "Advanced kidney failure",
  "Kidney diseases requiring precise protein, fluid, and electrolyte management",
  "Kidney transplant and post-transplant care",
  "High-risk pregnancy",
  "Gestational diabetes",
  "Pregnancy-induced hypertension",
  "Preeclampsia",
  "Severe hyperemesis gravidarum",
  "Liver cirrhosis",
  "Liver failure",
  "Ascites",
  "Hepatic encephalopathy",
  "Portal hypertension",
  "Advanced liver disease",
  "Severe autoimmune diseases",
  "Unstable autoimmune diseases",
  "Conditions requiring immunosuppressive therapy",
  "Organ transplant and post-transplant care",
  "Heart failure",
  "Cardiomyopathy",
  "Recent heart attack",
  "Unstable angina",
  "Recent cardiac surgery",
  "Recent coronary stent placement",
  "Severe cardiac arrhythmias",
  "Advanced heart valve disease",
  "Cardiac-related fluid retention",
  "Uncontrolled hypertension",
  "Recent stroke",
  "Severe neurological disorders",
  "Neurological swallowing disorders",
  "Severe burns",
  "Major injuries",
  "Major trauma",
  "Complex fractures",
  "Recent major surgery",
  "Intensive care unit (ICU) patients",
  "Critically ill patients",
  "Enteral tube feeding",
  "Parenteral nutrition",
  "Prolonged hospitalization",
  "Severe malnutrition",
  "Unexplained rapid weight loss",
  "Severe generalized weakness",
  "Severe eating disorders",
  "Anorexia nervosa",
  "Bulimia nervosa",
  "Complex eating disorders",
  "Advanced lung disease",
  "Severe chronic obstructive pulmonary disease (COPD)",
  "Pulmonary fibrosis",
  "Conditions requiring home oxygen therapy",
  "Acute pancreatitis",
  "Unstable chronic pancreatitis",
  "Complex gastrointestinal diseases",
  "Severe malabsorption syndrome",
  "Rare diseases requiring specialized nutritional protocols",
  "Endocrine gland surgery",
  "Thyroidectomy",
  "Pituitary tumors",
  "Adrenal gland disorders",
  "Hormone-secreting tumors",
  "Conditions requiring close hormonal monitoring",
  "Uncontrolled diabetes mellitus",
  "Diabetic foot",
  "Diabetic nephropathy",
  "Frequent severe blood glucose fluctuations",
  "Frail older adults",
  "Advanced osteoporosis",
  "Multiple complex chronic diseases",
  "Difficulty eating in older adults",
  "Infants",
  "Young children",
  "Conditions requiring a pediatric dietitian",
  "Complex hematologic disorders",
  "Leukemia",
  "Severe undiagnosed anemia",
  "Bleeding disorders",
  "Frequent blood transfusions",
  "Severe infectious diseases",
  "Severe infections requiring intensive treatment",
  "Intestinal obstruction",
  "Fistula",
  "Short bowel syndrome",
  "Gastrointestinal bleeding",
  "Severe inflammatory bowel disease",
  "Active viral liver disease",
  "Active autoimmune liver disease",
  "Severe fluid and electrolyte imbalances",
  "Severe hyponatremia",
  "Severe hypernatremia",
  "Severe potassium disorders",
  "Severe phosphorus disorders",
  "Severe magnesium disorders",
  "Severe psychiatric disorders affecting nutrition",
  "Severe depression",
  "Substance addiction",
  "Complex eating behavior disorders",
  "Emergency surgical conditions",
  "Pre-complex surgery",
  "Post-complex surgery",
  "Limb amputation",
  "Paralysis",
  "Severe physical disabilities",
  "Pressure ulcers",
  "Prolonged immobility",
  "Long-term catheter use",
  "Recurrent severe allergic reactions",
  "Multiple complex allergies",
  "Severe rheumatologic diseases",
  "High-dose corticosteroid therapy",
  "Poisoning",
  "Addiction recovery",
  "Intensive medical rehabilitation",
  "Undiagnosed conditions with serious symptoms",
  "Serious illness without medical follow-up",
  "Unexplained bleeding",
  "Recurrent fainting",
  "Conditions requiring highly precise protein calculations",

  // Unique items from the second part
  "Bulimia and anorexia",
  "Catheter",
  "Severe unexplained swelling",
  "Persistent pain of unknown cause",
  "Uncontrolled hyperthyroidism",
  "Severe uncontrolled hypothyroidism",
  "Diabetic ketoacidosis",
  "Recurrent severe hypoglycemia",
  "Chronic diabetic foot ulcers",
  "Gangrene",
  "Prolonged unexplained high fever",
  "Complex chronic infectious diseases",
  "Pulmonary hypertension",
  "Recent pulmonary embolism",
];

const BeforeStartAssessment = ({ onClose }: { onClose: () => void }) => {
  const t = useTranslations("analysis");
  const [isChecked, setIsChecked] = useState(false);

  const router = useRouter();

  const goToAssessmentPage = () => {
    router.push("/nutrition-analysis/assessment");
  };

  return (
    <ModalWrapper>
      <div className="flex max-h-[85dvh] w-[min(100%,35rem)] flex-col overflow-hidden rounded-2xl bg-surface">
        <div className="flex shrink-0 items-center justify-between border-b border-line px-5 py-4 sm:px-7.5">
          <div className="w-full flex justify-center items-center gap-2.5">
            <DangerIcon />
            <p className="text-center text-lg leading-snug font-semibold sm:text-xl">
              {t("beforeStart")}
            </p>
          </div>
          <CloseBtn onClose={onClose} />
        </div>

        <div className="flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto p-5 overscroll-contain sm:p-7.5">
          <p className="type-body text-content-muted">
            {t("medicalConditionsIntro")}
          </p>

          <p className="type-body text-content-muted">
            {t("medicalConditionsWarning")}
          </p>

          <MedicalConditionsDropDown />

          <div className="flex items-center gap-2.5">
            <input
              id="checkbox"
              type="checkbox"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
              className="size-4.5 accent-brand cursor-pointer"
            />
            <label htmlFor="checkbox" className="type-label cursor-pointer">
              {t("confirmMedicalConditions")}
            </label>
          </div>
        </div>

        <div className="shrink-0 border-t border-line bg-surface p-5 sm:px-7.5">
          <button
            disabled={!isChecked}
            onClick={goToAssessmentPage}
            className={`
            rounded-full
            h-12
            w-full
            type-control
            font-semibold
            mt-2.5
            transition-colors 
            ${isChecked ? "bg-brand text-white hover:bg-brand-hover cursor-pointer" : "bg-line-strong text-white cursor-not-allowed"}
            }
            `}
          >
            <p className="">{t("continueToAssessment")}</p>
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
};

const MedicalConditionsDropDown = () => {
  const t = useTranslations("analysis");
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const showDropDown = () => {
    setIsOpen(true);
  };

  const toggleDropDown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const medicalConditions =
    locale === "ar"
      ? (t.raw("medicalConditions") as string[])
      : unsupportedConditions;

  const filteredMedicalConditions = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    if (!search) {
      return medicalConditions;
    }

    return medicalConditions.filter((condition) =>
      condition.toLowerCase().includes(search),
    );
  }, [medicalConditions, searchTerm]);

  return (
    <motion.div
      layout
      transition={{
        layout: {
          duration: 0.25,
          ease: "easeInOut",
        },
      }}
      className="relative flex flex-col"
    >
      <p className="font-medium mb-3">{t("unsupportedConditions")}</p>

      <motion.div
        layout
        aria-expanded={isOpen}
        className="mb-3.5 w-full px-5 py-2.5 rounded-2xl ring focus-within:ring-2 focus-within:ring-brand ring-line-strong flex justify-between items-center gap-2.5"
      >
        <input
          type="text"
          value={searchTerm}
          placeholder={t("searchMedicalCondition")}
          className="type-control w-full border-none outline-none"
          onChange={handleSearch}
          onFocus={showDropDown}
        />
        <motion.button
          onClick={toggleDropDown}
          animate={{
            rotate: isOpen ? 180 : 0,
          }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
          className="px-5 py-2.5 cursor-pointer"
        >
          <ArrowDownIcon />
        </motion.button>
      </motion.div>

      <motion.div
        initial={false}
        animate={{
          height: isOpen ? 170 : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{
          duration: 0.25,
          ease: "easeInOut",
        }}
        className="overflow-hidden"
      >
        <AnimatePresence mode="popLayout">
          {filteredMedicalConditions.length > 0 ? (
            <motion.div
              layout
              className="h-40 overflow-y-auto rounded-2xl border border-line-strong bg-surface-raised p-5 flex flex-col gap-2.5"
            >
              <AnimatePresence>
                {filteredMedicalConditions.map((condition) => (
                  <motion.p
                    key={condition}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: 0.18,
                      ease: "easeOut",
                    }}
                  >
                    {condition}
                  </motion.p>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-40 rounded-2xl border border-line-strong bg-surface-raised p-5 flex justify-center items-center"
            >
              <p className="text-center text-content-subtle">
                {t("noMatchingMedicalConditions")}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default BeforeStartAssessment;
