import { useTranslations } from "next-intl";

const StateComp = ({ state = "inactive" }: { state: string }) => {
  const t = useTranslations("dashboard");
  const states = {
    active: {
      bg: "var(--color-status-active-surface)",
      text: "var(--color-status-active-text)",
    },
    inactive: {
      bg: "var(--color-status-inactive-surface)",
      text: "var(--color-status-inactive-text)",
    },
    pending: {
      bg: "var(--color-status-pending-surface)",
      text: "var(--color-status-pending-text)",
    },
    full: {
      bg: "var(--color-status-info-surface)",
      text: "var(--color-status-info-text)",
    },
    trial: {
      bg: "var(--color-status-neutral-surface)",
      text: "var(--color-status-neutral-text)",
    },
    basic: {
      bg: "var(--color-status-info-surface)",
      text: "var(--color-status-info-text)",
    },
    premium: {
      bg: "var(--color-status-premium-surface)",
      text: "var(--color-status-premium-text)",
    },
    expired: {
      bg: "var(--color-status-pending-surface)",
      text: "var(--color-status-pending-text)",
    },
  };

  const lowercaseState = state.toLowerCase();

  const currentState = states[lowercaseState as keyof typeof states];

  return (
    <div
      style={{
        background: currentState.bg,
      }}
      className={`min-w-20 py-1.5 md:py-2 rounded-full flex justify-center items-center`}
    >
      <span
        style={{
          color: currentState.text,
        }}
        className="type-meta font-semibold"
      >
        {t(lowercaseState)}
      </span>
    </div>
  );
};

export default StateComp;
