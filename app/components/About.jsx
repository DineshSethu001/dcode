"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { infoList } from "@/app/data/infoList";
import { toolsData } from "@/app/data/toolsData";

const About = () => {
  return (
    <section
      id="about"
      className="bg-[var(--secondary-color)] w-full px-[12%] py-10 scroll-mt-20"
    >
      <h4 className="text-center mb-2 font-ovo text-lg">Introduction</h4>
      <h2 className="text-4xl text-center">About me</h2>

      <div className="flex flex-col items-center lg:flex-row my-5 gap-20">
        {/* Profile Image */}
        <div className="w-64 sm:w-80">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 4, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <Image
              src="/images/author.png"
              alt="Author"
              width={320}
              height={320}
              className="w-full rounded-2xl"
            />
          </motion.div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <p className="mb-6 max-w-2xl font-ovo">
            I am an experienced Frontend Developer. Throughout my career, I have
            had the privilege of collaborating with prestigious organizations,
            contributing to their success and growth.
          </p>

          <p className="mb-10 max-w-2xl font-semibold text-indigo-700 bg-indigo-100 inline-block px-4 py-2 rounded-lg">
I enjoy building clean UI, solving real problems, and helping startups launch faster.          </p>

          {/* Info Cards */}
          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl">
            {infoList.map(({ icon, title, description }, index) => (
              <li
                key={index}
                className="border border-gray-400 p-6 rounded-xl cursor-pointer
                           hover:-translate-y-1 duration-500 hover:shadow-lg"
              >
                <Image
                  src={icon}
                  alt={title}
                  width={28}
                  height={28}
                  className="mt-3"
                />
                <h3 className="my-5 font-semibold text-gray-700">{title}</h3>
                <p className="text-gray-600 text-sm">{description}</p>
              </li>
            ))}
          </ul>

          {/* Tools */}
          <h4 className="my-6 text-gray-700 font-ovo">
            Tools I&apos;m using
          </h4>

          <ul className="flex items-center gap-3 sm:gap-5">
            {toolsData.map((tool, index) => (
              <li
                key={index}
                className="flex items-center justify-center w-12 sm:w-14
                           rounded-lg cursor-pointer hover:-translate-y-1
                           duration-500 aspect-square border border-gray-400"
              >
                <Image
                  src={tool}
                  alt="Tool"
                  width={28}
                  height={28}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default About;