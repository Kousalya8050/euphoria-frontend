import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Header from "./Header";
import HomePage from "./HomePage";
import AboutUsPage from "./AboutUsPage";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
import VideoDetail from "./VideoDetail";
import VideoLessonsPage from "./VideoLessonsPage";
import LifeLessonsPage from "./LifeLessonsPage";
import FAQPage from "./FAQPage";
import PsychotherapyPage from "./PsychotherapyTypes";
import ResourcesSection from "./ResourcesSection";
import CreateBlog from "./CreateBlog";
import ProtectedRoute from "./ProtectedRoute";
import AdminLogin from "./AdminLogin";
import SearchResults from "./SearchResults"
import BlogPage from "./BlogPage";
import BlogDetails from "./BlogDetails";

function App() {
  const location = useLocation();


  const hideHeaderOn = ["/admin_login", "/contactus", "/search"];

  const shouldShowHeader = !hideHeaderOn.includes(location.pathname);

  return (
    <>
      {shouldShowHeader && <Header />}

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/videolessons" element={<VideoLessonsPage />} />
          <Route path="/lifelessons" element={<LifeLessonsPage />} />
          <Route path="/blogs" element={<BlogPage />} />
          <Route path="/blogs/:slug" element={<BlogDetails />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/contactus" element={<SignupPage />} />
          <Route path="/video/:id" element={<VideoDetail />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/psychotherapy" element={<PsychotherapyPage />} />
          <Route path="/resources" element={<ResourcesSection />} />
          <Route path="/admin_login" element={<AdminLogin />} />
          <Route path="/search" element={<SearchResults />} />

          <Route
            path="/create-blog"
            element={
              <ProtectedRoute>
                <CreateBlog />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </>
  );
}

export default App;
