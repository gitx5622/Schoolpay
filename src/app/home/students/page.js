"use client";

import React, { useEffect, useState, useCallback } from "react";
import TableComponent from "@/components/table";
import { statusOptions, studentcolumns } from "@/helpers/data";
import { Input, User, Chip } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import axios from "axios";
import CreateModalComponent from "@/components/modal/createModal";
import ViewModalComponent from "@/components/modal/viewModal";
import { errorNotification } from "@/components/ notification";

const INITIAL_VISIBLE_COLUMNS = [
  "name",
  "admission_no",
  "email",
  "school",
  "location",
  "createdAt",
  "actions",
];

const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

const Students = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [studentData, setStudentData] = useState([]);
  const [schoolData, setSchoolData] = useState([]);
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [credentials, setCredentials] = useState({
    name: "",
    admission_no: "",
    email: "",
    school: {},
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
    let filteredUsers = [...studentData];

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
  }, [studentData, filterValue, statusFilter, hasSearchFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const createStudent = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/students", credentials);
      setStudentData(response.data.data);
      successNotification("Student created successfully");
    } catch (error) {
      errorNotification("Unable to create student");
    } finally {
      setLoading(false);
    }
  };

  const getStudents = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/students");
      setStudentData(response.data.data);
      successNotification("Students fetched successfully");
    } catch (error) {
      errorNotification("Unable to fetch students", error.message);
    } finally {
      setLoading(false);
    }
  };

  const getStudent = async (studentId) => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/student/${studentId}`);
      setData(response.data.data);
      successNotification("Student fetched successfully");
    } catch (error) {
      errorNotification("Unable to fetch student");
    } finally {
      setLoading(false);
    }
  };

  const getSchools = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/schools");
      setSchoolData(response.data.data);
    } catch (error) {
      errorNotification("Unable to fetch schools");
    } finally {
      setLoading(false);
    }
  };

  const handleData = React.useCallback(() => {
    getStudents();
  }, []);

  useEffect(() => {
    getSchools();
    handleData();
  }, []);

  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "lg", src: user.avatar }}
            description={user.name}
            name={cellValue}
          >
            {user.name}
          </User>
        );
      case "email":
        <User
          avatarProps={{ radius: "lg", src: user.avatar }}
          description={user.email}
          name={cellValue}
        >
          {user.email}
        </User>;
      case "admission_no":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{cellValue}</p>
            <p className="text-bold text-tiny capitalize text-default-400">
              {user.admission_no}
            </p>
          </div>
        );
      case "school":
        return (
          <div className="flex flex-col">
            <p className="flex justify-center text-bold text-small capitalize">
              {user?.school?.name || "-"}
            </p>
            <p className="text-bold text-tiny capitalize text-default-400">
              {user?.school?.location || "-"}
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
          <div className="relative flex justify-end items-center gap-2">
            <ViewModalComponent
              title="Student Details"
              page="student"
              pageId={user._id}
              url={"/api/student"}
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
      <CreateModalComponent
        title="Add Student"
        action="Create"
        isButton={true}
        onSumbit={createStudent}
        modalBody={
          <>
            <div>
              <h3 className="pb-2">Name of the Student</h3>
              <div className="md:flex-nowrap gap-4">
                <Input
                  type="text"
                  name="name"
                  label="Name of the Student"
                  variant="bordered"
                  value={credentials.name}
                  onChange={handleChange}
                />
              </div>
              <div className="pt-2 pb-2">
                <h3 className="pb-2">Enter Admission Number</h3>
                <Input
                  name="admission_no"
                  placeholder="Enter Admission Number"
                  variant="bordered"
                  value={credentials.admission_no}
                  onChange={handleChange}
                />
              </div>
              <div className="pt-2 pb-2">
                <h3 className="pb-2">School</h3>
                <Select
                  name="school"
                  items={schoolData}
                  placeholder="Select an school"
                  fullWidth={true}
                  variant="bordered"
                  value={credentials.school}
                  onChange={handleChange}
                >
                  {(school) => (
                    <SelectItem key={school._id}>{school.name}</SelectItem>
                  )}
                </Select>
              </div>
              <div className="pt-2 pb-2">
                <h3 className="pb-2">Enter Email</h3>
                <Input
                  type="email"
                  name="email"
                  placeholder="Enter Email of the school"
                  variant="bordered"
                  value={credentials.email}
                  onChange={handleChange}
                />
              </div>
              <div className="pt-2 pb-2">
                <h3 className="pb-2">Enter Location</h3>
                <Input
                  type="text"
                  name="location"
                  placeholder="Enterlocation"
                  variant="bordered"
                  value={credentials.location}
                  onChange={handleChange}
                />
              </div>
            </div>
          </>
        }
      />
      <TableComponent
        users={studentData}
        statusOptions={statusOptions}
        columns={studentcolumns}
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
        emptyContent="No students found"
        searchPlaceholder="Search by name"
        renderCell={renderCell}
      />
    </div>
  );
};

export default Students;
