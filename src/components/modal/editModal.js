"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Tooltip } from "@nextui-org/react";
import { EditIcon } from "@/icons/EditIcon";
import { DeleteIcon } from "@/icons/DeleteIcon";
import { EyeIcon } from "@/icons/ViewIcon";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { getCurrentPathName } from "@/helpers/routing";
import axios from "axios";
import { usePathname } from "next/navigation";

const EditModalComponent = ({ title, modalBody, onSumbit, pageId, url }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [backdrop, setBackdrop] = useState("blur");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const pathname = usePathname();

  const handleOpen = (backdrop) => {
    setBackdrop(backdrop);
    onOpen();
  };

  const handleOnSubmit = () => {
    onSumbit();
    onClose();
  };

  const getComponentId = useCallback(
    async (backdrop) => {
      //   let pagepathname;
      //   const path = getCurrentPathName(pathname);
      //   if (pathname === "school") {
      //     pagepathname === "school";
      //   } else if (pathname === "user") {
      //     pagepathname === "user";
      //   }
      handleOpen(backdrop);
      try {
        setLoading(true);
        const response = await axios.get(`${url}/${pageId}`);
        console.log(response);
        setData(response.data.data);
      } catch (error) {
        console.log("Login failed", error.message);
      } finally {
        setLoading(false);
      }
    },
    [pageId, url, handleOpen]
  );

  return (
    <div className="relative flex items-center gap-4">
      <Tooltip content="Details">
        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
          <EyeIcon onClick={() => getComponentId("blur")} />
        </span>
      </Tooltip>
      <Tooltip content="Edit user">
        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
          <EditIcon />
        </span>
      </Tooltip>
      <Tooltip color="danger" content="Delete user">
        <span className="text-lg text-danger cursor-pointer active:opacity-50">
          <DeleteIcon />
        </span>
      </Tooltip>
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
    </div>
  );
};

export default EditModalComponent;
