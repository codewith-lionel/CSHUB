import React, { useEffect, useRef } from "react";
import { FaLightbulb, FaUsers, FaLaptopCode, FaGlobe } from "react-icons/fa";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRefs = useRef([]);

  useEffect(() => {
    sectionRefs.current.forEach((section) => {
      if (section) {
        gsap.from(section, {
          opacity: 0,
          y: 80,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
          },
        });
      }
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 overflow-hidden">
      {/* HERO */}
      <section className="relative py-20 text-center text-indigo-800">
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <FaLaptopCode className="text-7xl mx-auto mb-4 text-indigo-600 animate-bounce" />
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
            About Our Department
          </h1>
          <p className="text-lg max-w-2xl mx-auto text-gray-700">
            The School of Computing is committed to nurturing the next
            generation of innovators through technology, creativity, and
            collaboration.
          </p>
        </motion.div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(79,70,229,0.15),transparent)]"></div>
      </section>

      {/* MISSION & VISION */}
      <section
        ref={(el) => (sectionRefs.current[0] = el)}
        className="py-16 px-6 md:px-16 text-gray-700"
      >
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-indigo-700 mb-4">
              Our Mission
            </h2>
            <p className="text-lg leading-relaxed">
              To empower students to become competent computer scientists,
              ethical professionals, and visionary leaders capable of solving
              real-world challenges using cutting-edge technology.
            </p>
          </div>
          <div className="text-center">
            <FaLightbulb className="text-6xl text-yellow-500 mx-auto mb-4" />
          </div>
        </div>
      </section>

      <section
        ref={(el) => (sectionRefs.current[1] = el)}
        className="py-16 px-6 md:px-16 bg-white"
      >
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center">
            <FaGlobe className="text-6xl text-indigo-600 mx-auto mb-4" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-indigo-700 mb-4">
              Our Vision
            </h2>
            <p className="text-lg leading-relaxed">
              To be a global leader in computer science education, research, and
              innovation — fostering a culture of continuous learning and social
              responsibility.
            </p>
          </div>
        </div>
      </section>

      {/* VALUES / STATS */}
      <section
        ref={(el) => (sectionRefs.current[2] = el)}
        className="py-20 bg-gradient-to-r from-indigo-700 to-purple-700 text-white"
      >
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          {[
            { icon: <FaUsers />, label: "Dedicated Faculty", value: "20+" },
            {
              icon: <FaLaptopCode />,
              label: "Active Research Projects",
              value: "12",
            },
            { icon: <FaGlobe />, label: "Industry Partners", value: "15+" },
            { icon: <FaLightbulb />, label: "Innovation Awards", value: "8+" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.1 }}
              className="p-6 rounded-lg bg-white/10 backdrop-blur-md shadow-lg"
            >
              <div className="text-4xl mb-3">{stat.icon}</div>
              <h3 className="text-2xl font-bold">{stat.value}</h3>
              <p className="text-indigo-100">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
