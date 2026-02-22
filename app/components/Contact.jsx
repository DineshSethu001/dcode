"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { assets } from "../assets/index";
/* ---------------- Animations ---------------- */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const toastAnim = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: 30, scale: 0.95 },
};

/* ---------------- Magnetic Button Hook ---------------- */

const useMagnetic = () => {
  const ref = useRef(null);

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    el.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
  };

  const reset = () => {
    if (ref.current) ref.current.style.transform = "translate(0,0)";
  };

  return { ref, handleMove, reset };
};

function Contact() {
  const [toast, setToast] = useState(null);
  const magnetic = useMagnetic();

  const onSubmit = async (event) => {
    event.preventDefault();
    setToast({ type: "loading", message: "Sending..." });

    const formData = new FormData(event.target);
    formData.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_KEY);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (data.success) {
      setToast({ type: "success", message: "Message sent successfully 🚀" });
      event.target.reset();
    } else {
      setToast({ type: "error", message: "Something went wrong ❌" });
    }

    setTimeout(() => setToast(null), 3000);
  };

  return (
    <section
      id="contact"
         style={{
  backgroundImage: "url('/connect.png')",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
}}
      className="relative overflow-hidden bg-[#F6F5F2] px-[12%] py-20"
    >
      {/* 🌊 Animated Background Blobs */}
      <motion.div
        className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-[#6A9457]/20 rounded-full blur-3xl"
        animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-[-120px] right-[-120px] w-[320px] h-[320px] bg-[#132440]/20 rounded-full blur-3xl"
        animate={{ x: [0, -40, 0], y: [0, -30, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
      />

      {/* Content */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative z-10"
      >
        <h4 className="text-center text-lg mb-2 font-ovo">Connect With Me</h4>
        <h2 className="text-center text-4xl font-semibold">Get In Touch</h2>

        <p className="mt-5 mb-12 max-w-2xl mx-auto text-center text-gray-600">
          Have a project, idea, or feedback? Let’s talk.
        </p>

        {/* Form */}
        <form onSubmit={onSubmit} className="max-w-2xl mx-auto space-y-8">
          {/* Floating Input */}
          {["name", "email"].map((field, i) => (
            <div key={i} className="relative">
              <input
                type={field === "email" ? "email" : "text"}
                name={field}
                required
                className="peer w-full bg-white/30 backdrop-blur-md
           border border-white/40 rounded-md
           px-4 py-3 text-gray-900
           outline-none focus:border-[#132440]"
              />
              <label
                className="absolute left-4 top-3 text-gray-500 bg-white px-1
                           transition-all peer-focus:-top-2 peer-focus:text-xs
                           peer-valid:-top-2 peer-valid:text-xs"
              >
                {field === "name" ? "Your Name" : "Your Email"}
              </label>
            </div>
          ))}

          {/* Floating Textarea */}
          <div className="relative">
            <textarea
              name="message"
              rows="5"
              required
              className="peer w-full bg-white/30 backdrop-blur-md
           border border-white/40 rounded-md
           px-4 py-3 text-gray-900
           outline-none focus:border-[#132440]"
            />
            <label
              className="absolute left-4 top-3 text-gray-500 bg-white px-1
                         transition-all peer-focus:-top-2 peer-focus:text-xs
                         peer-valid:-top-2 peer-valid:text-xs"
            >
              Your Message
            </label>
          </div>

          {/* 🧲 Magnetic Button */}
          <div className="flex justify-center">
            <motion.button
              ref={magnetic.ref}
              onMouseMove={magnetic.handleMove}
              onMouseLeave={magnetic.reset}
              whileTap={{ scale: 0.9 }}
              className="relative px-8 py-3 bg-[#132440] text-white rounded-full
                         flex items-center gap-2 shadow-lg"
            >
              Submit
              <Image src={assets.right_arrow_white} alt="" className="w-4" />
            </motion.button>
          </div>
        </form>
      </motion.div>

      {/* ✨ Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            variants={toastAnim}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`fixed bottom-6 right-6 px-6 py-3 rounded-lg text-white shadow-lg
              ${
                toast.type === "success"
                  ? "bg-green-600"
                  : toast.type === "error"
                  ? "bg-red-600"
                  : "bg-blue-600"
              }`}
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default Contact;
