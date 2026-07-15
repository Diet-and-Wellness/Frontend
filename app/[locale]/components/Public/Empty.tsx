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
      className="p-5 pb-12.5 place-self-center"
    >
      <EmptyIcon />
      <h4 className="text-center text-[25px] font-bold mt-7.5">{title}</h4>
      <p className="text-center text-[20px] text-[#4F4F4F] mt-2.5">
        {description}
      </p>
    </motion.div>
  );
};

export default EmptyComp;
