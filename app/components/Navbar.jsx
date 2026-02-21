"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { assets } from "../assets /assets"; // ✅ FIXED (removed space)
import { useAdmin } from "@/app/context/AdminContext";
import { LogIn, LayoutDashboard } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  const [isScroll, setIsScroll] = useState(false);
  const sideMenuRef = useRef(null);

  const { isAuthenticated, logout } = useAdmin();

  const openMenu = () => {
    if (sideMenuRef.current) {
      sideMenuRef.current.style.transform = "translateX(0)";
    }
  };

  const closeMenu = () => {
    if (sideMenuRef.current) {
      sideMenuRef.current.style.transform = "translateX(16rem)";
    }
  };

  useEffect(() => {
    const onScroll = () => {
      setIsScroll(window.scrollY > 50);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Background header image */}
      <div className="fixed top-0 right-0 w-11/12 -z-10 translate-y-[-80%]">
        <Image
          src={assets.header_bg_color}
          alt="background"
          width={1200}
          height={800}
          priority
        />
      </div>

      <nav
        className={`w-full fixed flex justify-between items-center px-5 lg:px-8 xl:px-[8%] py-4 z-50 
        transition-all duration-300 ease-in-out
        ${isScroll ? "bg-white/50 backdrop-blur-lg shadow-sm" : ""}`}
      >
        {/* Logo + Login */}
        <div className="flex items-center gap-4">
          <a href="#top">
            <Image
              src={assets.logo}
              alt="logo"
              width={120}
              height={40}
              className="w-28 cursor-pointer"
            />
          </a>

         <Link
  href="/admin/login"
  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#6A9457] text-white hover:bg-[#5b8b49] transition-colors text-sm font-medium shadow-md hover:shadow-lg"
>
  <LogIn className="w-4 h-4" />
  Login
</Link>
        </div>

        {/* Desktop menu */}
        <ul
          className={`hidden md:flex items-center gap-6 lg:gap-8 px-12 py-3 rounded-full
          ${isScroll ? "bg-white/50 backdrop-blur-lg shadow-sm" : "bg-opacity-5 shadow-sm"}`}
        >
          <li><a href="#top">Home</a></li>
          <li><a href="#about">About Me</a></li>
          <li><a href="#experience">Experience</a></li>
          <li><a href="#work">My Work</a></li>
          <li><a href="#contact">Contact Me</a></li>
        </ul>

        {/* Right section */}
        <div className="flex items-center">
          <a
            href="#contact"
            className="hidden lg:flex items-center gap-3 px-10 py-2.5 border border-gray-500 rounded-full ml-4"
          >
            Contact
            <Image
              src={assets.arrow_icon}
              alt="arrow"
              width={12}
              height={12}
              className="w-3"
            />
          </a>

          <button className="block md:hidden ml-3" onClick={openMenu}>
            <Image
              src={assets.menu_black}
              alt="menu"
              width={24}
              height={24}
              className="w-6"
            />
          </button>
        </div>

        {/* Mobile menu */}
        <div className="md:hidden">
          <ul
            ref={sideMenuRef}
            style={{ transform: "translateX(16rem)" }}
            className="flex flex-col items-center py-6 px-6 fixed right-0 top-0 bottom-0 w-64 h-screen z-50 gap-4 bg-rose-50 transition-transform duration-500"
          >
            <div
              className="absolute right-6 top-6 cursor-pointer"
              onClick={closeMenu}
            >
              <Image
                src={assets.close_black}
                alt="close"
                width={20}
                height={20}
                className="w-5"
              />
            </div>

            <li className="mb-6">
              <a
                href="#top"
                onClick={closeMenu}
                className="w-28 h-28 rounded-full overflow-hidden flex items-center justify-center border-2 border-gray-300"
              >
                <Image
                  src={assets.dcode}
                  alt="logo"
                  width={96}
                  height={96}
                  className="w-24 h-24 object-center"
                />
              </a>
            </li>

            <li><a onClick={closeMenu} href="#top">Home</a></li>
            <li><a onClick={closeMenu} href="#about">About Me</a></li>
            <li><a onClick={closeMenu} href="#services">Services</a></li>
            <li><a onClick={closeMenu} href="#work">My Work</a></li>
            <li><a onClick={closeMenu} href="#contact">Contact Me</a></li>

            <li className="mt-4">
              <Link
                href={isAuthenticated ? "/admin/dashboard" : "/admin/login"}
                onClick={closeMenu}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#6A9457] text-white hover:bg-[#5b8b49] transition-colors font-medium"
              >
                {isAuthenticated ? (
                  <>
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard
                  </>
                ) : (
                  <>
                    <LogIn className="w-4 h-4" />
                    Login
                  </>
                )}
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;