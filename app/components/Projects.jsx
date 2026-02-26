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

export default function Projects() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const scrollRef = useRef(null);

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  const [selectedProject, setSelectedProject] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  /* ---------- FETCH PROJECTS ---------- */
  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      setErrorMsg(null);

      try {
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Supabase error:", error);
          setErrorMsg(
            "The Supabase India server is temporarily unavailable. Please check back later."
          );
          setProjects([]);
        } else {
          setProjects(data || []);
        }
      } catch (err) {
        console.error("Network / Infra error:", err);
        setErrorMsg(
          "We’re currently facing a server issue from Supabase India. Please try again later."
        );
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  /* ---------- MODAL FETCH ---------- */
  useEffect(() => {
    const projectId = searchParams.get("project");
    if (!projectId) return;

    const loadProject = async () => {
      setModalLoading(true);
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("id", projectId)
        .single();

      if (!error) setSelectedProject(data);
      setModalLoading(false);
    };

    loadProject();
  }, [searchParams]);

  /* ---------- CLOSE MODAL ---------- */
  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      router.push("?", { scroll: false });
      setSelectedProject(null);
      setModalLoading(false);
      setIsClosing(false);
    }, 200);
  };

  /* ---------- UI ---------- */
  return (
    <div id="projects">
      {(modalLoading || selectedProject) && (
        <div
          onClick={closeModal}
          className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm ${
            isClosing ? "opacity-0" : "opacity-100"
          }`}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl w-full max-w-2xl p-6 shadow-2xl"
          >
            {modalLoading ? (
              <ModalSkeleton />
            ) : (
              selectedProject && (
                <>
                  <h3 className="text-2xl font-bold mb-4">
                    {selectedProject.title}
                  </h3>
                  <p className="text-gray-600">
                    {selectedProject.description}
                  </p>
                </>
              )
            )}
          </div>
        </div>
      )}

      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-10">My Projects</h2>

          {errorMsg && (
            <div className="mb-6 rounded-lg bg-yellow-50 border border-yellow-200 p-4 text-yellow-800">
              ⚠️ {errorMsg}
            </div>
          )}

      <div ref={scrollRef} className="flex gap-6 overflow-x-auto pb-6">
  {loading && !errorMsg &&
    Array.from({ length: 3 }).map((_, i) => (
      <SkeletonCard key={i} />
    ))}

  {!loading && !errorMsg &&
    projects.map((p) => (
      <div
        key={p.id}
        className="min-w-[320px] bg-white rounded-2xl shadow-md"
      >
        <div className="p-5">
          <h3 className="font-semibold mb-2">{p.title}</h3>
          <p className="text-sm text-gray-600">{p.description}</p>
          <button
            onClick={() => router.push(`?project=${p.id}`)}
            className="mt-4 text-indigo-600"
          >
            View Project →
          </button>
        </div>
      </div>
    ))}
</div>
        </div>
      </section>
    </div>
  );
}