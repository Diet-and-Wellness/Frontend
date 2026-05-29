const StateComp = ({ state = "inactive" }: { state: string }) => {
  const states = {
    active: {
      bg: "#E4FFF6",
      text: "#00AE41",
    },
    inactive: {
      bg: "#DC262633",
      text: "#DC2626",
    },
    pending: {
      bg: "#FCEFE0",
      text: "#E99532",
    },
    full: {
      bg: "#D5E6FF",
      text: "#0066FF",
    },
    trial: {
      bg: "#00000033",
      text: "#4B5563",
    },
    basic: {
      bg: "#2563EB33",
      text: "#2563EB",
    },
    premium: {
      bg: "#7C3AED33",
      text: "#7C3AED",
    },
  };

  const lowercaseState = state.toLowerCase();

  const currentState = states[lowercaseState as keyof typeof states];

  return (
    <div
      style={{
        background: currentState.bg,
      }}
      className={`min-w-25 py-2 rounded-full flex justify-center items-center`}
    >
      <span
        style={{
          color: currentState.text,
        }}
        className={`text-[14px] font-semibold`}
      >
        {state}
      </span>
    </div>
  );
};

export default StateComp;
