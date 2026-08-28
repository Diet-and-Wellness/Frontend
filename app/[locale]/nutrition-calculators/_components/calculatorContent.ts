export type CalculatorSlug = "bmi" | "healthy-weight" | "daily-calories";
export type CalculatorLocale = "en" | "ar";

type CalculatorContent = {
  title: string;
  metaTitle: string;
  description: string;
  eyebrow: string;
  introduction: string;
  keywords: string[];
  highlights: { label: string; value: string }[];
  scienceTitle: string;
  science: string[];
  formulaLabel: string;
  formula: string;
  interpretationTitle: string;
  interpretation: { range: string; meaning: string }[];
  limitationsTitle: string;
  limitations: string[];
  useTitle: string;
  useSteps: string[];
  faqTitle: string;
  faqs: { question: string; answer: string }[];
  sourcesTitle: string;
  sources: { label: string; href: string }[];
  disclaimer: string;
  relatedTitle: string;
  relatedDescription: string;
};

export const calculatorContent: Record<
  CalculatorLocale,
  Record<CalculatorSlug, CalculatorContent>
> = {
  en: {
    bmi: {
      title: "BMI calculator: understand your body mass index",
      metaTitle: "Free BMI Calculator & Healthy BMI Range",
      description:
        "Calculate your body mass index (BMI) from height and weight, review adult BMI categories, understand the formula, and learn the limits of BMI screening.",
      eyebrow: "Free evidence-based nutrition tool",
      introduction:
        "Body mass index is a screening measure that relates weight to height. It is useful for describing weight categories in adults, but it does not directly measure body fat, fitness, or individual health.",
      keywords: [
        "BMI calculator",
        "body mass index calculator",
        "calculate BMI",
        "BMI formula",
        "healthy BMI range",
        "adult BMI chart",
        "weight for height",
        "underweight BMI",
        "overweight BMI",
        "obesity BMI",
        "metric BMI calculator",
        "free nutrition calculator",
      ],
      highlights: [
        { label: "Inputs", value: "Height + weight" },
        { label: "Healthy adult range", value: "18.5–24.9 kg/m²" },
        { label: "Result", value: "BMI to 1 decimal" },
      ],
      scienceTitle: "What BMI measures",
      science: [
        "BMI standardizes body mass for height, making it practical for population screening and an initial clinical risk assessment. Higher or lower values can be associated with health risk, but BMI is not a diagnosis.",
        "The calculator uses the metric equation and the widely used adult cut points. A clinician may interpret the result alongside waist circumference, blood pressure, laboratory results, medical history, age, sex, ethnicity, muscle mass, and pregnancy status.",
      ],
      formulaLabel: "Metric formula",
      formula: "BMI = weight (kg) ÷ height² (m²)",
      interpretationTitle: "Adult BMI categories",
      interpretation: [
        { range: "Below 18.5", meaning: "Underweight" },
        { range: "18.5–24.9", meaning: "Healthy weight range" },
        { range: "25.0–29.9", meaning: "Overweight" },
        { range: "30.0 or higher", meaning: "Obesity" },
      ],
      limitationsTitle: "Important limitations",
      limitations: [
        "BMI cannot distinguish fat mass from muscle, bone, or fluid. Athletic people may have a high BMI without excess body fat.",
        "Body-fat distribution and cardiometabolic risk can differ between people with the same BMI.",
        "Adult thresholds are not intended for children or adolescents, and specialist interpretation may be needed during pregnancy, older age, or illness.",
      ],
      useTitle: "How to get a reliable result",
      useSteps: [
        "Measure height without shoes and enter it in centimetres.",
        "Use a calibrated scale on a firm surface and enter weight in kilograms.",
        "Treat the result as a screening signal and discuss unexpected values or health concerns with a qualified professional.",
      ],
      faqTitle: "BMI calculator questions",
      faqs: [
        {
          question: "What is a healthy BMI for adults?",
          answer:
            "For most adults, 18.5 to 24.9 kg/m² is classified as the healthy range. Individual risk can still vary, so the number should be interpreted in context.",
        },
        {
          question: "Is BMI the same as body-fat percentage?",
          answer:
            "No. BMI is calculated only from height and weight. It does not measure body-fat percentage or show where fat is stored.",
        },
        {
          question: "Can muscular people have a high BMI?",
          answer:
            "Yes. Because BMI does not separate muscle from fat, people with substantial muscle mass can fall into a higher category despite having relatively low body fat.",
        },
      ],
      sourcesTitle: "Scientific basis",
      sources: [
        { label: "World Health Organization: BMI classification", href: "https://www.who.int/data/gho/data/themes/topics/topic-details/GHO/body-mass-index" },
        { label: "CDC: About adult BMI", href: "https://www.cdc.gov/bmi/adult-calculator/bmi-categories.html" },
      ],
      disclaimer:
        "This calculator provides general educational information and is not medical advice, a diagnosis, or a treatment plan.",
      relatedTitle: "Explore related free calculators",
      relatedDescription:
        "Put BMI in context with an estimated healthy weight and daily energy requirement.",
    },
    "healthy-weight": {
      title: "Healthy weight calculator: estimate ideal body weight",
      metaTitle: "Healthy Weight & Ideal Body Weight Calculator",
      description:
        "Estimate ideal body weight using the Devine formula, compare your current weight, and understand the scientific uses and limitations of healthy-weight estimates.",
      eyebrow: "Free evidence-based nutrition tool",
      introduction:
        "Ideal body weight (IBW) is a height-based reference estimate originally developed to support clinical dosing decisions. It is not a universal target or a direct measure of health, body composition, or appearance.",
      keywords: [
        "healthy weight calculator",
        "ideal body weight calculator",
        "IBW calculator",
        "Devine formula",
        "weight for height calculator",
        "healthy weight range",
        "ideal weight for height",
        "male ideal weight",
        "female ideal weight",
        "kilogram weight calculator",
        "free nutrition calculator",
      ],
      highlights: [
        { label: "Method", value: "Devine formula" },
        { label: "Inputs", value: "Sex + height + weight" },
        { label: "Reference point", value: "Height-based IBW" },
      ],
      scienceTitle: "What ideal body weight means",
      science: [
        "The Devine equation estimates a reference body weight from sex and height. It was introduced in 1974 for medication dosing and later became a common clinical IBW method.",
        "This tool calculates the reference value, shows a narrow ±2 kg comparison band, and compares it with current weight. That band is a product presentation aid—not a validated definition of a healthy-weight range.",
      ],
      formulaLabel: "Devine equations used",
      formula:
        "Men: 50 kg + 2.3 kg per inch over 5 ft · Women: 45.5 kg + 2.3 kg per inch over 5 ft",
      interpretationTitle: "How to interpret the result",
      interpretation: [
        { range: "Reference value", meaning: "A height-based clinical estimate, not a required target" },
        { range: "Within ±2 kg", meaning: "Displayed by this tool as close to the estimate" },
        { range: "Above or below", meaning: "Difference from IBW, not a diagnosis" },
      ],
      limitationsTitle: "Important limitations",
      limitations: [
        "The equation does not incorporate body composition, frame size, age, ethnicity, pregnancy, disability, or athletic muscle mass.",
        "The original formula was designed for adults at least 5 feet (152.4 cm) tall; estimates below that height have limited validity.",
        "A sustainable, healthy weight is individual. BMI, waist measures, clinical markers, health history, and personal goals may provide better context.",
      ],
      useTitle: "How to use this estimate",
      useSteps: [
        "Select the sex used by the original equation.",
        "Enter measured height in centimetres and current weight in kilograms.",
        "Use the result as a reference for discussion—not as a prescription to gain or lose weight.",
      ],
      faqTitle: "Healthy weight calculator questions",
      faqs: [
        {
          question: "What formula does this calculator use?",
          answer:
            "It uses the Devine ideal body weight formula: a base weight at 5 feet plus 2.3 kg for each additional inch.",
        },
        {
          question: "Is ideal body weight the same as healthy weight?",
          answer:
            "Not exactly. IBW is a simplified clinical reference. A healthy weight depends on more than height and may span a broader, individualized range.",
        },
        {
          question: "Should I change my weight to match the estimate?",
          answer:
            "Not based on this number alone. A qualified clinician or dietitian can assess body composition, medical history, nutrition, and realistic goals.",
        },
      ],
      sourcesTitle: "Scientific basis",
      sources: [
        { label: "Devine: Gentamicin therapy and the original IBW equation (1974)", href: "https://doi.org/10.1177/106002807400801104" },
        { label: "Pai & Paloucek: Origins of ideal body weight equations", href: "https://pubmed.ncbi.nlm.nih.gov/10981254/" },
      ],
      disclaimer:
        "This calculator is for education only. It does not establish a medically appropriate goal weight or replace professional assessment.",
      relatedTitle: "Explore related free calculators",
      relatedDescription:
        "Compare the estimate with BMI screening and your approximate daily calorie needs.",
    },
    "daily-calories": {
      title: "Daily calorie calculator: estimate BMR and TDEE",
      metaTitle: "Daily Calorie, BMR & TDEE Calculator",
      description:
        "Estimate basal metabolic rate (BMR), total daily energy expenditure (TDEE), maintenance calories, and illustrative calorie targets using Mifflin–St Jeor.",
      eyebrow: "Free evidence-based nutrition tool",
      introduction:
        "Daily energy needs combine the energy used at rest with movement, exercise, and normal daily activity. This calculator estimates basal metabolic rate and multiplies it by an activity factor to approximate total daily energy expenditure.",
      keywords: [
        "calorie calculator",
        "daily calorie calculator",
        "TDEE calculator",
        "BMR calculator",
        "maintenance calorie calculator",
        "Mifflin St Jeor equation",
        "calories per day",
        "weight loss calories",
        "muscle gain calories",
        "energy expenditure calculator",
        "activity level calculator",
        "macro calculator",
        "free nutrition calculator",
      ],
      highlights: [
        { label: "Resting estimate", value: "Mifflin–St Jeor BMR" },
        { label: "Daily estimate", value: "BMR × activity factor" },
        { label: "Output", value: "kcal/day + macros" },
      ],
      scienceTitle: "How calorie needs are estimated",
      science: [
        "Basal metabolic rate (BMR) approximates energy used for essential body functions at rest. The Mifflin–St Jeor equation uses weight, height, age, and sex and is widely used for adults.",
        "Total daily energy expenditure (TDEE) is estimated by multiplying BMR by a selected activity factor. The result is a starting estimate: real energy needs vary with movement, body composition, health, climate, medication, and measurement error.",
      ],
      formulaLabel: "Mifflin–St Jeor equations",
      formula:
        "Men: 10W + 6.25H − 5A + 5 · Women: 10W + 6.25H − 5A − 161 · TDEE = BMR × activity factor",
      interpretationTitle: "Activity factors used",
      interpretation: [
        { range: "Low", meaning: "1.375 × BMR" },
        { range: "Moderate", meaning: "1.55 × BMR" },
        { range: "High", meaning: "1.725 × BMR" },
        { range: "Extreme", meaning: "1.90 × BMR" },
      ],
      limitationsTitle: "Important limitations",
      limitations: [
        "Activity categories are subjective and can overestimate or underestimate true expenditure.",
        "The displayed loss and gain targets apply a fixed 500 kcal/day subtraction or addition; appropriate rates and energy deficits differ by person.",
        "Pregnancy, breastfeeding, growth, eating disorders, metabolic disease, medication, and high-performance sport require individualized professional guidance.",
      ],
      useTitle: "How to refine your estimate",
      useSteps: [
        "Enter current measurements and choose the activity level that best reflects a typical week.",
        "Use maintenance calories as a starting point and track average weight and intake consistently for 2–4 weeks.",
        "Adjust gradually based on the observed trend, energy, hunger, training, and advice from a registered dietitian or clinician.",
      ],
      faqTitle: "Daily calorie calculator questions",
      faqs: [
        {
          question: "What is the difference between BMR and TDEE?",
          answer:
            "BMR estimates energy used at rest. TDEE adds an activity multiplier to approximate all energy used across a typical day.",
        },
        {
          question: "Are maintenance calories exact?",
          answer:
            "No. Predictive equations provide a starting estimate. Tracking intake and weight trends over several weeks can help calibrate it.",
        },
        {
          question: "Is a 500-calorie deficit right for everyone?",
          answer:
            "No. It is a common illustrative target, but it may be too large or too small depending on body size, health, goals, and current intake.",
        },
      ],
      sourcesTitle: "Scientific basis",
      sources: [
        { label: "Mifflin et al. resting energy equation (1990)", href: "https://pubmed.ncbi.nlm.nih.gov/2305711/" },
        { label: "Academy of Nutrition and Dietetics Evidence Analysis Library", href: "https://www.andeal.org/" },
      ],
      disclaimer:
        "Estimates are educational and not a prescription. Seek professional guidance for medical conditions, pregnancy, eating-disorder concerns, or major weight changes.",
      relatedTitle: "Explore related free calculators",
      relatedDescription:
        "Add context to your energy estimate with BMI and healthy-weight reference tools.",
    },
  },
  ar: {
    bmi: {
      title: "حاسبة مؤشر كتلة الجسم",
      metaTitle: "حاسبة مؤشر كتلة الجسم BMI والنطاق الصحي مجاناً",
      description:
        "احسب مؤشر كتلة الجسم من الطول والوزن، وتعرّف على تصنيفات BMI للبالغين والمعادلة العلمية وحدود استخدام المؤشر كأداة فحص.",
      eyebrow: "حاسبة مجانية بمعلومات موثوقة",
      introduction:
        "يساعدك مؤشر كتلة الجسم على مقارنة وزنك بطولك ومعرفة الفئة الأقرب لك. لكنه لا يقيس نسبة الدهون أو اللياقة أو حالتك الصحية بشكل مباشر.",
      keywords: ["حاسبة مؤشر كتلة الجسم", "حساب BMI", "مؤشر كتلة الجسم", "الوزن المثالي", "الوزن الصحي", "تصنيف السمنة", "نطاق BMI الصحي", "حاسبة الوزن والطول", "حاسبة تغذية مجانية"],
      highlights: [
        { label: "البيانات المطلوبة", value: "الطول + الوزن" },
        { label: "النطاق الصحي للبالغين", value: "18.5–24.9 كجم/م²" },
        { label: "النتيجة", value: "بدقة منزلة عشرية" },
      ],
      scienceTitle: "ماذا تخبرك النتيجة؟",
      science: [
        "يقارن المؤشر بين الوزن والطول، لذلك يستخدم كخطوة أولى لتقييم فئة الوزن وبعض المخاطر الصحية. النتيجة مؤشر مبدئي وليست تشخيصا.",
        "تعتمد الحاسبة على المعادلة المترية وتصنيفات البالغين الشائعة. ولصورة أدق، ينظر المختص أيضا إلى محيط الخصر وضغط الدم والتحاليل والتاريخ الصحي والعمر والكتلة العضلية.",
      ],
      formulaLabel: "المعادلة المترية",
      formula: "مؤشر كتلة الجسم = الوزن بالكيلوجرام ÷ مربع الطول بالمتر",
      interpretationTitle: "تصنيفات النتيجة للبالغين",
      interpretation: [
        { range: "أقل من 18.5", meaning: "نقص الوزن" },
        { range: "18.5–24.9", meaning: "نطاق الوزن الصحي" },
        { range: "25.0–29.9", meaning: "زيادة الوزن" },
        { range: "30.0 فأكثر", meaning: "السمنة" },
      ],
      limitationsTitle: "مهم تعرف",
      limitations: [
        "المؤشر لا يفرق بين الدهون والعضلات والعظام والسوائل، لذلك قد تكون نتيجته مرتفعة لدى الرياضيين رغم انخفاض نسبة الدهون.",
        "توزيع الدهون والمخاطر الصحية قد يختلفان بين شخصين لديهما النتيجة نفسها.",
        "تصنيفات البالغين لا تناسب الأطفال والمراهقين، وتحتاج النتيجة إلى تقييم متخصص أثناء الحمل أو مع بعض الحالات الصحية.",
      ],
      useTitle: "لنتيجة أدق",
      useSteps: ["قس طولك من دون حذاء وأدخله بالسنتيمتر.", "استخدم ميزانا مضبوطا على سطح ثابت وأدخل الوزن بالكيلوجرام.", "اعتبر النتيجة مؤشرا مبدئيا، واستشر مختصا إذا كانت النتيجة غير متوقعة أو لديك أي قلق صحي."],
      faqTitle: "أسئلة شائعة عن مؤشر كتلة الجسم",
      faqs: [
        { question: "ما النطاق الصحي للبالغين؟", answer: "النطاق من 18.5 إلى 24.9 كجم/م² هو النطاق الصحي لمعظم البالغين، لكن تقييم الصحة لا يعتمد على هذا الرقم وحده." },
        { question: "هل المؤشر هو نفسه نسبة دهون الجسم؟", answer: "لا. المؤشر يعتمد على الطول والوزن فقط، ولا يقيس نسبة الدهون أو مكان توزيعها في الجسم." },
        { question: "هل يمكن أن تكون النتيجة مرتفعة بسبب العضلات؟", answer: "نعم. لأن المؤشر لا يفصل العضلات عن الدهون، قد تظهر نتيجة أعلى لدى أصحاب الكتلة العضلية الكبيرة رغم انخفاض نسبة الدهون." },
      ],
      sourcesTitle: "المصادر العلمية",
      sources: [
        { label: "منظمة الصحة العالمية: تصنيف مؤشر كتلة الجسم", href: "https://www.who.int/data/gho/data/themes/topics/topic-details/GHO/body-mass-index" },
        { label: "مراكز مكافحة الأمراض: مؤشر كتلة الجسم للبالغين", href: "https://www.cdc.gov/bmi/adult-calculator/bmi-categories.html" },
      ],
      disclaimer: "هذه الحاسبة للمعلومات العامة، ولا تعتبر نصيحة طبية أو تشخيصا أو خطة علاج.",
      relatedTitle: "حاسبات أخرى قد تهمك",
      relatedDescription: "يمكنك مقارنة النتيجة بتقدير الوزن الصحي واحتياجك اليومي من السعرات.",
    },
    "healthy-weight": {
      title: "حاسبة الوزن الصحي",
      metaTitle: "حاسبة الوزن الصحي والمثالي بمعادلة Devine",
      description: "قدّر وزن الجسم المثالي بمعادلة Devine، وقارن وزنك الحالي، وافهم الاستخدام العلمي وحدود تقديرات الوزن الصحي.",
      eyebrow: "حاسبة مجانية بمعلومات موثوقة",
      introduction: "تساعدك الحاسبة على تقدير وزن مرجعي حسب طولك باستخدام معادلة ديفاين. الرقم يعطيك صورة عامة، لكنه ليس وزنا إلزاميا ولا مقياسا مباشرا لصحتك أو تركيب جسمك.",
      keywords: ["حاسبة الوزن الصحي", "حاسبة الوزن المثالي", "حساب الوزن المناسب للطول", "معادلة Devine", "حاسبة IBW", "الوزن المثالي للرجال", "الوزن المثالي للنساء", "نطاق الوزن الصحي", "حاسبة تغذية مجانية"],
      highlights: [
        { label: "طريقة الحساب", value: "معادلة ديفاين" },
        { label: "البيانات", value: "الجنس + الطول + الوزن" },
        { label: "الناتج", value: "وزن مرجعي حسب الطول" },
      ],
      scienceTitle: "ماذا يعني الوزن المرجعي؟",
      science: [
        "تستخدم معادلة ديفاين الجنس والطول لتقدير وزن مرجعي. ظهرت المعادلة عام 1974 للمساعدة في حساب جرعات بعض الأدوية، ثم أصبحت من المعادلات الشائعة في الاستخدام الطبي.",
        "تعرض الحاسبة القيمة المرجعية ونطاقا قريبا منها بمقدار 2 كجم أعلى أو أقل، ثم تقارنها بوزنك الحالي. هذا النطاق للتوضيح داخل الحاسبة، وليس تعريفا طبيا للوزن الصحي.",
      ],
      formulaLabel: "طريقة الحساب",
      formula: "الرجال: 50 كجم + 2.3 كجم لكل بوصة بعد 5 أقدام · النساء: 45.5 كجم + 2.3 كجم لكل بوصة بعد 5 أقدام",
      interpretationTitle: "كيف تقرأ النتيجة؟",
      interpretation: [
        { range: "القيمة المرجعية", meaning: "تقدير حسب الطول، وليس وزنا مطلوبا الوصول إليه" },
        { range: "أعلى أو أقل بـ 2 كجم", meaning: "نطاق قريب من التقدير لتسهيل المقارنة" },
        { range: "خارج النطاق", meaning: "فرق عن الوزن المرجعي، وليس تشخيصا" },
      ],
      limitationsTitle: "مهم تعرف",
      limitations: [
        "المعادلة لا تأخذ في الاعتبار تركيب الجسم أو بنية العظام أو العمر أو الحمل أو الكتلة العضلية.",
        "المعادلة الأصلية مخصصة للبالغين بطول 152.4 سم فأكثر، لذلك تقل دقتها مع الأطوال الأقل.",
        "الوزن الصحي يختلف من شخص لآخر. مؤشر كتلة الجسم ومحيط الخصر والفحوص والتاريخ الصحي يعطون صورة أكمل.",
      ],
      useTitle: "كيف تستخدم النتيجة؟",
      useSteps: ["اختر الجنس المستخدم في المعادلة.", "أدخل طولك بالسنتيمتر ووزنك الحالي بالكيلوجرام.", "استخدم الرقم كمرجع عام، وليس كقرار لزيادة الوزن أو خسارته من دون تقييم متخصص."],
      faqTitle: "أسئلة عن حاسبة الوزن الصحي",
      faqs: [
        { question: "ما المعادلة المستخدمة؟", answer: "تستخدم الحاسبة معادلة ديفاين: وزن أساسي عند طول 5 أقدام، مع إضافة 2.3 كجم لكل بوصة إضافية." },
        { question: "هل الوزن المرجعي هو نفسه الوزن الصحي؟", answer: "ليس بالضرورة. الوزن المرجعي تقدير مبسط، بينما يعتمد الوزن الصحي على عوامل أخرى غير الطول وقد يكون ضمن نطاق أوسع." },
        { question: "هل أغير وزني ليطابق النتيجة؟", answer: "لا تعتمد على هذا الرقم وحده. يمكن للطبيب أو أخصائي التغذية تقييم تركيب جسمك وتاريخك الصحي وعاداتك وأهدافك بشكل أدق." },
      ],
      sourcesTitle: "المصادر العلمية",
      sources: [
        { label: "الدراسة الأصلية لمعادلة ديفاين (1974)", href: "https://doi.org/10.1177/106002807400801104" },
        { label: "دراسة عن أصل معادلات الوزن المرجعي", href: "https://pubmed.ncbi.nlm.nih.gov/10981254/" },
      ],
      disclaimer: "هذه الحاسبة للمعلومات العامة فقط، ولا تحدد هدف وزن مناسب لحالتك ولا تغني عن تقييم المختص.",
      relatedTitle: "حاسبات أخرى قد تهمك",
      relatedDescription: "يمكنك مقارنة التقدير بمؤشر كتلة الجسم واحتياجك اليومي من السعرات.",
    },
    "daily-calories": {
      title: "حاسبة السعرات اليومية",
      metaTitle: "حاسبة السعرات اليومية ومعدل BMR وTDEE",
      description: "قدّر معدل الأيض الأساسي BMR وإجمالي استهلاك الطاقة TDEE وسعرات الثبات وأهداف السعرات التوضيحية بمعادلة Mifflin–St Jeor.",
      eyebrow: "حاسبة مجانية بمعلومات موثوقة",
      introduction: "تساعدك الحاسبة على تقدير احتياج جسمك اليومي من السعرات بناء على معدل الحرق في الراحة ومستوى نشاطك. النتيجة نقطة بداية لفهم احتياجك بشكل أفضل.",
      keywords: ["حاسبة السعرات الحرارية", "حساب السعرات اليومية", "حاسبة TDEE", "حاسبة BMR", "سعرات تثبيت الوزن", "معادلة Mifflin St Jeor", "سعرات خسارة الوزن", "سعرات زيادة العضلات", "حاسبة الماكروز", "حاسبة تغذية مجانية"],
      highlights: [
        { label: "معدل الحرق", value: "في وقت الراحة" },
        { label: "الاحتياج اليومي", value: "حسب مستوى النشاط" },
        { label: "النتيجة", value: "سعرات + عناصر غذائية" },
      ],
      scienceTitle: "كيف يتم حساب احتياجك؟",
      science: [
        "تبدأ الحاسبة بتقدير معدل الحرق الأساسي، وهو الطاقة التي يحتاجها جسمك للوظائف الأساسية في الراحة. وتعتمد معادلة ميفلين–سانت جيور على الوزن والطول والعمر والجنس.",
        "بعد ذلك تضرب معدل الحرق في معامل النشاط لتقدير احتياجك اليومي. يظل الرقم تقديريا لأن احتياجك الفعلي يتأثر بالحركة وتركيب الجسم والحالة الصحية وأدوية معينة.",
      ],
      formulaLabel: "معادلة ميفلين–سانت جيور",
      formula: "الرجال: (10 × الوزن) + (6.25 × الطول) − (5 × العمر) + 5 · النساء: (10 × الوزن) + (6.25 × الطول) − (5 × العمر) − 161 · الاحتياج اليومي = معدل الحرق × معامل النشاط",
      interpretationTitle: "مستويات النشاط المستخدمة",
      interpretation: [
        { range: "منخفض", meaning: "1.375 × معدل الحرق" },
        { range: "متوسط", meaning: "1.55 × معدل الحرق" },
        { range: "مرتفع", meaning: "1.725 × معدل الحرق" },
        { range: "شديد جدا", meaning: "1.90 × معدل الحرق" },
      ],
      limitationsTitle: "مهم تعرف",
      limitations: [
        "اختيار مستوى النشاط تقديري، لذلك قد تكون النتيجة أعلى أو أقل من احتياجك الحقيقي.",
        "أهداف الخسارة والزيادة المعروضة تقل أو تزيد 500 سعرة يوميا، لكن الرقم المناسب يختلف من شخص لآخر.",
        "الحمل والرضاعة وفترات النمو واضطرابات الأكل وبعض الأمراض والأدوية والرياضة الاحترافية تحتاج إلى حسابات فردية مع مختص.",
      ],
      useTitle: "كيف تقرب النتيجة من احتياجك؟",
      useSteps: ["أدخل قياساتك الحالية واختر مستوى النشاط الأقرب لأسبوعك المعتاد.", "ابدأ بسعرات الحفاظ على الوزن، وتابع متوسط وزنك وأكلك لمدة من أسبوعين إلى 4 أسابيع.", "عدل السعرات تدريجيا حسب تغير الوزن والطاقة والجوع والتمرين، ويفضل مع أخصائي تغذية."],
      faqTitle: "أسئلة عن حاسبة السعرات اليومية",
      faqs: [
        { question: "ما الفرق بين معدل الحرق والاحتياج اليومي؟", answer: "معدل الحرق يقدر الطاقة التي يستخدمها جسمك في الراحة، بينما يضيف الاحتياج اليومي الحركة والنشاط خلال يومك." },
        { question: "هل سعرات الحفاظ على الوزن دقيقة تماما؟", answer: "لا. المعادلة تعطيك نقطة بداية، ومتابعة أكلك ومتوسط وزنك لعدة أسابيع تساعدك على الوصول لرقم أقرب لاحتياجك." },
        { question: "هل فرق 500 سعرة مناسب للجميع؟", answer: "لا. هو رقم توضيحي شائع، لكنه قد يكون كبيرا أو صغيرا حسب وزن الجسم والحالة الصحية والهدف والأكل الحالي." },
      ],
      sourcesTitle: "المصادر العلمية",
      sources: [
        { label: "دراسة معادلة ميفلين لمعدل الحرق (1990)", href: "https://pubmed.ncbi.nlm.nih.gov/2305711/" },
        { label: "مكتبة تحليل الأدلة لأكاديمية التغذية", href: "https://www.andeal.org/" },
      ],
      disclaimer: "النتائج تقديرية وليست خطة غذائية. استشر مختصا إذا كانت لديك حالة صحية أو حمل أو اضطراب أكل أو تغير كبير في الوزن.",
      relatedTitle: "حاسبات أخرى قد تهمك",
      relatedDescription: "يمكنك فهم الصورة بشكل أفضل باستخدام حاسبتي مؤشر كتلة الجسم والوزن الصحي.",
    },
  },
};

export function isCalculatorLocale(locale: string): locale is CalculatorLocale {
  return locale === "en" || locale === "ar";
}
