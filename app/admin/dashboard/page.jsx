"use client";

export const dynamic = "force-dynamic";

import { useAdmin } from "../../context/AdminContext";


import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../utils/supabase";
import { LogOut, Plus, Trash2, Edit2, Save, X } from "lucide-react";
import { FaReact, FaNodeJs } from "react-icons/fa";
import { SiTailwindcss, SiStyledcomponents, SiTensorflow } from "react-icons/si";

const techIcons = {
  React: FaReact,
  "Node.js": FaNodeJs,
  "Tailwind CSS": SiTailwindcss,
  "Styled Components": SiStyledcomponents,
  "TensorFlow.js": SiTensorflow,
};

export default function AdminDashboard() {
  const { isAuthenticated, logout, isLoading } = useAdmin();
  const router = useRouter();
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tech: [],
    image: "",
    demo: "",
    code: "",
  });
  const [techInput, setTechInput] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/admin/login");
    }
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    if (isAuthenticated) {
      loadProjects();
    }
  }, [isAuthenticated]);

  const loadProjects = async () => {
    const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
    if (error) {
      console.error('Error loading projects:', error);
      return;
    }
    setProjects(data || []);
  };

  const handleLogout = async () => {
    await logout();
    router.push("/admin/login");
  };

  const handleAddTech = () => {
    if (techInput.trim()) {
      const techParts = techInput.split(":");
      const name = techParts[0].trim();
      const color = techParts[1]?.trim() || "text-blue-500";

      setFormData({
        ...formData,
        tech: [...formData.tech, { name, color }],
      });
      setTechInput("");
    }
  };

  const handleRemoveTech = (index) => {
    setFormData({
      ...formData,
      tech: formData.tech.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        setError("Not authenticated — please log in.");
        return;
      }

      let imageUrl = formData.image;

      if (formData.file) {
        const fileExt = formData.file.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('project-images')
          .upload(fileName, formData.file, { cacheControl: '3600', upsert: false });
        if (uploadError) {
          console.error('Error uploading image:', uploadError);
          setError(uploadError.message || 'Image upload failed');
          return;
        }
        const { data: urlData } = supabase.storage.from('project-images').getPublicUrl(fileName);
        imageUrl = urlData?.publicUrl ?? '';
      }

   const projectData = {
  title: formData.title,
  description: formData.description,
  tech_stack: formData.tech,
  image_url: imageUrl,
  live_url: formData.demo,       // 👈 demo → live_url
  github_url: formData.code,     // 👈 code → github_url
};

      if (formData.code) {
        projectData.code = formData.code;
      }

      if (editingProject) {
        const { data, error } = await supabase.from('projects').update(projectData).eq('id', editingProject.id).select();
        if (error) {
          console.error('Error updating project:', error);
          setError(error.message || 'Failed to update project');
          return;
        }
      } else {
        const { data, error } = await supabase.from('projects').insert(projectData).select();
        if (error) {
          console.error('Error adding project:', error);
          setError(error.message || 'Failed to add project');
          return;
        }
      }

      await loadProjects();
      resetForm();
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this project?")) {
      const { error } = await supabase.from('projects').delete().eq('id', id);
      if (error) {
        console.error('Error deleting project:', error);
        return;
      }
      await loadProjects();
    }
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    // Handle image - could be imported object or string URL
    let imageUrl = "";
    if (typeof project.image === 'string') {
      imageUrl = project.image;
    } else if (project.image?.src) {
      imageUrl = project.image.src;
    } else if (project.image) {
      imageUrl = project.image;
    }
    
    setFormData({
      title: project.title,
      description: project.description,
      tech: project.tech || [],
      image: imageUrl,
      demo: project.demo || "",
      code: project.code || "",
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      tech: [],
      image: "",
      demo: "",
      code: "",
    });
    setTechInput("");
    setShowForm(false);
    setEditingProject(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#F0EBE3] py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
            <p className="text-gray-600 mt-1">Manage your projects</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>

        {/* Add Project Button */}
        <div className="mb-6">
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 bg-[#6A9457] text-white px-6 py-3 rounded-lg hover:bg-[#5b8b49] transition-colors shadow-md"
          >
            <Plus className="w-5 h-5" />
            {showForm ? "Cancel" : "Add New Project"}
          </button>
        </div>

        {/* Add/Edit Form */}
        {showForm && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-6">
              {editingProject ? "Edit Project" : "Add New Project"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6A9457] outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6A9457] outline-none"
                  required
                />
              </div>

              <div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Upload Image *
  </label>
  <input
    type="file"
    accept="image/*"
    onChange={(e) => {
      const file = e.target.files[0];
      if (file) {
        // Create a local URL for preview or store the file object
        setFormData({ ...formData, image: URL.createObjectURL(file), file });
      }
    }}
    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6A9457] outline-none"
    required
  />
  {formData.image && (
    <img
      src={formData.image}
      alt="Preview"
      className="mt-2 w-32 h-32 object-cover rounded-md"
    />
  )}
</div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tech Stack
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTech())}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6A9457] outline-none"
                    placeholder="e.g., React:text-blue-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddTech}
                    className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                  >
                    Add
                  </button>
                </div>
                    <div className="flex flex-wrap gap-2">
                      {formData.tech.map((tech, index) => {
                        const Icon = techIcons[tech.name] || FaReact;
                        return (
                          <span
                            key={index}
                            className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full text-sm"
                          >
                            <Icon className={`${tech.color} text-sm`} />
                            {tech.name}
                            <button
                              type="button"
                              onClick={() => handleRemoveTech(index)}
                              className="ml-1 text-red-500 hover:text-red-700"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        );
                      })}
                    </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Demo URL
                  </label>
                  <input
                    type="url"
                    value={formData.demo}
                    onChange={(e) =>
                      setFormData({ ...formData, demo: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6A9457] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Code URL
                  </label>
                  <input
                    type="url"
                    value={formData.code}
                    onChange={(e) =>
                      setFormData({ ...formData, code: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6A9457] outline-none"
                  />
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex items-center gap-2 bg-[#6A9457] text-white px-6 py-2 rounded-lg hover:bg-[#5b8b49] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save className="w-4 h-4" />
                  {submitting ? (editingProject ? "Updating..." : "Saving...") : (editingProject ? "Update Project" : "Add Project")}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Projects List */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6">Projects ({projects.length})</h2>
          <div className="space-y-4">
            {projects.map((project, index) => (
              <div
                key={project.id || index}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech?.map((tech, i) => {
                        const Icon = techIcons[tech.name] || FaReact;
                        return (
                          <span
                            key={i}
                            className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded text-xs"
                          >
                            <Icon className={`${tech.color || 'text-blue-500'} text-sm`} />
                            {tech.name}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => handleEdit(project)}
                      className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(project.id || index)}
                      className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

