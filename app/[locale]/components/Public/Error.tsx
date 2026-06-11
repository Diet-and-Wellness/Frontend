const Error = ({ msg }: { msg?: string }) => {
  return <p className="text-red-500 text-sm">{msg}</p>;
};

export default Error;
