import React from 'react'

const Service = () => {
    const services = [
  {
    icon: "⚛️",
    title: "Frontend Development",
    desc: "Modern React UI with Tailwind and responsive layouts."
  },
  {
    icon: "🧠",
    title: "MERN Stack Apps",
    desc: "Full-stack apps with APIs, auth, and dashboards."
  },
  {
    icon: "🎨",
    title: "UI to Code",
    desc: "Convert Figma designs into clean React components."
  },
  {
    icon: "🚀",
    title: "SaaS MVP",
    desc: "Build MVPs for startups with scalable architecture."
  }
];
  return (
    <section className="py-20 bg-[var(--primary-color)]" id="services">
  <div className="max-w-6xl mx-auto px-6">
    <h2 className="text-3xl font-semibold text-center mb-4">
      What I Can Help You With
    </h2>
    <p className="text-center text-gray-600 mb-12">
      Services tailored for startups, founders, and businesses
    </p>

    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {services.map((service, i) => (
        <div
          key={i}
          className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
        >
          <div className="text-green-600 text-3xl mb-3">
            {service.icon}
          </div>
          <h3 className="font-semibold mb-2">{service.title}</h3>
          <p className="text-sm text-gray-600">{service.desc}</p>
        </div>
      ))}
    </div>
  </div>
</section>
  )
}

export default Service