import { serviceData, assets } from "../assets /assets";
import Image from "next/image";

export default function Services() {
  return (
    <div id="services" className="bg-[#F6F5F2] w-full px-[12%] py-10 scroll-mt-20">
      <h4 className="text-center mb-2 text-lg font-ovo">What I Offer</h4>
      <h2 className="text-center text-5xl font-ovo">My services</h2>

      <p className="mt-5 mb-12 max-w-2xl text-center font-ovo mx-auto">
        I am a MERN stack Developer from Vellore, India with 1.5+ years of
        experience at Mindbowser and Sutherland.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-10">
        {serviceData.map(({ icon, title, description, link }, index) => (
          <div
            key={index}
            className="border border-gray-400 rounded-lg px-8 py-12
            transition-all duration-300 ease-out cursor-pointer
            hover:shadow-[var(--shadow-black)]
            hover:bg-[var(--color-lightHover)]
            hover:-translate-y-1"
          >
            <Image src={icon} alt={title} width={40} height={40} />

            <h3 className="text-lg my-4 text-gray-700">{title}</h3>
            <p className="text-sm text-gray-600 leading-5">{description}</p>

            <a href={link} className="flex items-center gap-2 text-sm mt-5">
              Read More
              <Image
                src={assets.right_arrow}
                alt="arrow"
                width={16}
                height={16}
              />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
