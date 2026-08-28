const HEALTHY_MIN = 18.5;
const HEALTHY_MAX = 24.9;

type BMIStatus = "Underweight" | "Normal" | "Overweight" | "Obesity";

interface BMIResult {
  bmi: number;
  status: BMIStatus;
  differenceFromHealthy: number;

  weightRange: {
    from: number;
    to: number;
  } | null;

  direction: "above" | "below" | "healthy";
  action: "Losing" | "Gaining" | "Maintaining";
}

interface HealthyWeightResult {
  healthyWeight: number;
  healthyWeightRange: {
    min: number;
    max: number;
  };
  difference: number;
  action: "Gaining" | "Losing" | "Maintaining";
  status: "above" | "below" | "healthy";
}

interface MacroResult {
  calories: number;

  protein: {
    grams: number;
    calories: number;
  };

  carbs: {
    grams: number;
    calories: number;
  };

  fat: {
    grams: number;
    calories: number;
  };
}

type ActivityLevel = "low" | "moderate" | "high" | "extreme";

type Gender = "male" | "female";

const activityFactors: Record<ActivityLevel, number> = {
  low: 1.375,
  moderate: 1.55,
  high: 1.725,
  extreme: 1.9,
};

export const healthMetrics = {
  calculateBMI: ({
    heightCm,
    weightKg,
  }: {
    heightCm: number;
    weightKg: number;
  }) => {
    const heightM = heightCm / 100;

    const bmi = weightKg / (heightM * heightM);

    let status: BMIStatus;
    let differenceFromHealthy = 0;

    let direction: BMIResult["direction"] = "healthy";
    let action: BMIResult["action"] = "Maintaining";

    let weightRange: BMIResult["weightRange"] = null;

    if (bmi < HEALTHY_MIN) {
      status = "Underweight";

      differenceFromHealthy = HEALTHY_MIN - bmi;

      const minWeight = HEALTHY_MIN * heightM * heightM;
      const maxWeight = 22 * heightM * heightM;

      weightRange = {
        from: Math.ceil(minWeight - weightKg),
        to: Math.ceil(maxWeight - weightKg),
      };

      direction = "below";
      action = "Gaining";
    } else if (bmi <= HEALTHY_MAX) {
      status = "Normal";
    } else if (bmi < 30) {
      status = "Overweight";

      differenceFromHealthy = bmi - HEALTHY_MAX;

      const maxWeight = HEALTHY_MAX * heightM * heightM;
      const healthyWeight = 22 * heightM * heightM;

      weightRange = {
        from: Math.ceil(weightKg - maxWeight),
        to: Math.ceil(weightKg - healthyWeight),
      };

      direction = "above";
      action = "Losing";
    } else {
      status = "Obesity";

      differenceFromHealthy = bmi - HEALTHY_MAX;

      const maxWeight = HEALTHY_MAX * heightM * heightM;
      const healthyWeight = 22 * heightM * heightM;

      weightRange = {
        from: Math.ceil(weightKg - maxWeight),
        to: Math.ceil(weightKg - healthyWeight),
      };

      direction = "above";
      action = "Losing";
    }

    return {
      bmi: Number(bmi.toFixed(1)),
      status,
      differenceFromHealthy: Number(differenceFromHealthy.toFixed(1)),
      weightRange,
      direction,
      action,
    };
  },

  calculateHealthyWeightResult: ({
    heightCm,
    weightKg,
    gender,
  }: {
    heightCm: number;
    weightKg: number;
    gender: Gender;
  }) => {
    const heightInches = heightCm / 2.54;
    const inchesOverFiveFeet = Math.max(0, heightInches - 60);

    const healthyWeight =
      (gender === "male" ? 50 : 45.5) + inchesOverFiveFeet * 2.3;

    const roundedHealthy = Number(healthyWeight.toFixed(1));

    const difference = Number(Math.abs(weightKg - roundedHealthy).toFixed(1));

    let action: HealthyWeightResult["action"] = "Maintaining";
    let status: HealthyWeightResult["status"] = "healthy";

    if (weightKg > roundedHealthy) {
      action = "Losing";
      status = "above";
    } else if (weightKg < roundedHealthy) {
      action = "Gaining";
      status = "below";
    }

    return {
      healthyWeight: roundedHealthy,

      healthyWeightRange: {
        min: Number((roundedHealthy - 2).toFixed(1)),
        max: Number((roundedHealthy + 2).toFixed(1)),
      },

      difference,
      action,
      status,
    };
  },

  calculateMacros: (calories: number): MacroResult => {
    const proteinCalories = calories * 0.3;
    const carbsCalories = calories * 0.55;
    const fatCalories = calories * 0.15;

    return {
      calories: Math.round(calories),

      protein: {
        calories: Math.round(proteinCalories),
        grams: Math.round(proteinCalories / 4),
      },

      carbs: {
        calories: Math.round(carbsCalories),
        grams: Math.round(carbsCalories / 4),
      },

      fat: {
        calories: Math.round(fatCalories),
        grams: Math.round(fatCalories / 9),
      },
    };
  },

  calculateCalorieResult: ({
    heightCm,
    weightKg,
    gender,
    age,
    activityLevel,
  }: {
    heightCm: number;
    weightKg: number;
    gender: Gender;
    age: number;
    activityLevel: ActivityLevel;
  }) => {
    const heightM = heightCm / 100;

    // BMI
    const bmi = weightKg / (heightM * heightM);

    let bmiStatus: "Underweight" | "Normal" | "Overweight" | "Obesity";

    if (bmi < 18.5) {
      bmiStatus = "Underweight";
    } else if (bmi < 25) {
      bmiStatus = "Normal";
    } else if (bmi < 30) {
      bmiStatus = "Overweight";
    } else {
      bmiStatus = "Obesity";
    }

    // Mifflin-St Jeor Equation
    const bmr =
      gender === "male"
        ? 10 * weightKg + 6.25 * heightCm - 5 * age + 5
        : 10 * weightKg + 6.25 * heightCm - 5 * age - 161;

    // TDEE
    const tdee = bmr * activityFactors[activityLevel];

    // Goals
    const maintenanceCalories = Math.round(tdee);

    const fatLossCalories = Math.round(tdee - 500);

    const muscleGainCalories = Math.round(tdee + 500);

    return {
      bmi: Number(bmi.toFixed(1)),
      bmiStatus,
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      maintenanceCalories,
      fatLossCalories,
      muscleGainCalories,
      macros: {
        maintenance: healthMetrics.calculateMacros(maintenanceCalories),
        fatLoss: healthMetrics.calculateMacros(fatLossCalories),
        muscleGain: healthMetrics.calculateMacros(muscleGainCalories),
      },
    };
  },
};
