import React, { useEffect, useState } from "react";
import "./RssBlogPage.css";
import Footer from "./Footer_page";

const categories = [
  "All", "Abuse", "Regulation", "Sex and relationship", "ADHD",
  "Diet and nutrition", "Personality disorder", "Trauma", "Therapy",
  "Stress and anxiety", "Health", "Child development", "Cognition", "Grief", "Mental Health"
];

const RssBlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(12);

  // --- HELPER FUNCTION: Capitalize Each Word ---
  const formatCategory = (str) => {
    if (!str) return "";
    // Special case for ADHD to keep it uppercase
    if (str.toUpperCase() === "ADHD") return "ADHD";
    
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const stripHtml = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  const getImageUrl = (blog) => {
    if (blog.image && blog.image.trim() !== "" && blog.image !== "null") {
      return blog.image;
    }
    const imageNumber = (blog.id % 20) + 1;
    return `/assets/rss-fallback/${imageNumber}.jpg`;
  };

  const fetchBlogs = async () => {
    try {
      const API_URL = window.location.hostname === "localhost"
        ? "http://localhost:3000"
        : "https://euphoria-backend-oii0.onrender.com";

      let url = `${API_URL}/api/rss-blogs`;
      if (selectedCategory !== "All") {
        url += `?category=${encodeURIComponent(selectedCategory)}`;
      }

      const res = await fetch(url);
      const data = await res.json();
      setBlogs(data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    setVisibleCount(12);
    fetchBlogs();
  }, [selectedCategory]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 12);
  };

  return (
    <>
      <div className="rss-container">
        <h1 className="rss-title">News And Updates</h1>

        {/* Category Filters */}
        <div className="rss-filters">
          {categories.map((cat, index) => (
            <button
              key={index}
              className={`filter-btn ${selectedCategory === cat ? "active" : ""}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {/* ✅ Applied Capitalization here */}
              {formatCategory(cat)}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="rss-loading-state">
             <p className="loading">Loading insightful content...</p>
          </div>
        ) : (
          <>
            <div className="rss-grid">
              {blogs.length === 0 ? (
                <p className="no-results">No feeds found in this category.</p>
              ) : (
                blogs.slice(0, visibleCount).map((blog, index) => (
                  <div key={index} className="rss-card">
                    <div className="rss-card-image">
                      <img 
                        src={getImageUrl(blog)} 
                        alt={blog.title} 
                        loading="lazy"
                        onError={(e) => { e.target.src = "/assets/rss-fallback/1.jpg"; }}
                      />
                    </div>
                    
                    <div className="rss-card-body">
                      <h3 title={blog.title}>{blog.title}</h3>
                      <p className="rss-description">
                        {stripHtml(blog.description)}
                      </p>
                      <div className="rss-footer">
                        {/* ✅ Applied Capitalization here */}
                        <span className="rss-category-tag">{formatCategory(blog.category)}</span>
                        <a href={blog.link} target="_blank" rel="noreferrer" className="rss-read-link">
                          Read More →
                        </a>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {!loading && blogs.length > visibleCount && (
              <div className="load-more-container">
                <button className="load-more-btn" onClick={handleLoadMore}>
                  Load More
                </button>
              </div>
            )}
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default RssBlogPage;