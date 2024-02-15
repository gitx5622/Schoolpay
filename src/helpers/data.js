import React from "react";

const userColumns = [
  { name: "ID", _id: "_id", sortable: true },
  { name: "USERNAME", _id: "username", sortable: true },
  { name: "EMAIL", _id: "email", sortable: true },
  { name: "IS ADMIN", _id: "isAdmin", sortable: true },
  { name: "IS VERIFIED", _id: "isVerified", sortable: true },
  { name: "CREATED AT", _id: "createdAt", sortable: true },
  { name: "UPDATED AT", _id: "updatedAt", sortable: true },
  { name: "ACTIONS", _id: "actions" },
];

const schoolcolumns = [
  { name: "ID", _id: "_id", sortable: true },
  { name: "NAME OF THE SCHOOL", _id: "name", sortable: true },
  { name: "ACCOUNT NO", _id: "account_no", sortable: true },
  { name: "LOCATION", _id: "location", sortable: true },
  { name: "EMAIL", _id: "email" },
  { name: "CREATED AT", _id: "createdAt", sortable: true },
  { name: "UPDATED AT", _id: "updatedAt", sortable: true },
  { name: "ACTIONS", _id: "actions" },
];

const studentcolumns = [
  { name: "ID", _id: "_id", sortable: true },
  { name: "NAME OF THE STUDENT", _id: "name", sortable: true },
  { name: "ADMISSION NO", _id: "admission_no", sortable: true },
  { name: "SCHOOL", _id: "school", sortable: true },
  { name: "EMAIL", _id: "email" },
  { name: "CREATED AT", _id: "createdAt", sortable: true },
  { name: "UPDATED AT", _id: "updatedAt", sortable: true },
  { name: "ACTIONS", _id: "actions" },
];

const statusOptions = [
  { name: "Active", uid: "active" },
  { name: "Paused", uid: "paused" },
  { name: "Vacation", uid: "vacation" },
];

const navList = [
  {
    id: 2,
    title: "Dashboard",
    path: "/home/dashboard",
    icon: <div className="icons8-tinder"></div>,
  },
  {
    id: 3,
    title: "Schools",
    path: "/home/schools",
    icon: <div className="icons8-home"></div>,
  },
  {
    id: 4,
    title: "Students",
    path: "/home/students",
    icon: <div className="icons8-user-male"></div>,
  },
  {
    id: 5,
    title: "Payments",
    path: "/home/schools",
    icon: <div className="icons8-briefcase"></div>,
  },
  {
    id: 6,
    title: "User Management",
    path: "/home/users",
    icon: <div className="icons8-myspace"></div>,
  },
  {
    id: 7,
    title: "Settings",
    path: "/home/settings",
    icon: <div className="icons8-services"></div>,
  },
];

const variants = ["flat", "bordered", "faded"];

const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

const INITIAL_VISIBLE_COLUMNS = ["name", "role", "status", "actions"];

const schoolHomeData = [
  {
    id: 2,
    title: "Comprehensive student information management system.",
  },
  {
    id: 3,
    title: "Realtime transaction view as payments are made",
  },
  {
    id: 4,
    title: "Powerful reporting and business intelligence module",
  },
  {
    id: 5,
    title: "Realtime reconciliation between students, banks and schools",
  },
  {
    id: 6,
    title:
      "No need to maintain multiple school collection accounts with payment providers",
  },
  {
    id: 7,
    title: "Central place to manage fees",
  },
  {
    id: 8,
    title: "No more need to issue bankslips!",
  },
];
export {
  userColumns,
  schoolcolumns,
  studentcolumns,
  navList,
  statusOptions,
  variants,
  statusColorMap,
  schoolHomeData,
  INITIAL_VISIBLE_COLUMNS,
};
