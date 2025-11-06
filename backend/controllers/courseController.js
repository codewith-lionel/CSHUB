const Course = require("../models/Course");

// Get all courses
exports.getAllCourses = async (req, res) => {
  try {
    const { level, semester, search, isActive = true } = req.query;

    let query = { isActive };

    if (level) {
      query.level = level;
    }

    if (semester) {
      query.semester = semester;
    }

    if (search) {
      query.$or = [
        { courseCode: { $regex: search, $options: "i" } },
        { title: { $regex: search, $options: "i" } },
        { instructor: { $regex: search, $options: "i" } },
      ];
    }

    const courses = await Course.find(query).sort({ courseCode: 1 });

    res.status(200).json({
      success: true,
      count: courses.length,
      data: courses,
    });
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching courses",
      error: error.message,
    });
  }
};

// Get single course by ID
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    res.status(200).json({
      success: true,
      data: course,
    });
  } catch (error) {
    console.error("Error fetching course:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching course",
      error: error.message,
    });
  }
};

// Create new course
exports.createCourse = async (req, res) => {
  try {
    console.log("Received course data:", req.body);

    const course = await Course.create(req.body);

    console.log("Course created successfully:", course);

    res.status(201).json({
      success: true,
      message: "Course created successfully",
      data: course,
    });
  } catch (error) {
    console.error("Error creating course:", error);

    // Handle duplicate course code error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Course code already exists",
        error: "A course with this code already exists",
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
      message: "Error creating course",
      error: error.message,
    });
  }
};

// Update course
exports.updateCourse = async (req, res) => {
  try {
    console.log("Updating course:", req.params.id);
    console.log("Update data:", req.body);

    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    console.log("Course updated successfully:", course);

    res.status(200).json({
      success: true,
      message: "Course updated successfully",
      data: course,
    });
  } catch (error) {
    console.error("Error updating course:", error);

    // Handle duplicate course code error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Course code already exists",
        error: "A course with this code already exists",
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
      message: "Error updating course",
      error: error.message,
    });
  }
};

// Delete course (soft delete)
exports.deleteCourse = async (req, res) => {
  try {
    console.log("Deleting course:", req.params.id);

    const course = await Course.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    console.log("Course deleted successfully:", course);

    res.status(200).json({
      success: true,
      message: "Course deleted successfully",
      data: course,
    });
  } catch (error) {
    console.error("Error deleting course:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting course",
      error: error.message,
    });
  }
};
