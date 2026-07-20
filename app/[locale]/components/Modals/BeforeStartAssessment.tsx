"use client";

import { useMemo, useState } from "react";
import ModalWrapper from "../Public/ModalWrapper";
import CloseIcon from "../icons/CloseIcon";
import DangerIcon from "../icons/DangerIcon";
import ArrowDownIcon from "../icons/ArrowDownIcon";
import { AnimatePresence, motion } from "framer-motion";

const unsupportedConditions = [
  "Pregnancy",
  "Breastfeeding",
  "Severe kidney disease",
  "End-stage renal disease (dialysis)",
  "Liver cirrhosis",
  "Severe liver disease",
  "Cancer under active treatment",
  "Recent chemotherapy",
  "Recent radiation therapy",
  "Eating disorders (Anorexia Nervosa)",
  "Eating disorders (Bulimia Nervosa)",
  "Binge Eating Disorder",
  "Recent major surgery",
  "Heart failure",
  "Recent heart attack",
  "Unstable angina",
  "Severe uncontrolled hypertension",
  "Uncontrolled diabetes",
  "Type 1 diabetes",
  "Severe hypoglycemia history",
  "Chronic pancreatitis",
  "Acute pancreatitis",
  "Inflammatory bowel disease (active flare)",
  "Crohn's disease (active)",
  "Ulcerative colitis (active)",
  "Untreated thyroid disease",
  "Hyperthyroidism",
  "Severe hypothyroidism",
  "Organ transplant recipient",
  "Immunosuppressive therapy",
  "Autoimmune disease requiring high-dose steroids",
  "Advanced chronic lung disease",
  "Chronic obstructive pulmonary disease (COPD)",
  "Severe asthma",
  "Active tuberculosis",
  "Severe anemia",
  "Blood clotting disorders",
  "History of recurrent fainting",
  "Epilepsy with uncontrolled seizures",
  "Neuromuscular disorders affecting mobility",
  "Severe osteoporosis",
  "Recent bone fracture",
  "Severe depression under active treatment",
  "Psychosis",
  "Bipolar disorder (uncontrolled)",
  "Substance abuse disorder",
  "Alcohol dependency",
  "Chronic malnutrition",
  "BMI below 16 kg/m²",
  "Unexplained rapid weight loss",
  "Any condition requiring a physician-supervised diet",
];

const BeforeStartAssessment = ({ onClose }: { onClose: () => void }) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <ModalWrapper>
      <div className="max-w-130 p-7.5 bg-[#FFFEFD] rounded-2xl min-w-100 flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <div className="w-full flex justify-center items-center gap-2.5">
            <DangerIcon />
            <p className="text-[24px] font-semibold text-center">
              Before You Start
            </p>
          </div>
          <button
            onClick={onClose}
            className="hover:bg-gray-100 transition-colors duration-200 p-3 rounded-full cursor-pointer"
          >
            <CloseIcon className="text-gray-500" width="16" height="16" />
          </button>
        </div>

        <p className="text-[16px] text-[#4F4F4F]">
          To ensure accurate results and recommendations, please let us know if
          you have any of the following medical conditions.
        </p>

        <p className="text-[16px] text-[#4F4F4F]">
          Please note that some conditions are not currently supported by our
          program. If you select an unsupported condition, you may not be
          eligible to continue with the assessment.
        </p>

        <MedicalConditionsDropDown />

        <div className="flex items-center gap-2.5">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
            className="size-4.5 accent-[#4D8E32]"
          />
          <p className="text-[16px]">
            I confirm I reviewed the unsupported medical conditions.
          </p>
        </div>

        <button
          disabled={!isChecked}
          onClick={() => {}}
          className={`
            rounded-full
            h-12
            text-[16px]
            font-semibold
            mt-2.5
            transition-colors 
            ${isChecked ? "bg-[#4D8E32] text-white hover:bg-[#337516] cursor-pointer" : "bg-gray-300 text-white cursor-not-allowed"}
            }
            `}
        >
          <p className="">Continue to Assesment</p>
        </button>
      </div>
    </ModalWrapper>
  );
};

const MedicalConditionsDropDown = () => {
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

  const filteredMedicalConditions = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    if (!search) {
      return unsupportedConditions;
    }

    return unsupportedConditions.filter((condition) =>
      condition.toLowerCase().includes(search),
    );
  }, [searchTerm]);

  return (
    <motion.div
      layout
      transition={{
        layout: {
          duration: 0.25,
          ease: "easeInOut",
        },
      }}
      className="relative bg-[#FFFFFF] flex flex-col"
    >
      <p className="font-medium mb-3">
        The following medical conditions we don’t support
      </p>

      <motion.div
        layout
        aria-expanded={isOpen}
        className="mb-3.5 w-full px-5 py-2.5 rounded-2xl ring focus-within:ring-2 focus-within:ring-[#4D8E32] ring-gray-300 flex justify-between items-center gap-2.5"
      >
        <input
          type="text"
          value={searchTerm}
          placeholder="Search your medical condition"
          className="text-[16px] w-full outline-none border-none"
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
              className="h-40 overflow-y-auto rounded-2xl border border-gray-300 bg-white p-5 flex flex-col gap-2.5"
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
              className="h-40 rounded-2xl border border-gray-300 bg-white p-5 flex justify-center items-center"
            >
              <p className="text-center text-gray-500">
                No matching medical conditions found.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default BeforeStartAssessment;
