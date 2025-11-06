import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";


// Pages
import Home from "./pages/Home";
import Faculty from "./pages/Faculty";
import CoursesCatalog from "./pages/CoursesCatalog";
import StudyMaterials from "./pages/StudyMaterials";
import EventsAnnouncements from "./pages/EventsAnnouncements";
import Gallery from "./pages/Gallery";
import Achievements from "./pages/Achievements";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import About from "./pages/About";
import Contact from "./pages/Contact";



// Admin Pages
import ManageFaculty from "./pages/admin/ManageFaculty";
import ManageCourses from "./pages/admin/ManageCourses";
import ManageEvents from "./pages/admin/ManageEvents";
import ManageStudyMaterials from "./pages/admin/ManageStudyMaterials";
import ManageGallery from "./pages/admin/ManageGallery";
import ManageAchievements from "./pages/admin/ManageAchievements";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Routes>
          {/* Public Routes with Navbar and Footer */}a
          <Route
            path="/*"
            element={
              <>
                <Navbar />
                <main className="flex-grow">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/faculty" element={<Faculty />} />
                    <Route path="/academics" element={<CoursesCatalog />} />
                    <Route
                      path="/study-materials"
                      element={<StudyMaterials />}
                    />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />

                    <Route path="/events" element={<EventsAnnouncements />} />
                    <Route path="/gallery" element={<Gallery />} />
                    <Route path="/achievements" element={<Achievements />} />
                  </Routes>
                </main>
                <Footer />
              </>
            }
          />
          {/* Admin Routes without Navbar/Footer */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/faculty" element={<ManageFaculty />} />
          <Route path="/admin/courses" element={<ManageCourses />} />
          <Route path="/admin/events" element={<ManageEvents />} />
          <Route path="/admin/materials" element={<ManageStudyMaterials />} />
          <Route path="/admin/gallery" element={<ManageGallery />} />
          <Route path="/admin/achievements" element={<ManageAchievements />} />
        </Routes>

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </Router>
  );
}

export default App;
