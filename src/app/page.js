"use client";
import React, { useRef, useState } from "react";
import "./globals.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
} from "@nextui-org/react";
import { AcmeLogo } from "../components/icons/AcmeLogo";
import { ChevronDown, Scale, Activity } from "../components/icons/Icons";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Features from "@/components/features";
import Mobile from "../assets/mobile.png";
import Stats from "../assets/stats.png";
import Manage from "../assets/management.png";
import Secure from "../assets/secure.png";
import School from "../assets/school.png";
import Student from "../assets/student.png";
import Bank from "../assets/bank.png";
import HowItWorks from "@/components/howItWorks";
import { schoolHomeData } from "@/helpers/data";

export default function App() {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };

  const icons = {
    chevron: <ChevronDown fill="currentColor" size={16} />,
    scale: <Scale className="text-warning" fill="currentColor" size={30} />,
    activity: (
      <Activity className="text-secondary" fill="currentColor" size={30} />
    ),
  };
  return (
    <>
      <Navbar isBordered>
        <NavbarBrand className="ml-[-9rem]">
          <AcmeLogo />
          <p className="font-bold text-[26px]">
            School<span className="text-[#871914]">Pay</span>
          </p>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-6" justify="center">
          <Dropdown>
            <NavbarItem>
              <DropdownTrigger>
                <Button
                  disableRipple
                  className="text-[15px] p-0 bg-transparent data-[hover=true]:bg-transparent"
                  endContent={icons.chevron}
                  radius="sm"
                  variant="light"
                >
                  Pay Fees
                </Button>
              </DropdownTrigger>
            </NavbarItem>
            <DropdownMenu
              aria-label="ACME features"
              className="w-[340px]"
              itemClasses={{
                base: "gap-4",
              }}
            >
              <DropdownItem
                key="autoscaling"
                description="ACME scales apps to meet user demand, automagically, based on load."
                startContent={icons.scale}
              >
                Pay School Fees
              </DropdownItem>
              <DropdownItem
                key="usage_metrics"
                description="Real-time metrics to debug issues. Slow query added? We’ll show you exactly where."
                startContent={icons.activity}
              >
                Pay Other Fees
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <NavbarItem>
            <Link color="foreground" href="#">
              Find Student
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              Schools and Channels
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              Contact
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end" className="mr-[-9rem]">
          <NavbarItem className="hidden lg:flex">
            <Link href="/auth/login">School Login</Link>
          </NavbarItem>
          <NavbarItem>
            <Button
              as={Link}
              color="primary"
              href="/auth/signup"
              variant="flat"
            >
              Sign Up
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="flex">
            <div>
              <img src="https://schoolpay.co.ke/web/img/site/sch_child.png" />
            </div>
            <div className="swiper-one text-[5rem] text-center leading-15">
              Simple, Secure <br />
              and <br />
              Convenient
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://schoolpay.co.ug/web/img/site/airtelug-final.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://schoolpay.co.ug/web/img/site/MTNug-final.jpg" />
        </SwiperSlide>
        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>
      <div>
        <h2 className="text-center text-[26px] font-bold pt-3">FEATURES</h2>
        <div className="grid grid-cols-2 gap-4 p-2">
          <div className="flex gap-4 p-5 pt-2">
            <div>
              <Features
                title="Mobile"
                content="Students or guardians are able to check all the student's transactions using a unique payment code"
                image={Mobile}
              />
            </div>
            <div>
              <Features
                title="School managed system"
                content="The schoolpay account provides a platform to view and manage the payments as they come through"
                image={Manage}
              />
            </div>
          </div>
          <div className="flex gap-4 p-5 pt-2">
            <div>
              <Features
                title="Secure"
                content="The school pay system provides very secure processes through out the nodes of each transaction."
                image={Secure}
              />
            </div>
            <div>
              <Features
                title="Reports"
                content="It provides a well designed report criteria for school administrators and payment channels."
                image={Stats}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#871914]">
        <h2 className="text-center text-[26px] font-bold pt-3 text-white">
          HOW IT WORKS
        </h2>
        <div className="grid grid-cols-3 gap-4 p-20 pt-5">
          <div>
            {" "}
            <HowItWorks
              title="School"
              content={schoolHomeData}
              image={School}
            />
          </div>
          <div>
            <HowItWorks
              title="Student"
              content={schoolHomeData}
              image={Student}
            />
          </div>
          <div>
            {" "}
            <HowItWorks
              title="Banks & Payment Channels"
              content={schoolHomeData}
              image={Bank}
            />
          </div>
        </div>
      </div>
    </>
  );
}
