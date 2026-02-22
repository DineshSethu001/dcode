"use client";

import Image from "next/image.js";
import { assets, toolsData } from "../assets/index.js";
import { infoList } from "../assets/index.js";
import { motion } from "motion/react";

const About = () => {
  return (
    <div
      id="about"
      className="bg-[#F0EBE3] w-full px-[12%] py-10 scroll-mt-20"
    >
      <h4 className="text-center mb-2 font-ovo text-lg">Introduction</h4>
      <h2 className="text-4xl text-center">About me</h2>

      <div className="flex flex-col items-center lg:flex-row my-5 gap-20">
        <div className="w-64 sm:w-80 max-w-none">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 4,
              ease: "easeOut",
            }}
          >
            <Image
              src={assets.author}
              alt="Author"
              className="w-full rounded-4xl"
            />
          </motion.div>
        </div>

        <div className="flex-1">
          <p className="mb-6 max-w-2xl font-ovo">
            I am an experienced Frontend Developer. Throughout my career, I have
            had the privilege of collaborating with prestigious organizations,
            contributing to their success and growth.
          </p>

          {/* ✅ SERVICE LINE ADDED */}
          <p className="mb-10 max-w-2xl font-semibold text-indigo-700 bg-indigo-100 inline-block px-4 py-2 rounded-lg">
            I will build your SaaS frontend with React + Tailwind
          </p>

          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl">
            {infoList.map(({ icon, title, description }, index) => (
              <li
                className="hover:bg-[var(--color-lightHover)] border-[0.5px] border-gray-400 p-6 rounded-xl cursor-pointer hover:-translate-y-1 duration-500 hover:shadow-[var(--shadow-black)]"
                key={index}
              >
                <Image className="w-7 mt-3" src={icon} alt={title} />
                <h3 className="my-5 font-semibold text-gray-700">{title}</h3>
                <p className="text-gray-600 text-sm">{description}</p>
              </li>
            ))}
          </ul>

          <h4 className="my-6 text-gray-700 font-ovo">
            Tools I&apos;m using
          </h4>

          <ul className="flex items-center gap-3 sm:gap-5">
            {toolsData.map((tool, index) => (
              <li
                className="flex items-center justify-center w-12 sm:w-14 rounded-lg cursor-pointer hover:-translate-y-1 duration-500 aspect-square border border-gray-400"
                key={index}
              >
                <Image src={tool} alt="tool" className="w-5 sm:w-7" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;