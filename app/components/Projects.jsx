"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "../utils/supabase";

const AUTO_SCROLL_SPEED = 3;
const EDGE_ZONE = 60;

/* ---------- Skeleton Card ---------- */
const SkeletonCard = () => (
  <div className="min-w-[320px] max-w-[320px] bg-white rounded-2xl shadow-md overflow-hidden animate-pulse">
    <div className="h-48 bg-gray-200" />
    <div className="p-5 space-y-3">
      <div className="h-5 bg-gray-200 rounded w-3/4" />
      <div className="h-4 bg-gray-200 rounded w-full" />
      <div className="h-4 bg-gray-200 rounded w-5/6" />
      <div className="h-4 bg-gray-200 rounded w-1/2 mt-4" />
    </div>
  </div>
);

/* ---------- Modal Skeleton ---------- */
const ModalSkeleton = () => (
  <div className="animate-pulse space-y-4">
    <div className="h-56 bg-gray-200 rounded-xl" />
    <div className="h-6 bg-gray-200 rounded w-3/4" />
    <div className="h-4 bg-gray-200 rounded w-full" />
    <div className="h-4 bg-gray-200 rounded w-5/6" />
    <div className="h-4 bg-gray-200 rounded w-2/3" />
  </div>
);

const Projects = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const scrollRef = useRef(null);

  /* ---------- Fetch projects ---------- */
  useEffect(() => {
    const fetchProjects = async () => {
      const { data } = await supabase.from("projects").select("*");
      setProjects(data || []);
      setLoading(false);
    };
    fetchProjects();
  }, []);

  /* ---------- URL-based modal ---------- */
  useEffect(() => {
    const projectId = searchParams.get("project");
    if (!projectId) return;

    const loadProject = async () => {
      setModalLoading(true);
      const { data } = await supabase
        .from("projects")
        .select("*")
        .eq("id", projectId)
        .single();

      setSelectedProject(data);
      setModalLoading(false);
    };

    loadProject();
  }, [searchParams]);

  /* ---------- Close modal ---------- */
  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      router.push("?", { scroll: false });
      setSelectedProject(null);
      setModalLoading(false);
      setIsClosing(false);
    }, 200);
  };

  /* ---------- ESC key ---------- */
  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && closeModal();
    if (modalLoading || selectedProject) {
      window.addEventListener("keydown", handleEsc);
    }
    return () => window.removeEventListener("keydown", handleEsc);
  }, [modalLoading, selectedProject]);

  /* ---------- Drag + auto scroll ---------- */
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);
  const autoScrollDir = useRef(0);
  const rafId = useRef(null);

  const onMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeftStart.current = scrollRef.current.scrollLeft;
  };

  const onMouseUp = () => (isDragging.current = false);
  const onMouseLeave = () => (isDragging.current = false);

  const onMouseMove = (e) => {
    if (!scrollRef.current) return;

    if (isDragging.current) {
      const x = e.pageX - scrollRef.current.offsetLeft;
      const walk = (x - startX.current) * 1.2;
      scrollRef.current.scrollLeft = scrollLeftStart.current - walk;
      return;
    }

    const rect = scrollRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;

    if (x < EDGE_ZONE) startAutoScroll(-1);
    else if (x > rect.width - EDGE_ZONE) startAutoScroll(1);
    else stopAutoScroll();
  };

  const startAutoScroll = (dir) => {
    if (autoScrollDir.current === dir) return;
    autoScrollDir.current = dir;

    const step = () => {
      scrollRef.current.scrollLeft += AUTO_SCROLL_SPEED * dir;
      rafId.current = requestAnimationFrame(step);
    };
    rafId.current = requestAnimationFrame(step);
  };

  const stopAutoScroll = () => {
    autoScrollDir.current = 0;
    if (rafId.current) cancelAnimationFrame(rafId.current);
  };

  /* ---------- Open modal ---------- */
  const openModal = (id) => {
    router.push(`?project=${id}`, { scroll: false });
  };

  return (
    <div id="projects">
      {/* ---------- MODAL ---------- */}
      {(modalLoading || selectedProject) && (
        <div
          onClick={closeModal}
          className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm
            transition-opacity duration-200 ${
              isClosing ? "opacity-0" : "opacity-100"
            }`}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`bg-white rounded-2xl w-full max-w-2xl p-6 shadow-2xl
              transform transition-all duration-200 ${
                isClosing
                  ? "scale-95 opacity-0"
                  : "scale-100 opacity-100"
              }`}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            >
              ✕
            </button>

            {modalLoading ? (
              <ModalSkeleton />
            ) : (
              selectedProject && (
                <>
                  {selectedProject.image_url && (
                    <img
                      src={selectedProject.image_url}
                      alt={selectedProject.title}
                      className="rounded-xl mb-6"
                    />
                  )}

                  <h3 className="text-2xl font-bold mb-4">
                    {selectedProject.title}
                  </h3>

                  <p className="text-gray-600 mb-6">
                    {selectedProject.description}
                  </p>

                  <div className="flex gap-4">
                    {selectedProject.github_url && (
                      <a
                        href={selectedProject.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 border rounded-lg hover:bg-gray-100"
                      >
                        GitHub
                      </a>
                    )}

                    {selectedProject.live_url && (
                      <a
                        href={selectedProject.live_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                      >
                        Live Demo
                      </a>
                    )}
                  </div>
                </>
              )
            )}
          </div>
        </div>
      )}

      {/* ---------- PROJECTS SECTION ---------- */}
      <section className="bg-[var(--secondary-color)] py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-10
            opacity-0 translate-y-4
            animate-[fadeUp_0.6s_ease-out_forwards]"
          >
            My Projects
          </h2>

          <div className="relative">
            <div className="fade-left" />
            <div className="fade-right" />

            <div
              ref={scrollRef}
              onMouseDown={onMouseDown}
              onMouseUp={onMouseUp}
              onMouseLeave={onMouseLeave}
              onMouseMove={onMouseMove}
              className="flex gap-6 overflow-x-auto scrollbar-hover snap-x snap-mandatory scroll-smooth pb-6 cursor-grab select-none"
            >
              {loading
                ? Array.from({ length: 3 }).map((_, i) => (
                    <SkeletonCard key={i} />
                  ))
                : projects.map((p) => (
                    <div
                      key={p.id}
                      className="min-w-[320px] bg-white rounded-2xl shadow-md hover:shadow-xl snap-start"
                    >
                      {p.image_url && (
                        <img
                          src={p.image_url}
                          alt={p.title}
                          className="h-48 w-full object-cover rounded-t-2xl"
                        />
                      )}

                      <div className="p-5">
                        <h3 className="font-semibold mb-2">{p.title}</h3>
                        <p className="text-sm text-gray-600 line-clamp-3">
                          {p.description}
                        </p>

                        {/* ✅ UPDATED ACTIONS */}
                        <div className="mt-4 flex gap-4">
                          <button
                            onClick={() => openModal(p.id)}
                            className="text-sm font-medium text-indigo-600 hover:underline"
                          >
                            View Project →
                          </button>

                          {p.github_url && (
                            <a
                              href={p.github_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-gray-600 hover:text-gray-900"
                              onClick={(e) => e.stopPropagation()}
                            >
                              GitHub
                            </a>
                          )}

                          {p.live_url && (
                            <a
                              href={p.live_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-gray-600 hover:text-gray-900"
                              onClick={(e) => e.stopPropagation()}
                            >
                              Live
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;