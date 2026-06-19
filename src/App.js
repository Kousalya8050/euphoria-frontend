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
import RssBlogPage from "./RssBlogPage";
import LandingPage from "./LandingPage";
import PrivacyPolicyPage from "./PrivacyPolicyPage";
import TermsAndConditionsPage from "./TermsAndConditionsPage";

function App() {
  const location = useLocation();

  // ✅ Added "/" and "/landing_page" to hide the Header on the Landing Page
  const hideHeaderOn = ["/", "/landing_page", "/admin_login", "/contactus"];

  const shouldShowHeader = !hideHeaderOn.includes(location.pathname);

  return (
    <>
      {shouldShowHeader && <Header />}

      <main>
        <Routes>
          {/* ✅ THE CHANGE: The root path now points to the Landing Page */}
          <Route path="/" element={<LandingPage />} />
          
          {/* ✅ Move the original HomePage to /home if you still want it accessible */}
          <Route path="/home" element={<HomePage />} />

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
          <Route path="/rss_feeds" element={<RssBlogPage />} />
          
          {/* Optional: keeps the specific path working too */}
          <Route path="/landing_page" element={<LandingPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditionsPage />} />

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