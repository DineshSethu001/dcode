"use client";

import React from "react";
import Image from "next/image";
import assets from "../assets ";
import { Github, Linkedin, Mail, Phone } from "lucide-react";

function Footer() {
  return (
    <footer className="mt-24 bg-gradient-to-b ">
      {/* Top Section */}
      <div className="text-center px-6 py-14">
        <Image
          src={assets.logo}
          className="w-36 mx-auto mb-4"
          alt="Logo"
        />

        <p className="text-gray-600 max-w-xl mx-auto mb-6">
          Building modern, scalable, and user-focused web experiences using
          React, Node.js, and clean UI design.
        </p>

        {/* Contact */}
        <div className="flex items-center justify-center gap-2 text-gray-700">
          <Mail className="w-5 h-5 text-[#6A9457]" />
          <span className="font-medium">
            dineshsethu15981@gmail.com
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-300 mx-[10%]" />

      {/* Bottom Section */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 px-[10%] py-6">
        <p className="text-sm text-gray-600 text-center sm:text-left">
          © 2026 <span className="font-semibold text-gray-800">Dinesh Codehunt</span>.  
          All rights reserved.
        </p>

        {/* Social Links */}
        <ul className="flex items-center gap-6">
          <li>
            <a
              href="https://github.com/DineshSethu001"
              target="_blank"
              className="group flex items-center gap-2 text-gray-600 hover:text-black transition"
            >
              <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="hidden sm:block">GitHub</span>
            </a>
          </li>

          <li>
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              className="group flex items-center gap-2 text-gray-600 hover:text-[#0A66C2] transition"
            >
              <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="hidden sm:block">LinkedIn</span>
            </a>
          </li>

          <li>
            <a
              href="https://wa.me/91XXXXXXXXXX"
              target="_blank"
              className="group flex items-center gap-2 text-gray-600 hover:text-green-600 transition"
            >
              <Phone className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="hidden sm:block">WhatsApp</span>
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
