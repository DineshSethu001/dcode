import React from "react";
import { ExternalLink } from "lucide-react";
import { useState } from "react";

const ProjectCard = ({ project }) => {
  const [expanded, setExpanded] = useState(false);

  return (
<div className="relative flex flex-col bg-white h-[50%] rounded-2xl shadow-xl max-w-lg w-full overflow-hidden">


  {/* Image */}
  <img
    src={project.image}
    alt={project.title}
    className="w-full h-56 object-cover"
  />

  {/* Card Content */}
  <div className="p-5">
    <h3 className="text-2xl font-semibold text-[#2e2e2e]">
      {project.title}
    </h3>

       <p className={`text-gray-600 text-sm mt-2 leading-relaxed 
                  ${expanded ? "" : "line-clamp-2"}`}>
      {project.description}
    </p>

    <button
      onClick={() => setExpanded(!expanded)}
      className="text-blue-600 text-sm mt-1 underline"
    >
      {expanded ? "Read Less" : "Read More"}
    </button>
    {/* Tech Stack */}
    <div className="flex flex-wrap gap-2 mt-4">
      {project.tech.map((t, index) => (
        <span
          key={index}
          className="bg-gray-100 border border-gray-300 text-gray-700 px-2 py-1 rounded-full text-xs font-medium"
        >
          {t.name ? (
            <span className="flex items-center gap-1">
              <t.icon className={`${t.color} text-sm`} /> {t.name}
            </span>
          ) : (
            ""
          )}
        </span>
      ))}
    </div>

    {/* Source Code Button */}
    {project.code && (
      <a
        href={project.code}
        target="_blank"
        rel="noreferrer"
        className="mt-4 inline-block bg-[#24292f] text-white px-4 py-2 rounded-md text-sm 
                   transition hover:bg-[#1b1f23]"
      >
        Source Code
      </a>
    )}
  </div>

  {/* Live Demo Button */}
  {project.demo && (
    <a
      href={project.demo}
      target="_blank"
      rel="noreferrer"
      className="absolute bottom-4 right-4 bg-gradient-to-r from-[#00c7b7] to-[#00aaff] 
                 text-white px-4 py-2 rounded-md text-sm flex items-center gap-1
                 shadow-md transition hover:opacity-90"
    >
      Live Demo <ExternalLink className="h-4 w-4" />
    </a>
  )}
</div>

  );
};

export default ProjectCard;
