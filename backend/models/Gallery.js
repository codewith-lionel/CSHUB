const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    imageUrl: {
      type: String,
      required: [true, "Image URL is required"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: [
        "Events",
        "Workshops",
        "Seminars",
        "Hackathons",
        "Cultural",
        "Sports",
        "Achievements",
        "Campus Life",
        "Labs",
        "Infrastructure",
        "Faculty",
        "Students",
        "Convocation",
        "Competitions",
        "Other",
      ],
      default: "Other",
    },
    eventDate: {
      type: Date,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    uploadedBy: {
      type: String,
      default: "Admin",
      trim: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    views: {
      type: Number,
      default: 0,
    },
    likes: {
      type: Number,
      default: 0,
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
gallerySchema.index({ category: 1, isActive: 1 });
gallerySchema.index({ isFeatured: 1 });
gallerySchema.index({ createdAt: -1 });
gallerySchema.index({ eventDate: -1 });

module.exports = mongoose.model("Gallery", gallerySchema);
