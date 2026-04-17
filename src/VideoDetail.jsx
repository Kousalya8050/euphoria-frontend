import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import "./VideoDetail.css";

const VideoDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [videoData, setVideoData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      document.title = "Video Detail Page | Euphoria";
  }, []);
  
  useEffect(() => {
    const API_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:3000"
    : "https://euphoria-backend-oii0.onrender.com";
    setLoading(true);
    // Ensure backend API handles ID search specifically
    axios.get(`${API_URL}/api/search-all?q=${id}`)
      .then((res) => {
        const found = res.data.videos?.find(v => (v.id?.videoId || v.id) === id);
        setVideoData(found);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    window.scrollTo(0, 0);
  }, [id]);

  const videoTitle = videoData?.snippet?.title || "Video Lesson";
  const videoDesc = videoData?.snippet?.description || "Watch this educational lesson on Euphoria.";
  const publishDate = videoData?.snippet?.publishedAt || new Date().toISOString();
  const thumbnail = videoData?.snippet?.thumbnails?.high?.url || "";

  // 1. Technical SEO: JSON-LD Schema (Tells Google this is a Video Object)
  const videoSchema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": videoTitle,
    "description": videoDesc,
    "thumbnailUrl": thumbnail,
    "uploadDate": publishDate,
    "embedUrl": `https://www.youtube.com/embed/${id}`, // Add this
    "publisher": {
      "@type": "Organization",
      "name": "Euphoria",
      "logo": {
        "@type": "ImageObject",
        "url": "https://hilarious-travesseiro-4a5013.netlify.app/logo.png" 
      }
    }
  };
  if (loading) return <div className="loading-state">Loading Lesson Details...</div>;
  const handleBack = () => {
    // Check if there is a history to go back to
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      // If the user landed here directly (copy-paste), 
      // take them to the Video Lessons list instead of doing nothing
      navigate("/videolessons"); 
    }
  };

  return (
    <div className="video-detail-page">
      <Helmet>
        <title>{videoTitle} | Euphoria Video Lessons</title>
        <meta name="description" content={videoDesc.substring(0, 160)} />
        <meta property="og:title" content={videoTitle} />
        <meta property="og:image" content={thumbnail} />
        <meta property="og:type" content="video.other" />
        
        {/* Injecting Structured Data for Google Search */}
        <script type="application/ld+json">
          {JSON.stringify(videoSchema)}
        </script>
      </Helmet>

      <div className="video-detail-container">
        {/* Navigation / Back */}
        <div className="video-nav-header">
          <button onClick={handleBack} className="back-btn">
            ← Back
          </button>
          <div className="breadcrumb">
            <Link to="/">Home</Link> / <Link to="/videolessons">Videos</Link> / <span>Details</span>
          </div>
        </div>

        {/* Video Player Section */}
        <div className="main-player-section">
          <div className="video-responsive-wrapper">
            <iframe
              title={videoTitle}
              src={`https://www.youtube.com/embed/${id}?autoplay=1&rel=0`} // Add this
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        {/* Text Section (Restored: CRITICAL for Google Search) */}
        <div className="video-info-section">
          <h1 className="video-main-title">{videoTitle}</h1>
          <div className="video-meta-tags">
            {/* <span className="tag">Educational</span>
            <span className="tag">Psychology</span> */}
            <span className="date-tag">{new Date(publishDate).toLocaleDateString()}</span>
          </div>
          <hr className="divider" />
          <div className="video-description-text">
            <h3>Lesson Overview</h3>
            <p>{videoDesc}</p>
          </div>
        </div>

        {/* Bottom Banner (Restored: Keeps users on your site) */}
        <div className="video-cta-banner">
          <h3>Want to learn more?</h3>
          <p>Read our expert-written blogs for deeper psychological insights.</p>
          <button className="cta-btn" onClick={() => navigate("/blogs")}>
            Explore Blogs
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoDetail;