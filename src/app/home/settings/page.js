"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Avatar,
  Divider,
} from "@nextui-org/react";
import axios from "axios";

const Settings = () => {
  const [data, setData] = useState("nothing");

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    setData(res.data.data);
    console.log(res);
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <div className="flex gap-3 p-3">
      <div className="flex-grow">
        <Card className="max-w-[100%]">
          <CardBody>
            <div className="flex justify-center pt-5">
              <Avatar
                isBordered
                color="success"
                src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
                className="w-60 h-60 text-large"
              />
            </div>
            <div className="flex justify-center pt-3">
              <div className="text-center">
                <p className="text-md">{data.username}</p>
                <p className="text-small text-default-500">Frontend Engineer</p>
                <p className="text-small text-success text-default-300">
                  Online
                </p>
                <div className="flex space-x-4 pt-3">
                  <Button color="primary">Message</Button>
                  <Divider orientation="vertical" />
                  <Button color="primary">Follow</Button>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
      <div className="flex-grow">
        <Card className="py-4">
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <h4 className="font-bold text-large">My Profile</h4>
          </CardHeader>
          <CardBody className="overflow-visible py-2">
            <table>
              <tr>
                <th>#</th>
                <th>Details</th>
              </tr>
              <tr>
                <td>ID</td>
                <td>2</td>
              </tr>
              <tr>
                <td>Full Name</td>
                <td>George Gitau</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>{data.email}</td>
              </tr>
              <tr>
                <td>Description</td>
                <td>Frontend Engineer</td>
              </tr>
              <tr>
                <td>Date Joined</td>
                <td>5/2/2023</td>
              </tr>
              <tr>
                <td>Role</td>
                <td>Admin</td>
              </tr>
              <tr>
                <td>Phone</td>
                <td>07463000000</td>
              </tr>
            </table>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
