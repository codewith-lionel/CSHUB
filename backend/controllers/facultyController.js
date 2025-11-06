const Faculty = require("../models/Faculty");

// Get all faculty
exports.getAllFaculty = async (req, res) => {
  try {
    const { department, designation, search, isActive = true } = req.query;

    let query = { isActive };

    if (department) {
      query.department = department;
    }

    if (designation) {
      query.designation = designation;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { specialization: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    const faculty = await Faculty.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: faculty.length,
      data: faculty,
    });
  } catch (error) {
    console.error("Error fetching faculty:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching faculty",
      error: error.message,
    });
  }
};

// Get single faculty by ID
exports.getFacultyById = async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.params.id);

    if (!faculty) {
      return res.status(404).json({
        success: false,
        message: "Faculty not found",
      });
    }

    res.status(200).json({
      success: true,
      data: faculty,
    });
  } catch (error) {
    console.error("Error fetching faculty:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching faculty",
      error: error.message,
    });
  }
};

// Create new faculty
exports.createFaculty = async (req, res) => {
  try {
    console.log("Received faculty data:", req.body);

    // Create faculty
    const faculty = await Faculty.create(req.body);

    console.log("Faculty created successfully:", faculty);

    res.status(201).json({
      success: true,
      message: "Faculty created successfully",
      data: faculty,
    });
  } catch (error) {
    console.error("Error creating faculty:", error);

    // Handle duplicate email error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
        error: "A faculty member with this email already exists",
      });
    }

    // Handle validation errors
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
      message: "Error creating faculty",
      error: error.message,
    });
  }
};

// Update faculty
exports.updateFaculty = async (req, res) => {
  try {
    console.log("Updating faculty:", req.params.id);
    console.log("Update data:", req.body);

    const faculty = await Faculty.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!faculty) {
      return res.status(404).json({
        success: false,
        message: "Faculty not found",
      });
    }

    console.log("Faculty updated successfully:", faculty);

    res.status(200).json({
      success: true,
      message: "Faculty updated successfully",
      data: faculty,
    });
  } catch (error) {
    console.error("Error updating faculty:", error);

    // Handle duplicate email error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
        error: "A faculty member with this email already exists",
      });
    }

    // Handle validation errors
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
      message: "Error updating faculty",
      error: error.message,
    });
  }
};

// Delete faculty (soft delete)
exports.deleteFaculty = async (req, res) => {
  try {
    console.log("Deleting faculty:", req.params.id);

    const faculty = await Faculty.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!faculty) {
      return res.status(404).json({
        success: false,
        message: "Faculty not found",
      });
    }

    console.log("Faculty deleted successfully:", faculty);

    res.status(200).json({
      success: true,
      message: "Faculty deleted successfully",
      data: faculty,
    });
  } catch (error) {
    console.error("Error deleting faculty:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting faculty",
      error: error.message,
    });
  }
};

// Permanent delete (optional - for admin use)
exports.permanentDeleteFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.findByIdAndDelete(req.params.id);

    if (!faculty) {
      return res.status(404).json({
        success: false,
        message: "Faculty not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Faculty permanently deleted",
    });
  } catch (error) {
    console.error("Error deleting faculty:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting faculty",
      error: error.message,
    });
  }
};
