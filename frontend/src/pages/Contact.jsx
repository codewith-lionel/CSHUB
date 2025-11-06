import React, { useEffect, useRef, useState } from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPaperPlane,
} from "react-icons/fa";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  useEffect(() => {
    gsap.from(formRef.current, {
      opacity: 0,
      y: 60,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: { trigger: formRef.current, start: "top 85%" },
    });
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", form);
    alert("Message sent successfully!");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 py-20 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* CONTACT INFO */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl font-extrabold text-indigo-800 mb-8">
            Get in Touch
          </h1>
          <p className="text-gray-700 mb-8 text-lg">
            Have questions or want to collaborate? Reach out to us and let’s
            create something incredible together.
          </p>

          <div className="space-y-5 text-gray-700">
            <div className="flex items-center gap-4">
              <FaPhoneAlt className="text-indigo-600 text-2xl" />
              <span>+91 98765 43210</span>
            </div>
            <div className="flex items-center gap-4">
              <FaEnvelope className="text-indigo-600 text-2xl" />
              <span>info@schoolofcomputing.edu</span>
            </div>
            <div className="flex items-center gap-4">
              <FaMapMarkerAlt className="text-indigo-600 text-2xl" />
              <span>123 Tech Avenue, Chennai, India</span>
            </div>
          </div>
        </motion.div>

        {/* CONTACT FORM */}
        <div ref={formRef} className="relative">
          <form
            onSubmit={handleSubmit}
            className="backdrop-blur-lg bg-white/70 rounded-2xl p-8 shadow-xl space-y-5"
          >
            <div>
              <label className="block mb-2 text-gray-700 font-medium">
                Name
              </label>
              <motion.input
                whileFocus={{ scale: 1.03 }}
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-indigo-200 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none transition"
              />
            </div>
            <div>
              <label className="block mb-2 text-gray-700 font-medium">
                Email
              </label>
              <motion.input
                whileFocus={{ scale: 1.03 }}
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-indigo-200 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none transition"
              />
            </div>
            <div>
              <label className="block mb-2 text-gray-700 font-medium">
                Message
              </label>
              <motion.textarea
                whileFocus={{ scale: 1.03 }}
                name="message"
                rows="4"
                value={form.message}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-indigo-200 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none transition resize-none"
              ></motion.textarea>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg flex items-center justify-center gap-2 hover:bg-indigo-700 transition"
            >
              <FaPaperPlane /> Send Message
            </motion.button>
          </form>
        </div>
      </div>

      {/* MAP SECTION */}
      <div className="mt-20 max-w-6xl mx-auto rounded-xl overflow-hidden shadow-lg">
        <iframe
          title="map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.519598058827!2d80.24209737480463!3d13.064911387255412!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526f1a38bb20b1%3A0x874e7b05713d34a4!2sAnna%20University!5e0!3m2!1sen!2sin!4v1690303089625!5m2!1sen!2sin"
          width="100%"
          height="350"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default Contact;
