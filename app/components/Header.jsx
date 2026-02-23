"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const Header = () => {
  return (
    <section id="home"
      className="
        bg-[#F6F5F2]
        mx-auto
        min-h-screen
        flex flex-col
        justify-center
        items-center
        gap-6
        px-4
        sm:px-6
        lg:px-8
        text-center
      "
    >
      {/* Top Section */}
      <div
        className="
          flex flex-col
          md:flex-row
          items-center
          justify-center
          gap-6
          md:gap-10
        "
      >
        {/* Avatar */}
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 1.2,
            type: "spring",
            stiffness: 60,
            damping: 12,
          }}
        >
          <Image
            src="/images/author.png"
            alt="Author"
            width={128}
            height={128}
            priority
            className="
              rounded-full
             

            "
          />
        </motion.div>

        {/* Intro */}
        <div>
          <h3
            className="
              font-ovo
              flex items-center
              justify-center md:justify-start
              gap-2
              text-lg
              sm:text-xl
              md:text-2xl
              mb-3
            "
          >
            Hi! I&apos;m Dinesh Thanigaivel
            <Image
              src="/images/hand-icon.png"
              alt="Waving hand"
              width={24}
              height={24}
              className="w-5 h-5 sm:w-6 sm:h-6"
            />
          </h3>

          <div
            className="
              flex
              justify-center md:justify-start
              gap-3
              sm:gap-4
            "
          >
            <Image src="/images/mongo.png" alt="MongoDB" width={48} height={48} className="w-8 sm:w-10 md:w-12" />
            <Image src="/images/express.png" alt="Express" width={48} height={48} className="w-8 sm:w-10 md:w-12" />
            <Image src="/images/react.png" alt="React" width={48} height={48} className="w-8 sm:w-10 md:w-12" />
            <Image src="/images/node.png" alt="Node" width={48} height={48} className="w-8 sm:w-10 md:w-12" />
          </div>
        </div>
      </div>

      {/* Heading */}
      <h1
        className="
          font-ovo
          tracking-tight
          text-2xl
          sm:text-4xl
          md:text-5xl
          lg:text-[60px]
          leading-tight
        "
      >
        <span className="text-[#47A248]">M</span>
        <span className="text-[#374151]">E</span>
        <span className="text-[#61DAFB]">R</span>
        <span className="text-[#3C873A] mr-2">N</span>
        <span className="text-gray-700 font-medium">
          Stack Developer Based in India
        </span>
      </h1>

      {/* Description */}
      <p
        className="
          max-w-xl
          sm:max-w-2xl
          font-ovo
          text-gray-700
          text-sm
          sm:text-base
          md:text-lg
        "
      >
        I am a MERN Full Stack Developer based in Vellore, India with 1.5+ years
        of experience building scalable web solutions.
      </p>

      {/* CTA Buttons */}
      <div
        className="
          flex flex-col
          sm:flex-row
          items-center
          gap-4
          mt-4
        "
      >
        <a
          href="#contact"
          className="
            px-8 sm:px-10
            py-3
            border border-black
            rounded-full
            flex items-center gap-2
            hover:bg-black hover:text-white
            transition
          "
        >
          Contact Me
          <Image
            src="/images/right-arrow-white.png"
            alt="Contact"
            width={16}
            height={16}
          />
        </a>

        <a
          href="/images/Dinesh_T.pdf"
          className="
            px-8 sm:px-10
            py-3
            border border-gray-500
            rounded-full
            flex items-center gap-2
            hover:bg-gray-200
            transition
          "
        >
          My Resume
          <Image
            src="/images/download-icon.png"
            alt="Download resume"
            width={16}
            height={16}
          />
        </a>
      </div>
    </section>
  );
};

export default Header;