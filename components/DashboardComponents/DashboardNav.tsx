"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { CgMenuRight } from "react-icons/cg";
import { IoIosArrowDown } from "react-icons/io";
import { AnimatePresence } from "framer-motion";

import JobDropdown from "./JobDropdown";
import BackgroundTransparent from "../BackgroundTransparent/BackgroundTransparent";
import MaterialDropdown from "./MaterialDropdown";

const DashboardNav = () => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [openSideBar, setOpenSideBar] = useState(false);
  const [openJobDropdown, setOpenJobDropdown] = useState(false);
  const [openMaterialDropdown, setOpenMaterialDropdown] = useState(false);

  const toggle = () => {
    setOpenSideBar((prev) => !prev);
  };

  const handleJobDropDown = () => {
    setOpenJobDropdown((prev) => !prev);
    // setOpenServiceDropdown(false);
    setOpenMaterialDropdown(false);
    // setOpenProfile(false);
    // setOpenNotification(false);
  };

  const handleMaterialDropDown = () => {
    setOpenJobDropdown(false);
    // setOpenServiceDropdown(false);
    // setOpenProfile(false);
    // setOpenNotification(false);
    setOpenMaterialDropdown((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenJobDropdown(false);
        // setOpenServiceDropdown(false);
        // setOpenProfile(false);
        setOpenMaterialDropdown(false);
        // setOpenNotification(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {openJobDropdown && <BackgroundTransparent />}
        {openMaterialDropdown && <BackgroundTransparent />}
      </AnimatePresence>

      <header
        className="padding-x  lg:py-8 fixed w-full bg-white backdrop-blur z-20 "
        ref={dropdownRef}
      >
        <div className="flex-c-b w-full max-lg:py-4">
          <Link href="/dashboard/job">
            <Image
              src="/assets/images/Logo.svg"
              alt="logo"
              width={130}
              height={30}
              className="object-contain w-auto h-auto max-sm:w-28"
              priority
            />
          </Link>
          <nav className="xl:block hidden">
            <div className="flex-c text-gray-900">
              <div className="relative">
                <button
                  className="flex-c gap-2 font-medium px-5 sm:py-2 py-1 home-nav max-sm:text-sm"
                  onClick={handleJobDropDown}
                >
                  Jobs
                  <span className="w-6 h-6 pt-1">
                    <IoIosArrowDown />
                  </span>
                </button>
                <AnimatePresence>
                  {openJobDropdown && (
                    <JobDropdown handleJobDropDown={handleJobDropDown} />
                  )}
                </AnimatePresence>
              </div>
              <div>
                <button className="flex-c gap-2 font-medium px-5 sm:py-2 py-1 home-nav max-sm:text-sm">
                  Services
                  <span className="w-6 h-6 pt-1">
                    <IoIosArrowDown />
                  </span>
                </button>
              </div>
              <div>
                <Link
                  href="/dashboard/project/active"
                  className="font-medium px-5 sm:py-2 py-1 home-nav max-sm:text-sm"
                >
                  Projects
                </Link>
              </div>
              <div>
                <Link
                  href="/expert/private-expert"
                  className="font-medium px-5 sm:py-2 py-1 home-nav max-sm:text-sm"
                >
                  Private Experts
                </Link>
              </div>
              <div className="relative">
                <button
                  className="flex-c gap-2 font-medium px-5 sm:py-2 py-1 home-nav max-sm:text-sm"
                  onClick={handleMaterialDropDown}
                >
                  Material
                  <span className="w-6 h-6 pt-1">
                    <IoIosArrowDown />
                  </span>
                </button>
                <AnimatePresence>
                  {openMaterialDropdown && (
                    <MaterialDropdown
                      handleMaterialDropDown={handleMaterialDropDown}
                    />
                  )}
                </AnimatePresence>
              </div>
              <div>
                <Link
                  href="/dashboard/job/direct-contract"
                  className="font-medium px-5 sm:py-2 py-1 home-nav max-sm:text-sm"
                >
                  Direct Contract
                </Link>
              </div>
            </div>
          </nav>
          <div className="flex-c gap-5">
            <button className="xl:hidden block text-xl" onClick={toggle}>
              <CgMenuRight />
            </button>
            <div className="flex-c gap-6">
              <ul className="gap-6 xl:flex items-center hidden">
                <li>
                  <Link href="/dashboard/messages">
                    <Image
                      src="/assets/icons/sms.svg"
                      alt="menu"
                      width={24}
                      height={24}
                      className="object-contain w-6 h-6"
                    />
                  </Link>
                </li>
                <li>
                  <Image
                    src="/assets/icons/notification.svg"
                    alt="menu"
                    width={24}
                    height={24}
                    className="object-contain w-6 h-6 cursor-pointer"
                  />
                </li>
                <li>
                  <Link href="/dashboard/cart">
                    <Image
                      src="/assets/icons/shopping-cart.svg"
                      alt="menu"
                      width={24}
                      height={24}
                      className="object-contain w-6 h-6"
                    />
                  </Link>
                </li>
              </ul>
              <div className="flex w-8 h-8 bg-slate-600 rounded-full flex-c justify-center text-white uppercase relative cursor-pointer">
                TW
              </div>
            </div>
          </div>

          {/* <AnimatePresence>
          {openSideBar && <Sidebar toggle={toggle} />}
        </AnimatePresence> */}
        </div>
      </header>
    </>
  );
};

export default DashboardNav;
