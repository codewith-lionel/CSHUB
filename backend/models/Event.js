const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    eventType: {
      type: String,
      required: [true, "Event type is required"],
      enum: [
        "Workshop",
        "Seminar",
        "Conference",
        "Hackathon",
        "Competition",
        "Guest Lecture",
        "Cultural Event",
        "Sports",
        "Technical Event",
        "Announcement",
        "Holiday",
        "Exam",
        "Other",
      ],
      default: "Other",
    },
    eventDate: {
      type: Date,
      required: [true, "Event date is required"],
    },
    startTime: {
      type: String,
      trim: true,
    },
    endTime: {
      type: String,
      trim: true,
    },
    venue: {
      type: String,
      trim: true,
    },
    organizer: {
      type: String,
      trim: true,
      default: "CS Department",
    },
    contactPerson: {
      type: String,
      trim: true,
    },
    contactEmail: {
      type: String,
      trim: true,
      lowercase: true,
    },
    contactPhone: {
      type: String,
      trim: true,
    },
    registrationLink: {
      type: String,
      trim: true,
    },
    imageUrl: {
      type: String,
      trim: true,
    },
    maxParticipants: {
      type: Number,
    },
    isRegistrationOpen: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["Upcoming", "Ongoing", "Completed", "Cancelled"],
      default: "Upcoming",
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
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
eventSchema.index({ eventDate: 1, status: 1 });
eventSchema.index({ eventType: 1 });
eventSchema.index({ isFeatured: 1 });
eventSchema.index({ isActive: 1 });

// Virtual for checking if event is past
eventSchema.virtual("isPast").get(function () {
  return this.eventDate < new Date();
});

// Method to auto-update status based on date
eventSchema.methods.updateStatus = function () {
  const now = new Date();
  if (this.eventDate < now && this.status === "Upcoming") {
    this.status = "Completed";
  }
};

module.exports = mongoose.model("Event", eventSchema);
