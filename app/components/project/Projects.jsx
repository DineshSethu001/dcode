"use client";
import React, { useState, useEffect } from "react";
import ProjectCard from "./ProjectCard.jsx";
import projectAsset from "./ProjectAsset.js";
import { FcIdea } from "react-icons/fc";

const Projects = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = projectAsset.slice(indexOfFirstItem, indexOfLastItem);

  const [selectedProject, setSelectedProject] = useState(currentItems[0]);

  useEffect(() => {
    setSelectedProject(currentItems[0]);
  }, [currentItems]);

  const totalPages = Math.ceil(projectAsset.length / itemsPerPage);
  const pages = [...Array(totalPages).keys()].map(n => n + 1);

  return (
    <section
      id="work"
      className="bg-[#F0EBE3] w-full px-[12%] py-10 scroll-mt-20 "
    >
      <h2 className="flex items-center justify-center gap-3 text-3xl font-Poppins mb-8 ">
        <FcIdea /> My Works
      </h2>

      <div className="flex flex-col lg:flex-row justify-center gap-8 lg:gap-12 items-center">
        
        {/* Project List */}
        <div className="space-y-3 w-full lg:w-60">
          {currentItems.map((project, index) => (
            <div
              key={index}
              className={`px-4 py-2 rounded-lg cursor-pointer transition
                ${
                  selectedProject?.title === project.title
                    ? "bg-[#6A9457] text-[#fffca7] shadow-md"
                    : "bg-[#4C763B] text-[#FFFD8F] hover:bg-[#5b8b49]"
                }`}
              onClick={() => setSelectedProject(project)}
            >
              <p className="border-l border-r border-yellow-200 px-2 text-md text-center lg:text-left">
                {project.title}
              </p>
            </div>
          ))}

          <div className="flex gap-2 mt-4 justify-center">
            {pages.map(num => (
              <button
                key={num}
                onClick={() => setCurrentPage(num)}
                className={`px-3 py-1 rounded-md border 
                  ${currentPage === num ? "bg-[#6A9457]" : "bg-[#4C763B]"}`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        {/* Project Card */}
        <div className="flex-1 flex justify-center items-start w-full">
          {selectedProject && (
            <div className="w-full max-w-xl">
              <ProjectCard project={selectedProject} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;
