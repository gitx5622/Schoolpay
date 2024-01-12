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
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { getCurrentPathName } from "@/helpers/routing";
import axios from "axios";
import { usePathname } from "next/navigation";

const ViewModalComponent = ({
  title,
  modalBody,
  onSumbit,
  pageId,
  url,
  page,
}) => {
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
      handleOpen(backdrop);
      try {
        setLoading(true);
        const response = await axios.get(
          page === "user" ? `${url}` : `${url}/${pageId}`
        );
        console.log(response);
        setData(response.data.data);
      } catch (error) {
        console.log("Login failed", error.message);
      } finally {
        setLoading(false);
      }
    },
    [pageId, url, page]
  );

  const editComponentId = useCallback(
    async (backdrop) => {
      //   let pagepathname;
      //   const path = getCurrentPathName(pathname);
      handleOpen(backdrop);
      try {
        setLoading(true);
        const response = await axios.put(`${url}/${pageId}`);
        console.log(response);
        setData(response.data.data);
      } catch (error) {
        console.log("Login failed", error.message);
      } finally {
        setLoading(false);
      }
    },
    [pageId]
  );

  const schoolViewModal = () => {
    return (
      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>FIELDS</TableColumn>
          <TableColumn>DETAILS</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow key="1">
            <TableCell>Name of the School</TableCell>
            <TableCell>{data.name}</TableCell>
          </TableRow>
          <TableRow key="2">
            <TableCell>Account Number</TableCell>
            <TableCell>{data.account_no}</TableCell>
          </TableRow>
          <TableRow key="3">
            <TableCell>Email</TableCell>
            <TableCell>{data.email}</TableCell>
          </TableRow>
          <TableRow key="4">
            <TableCell>Location</TableCell>
            <TableCell>{data.location}</TableCell>
          </TableRow>
          <TableRow key="5">
            <TableCell>Created At</TableCell>
            <TableCell>{data.createdAt}</TableCell>
          </TableRow>
          <TableRow key="6">
            <TableCell>Updated At</TableCell>
            <TableCell>{data.updatedAt}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
  };

  const userViewModal = () => {
    return (
      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>FIELDS</TableColumn>
          <TableColumn>DETAILS</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow key="1">
            <TableCell>Username</TableCell>
            <TableCell>{data.username}</TableCell>
          </TableRow>
          <TableRow key="2">
            <TableCell>Email</TableCell>
            <TableCell>{data.email}</TableCell>
          </TableRow>
          <TableRow key="5">
            <TableCell>Created At</TableCell>
            <TableCell>{data.createdAt}</TableCell>
          </TableRow>
          <TableRow key="6">
            <TableCell>Updated At</TableCell>
            <TableCell>{data.updatedAt}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
  };

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
      <Modal backdrop={backdrop} isOpen={isOpen} onClose={onClose} size="xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
              <ModalBody>
                {page === "school"
                  ? schoolViewModal()
                  : page === "user"
                  ? userViewModal()
                  : null}
              </ModalBody>
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

export default ViewModalComponent;
