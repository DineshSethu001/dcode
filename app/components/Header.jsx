"use client";

import React from "react";
import { motion } from "framer-motion";
import assets from "../assets";
import Image from "next/image";
const Header = () => {
  return (
    <div className="bg-[#F6F5F2] text-center mx-auto x-w-3xl h-screen flex flex-col justify-center gap-4 items-center ">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
   <motion.div
  initial={{ scale: 0 }}
  whileInView={{ scale: 1 }}
  transition={{
    duration: 3,          // VERY slow
    type: "spring",
    stiffness: 40,        // softer spring
    damping: 20           // prevents bounce
  }}
>



          <Image
            src={assets.author}
            className="w-32 rounded-[100%]"
            alt="Author"
          />
        </motion.div>

        <div>
          <h3 className="font-ovo flex items-center gap-2 text-xl md:text-2xl mb-3">
            Hi! . . . I&apos;m Dinesh Thanigaivel
            <Image src={assets.hand_icon} alt="Waving hand" className="w-6 items-center" />
          </h3>

          <div className="flex justify-center gap-4">
            <Image
              src={assets.mongo}
              alt="MongoDB"
              className="w-12 h-12 cursor-pointer animate-bounce [animation-delay:0ms]"
            />
            <Image
              src={assets.express}
              alt="Express"
              className="w-12 h-12  cursor-pointer animate-bounce [animation-delay:150ms]"
            />
            <Image
              src={assets.react}
              alt="React"
              className="w-12 h-12  cursor-pointer animate-bounce [animation-delay:300ms]"
            />
            <Image
              src={assets.node}
              alt="Node"
              className="w-12 h-12  cursor-pointer animate-bounce [animation-delay:450ms]"
            />
          </div>
        </div>
      </div>

      <h1 className="text-3xl sm:text-6xl lg:text-[66px] font-ovo tracking-tight">
        <span className="text-[#47A248] mr-1">M</span>
        <span className="text-[#374151] mr-1">E</span>
        <span className="text-[#61DAFB] mr-1">R</span>
        <span className="text-[#3C873A] mr-2">N</span>
        <span className="text-gray-700 font-medium ml-2">
          Stack Developer Based in India
        </span>
      </h1>

      <p className="max-w-2xl mx-auto font-ovo">
        I am a <span className="text-[#47A248] mr-1">M</span>
        <span className="text-[#374151] mr-1">E</span>
        <span className="text-[#61DAFB] mr-1">R</span>
        <span className="text-[#3C873A] mr-2">N</span> Full Stack Developer
        based in Vellore, India, with 1.5+ years of professional experience
        specializing in modern, scalable web solutions.
      </p>

      <div className="flex flex-col items-center gap-4 sm:flex-row mt-4">
        <a
          href="#contact"
          className="px-10 py-3 border border-black-500 rounded-full flex gap-2 items-center"
        >
          Contact Me
          <Image src={assets.right_arrow_white} alt="Contact" className="w-4" />
        </a>
          <a
            href="/Dinesh_T.pdf"
            className="px-10 py-3 border border-gray-500 rounded-full flex gap-2 items-center"
          >
            My Resume
            <Image src={assets.download_icon} alt="Download resume" className="w-4" />
          </a>
      </div>
    </div>
  );
};

export default Header;