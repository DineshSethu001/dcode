"use client";
import React, { useState, useEffect } from "react";
import ProjectCard from "./ProjectCard.jsx";
import projectAsset from "./ProjectAsset.js";
import { FcIdea } from "react-icons/fc";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // Show 3 cards per page

  useEffect(() => {
    // Load projects from localStorage or use default
    const loadProjects = () => {
      const stored = localStorage.getItem("projects");
      if (stored) {
        try {
          const parsedProjects = JSON.parse(stored);
          setProjects(parsedProjects);
        } catch (e) {
          setProjects(projectAsset);
        }
      } else {
        setProjects(projectAsset);
      }
    };

    loadProjects();

    // Listen for updates from admin dashboard
    const handleUpdate = () => {
      loadProjects();
    };

    window.addEventListener("projectsUpdated", handleUpdate);
    return () => window.removeEventListener("projectsUpdated", handleUpdate);
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = projects.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(projects.length / itemsPerPage);
  const pages = [...Array(totalPages).keys()].map(n => n + 1);

  return (
    <section
      id="work"
      className="bg-[#F0EBE3] w-full px-4 sm:px-6 lg:px-[12%] py-10 scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="flex items-center justify-center gap-3 text-3xl sm:text-4xl font-Poppins mb-4">
          <FcIdea /> My Works
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          A collection of my recent projects showcasing my skills and experience
        </p>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {currentItems.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-md border bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Previous
            </button>
            
            {pages.map(num => (
              <button
                key={num}
                onClick={() => setCurrentPage(num)}
                className={`px-4 py-2 rounded-md border transition ${
                  currentPage === num
                    ? "bg-[#6A9457] text-white shadow-md"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                {num}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-md border bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
