"use client";

import React, { useEffect, useState } from "react";
import TableComponent from "@/components/table";
import { statusOptions, users, schoolcolumns } from "@/helpers/data";
import { Input } from "@nextui-org/react";
import axios from "axios";
import ModalComponent from "@/components/modal";

const INITIAL_VISIBLE_COLUMNS = [
  "name",
  "account_no",
  "email",
  "location",
  "createdAt",
  "actions",
];

const Schools = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [credentials, setCredentials] = useState({
    name: "",
    account_no: "",
    email: "",
    location: "",
  });
  const [page, setPage] = React.useState(1);
  const [filterValue, setFilterValue] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const hasSearchFilter = Boolean(filterValue);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

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

  const createSchool = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/schools", credentials);
      console.log(response);
    } catch (error) {
      console.log("Login failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  const getSchools = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/schools");
      console.log(response.data.data);
      setData(response.data.data);
    } catch (error) {
      console.log("Login failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   getSchools();
  // }, []);

  return (
    <div>
      <ModalComponent
        title="Add School"
        onSumbit={createSchool}
        modalBody={
          <>
            <div className="pt-2">
              <h3 className="pb-3">Name of the School</h3>
              <div className="md:flex-nowrap gap-4">
                <Input
                  type="text"
                  name="name"
                  label="Name of the School"
                  variant="bordered"
                  value={credentials.name}
                  onChange={handleChange}
                />
              </div>
              <div className="pt-2 pb-2">
                <h3 className="pb-3">Enter Account Number</h3>
                <Input
                  name="account_no"
                  placeholder="Enter Account Number"
                  variant="bordered"
                  value={credentials.account_no}
                  onChange={handleChange}
                />
              </div>
              <div className="pt-2 pb-2">
                <h3 className="pb-3">Location</h3>
                <Input
                  name="location"
                  placeholder="Enter Location"
                  variant="bordered"
                  value={credentials.location}
                  onChange={handleChange}
                />
              </div>
              <div className="pt-2 pb-2">
                <h3 className="pb-3">Enter Email</h3>
                <Input
                  type="email"
                  name="email"
                  placeholder="Enter Email of the school"
                  variant="bordered"
                  value={credentials.email}
                  onChange={handleChange}
                />
              </div>
            </div>
          </>
        }
      />
      <TableComponent
        users={data}
        statusOptions={statusOptions}
        columns={schoolcolumns}
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
        emptyContent="No schools found"
        searchPlaceholder="Search by name"
      />
    </div>
  );
};

export default Schools;
