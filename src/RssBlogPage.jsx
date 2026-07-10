import React, { useEffect, useState } from "react";
import { Helmet } from 'react-helmet-async';
import "./RssBlogPage.css";
import Footer from "./Footer_page";

// --- DYNAMIC IMAGE LOADER (category-aware) ---
// Recursively loads all images from rss-fallback and its category subfolders.
// Add images named 1.jpg, 2.jpg... inside a category folder (e.g. rss-fallback/abuse/)
// and they will be used automatically for feeds with that category.
const rssImageContext = require.context('./assets/rss-fallback-resized', true, /\.(png|jpe?g|svg)$/);
const { rootFallbacks, categoryFallbacks } = rssImageContext.keys().reduce(
  (acc, key) => {
    const parts = key.split('/'); // ['.',  'folder', 'file.jpg'] or ['.', 'file.jpg']
    if (parts.length === 3) {
      const folder = parts[1];
      if (!acc.categoryFallbacks[folder]) acc.categoryFallbacks[folder] = [];
      acc.categoryFallbacks[folder].push(rssImageContext(key));
    } else {
      acc.rootFallbacks.push(rssImageContext(key));
    }
    return acc;
  },
  { rootFallbacks: [], categoryFallbacks: {} }
);

// Derives the folder name from a category string regardless of casing.
// e.g. "Mental Health" → "mental-health", "ADHD" → "adhd"
const categoryToFolder = (category) =>
  category ? category.toLowerCase().replace(/\s+/g, '-') : null;

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

  useEffect(() => {
  }, []);

  const formatCategory = (str) => {
    if (!str) return "";
    if (str.toUpperCase() === "ADHD") return "ADHD";
    return str.split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ");
  };

  const stripHtml = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  const getImageUrl = (blog, index) => {
    const folder = categoryToFolder(blog.category);
    const imgs = folder && categoryFallbacks[folder]?.length ? categoryFallbacks[folder] : rootFallbacks;
    return imgs[index % imgs.length];
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
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

    fetchBlogs();
    setVisibleCount(12);
  }, [selectedCategory]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 12);
  };

  return (
    <>
      <Helmet>
        <title>MindWork360 RSS Feeds | Mental Health Updates & News</title>
        <meta name="description" content="Follow MindWork360 RSS feeds for the latest mental health articles, psychotherapy insights, wellness resources, life lessons, and platform updates." />
      </Helmet>
      <div className="rss-container">
        <h1 className="rss-title">News And Updates</h1>

        <div className="rss-filters">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              className={`filter-btn ${selectedCategory === cat ? "active" : ""}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {formatCategory(cat)}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="rss-loading-state"><p>Loading...</p></div>
        ) : (
          <>
            <div className="rss-grid">
              {blogs.length === 0 ? (
                <p className="no-results">No feeds found.</p>
              ) : (
                blogs.slice(0, visibleCount).map((blog, index) => (
                  <div key={blog.id || index} className="rss-card">
                    <div className="rss-card-image">
                      {/* ✅ Pass 'index' here to guarantee unique sequence */}
                      <img
                        src={getImageUrl(blog, index)}
                        alt={blog.title}
                        title={blog.title}
                        loading="lazy"
                      />
                    </div>
                    
                    <div className="rss-card-body">
                      <h3 title={blog.title}>{blog.title}</h3>
                      <p className="rss-description">{stripHtml(blog.description)}</p>
                      <div className="rss-footer">
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