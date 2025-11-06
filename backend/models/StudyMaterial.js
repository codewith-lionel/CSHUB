const mongoose = require("mongoose");

const studyMaterialSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    subject: {
      type: String,
      required: [true, "Subject is required"],
      trim: true,
    },
    year: {
      type: String,
      required: [true, "Year is required"],
      enum: ["1st Year", "2nd Year", "3rd Year"],
    },
    semester: {
      type: String,
      required: [true, "Semester is required"],
      enum: [
        "Semester 1",
        "Semester 2",
        "Semester 3",
        "Semester 4",
        "Semester 5",
        "Semester 6",
      ],
    },
    description: {
      type: String,
      trim: true,
    },
    fileUrl: {
      type: String,
      required: [true, "File URL is required"],
      trim: true,
    },
    fileType: {
      type: String,
      default: "PDF",
      enum: ["PDF", "DOC", "PPT", "ZIP", "Other"],
    },
    uploadedBy: {
      type: String,
      default: "Admin",
    },
    category: {
      type: String,
      enum: [
        "Notes",
        "Question Papers",
        "Syllabus",
        "Assignments",
        "Reference Books",
        "Lab Manual",
        "Other",
      ],
      default: "Notes",
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

// Indexes for faster queries
studyMaterialSchema.index({ year: 1, semester: 1, subject: 1 });
studyMaterialSchema.index({ isActive: 1 });

module.exports = mongoose.model("StudyMaterial", studyMaterialSchema);
