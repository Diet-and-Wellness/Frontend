import EmptyIcon from "../icons/Empty";
import { motion } from "framer-motion";

const EmptyComp = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="mx-auto flex w-full max-w-sm flex-col items-center px-5 py-10 text-center sm:max-w-md sm:py-14 lg:max-w-lg lg:py-16"
    >
      <EmptyIcon className="h-auto w-48 max-w-full sm:w-64 md:w-72 lg:w-80" />
      <h4 className="type-card-title mt-5 text-center font-bold sm:mt-7.5">{title}</h4>
      <p className="type-body mt-2.5 max-w-md text-center text-content-muted">
        {description}
      </p>
    </motion.div>
  );
};

export default EmptyComp;
