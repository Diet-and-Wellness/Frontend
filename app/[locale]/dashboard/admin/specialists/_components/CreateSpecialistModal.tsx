import CreateSpecialistForm from "./CreateSpecialistForm";
import ModalWrapper from "@/app/[locale]/components/Public/ModalWrapper";

const CreateSpecialistModal = ({ closeModal }: { closeModal: () => void }) => {
  return (
    <ModalWrapper>
      <CreateSpecialistForm closeModal={closeModal} />
    </ModalWrapper>
  );
};

export default CreateSpecialistModal;
