"use client";

import React, { useEffect, useState } from "react";
import TableComponent from "@/components/table";
import { statusOptions, userColumns } from "@/helpers/data";
import axios from "axios";
import { Chip, User } from "@nextui-org/react";
import ViewModalComponent from "@/components/modal/viewModal";

const INITIAL_VISIBLE_COLUMNS = ["email", "username", "createdAt", "actions"];

const Users = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [page, setPage] = React.useState(1);
  const [filterValue, setFilterValue] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...data];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user?.username.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredUsers = filteredUsers.filter((user) =>
        Array.from(statusFilter).includes(user.status)
      );
    }

    return filteredUsers;
  }, [data, filterValue, statusFilter, hasSearchFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const getUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/users");
      console.log(response.data.data);
      setData(response.data.data);
    } catch (error) {
      console.log("Login failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "lg", src: user.avatar }}
            description={user.email}
            name={cellValue}
          >
            {user.email}
          </User>
        );
      case "username":
        <User
          avatarProps={{ radius: "lg", src: user.avatar }}
          description={user.username}
          name={cellValue}
        >
          {user.username}
        </User>;
      case "account_no":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{cellValue}</p>
            <p className="text-bold text-tiny capitalize text-default-400">
              {user.account_no}
            </p>
          </div>
        );
      case "createdAt":
      case "updatedAt":
        const dateObject = new Date(cellValue);
        const formattedDate = dateObject.toLocaleString();
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{formattedDate}</p>
          </div>
        );
      case "status":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[user.status]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="flex justify-center items-center gap-4">
            <ViewModalComponent
              title="User Details"
              page="user"
              url={"/api/users/me"}
              // onSumbit={onSumbit}
              // loading={loading}
            />
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <div>
      <TableComponent
        users={data}
        statusOptions={statusOptions}
        columns={userColumns}
        loading={loading}
        visibleColumns={visibleColumns}
        setVisibleColumns={setVisibleColumns}
        pages={pages}
        page={page}
        items={items}
        setPage={setPage}
        setFilterValue={setFilterValue}
        setStatusFilter={setStatusFilter}
        setRowsPerPage={setRowsPerPage}
        filterValue={filterValue}
        hasSearchFilter={hasSearchFilter}
        filteredItems={filteredItems}
        emptyContent="No users found"
        searchPlaceholder="Search by username"
        renderCell={renderCell}
      />
    </div>
  );
};

export default Users;
