import { useEffect, useState } from "react";
import {  useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import Modal from "react-modal";
import "./SearchResults.css";
import { Link } from 'react-router-dom';
import "./BlogPage.css"; 

Modal.setAppElement("#root");

const BlogPostCard = ({ post }) => {
  const navigate = useNavigate();
  const handleReadMore = () => {
    if (!post.slug) return;
    navigate(`/blogs/${post.slug}`);
  };

  const imageUrl = post.banner_image 
    ? `http://localhost:3000/${post.banner_image.replace(/\\/g, '/')}` 
    : "https://via.placeholder.com/400x250";

  return (
    <div className="post-card1">
      <div className="post-card1-image-wrapper">
        <img src={imageUrl} alt={post.blog_title} className="post-card1-image" />
      </div>
      <div className="post-card1-content">
        <h3 className="post-card1-title">{post.blog_title}</h3>
        <p
          className="post-card1-excerpt"
          dangerouslySetInnerHTML={{ __html: post.blog_content1_text?.substring(0, 120) + "..." }}
        />
        <div className="post-card1-meta">
          <a href="/blogs" className="read-more1-link" onClick={(e) => { e.preventDefault(); handleReadMore(); }}>
            Read More →
          </a>
          <span className="post-card1-author-date">
           {new Date(post.created_at || Date.now()).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default function SearchResults() {
  
  const [searchParams] = useSearchParams();

  const query = searchParams.get("query") || "";
  const typeParam = searchParams.get("type"); 
  const srcParam = searchParams.get("src"); // New param to check if it's a category
  const isCategory = srcParam === "category";

  const [loading, setLoading] = useState(false);
  const [videos, setVideos] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [activeTab, setActiveTab] = useState("videos");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    if (!query) return;
    setLoading(true);
    axios.get(`http://localhost:3000/api/search-all?q=${query}`)
      .then((res) => {
        const vids = res.data.videos || [];
        const blgs = res.data.blogs || [];
        
        setVideos(vids);
        setBlogs(blgs);
        setLoading(false);
        setCurrentPage(1);

        // --- AUTO-DETECT TAB LOGIC ---
        // 1. If we have videos but no blogs, show videos
        if (vids.length > 0 && blgs.length === 0) {
          setActiveTab("videos");
        } 
        // 2. If we have blogs but no videos, show blogs
        else if (blgs.length > 0 && vids.length === 0) {
          setActiveTab("blogs");
        } 
        // 3. If both or neither have data, check if URL forced a type
        else if (typeParam) {
          setActiveTab(typeParam === "blog" ? "blogs" : "videos");
        }
        // 4. Default fallback
        else {
          setActiveTab("videos");
        }
      })
      .catch(() => setLoading(false));
  
}, [query, typeParam]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [query, typeParam]);
  
  const currentData = activeTab === "videos" ? videos : blogs;
  const totalPages = Math.ceil(currentData.length / itemsPerPage);
  const paginatedData = currentData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const getPageNumbers = () => {
    const maxVisiblePages = 10;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    if (endPage - startPage + 1 < maxVisiblePages) startPage = Math.max(1, endPage - maxVisiblePages + 1);
    const pages = [];
    for (let i = startPage; i <= endPage; i++) pages.push(i);
    return pages;
  };

  const formatDuration = (iso) => {
    if (!iso) return "";
    let m = iso.match(/(\d+)M/)?.[1] || 0;
    let s = iso.match(/(\d+)S/)?.[1] || 0;
    return `${m}:${String(s).padStart(2, "0")}`;
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <header className="header">
        <Link to="/" className="logo" onClick={closeMenu}>Euphoria</Link>
        <nav className={`nav ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/" onClick={closeMenu}>Home</Link>
          <Link to="/about" onClick={closeMenu}>About Us</Link>
          <Link to="/blog" onClick={closeMenu}>Blog</Link>
          <Link to="/videolessons" onClick={closeMenu}>Video Lessons</Link>
          <Link to="/lifelessons" onClick={closeMenu}>Life Lessons</Link>
          <Link to="/faq" onClick={closeMenu}>FAQ</Link>
          <Link to="/psychotherapy" onClick={closeMenu}>Psychotherapy Types</Link>
          <Link to="/resources" onClick={closeMenu}>Resources</Link>
          <Link to="/contactus" onClick={closeMenu}>Contact Us</Link>
        </nav>
        <button className={`hamburger-menu ${isMenuOpen ? "active" : ""}`} onClick={toggleMenu} aria-label="Toggle menu">
          <span></span><span></span><span></span>
        </button>
      </header>
      
      <div className="blog-page-container_s">
        <main className="blog-content_s">
          <header className="blog-header_s">
            {/* --- DYNAMIC HEADER LABELS --- */}
            <p className="blog-subtitle_s">
              {isCategory ? "Categories" : "Search Results"}
            </p>
            <h1 className="blog-main-title_s">
              {isCategory ? "Category: " : "Results for: "} "{query}"
            </h1>
          </header>

          <div className="search-tabs-container">
            <button 
              className={`search-tab ${activeTab === "videos" ? "active" : ""}`}
              onClick={() => { setActiveTab("videos"); setCurrentPage(1); }}
            >
              Videos ({videos.length})
            </button>
            <button 
              className={`search-tab ${activeTab === "blogs" ? "active" : ""}`}
              onClick={() => { setActiveTab("blogs"); setCurrentPage(1); }}
            >
              Blogs ({blogs.length})
            </button>
          </div>

          {loading ? (
            <div className="skeleton">Loading...</div>
          ) : (
            <>
              {activeTab === "videos" ? (
                <div className="video-grid_s">
                  {paginatedData.map((video) => (
                    <div className="video-card_s" key={video.id} onClick={() => setSelectedVideo(video.id)} 
                    >
                      <div className="thumbnail-wrapper_s">
                        <img src={video.snippet?.thumbnails?.medium?.url} alt="" />
                        <span className="duration-tag_s">{formatDuration(video.contentDetails?.duration)}</span>
                      </div>
                      <h4>{video.snippet?.title}</h4>
                    </div>
                  ))}
                  {videos.length === 0 && <p className="no-results-msg">No videos found for this category.</p>}
                </div>
              ) : (
                <section className="posts-grid1">
                  {paginatedData.map(blog => (
                    <BlogPostCard key={blog.id} post={blog} />
                  ))}
                  {blogs.length === 0 && <p className="no-results-msg">No blogs found for this category.</p>}
                </section>
              )}

              {totalPages > 1 && (
                <div className="pagination_s">
                  <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>Prev</button>
                  {getPageNumbers().map(num => (
                    <button key={num} className={currentPage === num ? "active-page" : ""} onClick={() => setCurrentPage(num)}>
                      {num}
                    </button>
                  ))}
                  <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}>Next</button>
                </div>
              )}
            </>
          )}
        </main>

        <Modal isOpen={!!selectedVideo} onRequestClose={() => setSelectedVideo(null)} className="video-modal" overlayClassName="video-overlay">
          {selectedVideo && (
            <div className="modal-player-wrapper">
               <button className="close-btn" onClick={() => setSelectedVideo(null)}>✖</button>
               <iframe title="YT" src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`} frameBorder="0" allowFullScreen />
            </div>
          )}
        </Modal>
      </div>
    </>
  );
}