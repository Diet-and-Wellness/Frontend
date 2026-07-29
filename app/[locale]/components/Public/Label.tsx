const Label = ({
  text,
  isRequired = false,
}: {
  text: string;
  isRequired?: boolean;
}) => {
  return (
    <label className="type-label">
      {text} {isRequired && <span className="text-red-500">*</span>}
    </label>
  );
};

export default Label;
