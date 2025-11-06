import React, { useState, useEffect, useRef } from "react";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaClock,
  FaGraduationCap,
  FaUser,
} from "react-icons/fa";
import { facultyAPI } from "../services/api";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Faculty = () => {
  const [faculty, setFaculty] = useState([]);
  const [filteredFaculty, setFilteredFaculty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDesignation, setSelectedDesignation] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  // Fetch faculty
  useEffect(() => {
    fetchFaculty();
  }, []);

  useEffect(() => {
    let filtered = faculty;
    if (selectedDesignation !== "All") {
      filtered = filtered.filter((f) => f.designation === selectedDesignation);
    }
    if (searchTerm) {
      filtered = filtered.filter(
        (f) =>
          f.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          f.specialization?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          f.email?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredFaculty(filtered);
  }, [selectedDesignation, searchTerm, faculty]);

  const fetchFaculty = async () => {
    try {
      setLoading(true);
      const response = await facultyAPI.getAll();
      if (response.data.success && response.data.data) {
        const activeFaculty = response.data.data.filter(
          (f) => f.isActive !== false
        );
        setFaculty(activeFaculty);
        setFilteredFaculty(activeFaculty);
      }
    } catch (error) {
      console.error("Error fetching faculty:", error);
    } finally {
      setLoading(false);
    }
  };

  // GSAP animations
  useEffect(() => {
    if (!sectionRef.current) return;

    // Hero animation
    gsap.fromTo(
      ".faculty-hero h1",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".faculty-hero",
          start: "top 80%",
        },
      }
    );

    gsap.fromTo(
      ".faculty-hero p",
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".faculty-hero",
          start: "top 80%",
        },
      }
    );

    // Filters animation
    gsap.fromTo(
      ".faculty-filters",
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".faculty-filters",
          start: "top 85%",
        },
      }
    );

    // Faculty cards animation
    if (cardRefs.current.length > 0) {
      gsap.fromTo(
        cardRefs.current,
        { scale: 0.9, y: 50, opacity: 0 },
        {
          scale: 1,
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".faculty-grid",
            start: "top 85%",
          },
        }
      );
    }

    // Parallax background
    gsap.to(".faculty-bg", {
      yPercent: 20,
      ease: "none",
      scrollTrigger: {
        trigger: ".faculty-hero",
        scrub: true,
      },
    });
  }, [filteredFaculty]);

  const designations = [
    "All",
    "Professor",
    "Associate Professor",
    "Assistant Professor",
    "Lecturer",
    "Visiting Professor",
  ];

  return (
    <div
      ref={sectionRef}
      className="relative min-h-screen bg-gray-50 overflow-hidden"
    >
      {/* Parallax BG */}
      <div className="faculty-bg absolute inset-0 "></div>

      <div className="max-w-7xl mx-auto px-4 py-16 relative z-10">
        {/* Header */}
        <div className="faculty-hero text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-extrabold text-indigo-700 tracking-tight drop-shadow-md mb-4">
            Meet Our Faculty
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
            The brilliant minds driving innovation, research, and education
            forward.
          </p>
        </div>

        {/* Filters */}
        <div className="faculty-filters bg-white rounded-2xl shadow-lg p-8 mb-12 backdrop-blur-md bg-opacity-90">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Faculty
              </label>
              <input
                type="text"
                placeholder="Search by name, specialization, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Designation
              </label>
              <select
                value={selectedDesignation}
                onChange={(e) => setSelectedDesignation(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition"
              >
                {designations.map((designation) => (
                  <option key={designation} value={designation}>
                    {designation}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <p className="mt-4 text-sm text-gray-500">
            Showing {filteredFaculty.length} of {faculty.length} faculty members
          </p>
        </div>

        {/* Faculty Grid */}
        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading faculty members...</p>
          </div>
        ) : filteredFaculty.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <FaUser className="text-6xl text-gray-300 mx-auto mb-4" />
            <p className="text-xl text-gray-600 mb-4">
              {searchTerm || selectedDesignation !== "All"
                ? "No faculty members found matching your criteria"
                : "No faculty members available at the moment"}
            </p>
            {(searchTerm || selectedDesignation !== "All") && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedDesignation("All");
                }}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <div className="faculty-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredFaculty.map((member, i) => (
              <div
                key={member._id}
                ref={(el) => (cardRefs.current[i] = el)}
                className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden transform transition-all duration-500 hover:-translate-y-2 hover:scale-[1.03] group"
              >
                <div className="h-48 bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center relative">
                  {member.imageUrl ? (
                    <img
                      src={member.imageUrl}
                      alt={member.name}
                      className="w-32 h-32 rounded-full border-4 border-white object-cover transform group-hover:scale-105 transition duration-500 shadow-lg"
                    />
                  ) : (
                    <div className="w-32 h-32 rounded-full border-4 border-white bg-white flex items-center justify-center">
                      <FaUser className="text-5xl text-gray-400" />
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-indigo-600 font-medium mb-2">
                    {member.designation}
                  </p>
                  <p className="text-gray-600 text-sm mb-4">
                    {member.department}
                  </p>

                  <div className="flex items-start gap-2 mb-3 pb-3 border-b border-gray-200">
                    <FaGraduationCap className="text-indigo-600 mt-1" />
                    <div>
                      <p className="text-xs text-gray-500 uppercase">
                        Specialization
                      </p>
                      <p className="text-sm text-gray-900 font-medium">
                        {member.specialization}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-2">
                      <FaEnvelope className="text-indigo-600" />
                      <a
                        href={`mailto:${member.email}`}
                        className="hover:text-indigo-600"
                      >
                        {member.email}
                      </a>
                    </div>
                    {member.phone && (
                      <div className="flex items-center gap-2">
                        <FaPhone className="text-indigo-600" />
                        <a
                          href={`tel:${member.phone}`}
                          className="hover:text-indigo-600"
                        >
                          {member.phone}
                        </a>
                      </div>
                    )}
                    {member.officeLocation && (
                      <div className="flex items-center gap-2">
                        <FaMapMarkerAlt className="text-indigo-600" />
                        <span>{member.officeLocation}</span>
                      </div>
                    )}
                    {member.officeHours && (
                      <div className="flex items-center gap-2">
                        <FaClock className="text-indigo-600" />
                        <span>{member.officeHours}</span>
                      </div>
                    )}
                  </div>

                  {(member.qualification || member.experience) && (
                    <div className="pt-3 border-t border-gray-200">
                      {member.qualification && (
                        <p className="text-xs text-gray-600 mb-1">
                          <span className="font-semibold">Qualification:</span>{" "}
                          {member.qualification}
                        </p>
                      )}
                      {member.experience && (
                        <p className="text-xs text-gray-600">
                          <span className="font-semibold">Experience:</span>{" "}
                          {member.experience}
                        </p>
                      )}
                    </div>
                  )}

                  {member.researchInterests && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <p className="text-xs text-gray-500 uppercase mb-1">
                        Research Interests
                      </p>
                      <p className="text-sm text-gray-700">
                        {member.researchInterests}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Faculty;
