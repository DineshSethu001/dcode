"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Menu, LogIn } from "lucide-react";
import { routes } from "@/app/router/routes";

/* 🧲 Magnetic Hook */
const useMagnetic = () => {
  const ref = useRef(null);

  const onMove = (e) => {
    if (window.innerWidth < 768) return;
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    el.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
  };

  const reset = () => {
    if (ref.current) {
      ref.current.style.transform = "translate(0,0)";
    }
  };

  return { ref, onMove, reset };
};

export default function Navbar() {
  const [active, setActive] = useState("home");
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);
  const [showBar, setShowBar] = useState(false);
  const [visible, setVisible] = useState(true);

  // 👉 NEW STATE
  const [contactOpen, setContactOpen] = useState(false);

  const lastScrollY = useRef(0);
  const scrollTimeout = useRef(null);

  useEffect(() => {
    const sectionIds = routes.map((r) => r.href.replace("#", ""));

    const onScroll = () => {
      const currentY = window.scrollY;

      if (currentY > lastScrollY.current && currentY > 100) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      lastScrollY.current = currentY;

      setShowBar(true);
      clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => setShowBar(false), 900);

      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      setProgress((currentY / height) * 100);

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= 120 && rect.bottom >= 120) {
          setActive(id);
          break;
        }
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* 🧭 Progress Bar */}
      <AnimatePresence>
        {showBar && (
          <motion.div className="fixed top-0 left-0 w-full h-[3px] z-[60]">
            <motion.div
              className="h-full"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.25 }}
              style={{
                background:
                  "linear-gradient(90deg, var(--react-blue), var(--primary))",
                boxShadow: "0 0 10px var(--react-blue)",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navbar */}
      <motion.header
        animate={{ y: visible ? 0 : -80 }}
        transition={{ duration: 0.3 }}
        className="fixed top-[3px] left-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-gray-200"
      >
        <nav className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2">
            <Image src="/images/logo.png" alt="Logo" width={36} height={36} />
            <span className="logo-gradient font-semibold text-2xl">
              Dinesh
            </span>
          </a>

          {/* Desktop Nav */}
          <ul className="hidden md:flex gap-8">
            {routes.map((r) => {
              const id = r.href.replace("#", "");
              const magnet = useMagnetic();

              return (
                <li key={r.label}>
                  <a
                    ref={magnet.ref}
                    href={r.href}
                    onMouseMove={magnet.onMove}
                    onMouseLeave={magnet.reset}
                    className="relative text-sm font-medium transition"
                    style={{
                      color: active === id ? "#8A7650" : "#562F00",
                    }}
                  >
                    {r.label}
                    {active === id && (
                      <motion.span
                        layoutId="underline"
                        className="absolute -bottom-1 left-0 h-[2px] w-full"
                        style={{
                          background:
                            "linear-gradient(90deg, var(--react-blue), var(--primary))",
                        }}
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Actions */}
          <div className="flex gap-3">
            {/* Hire Me */}
            <button
              onClick={() => setContactOpen(true)}
              className="relative inline-flex items-center justify-center
                         px-6 py-3 font-semibold bg-[#117554]
                         text-white rounded-full
                         border border-[#00ED64]
                         transition-all duration-300
                         hover:scale-105 active:scale-95
                         hover:text-[#117554] hover:bg-white
                         before:absolute before:inset-0 before:rounded-full
                         before:border before:border-[#00ED64]
                         before:opacity-0
                         before:transition-opacity before:duration-300
                         hover:before:opacity-100
                         hover:before:shadow-[0_0_18px_rgba(0,237,100,0.55)]
                         before:pointer-events-none"
            >
              Hire Me →
            </button>

            {/* Admin */}
            <Link
              href="/admin/login"
              className="relative inline-flex items-center gap-2
                         px-5 py-2 font-medium
                         text-[#117554]
                         rounded-full
                         border border-[#00ED64]
                         transition-all duration-300
                         hover:bg-[#117554] hover:text-[#FFF4EA]
                         hover:shadow-[0_0_15px_rgba(0,237,100,0.5)]
                         hover:scale-105 active:scale-95"
            >
              <LogIn size={16} />
              Admin
            </Link>

            <button onClick={() => setOpen(true)} className="md:hidden">
              <Menu />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* 📩 Contact Modal */}
      <AnimatePresence>
        {contactOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60"
            onClick={() => setContactOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="w-[90%] max-w-sm rounded-2xl bg-white p-6 text-center"
            >
              <h3 className="text-lg font-semibold text-[#117554] mb-2">
                Let’s connect
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                How would you like to contact me?
              </p>

              <div className="flex gap-4">
                <a
                  href="mailto:dineshsethu15981@gmail.com?subject=Hiring Inquiry"
                  className="flex-1 py-3 rounded-xl
                             border border-[#00ED64]
                             text-[#117554] font-medium
                             transition hover:bg-[#117554] hover:text-white"
                >
                  📧 Email
                </a>

                <a
                  href="https://wa.me/917339572897?text=Hi,%20I%20want%20to%20hire%20you"
                  target="_blank"
                  className="flex-1 py-3 rounded-xl
                             bg-[#00ED64] text-black font-medium
                             transition hover:shadow-[0_0_15px_rgba(0,237,100,0.5)]"
                >
                  💬 WhatsApp
                </a>
              </div>

              <button
                onClick={() => setContactOpen(false)}
                className="mt-6 text-sm text-gray-400 hover:text-gray-600"
              >
                Cancel
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}