import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

export default function ModalComponent({
  title,
  modalBody,
  onSumbit,
  loading,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [backdrop, setBackdrop] = React.useState("blur");

  const backdrops = ["blur"];

  const handleOpen = (backdrop) => {
    setBackdrop(backdrop);
    onOpen();
  };

  const handleOnSubmit = () => {
    onSumbit();
    onClose();
  };

  return (
    <>
      <div className="flex flex-wrap gap-3 justify-end pr-4 pt-4">
        {backdrops.map((b) => (
          <Button
            key={b}
            variant="flat"
            color="primary"
            onPress={() => handleOpen(b)}
            className="capitalize"
            isLoading={loading}
          >
            Create
          </Button>
        ))}
      </div>
      <Modal backdrop={backdrop} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
              <ModalBody>{modalBody}</ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={handleOnSubmit}>
                  Submit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
