"use client";
import { useState, useEffect, useCallback } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  User,
  Divider,
} from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";
import { FiAlignJustify } from "react-icons/fi";
import axios from "axios";
import { capitalize } from "@/utils";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [data, setData] = useState("nothing");

  const logout = useCallback(async () => {
    try {
      await axios.get("/api/users/logout");
      router.push("/auth/login");
    } catch (error) {
      console.log(error.message);
    }
  }, [router]);

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    setData(res?.data.data);
    console.log(res);
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <>
      <Navbar shouldHideOnScroll>
        <NavbarBrand style={{ marginLeft: "-55px" }}>
          <FiAlignJustify style={{ fontSize: "26px", cursor: "pointer" }} />{" "}
          &nbsp; &nbsp;&nbsp;
          <h1>Showing Results for : &nbsp;</h1>
          <p className="font-bold text-inherit">
            {" "}
            {capitalize(pathname.slice(6))}
          </p>
        </NavbarBrand>
        <hr />
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link color="foreground" href="#">
              Dashboard
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link href="#" aria-current="page">
              Schools
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              Students
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem>
            <div className="flex items-center gap-4">
              <Dropdown placement="bottom-start">
                <DropdownTrigger>
                  <User
                    as="button"
                    avatarProps={{
                      isBordered: true,
                      src: "https://i.pravatar.cc/150?u=a04258a2462d826712d",
                    }}
                    className="transition-transform"
                    description={data.email}
                    name={data.username}
                  />
                </DropdownTrigger>
                <DropdownMenu aria-label="User Actions" variant="flat">
                  <DropdownItem key="profile" className="h-14 gap-2">
                    <p className="font-bold">Signed in as</p>
                    <p className="font-bold">{data.username}</p>
                  </DropdownItem>
                  <DropdownItem key="settings">My Settings</DropdownItem>
                  <DropdownItem key="team_settings">Team Settings</DropdownItem>
                  <DropdownItem key="analytics">Analytics</DropdownItem>
                  <DropdownItem key="system">System</DropdownItem>
                  <DropdownItem key="configurations">
                    Configurations
                  </DropdownItem>
                  <DropdownItem key="help_and_feedback">
                    Help & Feedback
                  </DropdownItem>
                  <DropdownItem key="logout" color="danger" onClick={logout}>
                    Log Out
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      <Divider />
    </>
  );
};

export default Header;
