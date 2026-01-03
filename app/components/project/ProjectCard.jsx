import React from "react";
import { ExternalLink, Github } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { FaReact, FaNodeJs } from "react-icons/fa";
import { SiTailwindcss, SiStyledcomponents, SiTensorflow } from "react-icons/si";

const techIcons = {
  React: FaReact,
  "Node.js": FaNodeJs,
  "Tailwind CSS": SiTailwindcss,
  "Styled Components": SiStyledcomponents,
  "TensorFlow.js": SiTensorflow,
};

const ProjectCard = ({ project }) => {
  const [expanded, setExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative flex flex-col bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden h-full transform hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image */}
      <div className="relative w-full h-48 sm:h-56 overflow-hidden bg-gray-100">
        <Image
          src={typeof project.image === 'string' ? project.image : (project.image?.src || project.image)}
          alt={project.title}
          fill
          className={`object-cover transition-transform duration-300 ${
            isHovered ? "scale-110" : "scale-100"
          }`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Card Content */}
      <div className="flex flex-col flex-grow p-5">
        <h3 className="text-xl font-bold text-[#2e2e2e] mb-2 group-hover:text-[#6A9457] transition-colors">
          {project.title}
        </h3>

        <p
          className={`text-gray-600 text-sm leading-relaxed flex-grow ${
            expanded ? "" : "line-clamp-3"
          }`}
        >
          {project.description}
        </p>

        {project.description.length > 100 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-[#6A9457] text-sm mt-2 font-medium hover:underline self-start"
          >
            {expanded ? "Read Less" : "Read More"}
          </button>
        )}

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mt-4 mb-4">
          {project.tech?.map((t, index) => {
            // Handle both old format (with icon) and new format (name only)
            const Icon = t.icon || techIcons[t.name] || FaReact;
            const techName = t.name || t;
            const techColor = t.color || "text-blue-500";
            
            return (
              <span
                key={index}
                className="bg-gray-100 border border-gray-200 text-gray-700 px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 hover:bg-gray-200 transition-colors"
              >
                {techName && (
                  <>
                    <Icon className={`${techColor} text-sm`} />
                    {techName}
                  </>
                )}
              </span>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-auto pt-2">
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#00c7b7] to-[#00aaff] 
                         text-white px-4 py-2.5 rounded-lg text-sm font-medium
                         shadow-md transition-all hover:shadow-lg hover:opacity-90"
            >
              <ExternalLink className="h-4 w-4" />
              Live Demo
            </a>
          )}
          {project.code && (
            <a
              href={project.code}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 bg-[#24292f] text-white px-4 py-2.5 rounded-lg text-sm font-medium
                         transition-all hover:bg-[#1b1f23] shadow-md hover:shadow-lg"
            >
              <Github className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
