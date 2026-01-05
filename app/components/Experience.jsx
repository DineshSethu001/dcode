"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { experienceData } from "../data/experienceData";
const techColors = {
  React: "bg-sky-100 text-sky-700",
  HTML:"text-orange-600" ,
 CSS: "text-blue-600" ,
  Angular: "text-red-600",
  Nodejs: "bg-green-100 text-green-700",
  TypeScript: "bg-blue-100 text-blue-700",
  JavaScript: "bg-yellow-100 text-yellow-700",
  Tailwind: "bg-cyan-100 text-cyan-700",
  PostgreSQL: "bg-indigo-100 text-indigo-700",
  MongoDB: "bg-emerald-100 text-emerald-700",
  Express: "bg-gray-200 text-gray-800",
  MySQL: "bg-orange-100 text-orange-700",
};

export default function Experience() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

   

  return (
    <section
      id="experience"
  

      className="bg-[#F6F5F2] w-full px-[8%] md:px-[12%] py-16]"
    >
      

      <h2 className="text-center text-4xl md:text-5xl font-ovo mb-16">
        Experience 
      </h2>

      <div className="relative max-w-4xl mx-auto">
        {/* Vertical Ladder Line */}
        <div className="absolute left-5 top-0 h-full w-[2px] bg-gray-300" />

        {experienceData.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            viewport={{ once: true }}
            className="relative pl-16 mb-12"
          >
            {/* Ladder Step */}
            
            <div className="absolute left-0 top-2 w-10 h-10 rounded-full bg-black text-white flex items-center justify-center text-xs font-semibold">
              {item.years}
            </div>

            <div
              onClick={() => toggle(index)}
              className="bg-white rounded-xl p-6 shadow-sm cursor-pointer
              hover:shadow-md transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {item.role}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {item.company}
                  </p>
                </div>

                <span className="text-xs text-gray-500 mt-2 sm:mt-0">
                  {item.duration}
                </span>
              </div>

              {/* Tech Stack Badges */}
              <div className="flex flex-wrap gap-2 mt-4">
  {item.tech.map((tech, i) => (
    <span
      key={i}
      className={`px-3 py-1 text-xs rounded-full font-medium
        ${techColors[tech] || "bg-gray-100 text-gray-700"}`}
    >
      {tech}
    </span>
  ))}
</div>


              {/* Expandable Content */}
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.ul
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden mt-4 list-disc pl-5 space-y-2 text-sm text-gray-600"
                  >
                    {item.points.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
