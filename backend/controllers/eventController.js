const Event = require("../models/Event");

// Get all events (with filters)
exports.getAllEvents = async (req, res) => {
  try {
    const {
      eventType,
      status,
      isFeatured,
      isActive = true,
      upcoming,
    } = req.query;

    let query = { isActive };

    if (eventType) {
      query.eventType = eventType;
    }

    if (status) {
      query.status = status;
    }

    if (isFeatured !== undefined) {
      query.isFeatured = isFeatured === "true";
    }

    // Filter for upcoming events only
    if (upcoming === "true") {
      query.eventDate = { $gte: new Date() };
      query.status = "Upcoming";
    }

    const events = await Event.find(query).sort({
      eventDate: 1,
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: events.length,
      data: events,
    });
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching events",
      error: error.message,
    });
  }
};

// Get single event by ID
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    res.status(200).json({
      success: true,
      data: event,
    });
  } catch (error) {
    console.error("Error fetching event:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching event",
      error: error.message,
    });
  }
};

// Get upcoming events
exports.getUpcomingEvents = async (req, res) => {
  try {
    const events = await Event.find({
      isActive: true,
      status: "Upcoming",
      eventDate: { $gte: new Date() },
    })
      .sort({ eventDate: 1 })
      .limit(10);

    res.status(200).json({
      success: true,
      count: events.length,
      data: events,
    });
  } catch (error) {
    console.error("Error fetching upcoming events:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching upcoming events",
      error: error.message,
    });
  }
};

// Get featured events
exports.getFeaturedEvents = async (req, res) => {
  try {
    const events = await Event.find({
      isActive: true,
      isFeatured: true,
    })
      .sort({ eventDate: 1 })
      .limit(5);

    res.status(200).json({
      success: true,
      count: events.length,
      data: events,
    });
  } catch (error) {
    console.error("Error fetching featured events:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching featured events",
      error: error.message,
    });
  }
};

// Create new event
exports.createEvent = async (req, res) => {
  try {
    console.log("Received event data:", req.body);

    const event = await Event.create(req.body);

    console.log("Event created successfully:", event);

    res.status(201).json({
      success: true,
      message: "Event created successfully",
      data: event,
    });
  } catch (error) {
    console.error("Error creating event:", error);

    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: "Validation error",
        error: messages.join(", "),
      });
    }

    res.status(500).json({
      success: false,
      message: "Error creating event",
      error: error.message,
    });
  }
};

// Update event
exports.updateEvent = async (req, res) => {
  try {
    console.log("Updating event:", req.params.id);
    console.log("Update data:", req.body);

    const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    console.log("Event updated successfully:", event);

    res.status(200).json({
      success: true,
      message: "Event updated successfully",
      data: event,
    });
  } catch (error) {
    console.error("Error updating event:", error);

    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: "Validation error",
        error: messages.join(", "),
      });
    }

    res.status(500).json({
      success: false,
      message: "Error updating event",
      error: error.message,
    });
  }
};

// Delete event (soft delete)
exports.deleteEvent = async (req, res) => {
  try {
    console.log("Deleting event:", req.params.id);

    const event = await Event.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    console.log("Event deleted successfully:", event);

    res.status(200).json({
      success: true,
      message: "Event deleted successfully",
      data: event,
    });
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting event",
      error: error.message,
    });
  }
};
