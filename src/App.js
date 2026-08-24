import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./Header";
import HomePage from "./HomePage";
import HomePageNew from "./HomePageNew";
import MentalHealthPage from "./MentalHealthPage";
import PsychologyPage from "./PsychologyPage";
import RelationshipsPage from "./RelationshipsPage";
import PersonalGrowthPage from "./PersonalGrowthPage";
import TherapyPage from "./TherapyPage";
import HealthLifestylePage from "./HealthLifestylePage";
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
import SearchResults from "./SearchResults";
import BlogPage from "./BlogPage";
import BlogDetails from "./BlogDetails";
import RssBlogPage from "./RssBlogPage";
import LandingPage from "./LandingPage";
import PrivacyPolicyPage from "./PrivacyPolicyPage";
import TermsAndConditionsPage from "./TermsAndConditionsPage";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
}

function App() {
  const location = useLocation();

  // ✅ Added "/" and "/landing_page" to hide the Header on the Landing Page
  const hideHeaderOn = ["/landing_page", "/admin_login", "/contactus"];

  const shouldShowHeader = !hideHeaderOn.includes(location.pathname);

  return (
    <>
      <ScrollToTop />
      {shouldShowHeader && <Header />}

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/home-new" element={<HomePageNew />} />

          <Route path="/mental-health" element={<MentalHealthPage />} />
          <Route path="/psychology" element={<PsychologyPage />} />
          <Route path="/relationships" element={<RelationshipsPage />} />
          <Route path="/personal-growth" element={<PersonalGrowthPage />} />
          <Route path="/therapy" element={<TherapyPage />} />
          <Route path="/health-lifestyle" element={<HealthLifestylePage />} />
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
          <Route path="/terms-of-service" element={<TermsAndConditionsPage />} />

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