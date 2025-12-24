"use client";

import assets from "../assets /assets";
import Image from "next/image";
import { useState } from "react";

function Contact() {
  const [result, setResult] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending...");

    const formData = new FormData(event.target);
    formData.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_KEY);

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.error("Error submitting form:", data);
      setResult(data.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div
      id="contact"
      className="bg-[#F6F5F2] w-full px-[12%] py-10 scroll-mt-20"
    >
      <h4 className="text-center text-lg mb-2 font-ovo">Connect With Me</h4>
      <h2 className="text-center text-4xl">Get In Touch</h2>
      <p className="mt-5 mb-12 font-ovo mx-auto max-w-2xl text-center">
        I'd love to hear from you! If you have any question, comments, or
        feedback, please use the form below.
      </p>

      <form onSubmit={onSubmit} className="mx-auto max-w-2xl">
        <div className="grid grid-cols-auto sm:grid-cols-2 gap-6 mt-10 mb-8">
          <input
            className="outline-none bg-white p-3 border border-gray-400 rounded-md"
            type="text"
            placeholder="Enter your name"
            required
            name="name"
          />
          <input
            className="outline-none bg-white p-3 border border-gray-400 rounded-md"
            type="email"
            placeholder="Enter your email"
            required
            name="email"
          />
        </div>

        <textarea
          className="w-full p-4 mb-6 outline-none border border-gray-400 bg-white rounded-md"
          rows="6"
          placeholder="Enter your message"
          required
          name="message"
        />

        <button
          className="cursor-pointer py-3 px-8 w-max flex items-center justify-between gap-2 bg-[#132440] text-white rounded-full mx-auto hover:bg-[#001F3D]"
          type="submit"
        >
          Submit now
          <Image src={assets.right_arrow_white} alt="Submit" className="w-4" />
        </button>

        <p className="mt-4">{result}</p>
      </form>
    </div>
  );
}

export default Contact;