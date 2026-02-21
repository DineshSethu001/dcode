"use client";

import { useEffect, useRef, useState } from "react";
import { supabase } from "@/app/utils/supabase";
import { useAdmin } from "@/app/context/AdminContext";
import { useRouter } from "next/navigation";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

/* -------- TECH SUGGESTIONS -------- */
const TECH_SUGGESTIONS = [
    "React",
    "Next.js",
    "Tailwind CSS",
    "Supabase",
    "Node.js",
    "Express",
    "MongoDB",
    "PostgreSQL",
    "TypeScript",
    "JavaScript",
    "Firebase",
    "Redux",
    "Prisma",
    "Vercel",
    "React JS (Vite)",

    "React Router DOM",
    "Lucide React Icons",
    "Material UI (MUI)",
    "ScrollReveal",
];
const normalizeTechStack = (tech) => {
    if (Array.isArray(tech)) return tech;
    if (typeof tech === "string")
        return tech.split(",").map((t) => t.trim()).filter(Boolean);
    return [];
};
export default function AdminDashboard() {
    
    const router = useRouter();
    const { logout } = useAdmin(); // ✅ single source of truth

    /* ---------------- THEME ---------------- */
    const [dark, setDark] = useState(false);
    const [mounted, setMounted] = useState(false);

    /* ---------------- DATA ---------------- */
    const [projects, setProjects] = useState([]);

    /* ---------------- SEARCH + FILTER ---------------- */
    const [search, setSearch] = useState("");
    const [techFilter, setTechFilter] = useState("all");

    /* ---------------- TECH INPUT ---------------- */
    const [techInput, setTechInput] = useState("");
    const [techList, setTechList] = useState([]);

    /* ---------------- FORM ---------------- */
    const [form, setForm] = useState({
        title: "",
        description: "",
        image_url: "",
        github_url: "",
        live_url: "",
    });

    const [editingId, setEditingId] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef(null);

    /* ---------------- AUTO DARK MODE ---------------- */
    useEffect(() => {
        const media = window.matchMedia("(prefers-color-scheme: dark)");
        setDark(media.matches);
        setMounted(true);
        const handler = (e) => setDark(e.matches);
        media.addEventListener("change", handler);
        return () => media.removeEventListener("change", handler);
    }, []);

    /* ---------------- FETCH ---------------- */
    const fetchProjects = async () => {
        const { data } = await supabase
            .from("projects")
            .select("*")
            .order("created_at", { ascending: false });
        setProjects(data || []);
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    /* ---------------- FILTER ---------------- */
    const techOptions = [
    "all",
    ...new Set(
        projects.flatMap((p) => normalizeTechStack(p.tech_stack))
    ),
];
   const filteredProjects = projects.filter((p) => {
    const q = search.toLowerCase();
    const techArray = normalizeTechStack(p.tech_stack);

    return (
        (p.title?.toLowerCase().includes(q) ||
            p.description?.toLowerCase().includes(q) ||
            techArray.join(", ").toLowerCase().includes(q)) &&
        (techFilter === "all" || techArray.includes(techFilter))
    );
});
    /* ---------------- CHART DATA ---------------- */
   const chartData = techOptions
    .filter((t) => t !== "all")
    .map((t) => ({
        name: t,
        count: projects.filter((p) =>
            normalizeTechStack(p.tech_stack).includes(t)
        ).length,
    }));
    /* ---------------- IMAGE UPLOAD ---------------- */
    const uploadImage = async (file) => {
        if (!file) return;
        setUploading(true);

        const fileName = `${Date.now()}-${file.name}`;
        const { error } = await supabase.storage
            .from("project-images")
            .upload(fileName, file);

        if (!error) {
            const { data } = supabase.storage
                .from("project-images")
                .getPublicUrl(fileName);

            setForm((prev) => ({ ...prev, image_url: data.publicUrl }));
            setImagePreview(data.publicUrl);
        }
        setUploading(false);
    };

    /* ---------------- TECH HANDLERS ---------------- */
    const addTech = (tech) => {
        if (!techList.includes(tech)) setTechList([...techList, tech]);
        setTechInput("");
    };

    const removeTech = (tech) => {
        setTechList(techList.filter((t) => t !== tech));
    };

    const filteredSuggestions = TECH_SUGGESTIONS.filter(
        (t) =>
            t.toLowerCase().includes(techInput.toLowerCase()) &&
            !techList.includes(t)
    );

    /* ---------------- FORM ---------------- */
    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const resetForm = () => {
        setForm({
            title: "",
            description: "",
            image_url: "",
            github_url: "",
            live_url: "",
        });
        setTechList([]);
        setEditingId(null);
        setImagePreview(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            ...form,
            tech_stack: techList.join(", "),
        };

        let error;

        if (editingId) {
            ({ error } = await supabase
                .from("projects")
                .update(payload)
                .eq("id", editingId));
        } else {
            ({ error } = await supabase.from("projects").insert([payload]));
        }

        if (error) {
            alert(error.message);
            return;
        }

        resetForm();
        fetchProjects();
    };

    const handleEdit = (p) => {
        setEditingId(p.id);
        setForm({
            title: p.title,
            description: p.description,
            image_url: p.image_url,
            github_url: p.github_url,
            live_url: p.live_url,
        });
setTechList(normalizeTechStack(p.tech_stack));
        setImagePreview(p.image_url);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleDelete = async (project) => {
        if (!confirm("Delete project permanently?")) return;

        if (project.image_url) {
            const fileName = project.image_url.split("/").pop();
            await supabase.storage.from("project-images").remove([fileName]);
        }

        await supabase.from("projects").delete().eq("id", project.id);
        fetchProjects();
    };

    return (
        <div
            className="min-h-screen bg-cover bg-center"
            style={{
                backgroundImage: dark
                    ? "url('/dark-theme.jpg')"
                    : "url('/nature-theme.jpg')",
            }}
        >
            <div className="min-h-screen bg-black/40 backdrop-blur-md px-6 py-14">
                <div
                    className={`max-w-6xl mx-auto text-white space-y-16 transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                        }`}
                >
                    {/* HEADER */}
                    <div className="flex justify-between items-center">
                        <h1 className="text-4xl font-semibold">Admin Dashboard</h1>
                        <button
                            onClick={async () => {
                                await logout();               // clears Supabase session
                                router.replace("/admin/login"); // redirect safely
                            }}
                            className="cursor-pointer bg-red-600 px-6 py-3 rounded-xl"
                        >
                            Logout
                        </button>
                    </div>

                    {/* ANALYTICS */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <GlassCard title="Total Projects" value={projects.length} />
                        <GlassCard title="Tech Stacks" value={techOptions.length - 1} />
                        <GlassCard title="Visible Results" value={filteredProjects.length} />
                    </div>

                    {/* CHART */}
                    <div className="glass">
                        <h3 className="text-lg font-semibold mb-6">Projects by Tech</h3>
                        <ResponsiveContainer width="100%" height={260}>
                            <BarChart data={chartData}>
                                <XAxis dataKey="name" stroke="#fff" />
                                <YAxis stroke="#fff" />
                                <Tooltip />
                                <Bar dataKey="count" fill="#34d399" radius={[6, 6, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* FORM */}
                    <form
                        onSubmit={handleSubmit}
                        className="glass grid grid-cols-1 md:grid-cols-2 gap-6"
                    >
                        <input
                            name="title"
                            placeholder="Project Title"
                            value={form.title}
                            onChange={handleChange}
                            className="input"
                        />

                        <input
                            name="github_url"
                            placeholder="GitHub Source URL"
                            value={form.github_url}
                            onChange={handleChange}
                            className="input"
                        />

                        <input
                            name="live_url"
                            placeholder="Live Website URL"
                            value={form.live_url}
                            onChange={handleChange}
                            className="input"
                        />

                        {/* TECH STACK */}
                        <div className="col-span-full relative">
                            <input
                                value={techInput}
                                onChange={(e) => setTechInput(e.target.value)}
                                placeholder="Add tech (React, Node…)"
                                className="input"
                            />

                            {techInput && filteredSuggestions.length > 0 && (
                                <div className="absolute z-10 mt-2 w-full bg-black/80 rounded-xl border border-white/20">
                                    {filteredSuggestions.map((t) => (
                                        <div
                                            key={t}
                                            onClick={() => addTech(t)}
                                            className="px-4 py-2 hover:bg-white/10 cursor-pointer"
                                        >
                                            {t}
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className="flex flex-wrap gap-2 mt-3">
                                {techList.map((t) => (
                                    <span
                                        key={t}
                                        onClick={() => removeTech(t)}
                                        className="px-4 py-1 bg-emerald-600 rounded-full text-sm cursor-pointer"
                                    >
                                        {t} ✕
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* IMAGE UPLOAD */}
                        <div
                            onClick={() => fileInputRef.current.click()}
                            onDrop={(e) => {
                                e.preventDefault();
                                uploadImage(e.dataTransfer.files[0]);
                            }}
                            onDragOver={(e) => e.preventDefault()}
                            className="col-span-full border-2 border-dashed border-white/30 rounded-2xl p-8 text-center cursor-pointer"
                        >
                            {uploading ? "Uploading…" : "Drag & drop or click to upload image"}
                            <input
                                ref={fileInputRef}
                                type="file"
                                hidden
                                onChange={(e) => uploadImage(e.target.files[0])}
                            />
                        </div>

                        {imagePreview && (
                            <img
                                src={imagePreview}
                                className="col-span-full h-48 rounded-2xl object-cover"
                            />
                        )}

                        <textarea
                            name="description"
                            placeholder="Project description"
                            value={form.description}
                            onChange={handleChange}
                            rows={4}
                            className="input col-span-full"
                        />

                        <div className="col-span-full flex gap-4">
                            <button className="cursor-pointer bg-emerald-600 px-8 py-3 rounded-xl">
                                {editingId ? "Update Project" : "Create Project"}
                            </button>
                            {editingId && (
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="bg-gray-500 px-8 py-3 rounded-xl"
                                >
                                    Cancel
                                </button>
                            )}
                        </div>
                    </form>

                    {/* LIST */}
                    <div className="grid gap-6">
                        {filteredProjects.map((p) => (
                            <div key={p.id} className="glass">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h3 className="text-lg font-semibold">{p.title}</h3>
                                        <p className="text-sm opacity-80">{p.tech_stack}</p>
                                    </div>
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => handleEdit(p)}
                                            className="cursor-pointer bg-emerald-600 px-5 py-2 rounded-xl"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(p)}
                                            className="bg-red-600 px-5 py-2 rounded-xl"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* GLOBAL STYLES */}
            <style jsx global>{`
        .glass {
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.18),
            rgba(255, 255, 255, 0.08)
          );
          backdrop-filter: blur(18px);
          border: 1.5px solid rgba(255, 255, 255, 0.32);
          border-radius: 1.75rem;
          padding: 2.25rem;
        }

        .input {
          width: 100%;
          padding: 1.35rem 1.6rem;
          border-radius: 1.2rem;
          background: rgba(255, 255, 255, 0.18);
          border: 1.5px solid rgba(255, 255, 255, 0.38);
          color: white;
          outline: none;
        }
      `}</style>
        </div>
    );
}

function GlassCard({ title, value }) {
    return (
        <div className="glass text-center">
            <p className="text-sm opacity-80">{title}</p>
            <p className="text-3xl font-semibold mt-1">{value}</p>
        </div>
    );
}