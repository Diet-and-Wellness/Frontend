const Spinner = ({
  spinnerSize = 40,
  borderColor = "#fff",
}: {
  spinnerSize?: number;
  borderColor?: string;
}) => {
  return (
    <div
      style={{
        width: spinnerSize,
        height: spinnerSize,
        borderWidth: 3,
        borderStyle: "solid",
        borderColor,
        borderTopColor: "transparent",
        borderRadius: "50%",
      }}
      className="animate-spin"
    />
  );
};

export default Spinner;
