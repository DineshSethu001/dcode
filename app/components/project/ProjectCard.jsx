"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { FaReact, FaNodeJs } from "react-icons/fa";
import {
  SiTailwindcss,
  SiStyledcomponents,
  SiTensorflow,
} from "react-icons/si";

/* ----------------------------------
   Tech Icon Mapping
----------------------------------- */
const techIcons = {
  React: FaReact,
  "Node.js": FaNodeJs,
  "Tailwind CSS": SiTailwindcss,
  "Styled Components": SiStyledcomponents,
  "TensorFlow.js": SiTensorflow,
};

/* ----------------------------------
   Animation Variants
----------------------------------- */
const cardVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const badgeContainer = {
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const badgeItem = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 300 },
  },
};

/* ----------------------------------
   Component
----------------------------------- */
const ProjectCard = ({ project }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      variants={cardVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      className="group relative flex flex-col bg-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden h-full"
    >
      {/* ---------------- Image ---------------- */}
      <motion.div
        whileHover={{ scale: 1.03 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="relative w-full h-48 sm:h-56 overflow-hidden bg-gray-100"
      >
        <Image
          src={
            typeof project.image === "string"
              ? project.image
              : project.image?.src
          }
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </motion.div>

      {/* ---------------- Content ---------------- */}
      <div className="flex flex-col flex-grow p-5">
        <h3 className="text-xl font-bold text-[#2e2e2e] mb-2 group-hover:text-[#6A9457] transition-colors">
          {project.title}
        </h3>

        <p
          className={`text-gray-600 text-sm leading-relaxed ${
            expanded ? "" : "line-clamp-3"
          }`}
        >
          {project.description}
        </p>

        {project.description?.length > 100 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-[#6A9457] text-sm mt-2 font-medium hover:underline self-start"
          >
            {expanded ? "Read Less" : "Read More"}
          </button>
        )}

        {/* ---------------- Tech Stack ---------------- */}
        <motion.div
          className="flex flex-wrap gap-2 mt-4 mb-4"
          variants={badgeContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {project.tech?.map((t, index) => {
            const Icon = t.icon || techIcons[t.name] || FaReact;
            const techName = t.name || t;
            const techColor = t.color || "text-blue-500";

            return (
              <motion.span
                key={index}
                variants={badgeItem}
                className="bg-gray-100 border border-gray-200 text-gray-700 px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 hover:bg-gray-200 transition-colors"
              >
                <Icon className={`${techColor} text-sm`} />
                {techName}
              </motion.span>
            );
          })}
        </motion.div>

        {/* ---------------- Actions ---------------- */}
        <div className="flex gap-3 mt-auto pt-2">
          {project.demo && (
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#00c7b7] to-[#00aaff]
                         text-white px-4 py-2.5 rounded-lg text-sm font-medium shadow-md"
            >
              <ExternalLink className="h-4 w-4" />
              Live Demo
            </motion.a>
          )}

          {project.code && (
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={project.code}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 bg-[#24292f] text-white px-4 py-2.5 rounded-lg text-sm font-medium shadow-md"
            >
              <Github className="h-4 w-4" />
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
