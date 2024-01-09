"use client";

import React, { useEffect, useState } from "react";
import TableComponent from "@/components/table";
import { statusOptions, userColumns } from "@/helpers/data";
import axios from "axios";

const INITIAL_VISIBLE_COLUMNS = ["email", "username", "actions"];

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
        user?.name.toLowerCase().includes(filterValue.toLowerCase())
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
      />
    </div>
  );
};

export default Users;
