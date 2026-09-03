"use client";

import { useState, useEffect, useCallback } from "react";
import {
  type Project,
  getProjects,
  saveProjects,
  resetProjects,
  nextId,
  DEFAULT_PROJECTS,
} from "@/lib/projectsData";
import {
  verifyPassword,
  isAuthenticated,
  setAuthenticated,
  logout,
} from "@/lib/auth";

/* ═══════════════════════════ CATEGORY OPTIONS ═══════════════════════════ */
const CATEGORIES = [
  "Motion Design",
  "Editing & Shooting",
  "Sound Mixing",
  "Showreel",
];

const ACCENT_PRESETS = [
  { label: "Gold", value: "#c9a96e" },
  { label: "Warm", value: "#e8b4a0" },
  { label: "Purple", value: "#d4a0e8" },
  { label: "Yellow", value: "#e8e0a0" },
];

/* ═══════════════════════════ LOGIN SCREEN ═══════════════════════════ */
function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const ok = await verifyPassword(password);
    setLoading(false);
    if (ok) {
      setAuthenticated();
      onLogin();
    } else {
      setError("Invalid password");
      setShake(true);
      setTimeout(() => setShake(false), 600);
    }
  };

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-6">
      {/* Background glow */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, rgba(201,169,110,0.06) 0%, transparent 70%)",
        }}
      />

      <div
        className="relative w-full max-w-md"
        style={{ animation: "adminFadeIn 0.6s ease both" }}
      >
        {/* Logo area */}
        <div className="text-center mb-10">
          <div
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6"
            style={{
              background: "rgba(201,169,110,0.08)",
              border: "1px solid rgba(201,169,110,0.15)",
              boxShadow: "0 0 40px rgba(201,169,110,0.08)",
            }}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(201,169,110,0.8)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <h1
            className="font-display text-3xl font-bold text-accent mb-2"
            style={{ fontStyle: "italic" }}
          >
            Admin Panel
          </h1>
          <p
            className="tv-hint text-[10px] tracking-[0.3em]"
            style={{ color: "var(--muted)" }}
          >
            PORTFOLIO MANAGEMENT
          </p>
        </div>

        {/* Login card */}
        <form
          onSubmit={handleSubmit}
          className={`glass-card rounded-xl p-8 ${shake ? "admin-shake" : ""}`}
          style={{
            border: error
              ? "1px solid rgba(255,100,100,0.3)"
              : "1px solid rgba(201,169,110,0.1)",
            transition: "border-color 0.3s ease",
          }}
        >
          <label className="block mb-2">
            <span
              className="tv-hint text-[10px] tracking-[0.2em]"
              style={{ color: "var(--accent-warm)" }}
            >
              PASSWORD
            </span>
          </label>
          <div className="relative mb-6">
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              placeholder="Enter admin password"
              autoFocus
              className="w-full px-4 py-3.5 rounded-lg text-accent text-sm outline-none transition-all duration-300"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(201,169,110,0.12)",
                fontFamily: "var(--font-body)",
              }}
            />
            {/* Glow line at bottom */}
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px transition-all duration-500"
              style={{
                width: password ? "80%" : "0%",
                background:
                  "linear-gradient(90deg, transparent, var(--accent-warm), transparent)",
              }}
            />
          </div>

          {error && (
            <p
              className="text-[12px] mb-4 flex items-center gap-2"
              style={{
                color: "#ff6b6b",
                fontFamily: "var(--font-mono)",
                animation: "adminFadeIn 0.3s ease",
              }}
            >
              <span>✕</span> {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full py-3.5 rounded-lg tv-hint text-[11px] tracking-[0.2em] transition-all duration-300"
            style={{
              background:
                loading || !password
                  ? "rgba(201,169,110,0.05)"
                  : "rgba(201,169,110,0.12)",
              border: "1px solid rgba(201,169,110,0.2)",
              color:
                loading || !password
                  ? "rgba(201,169,110,0.3)"
                  : "var(--accent-warm)",
              cursor: loading || !password ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "VERIFYING..." : "AUTHENTICATE"}
          </button>
        </form>

        {/* Back link */}
        <div className="text-center mt-8">
          <a
            href="/"
            className="tv-hint text-[10px] tracking-[0.2em] transition-colors duration-300"
            style={{ color: "var(--muted)" }}
          >
            ← BACK TO PORTFOLIO
          </a>
        </div>
      </div>

      <style>{`
        @keyframes adminFadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .admin-shake {
          animation: adminShake 0.5s ease;
        }
        @keyframes adminShake {
          0%, 100% { transform: translateX(0); }
          20%      { transform: translateX(-8px); }
          40%      { transform: translateX(8px); }
          60%      { transform: translateX(-4px); }
          80%      { transform: translateX(4px); }
        }
      `}</style>
    </div>
  );
}

/* ═══════════════════════════ PROJECT FORM MODAL ═══════════════════════════ */
function ProjectFormModal({
  project,
  onSave,
  onCancel,
}: {
  project: Project | null; // null = new project
  onSave: (p: Project) => void;
  onCancel: () => void;
}) {
  const isEditing = project !== null;
  const [form, setForm] = useState<Project>(
    project ?? {
      id: 0,
      title: "",
      category: CATEGORIES[0],
      year: new Date().getFullYear().toString(),
      tags: [],
      accent: ACCENT_PRESETS[0].value,
      description: "",
      aspectRatio: "aspect-[16/9]",
      youtube: "",
    }
  );
  const [tagInput, setTagInput] = useState("");

  const updateField = <K extends keyof Project>(
    key: K,
    value: Project[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const addTag = () => {
    const tag = tagInput.trim();
    if (tag && !form.tags.includes(tag)) {
      updateField("tags", [...form.tags, tag]);
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    updateField(
      "tags",
      form.tags.filter((t) => t !== tag)
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    onSave(form);
  };

  const inputStyle = {
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(201,169,110,0.12)",
    fontFamily: "var(--font-body)",
    color: "var(--accent)",
    fontSize: "13px",
  };

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center p-4"
      style={{
        background: "rgba(4,4,4,0.9)",
        backdropFilter: "blur(12px)",
        animation: "adminFadeIn 0.3s ease",
      }}
      onClick={(e) => e.target === e.currentTarget && onCancel()}
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] rounded-xl overflow-hidden flex flex-col"
        style={{
          background: "#0c0c0c",
          border: "1px solid rgba(201,169,110,0.12)",
          boxShadow: "0 32px 80px rgba(0,0,0,0.7)",
          animation: "adminModalIn 0.35s cubic-bezier(0.22,1,0.36,1) both",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-[#080808]">
          <span
            className="tv-hint text-[10px] tracking-[0.3em]"
            style={{ color: "var(--accent-warm)" }}
          >
            {isEditing ? "EDIT PROJECT" : "NEW PROJECT"}
          </span>
          <button
            onClick={onCancel}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <svg width="10" height="10" viewBox="0 0 14 14" fill="none">
              <path
                d="M1 1l12 12M13 1L1 13"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Form body */}
        <form
          onSubmit={handleSubmit}
          className="overflow-y-auto flex-1 p-6 space-y-5 custom-scrollbar"
        >
          {/* Title */}
          <div>
            <label
              className="block mb-1.5 tv-hint text-[10px] tracking-[0.15em]"
              style={{ color: "var(--muted)" }}
            >
              TITLE *
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => updateField("title", e.target.value)}
              placeholder="Project title"
              required
              className="w-full px-4 py-3 rounded-lg outline-none transition-all duration-300"
              style={inputStyle}
            />
          </div>

          {/* Category + Year row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                className="block mb-1.5 tv-hint text-[10px] tracking-[0.15em]"
                style={{ color: "var(--muted)" }}
              >
                CATEGORY
              </label>
              <select
                value={form.category}
                onChange={(e) => updateField("category", e.target.value)}
                className="w-full px-4 py-3 rounded-lg outline-none appearance-none transition-all duration-300"
                style={inputStyle}
              >
                {CATEGORIES.map((c) => (
                  <option
                    key={c}
                    value={c}
                    style={{ background: "#0c0c0c", color: "#e8d5b0" }}
                  >
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                className="block mb-1.5 tv-hint text-[10px] tracking-[0.15em]"
                style={{ color: "var(--muted)" }}
              >
                YEAR
              </label>
              <input
                type="text"
                value={form.year}
                onChange={(e) => updateField("year", e.target.value)}
                placeholder="2024"
                className="w-full px-4 py-3 rounded-lg outline-none transition-all duration-300"
                style={inputStyle}
              />
            </div>
          </div>

          {/* YouTube URL */}
          <div>
            <label
              className="block mb-1.5 tv-hint text-[10px] tracking-[0.15em]"
              style={{ color: "var(--muted)" }}
            >
              YOUTUBE EMBED URL
            </label>
            <input
              type="text"
              value={form.youtube ?? ""}
              onChange={(e) => updateField("youtube", e.target.value)}
              placeholder="https://www.youtube.com/embed/VIDEO_ID"
              className="w-full px-4 py-3 rounded-lg outline-none transition-all duration-300"
              style={inputStyle}
            />
            <p
              className="mt-1 text-[10px]"
              style={{
                color: "var(--dim)",
                fontFamily: "var(--font-mono)",
              }}
            >
              Use embed format: youtube.com/embed/VIDEO_ID
            </p>
          </div>

          {/* Accent color */}
          <div>
            <label
              className="block mb-1.5 tv-hint text-[10px] tracking-[0.15em]"
              style={{ color: "var(--muted)" }}
            >
              ACCENT COLOR
            </label>
            <div className="flex gap-2 items-center">
              {ACCENT_PRESETS.map((preset) => (
                <button
                  key={preset.value}
                  type="button"
                  onClick={() => updateField("accent", preset.value)}
                  className="relative w-8 h-8 rounded-full transition-all duration-200"
                  title={preset.label}
                  style={{
                    background: preset.value,
                    border:
                      form.accent === preset.value
                        ? "2px solid white"
                        : "2px solid transparent",
                    boxShadow:
                      form.accent === preset.value
                        ? `0 0 12px ${preset.value}60`
                        : "none",
                    transform:
                      form.accent === preset.value
                        ? "scale(1.15)"
                        : "scale(1)",
                  }}
                />
              ))}
              <input
                type="color"
                value={form.accent}
                onChange={(e) => updateField("accent", e.target.value)}
                className="w-8 h-8 rounded-lg overflow-hidden border-0 bg-transparent"
                style={{ cursor: "pointer" }}
              />
              <span
                className="text-[11px] ml-2"
                style={{
                  color: "var(--dim)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                {form.accent}
              </span>
            </div>
          </div>

          {/* Tags */}
          <div>
            <label
              className="block mb-1.5 tv-hint text-[10px] tracking-[0.15em]"
              style={{ color: "var(--muted)" }}
            >
              TAGS
            </label>
            <div className="flex gap-2 flex-wrap mb-2">
              {form.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px]"
                  style={{
                    background: `${form.accent}12`,
                    border: `1px solid ${form.accent}30`,
                    color: `${form.accent}cc`,
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="opacity-50 hover:opacity-100 transition-opacity"
                    style={{ lineHeight: 1 }}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addTag();
                  }
                }}
                placeholder="Add tag..."
                className="flex-1 px-4 py-2.5 rounded-lg outline-none transition-all duration-300 text-[13px]"
                style={inputStyle}
              />
              <button
                type="button"
                onClick={addTag}
                className="px-4 py-2.5 rounded-lg tv-hint text-[10px] transition-all duration-200"
                style={{
                  background: "rgba(201,169,110,0.08)",
                  border: "1px solid rgba(201,169,110,0.15)",
                  color: "var(--accent-warm)",
                }}
              >
                ADD
              </button>
            </div>
          </div>

          {/* Description */}
          <div>
            <label
              className="block mb-1.5 tv-hint text-[10px] tracking-[0.15em]"
              style={{ color: "var(--muted)" }}
            >
              DESCRIPTION
            </label>
            <textarea
              value={form.description}
              onChange={(e) => updateField("description", e.target.value)}
              placeholder="Project description..."
              rows={5}
              className="w-full px-4 py-3 rounded-lg outline-none transition-all duration-300 resize-y"
              style={inputStyle}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 py-3 rounded-lg tv-hint text-[11px] tracking-[0.15em] transition-all duration-300"
              style={{
                background: "rgba(201,169,110,0.12)",
                border: "1px solid rgba(201,169,110,0.25)",
                color: "var(--accent-warm)",
              }}
            >
              {isEditing ? "SAVE CHANGES" : "ADD PROJECT"}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 rounded-lg tv-hint text-[11px] tracking-[0.15em] transition-all duration-300"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "var(--muted)",
              }}
            >
              CANCEL
            </button>
          </div>
        </form>

        {/* Accent border */}
        <div
          className="absolute left-0 top-0 bottom-0 w-0.5"
          style={{
            background: form.accent,
            opacity: 0.4,
            boxShadow: `0 0 12px ${form.accent}`,
          }}
        />
      </div>

      <style>{`
        @keyframes adminModalIn {
          from { opacity: 0; transform: scale(0.93) translateY(16px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}

/* ═══════════════════════════ DELETE CONFIRM ═══════════════════════════ */
function DeleteConfirm({
  project,
  onConfirm,
  onCancel,
}: {
  project: Project;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-[1001] flex items-center justify-center p-4"
      style={{
        background: "rgba(4,4,4,0.9)",
        backdropFilter: "blur(12px)",
        animation: "adminFadeIn 0.2s ease",
      }}
      onClick={(e) => e.target === e.currentTarget && onCancel()}
    >
      <div
        className="w-full max-w-sm rounded-xl p-6"
        style={{
          background: "#0c0c0c",
          border: "1px solid rgba(255,80,80,0.2)",
          boxShadow: "0 32px 80px rgba(0,0,0,0.7)",
          animation: "adminModalIn 0.3s ease both",
        }}
      >
        <div className="text-center mb-6">
          <div
            className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-4"
            style={{
              background: "rgba(255,80,80,0.08)",
              border: "1px solid rgba(255,80,80,0.2)",
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ff5050"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
          </div>
          <h3
            className="font-display text-lg font-bold text-accent mb-2"
            style={{ fontStyle: "italic" }}
          >
            Delete Project?
          </h3>
          <p
            className="text-[13px] leading-relaxed"
            style={{ color: "var(--muted)" }}
          >
            &ldquo;{project.title}&rdquo; will be permanently removed.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onConfirm}
            className="flex-1 py-3 rounded-lg tv-hint text-[11px] tracking-[0.15em] transition-all duration-200"
            style={{
              background: "rgba(255,80,80,0.12)",
              border: "1px solid rgba(255,80,80,0.3)",
              color: "#ff6b6b",
            }}
          >
            DELETE
          </button>
          <button
            onClick={onCancel}
            className="flex-1 py-3 rounded-lg tv-hint text-[11px] tracking-[0.15em] transition-all duration-200"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "var(--muted)",
            }}
          >
            CANCEL
          </button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════ TOAST ═══════════════════════════ */
function Toast({
  message,
  type = "success",
}: {
  message: string;
  type?: "success" | "error" | "info";
}) {
  const colors = {
    success: {
      bg: "rgba(80,200,120,0.1)",
      border: "rgba(80,200,120,0.25)",
      text: "#50c878",
      icon: "✓",
    },
    error: {
      bg: "rgba(255,80,80,0.1)",
      border: "rgba(255,80,80,0.25)",
      text: "#ff6b6b",
      icon: "✕",
    },
    info: {
      bg: "rgba(201,169,110,0.1)",
      border: "rgba(201,169,110,0.25)",
      text: "#c9a96e",
      icon: "ℹ",
    },
  };
  const c = colors[type];

  return (
    <div
      className="fixed bottom-6 right-6 z-[1002] flex items-center gap-3 px-5 py-3.5 rounded-lg"
      style={{
        background: c.bg,
        border: `1px solid ${c.border}`,
        boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
        animation: "toastIn 0.4s ease, toastOut 0.3s ease 2.5s forwards",
      }}
    >
      <span style={{ color: c.text, fontSize: 14 }}>{c.icon}</span>
      <span
        className="tv-hint text-[11px] tracking-[0.1em]"
        style={{ color: c.text }}
      >
        {message}
      </span>
      <style>{`
        @keyframes toastIn {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes toastOut {
          from { opacity: 1; transform: translateY(0); }
          to   { opacity: 0; transform: translateY(20px); }
        }
      `}</style>
    </div>
  );
}

/* ═══════════════════════════ DASHBOARD ═══════════════════════════ */
function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Project | null>(null);
  const [toast, setToast] = useState<{
    msg: string;
    type: "success" | "error" | "info";
  } | null>(null);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setProjects(getProjects());
  }, []);

  const showToast = useCallback(
    (msg: string, type: "success" | "error" | "info" = "success") => {
      setToast({ msg, type });
      setTimeout(() => setToast(null), 3000);
    },
    []
  );

  const persist = useCallback(
    (updated: Project[]) => {
      setProjects(updated);
      saveProjects(updated);
      setHasChanges(false);
      showToast("Changes saved");
    },
    [showToast]
  );

  const handleAddOrEdit = (p: Project) => {
    if (editingProject) {
      // Edit
      const updated = projects.map((proj) =>
        proj.id === editingProject.id ? { ...p, id: editingProject.id } : proj
      );
      persist(updated);
    } else {
      // Add
      const newProject = { ...p, id: nextId(projects) };
      const updated = [...projects, newProject];
      persist(updated);
    }
    setShowForm(false);
    setEditingProject(null);
  };

  const handleDelete = (p: Project) => {
    const updated = projects.filter((proj) => proj.id !== p.id);
    persist(updated);
    setDeleteTarget(null);
  };

  const moveProject = (index: number, direction: "up" | "down") => {
    const arr = [...projects];
    const target = direction === "up" ? index - 1 : index + 1;
    if (target < 0 || target >= arr.length) return;
    [arr[index], arr[target]] = [arr[target], arr[index]];
    persist(arr);
  };

  const handleReset = () => {
    resetProjects();
    setProjects(DEFAULT_PROJECTS);
    showToast("Reset to defaults", "info");
  };

  const handleLogout = () => {
    logout();
    onLogout();
  };

  return (
    <div className="min-h-screen bg-bg">
      {/* Background glow */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 30% 20%, rgba(201,169,110,0.04) 0%, transparent 60%)",
        }}
      />

      {/* Top bar */}
      <header
        className="sticky top-0 z-50 px-6 lg:px-10 py-4 flex items-center justify-between"
        style={{
          background: "rgba(8,8,8,0.85)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(201,169,110,0.06)",
        }}
      >
        <div className="flex items-center gap-4">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{
              background: "rgba(201,169,110,0.08)",
              border: "1px solid rgba(201,169,110,0.15)",
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(201,169,110,0.7)"
              strokeWidth="2"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <div>
            <h1
              className="font-display text-lg font-bold text-accent"
              style={{ fontStyle: "italic" }}
            >
              Admin
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/"
            className="px-4 py-2 rounded-lg tv-hint text-[10px] tracking-[0.15em] transition-all duration-200"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
              color: "var(--muted)",
            }}
          >
            VIEW SITE
          </a>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg tv-hint text-[10px] tracking-[0.15em] transition-all duration-200"
            style={{
              background: "rgba(255,80,80,0.06)",
              border: "1px solid rgba(255,80,80,0.15)",
              color: "#ff6b6b",
            }}
          >
            LOGOUT
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-5xl mx-auto px-6 lg:px-10 py-10">
        {/* Stats row */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8"
          style={{ animation: "adminFadeIn 0.5s ease" }}
        >
          {[
            { label: "TOTAL", value: projects.length },
            {
              label: "MOTION",
              value: projects.filter((p) => p.category === "Motion Design")
                .length,
            },
            {
              label: "EDITING",
              value: projects.filter(
                (p) => p.category === "Editing & Shooting"
              ).length,
            },
            {
              label: "SOUND",
              value: projects.filter((p) => p.category === "Sound Mixing")
                .length,
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-lg p-4"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(201,169,110,0.06)",
              }}
            >
              <p
                className="tv-hint text-[9px] tracking-[0.2em] mb-1"
                style={{ color: "var(--dim)" }}
              >
                {stat.label}
              </p>
              <p
                className="font-display text-2xl font-bold"
                style={{ color: "var(--accent-warm)" }}
              >
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between mb-6">
          <h2
            className="font-display text-xl font-bold text-accent"
            style={{ fontStyle: "italic" }}
          >
            Projects
          </h2>
          <div className="flex gap-2">
            <button
              onClick={handleReset}
              className="px-4 py-2.5 rounded-lg tv-hint text-[10px] tracking-[0.15em] transition-all duration-200"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "var(--muted)",
              }}
            >
              RESET DEFAULTS
            </button>
            <button
              onClick={() => {
                setEditingProject(null);
                setShowForm(true);
              }}
              className="px-5 py-2.5 rounded-lg tv-hint text-[10px] tracking-[0.15em] transition-all duration-200 flex items-center gap-2"
              style={{
                background: "rgba(201,169,110,0.12)",
                border: "1px solid rgba(201,169,110,0.25)",
                color: "var(--accent-warm)",
              }}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="8" y1="2" x2="8" y2="14" />
                <line x1="2" y1="8" x2="14" y2="8" />
              </svg>
              ADD PROJECT
            </button>
          </div>
        </div>

        {/* Project list */}
        <div className="space-y-2" style={{ animation: "adminFadeIn 0.6s ease 0.1s both" }}>
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="group rounded-lg flex items-center gap-4 px-5 py-4 transition-all duration-200"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(201,169,110,0.06)",
              }}
            >
              {/* Order controls */}
              <div className="flex flex-col gap-0.5">
                <button
                  onClick={() => moveProject(index, "up")}
                  disabled={index === 0}
                  className="w-6 h-6 rounded flex items-center justify-center transition-all duration-200"
                  style={{
                    opacity: index === 0 ? 0.2 : 0.5,
                    background:
                      index === 0 ? "transparent" : "rgba(255,255,255,0.04)",
                  }}
                  title="Move up"
                >
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M2 6l3-3 3 3" />
                  </svg>
                </button>
                <button
                  onClick={() => moveProject(index, "down")}
                  disabled={index === projects.length - 1}
                  className="w-6 h-6 rounded flex items-center justify-center transition-all duration-200"
                  style={{
                    opacity: index === projects.length - 1 ? 0.2 : 0.5,
                    background:
                      index === projects.length - 1
                        ? "transparent"
                        : "rgba(255,255,255,0.04)",
                  }}
                  title="Move down"
                >
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M2 4l3 3 3-3" />
                  </svg>
                </button>
              </div>

              {/* Index */}
              <span
                className="tv-hint text-[10px] w-6 text-center"
                style={{ color: "var(--dim)" }}
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              {/* Color dot */}
              <div
                className="w-3 h-3 rounded-full shrink-0"
                style={{
                  background: project.accent,
                  boxShadow: `0 0 8px ${project.accent}40`,
                }}
              />

              {/* Thumbnail (YouTube) */}
              {project.youtube && (
                <div
                  className="w-16 h-10 rounded overflow-hidden shrink-0 hidden md:block"
                  style={{
                    background: "#111",
                    border: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  <img
                    src={`https://img.youtube.com/vi/${
                      project.youtube.split("/embed/")[1]?.split("?")[0] ?? ""
                    }/mqdefault.jpg`}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h3
                  className="text-[14px] font-medium text-accent truncate"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {project.title}
                </h3>
                <div className="flex items-center gap-2 mt-0.5">
                  <span
                    className="tv-hint text-[9px]"
                    style={{ color: project.accent }}
                  >
                    {project.category}
                  </span>
                  <span
                    className="w-0.5 h-0.5 rounded-full"
                    style={{ background: "var(--dim)" }}
                  />
                  <span
                    className="tv-hint text-[9px]"
                    style={{ color: "var(--dim)" }}
                  >
                    {project.year}
                  </span>
                </div>
              </div>

              {/* Tags */}
              <div className="hidden lg:flex gap-1.5">
                {project.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="tv-hint text-[8px] px-2 py-1 rounded-full"
                    style={{
                      background: `${project.accent}0a`,
                      border: `1px solid ${project.accent}18`,
                      color: `${project.accent}88`,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-1.5 opacity-40 group-hover:opacity-100 transition-opacity duration-200">
                <button
                  onClick={() => {
                    setEditingProject(project);
                    setShowForm(true);
                  }}
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200"
                  style={{
                    background: "rgba(201,169,110,0.06)",
                    border: "1px solid rgba(201,169,110,0.12)",
                  }}
                  title="Edit project"
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--accent-warm)"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                </button>
                <button
                  onClick={() => setDeleteTarget(project)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200"
                  style={{
                    background: "rgba(255,80,80,0.06)",
                    border: "1px solid rgba(255,80,80,0.12)",
                  }}
                  title="Delete project"
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#ff6b6b"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                  </svg>
                </button>
              </div>
            </div>
          ))}

          {projects.length === 0 && (
            <div
              className="text-center py-20 rounded-xl"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px dashed rgba(201,169,110,0.1)",
              }}
            >
              <p
                className="tv-hint text-[11px] mb-4"
                style={{ color: "var(--dim)" }}
              >
                NO PROJECTS YET
              </p>
              <button
                onClick={() => {
                  setEditingProject(null);
                  setShowForm(true);
                }}
                className="px-5 py-2.5 rounded-lg tv-hint text-[10px] tracking-[0.15em] transition-all duration-200"
                style={{
                  background: "rgba(201,169,110,0.1)",
                  border: "1px solid rgba(201,169,110,0.2)",
                  color: "var(--accent-warm)",
                }}
              >
                ADD YOUR FIRST PROJECT
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Modals */}
      {showForm && (
        <ProjectFormModal
          project={editingProject}
          onSave={handleAddOrEdit}
          onCancel={() => {
            setShowForm(false);
            setEditingProject(null);
          }}
        />
      )}

      {deleteTarget && (
        <DeleteConfirm
          project={deleteTarget}
          onConfirm={() => handleDelete(deleteTarget)}
          onCancel={() => setDeleteTarget(null)}
        />
      )}

      {toast && <Toast message={toast.msg} type={toast.type} />}

      <style>{`
        @keyframes adminFadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes adminModalIn {
          from { opacity: 0; transform: scale(0.93) translateY(16px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}

/* ═══════════════════════════ PAGE ═══════════════════════════ */
export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    setAuthed(isAuthenticated());
    setChecking(false);
  }, []);

  if (checking) {
    return (
      <div
        className="min-h-screen bg-bg flex items-center justify-center"
        style={{ color: "var(--dim)" }}
      >
        <div
          className="w-6 h-6 rounded-full"
          style={{
            border: "2px solid rgba(201,169,110,0.1)",
            borderTopColor: "rgba(201,169,110,0.6)",
            animation: "spin 0.8s linear infinite",
          }}
        />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (!authed) {
    return <LoginScreen onLogin={() => setAuthed(true)} />;
  }

  return <Dashboard onLogout={() => setAuthed(false)} />;
}
