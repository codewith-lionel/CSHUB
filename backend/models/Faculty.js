const mongoose = require("mongoose");

const facultySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    designation: {
      type: String,
      required: [true, "Designation is required"],
      enum: [
        "Professor",
        "Associate Professor",
        "Assistant Professor",
        "Lecturer",
        "Visiting Professor",
        "Adjunct Professor",
      ],
    },
    department: {
      type: String,
      default: "Computer Science",
      trim: true,
    },
    specialization: {
      type: String,
      required: [true, "Specialization is required"],
      trim: true,
    },
    qualification: {
      type: String,
      trim: true,
    },
    experience: {
      type: String,
      trim: true,
    },
    imageUrl: {
      type: String,
      trim: true,
    },
    officeLocation: {
      type: String,
      trim: true,
    },
    officeHours: {
      type: String,
      trim: true,
    },
    researchInterests: {
      type: String,
      trim: true,
    },
    publications: {
      type: String,
      trim: true,
    },
    achievements: {
      type: String,
      trim: true,
    },
    bio: {
      type: String,
      trim: true,
    },
    socialLinks: {
      linkedin: String,
      github: String,
      researchGate: String,
      googleScholar: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster searches
facultySchema.index({ name: 1, email: 1 });

module.exports = mongoose.model("Faculty", facultySchema);
