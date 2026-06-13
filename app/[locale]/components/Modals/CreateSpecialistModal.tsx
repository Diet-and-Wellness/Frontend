import CreateSpecialistForm from "../Forms/CreateSpecialistForm";
import ModalWrapper from "../Public/ModalWrapper";

const CreateSpecialistModal = ({ closeModal }: { closeModal: () => void }) => {
  return (
    <ModalWrapper>
      <CreateSpecialistForm closeModal={closeModal} />
    </ModalWrapper>
  );
};

export default CreateSpecialistModal;
