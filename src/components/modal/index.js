import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Chip,
} from "@nextui-org/react";

export default function ModalComponent({
  title,
  modalBody,
  onSumbit,
  loading,
  action,
  isButton,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [backdrop, setBackdrop] = React.useState("blur");

  // const backdrops = ["blur"];

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
        {isButton && (
          <Button
            variant="flat"
            color="primary"
            onPress={() => handleOpen("blur")}
            className="capitalize"
            isLoading={loading}
          >
            {action}
          </Button>
        )}
        {!isButton && (
          <Chip
            className="d-flex justify-start p-0"
            onClick={() => handleOpen("blur")}
            size="sm"
            variant="light"
          >
            {action}
          </Chip>
        )}
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
