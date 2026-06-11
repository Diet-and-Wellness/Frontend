const Label = ({
  text,
  isRequired = false,
}: {
  text: string;
  isRequired?: boolean;
}) => {
  return (
    <label>
      {text} {isRequired && <span className="text-red-500">*</span>}
    </label>
  );
};

export default Label;
