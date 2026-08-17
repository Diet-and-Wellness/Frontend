import { useRouter } from "next/navigation";
import ViewLinkIcon from "../../components/icons/ViewLinkIcon";
import { useTranslations } from "next-intl";

export const ViewAnswersLink = ({
  disabled,
  customerId,
}: {
  disabled: boolean;
  customerId: string;
}) => {
  const t = useTranslations("dashboard");

  const router = useRouter();

  return (
    <button
      disabled={disabled}
      onClick={() => router.push(`/dashboard/customers/${customerId}/answers`)}
      className="flex items-center gap-2 text-accent
        disabled:bg-transparent!
        disabled:cursor-not-allowed
        disabled:opacity-50
        enabled:cursor-pointer
        enabled:hover:underline"
    >
      <div className="min-w-6">
        <ViewLinkIcon className="text-accent" />
      </div>
      <span>{t("viewAnswers")}</span>
    </button>
  );
};
