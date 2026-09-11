import React, { useRef, useState, useEffect, useCallback } from "react";
import "./BlogPage.css";
import "./VideoLessonsPage.css";
import "./FAQPage.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "react-modal";
import "./HomePageNew.css";
import Footer from "./Footer_page";

import homepage1 from './assets/homepage/h5.jpg';
import homepage2 from './assets/homepage/h2.jpeg';
import homepage3 from './assets/homepage/h3.jpg';
import homepage4 from './assets/homepage/h6.jpg';
import homepagesearch from './assets/homepage/homepagesearch.png';
import videoIcon from "./assets/homepage/video3.png";
import blogIcon from "./assets/homepage/blog4.png";
import rightWave from './assets/homepage/wave-middle-right.png';
import banner from './assets/homepage/banner_for_landing.jpg';
import logo from './assets/header/320px90pxwithoutbackground.png';
import { Helmet } from 'react-helmet-async';

// Pillar card images (placeholder — reusing existing fallback imagery until dedicated pillar photography is ready)
import mentalHealthImg from './assets/rss-fallback-resized/mental-health/1.jpg';
import psychologyImg from './assets/rss-fallback-resized/cognition/1.jpg';
import relationshipsImg from './assets/rss-fallback-resized/sex-and-relationship/1.jpg';
import personalGrowthImg from './assets/rss-fallback-resized/regulation/1.jpg';
import therapyImg from './assets/rss-fallback-resized/therapy/1.jpg';
import healthLifestyleImg from './assets/rss-fallback-resized/health/1.jpg';

const API_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:3000"
    : "https://euphoria-backend-oii0.onrender.com";

// Pillar pages are not built yet — routes intentionally point to URLs with no matching <Route> in App.js.
const pillarsList = [
  { id: 'mental-health', label: 'Mental Health', imgSrc: mentalHealthImg, path: '/mental-health' },
  { id: 'psychology', label: 'Psychology', imgSrc: psychologyImg, path: '/psychology' },
  { id: 'relationships', label: 'Relationships', imgSrc: relationshipsImg, path: '/relationships' },
  { id: 'personal-growth', label: 'Personal Growth', imgSrc: personalGrowthImg, path: '/personal-growth' },
  { id: 'therapy-self-help', label: 'Therapy & Self-Help', imgSrc: therapyImg, path: '/therapy' },
  { id: 'health-lifestyle', label: 'Health & Lifestyle', imgSrc: healthLifestyleImg, path: '/health-lifestyle' },
];

const homeFaqs = [
  {
    question: 'What is Mindwork360?',
    answer: 'Mindwork360 is an educational website that helps you understand psychology, mental health, relationships, personal growth, and healthy living through easy-to-understand articles and videos.',
  },
  {
    question: 'Who is Mindwork360 for?',
    answer: 'Mindwork360 is for anyone who wants to understand themselves better, build healthier relationships, improve their well-being, or learn more about how the mind works.',
  },
  {
    question: 'What topics can I learn about on Mindwork360?',
    answer: 'You can explore topics related to mental health, psychology, relationships, personal growth, therapy and self-help, and health and lifestyle.',
  },
  {
    question: 'Where does the information on Mindwork360 come from?',
    answer: 'Our content is created using reliable sources, psychological concepts, and evidence-informed information, presented in a simple and practical way for everyday readers.',
  },
  {
    question: 'Does Mindwork360 have videos?',
    answer: 'Yes. Along with articles, we also create videos to make learning about psychology, mental health, relationships, and personal growth more engaging and accessible.',
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": homeFaqs.map((item) => ({
    "@type": "Question",
    "name": item.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": item.answer,
    },
  })),
};

const HomePageNew = () => {
  const navigate = useNavigate();

  const BlogPostCardHomepage = ({ post }) => {
    const handleReadMore = () => {
      if (!post.slug) return;
      navigate(`/blogs/${post.slug}`);
    };

    return (
      <div className="post-card2">
        <div className="post-card2-image-wrapper">
          <img
            src={post.image}
            alt={post.title || "Blog image"}
            title={post.title || "MindWork360 Blog"}
            className="post-card2-image"
          />
        </div>

        <div className="post-card2-content">
          <h3 className="post-card2-title">
            {post.title || "Untitled Blog"}
          </h3>

          <p
            className="post-card2-excerpt"
            dangerouslySetInnerHTML={{
              __html: post.excerpt || ""
            }}
          />

          <div className="post-card2-meta">
            <a
              href="/blogs"
              className="read-more-link2"
              onClick={(e) => {
                e.preventDefault();
                handleReadMore();
              }}
            >
              Read More →
            </a>

            <span className="post-card2-author-date">
              Admin &nbsp;·&nbsp;
              {post.created_at
                ? new Date(post.created_at).toLocaleDateString()
                : ""}
            </span>
          </div>
        </div>
      </div>
    );
  };

  const images = [
    {
      src: homepage1,
      text: (
        <>
          There Is a Way To Be Happy:<br />
          If You Don’t Expect Anything,<br />
          You Don’t Get Disappointed.
        </>
      ),
    },
    { src: homepage2, text: "A Smile Is The Beauty Of The Soul" },
    { src: homepage3, text: "Happiness Is a Habit – Cultivate It." },
    { src: homepage4, text: "You Will Be Exactly As Happy As You Decide To Be." },
  ];

  // --- Mobile Carousel State (quote cards — unchanged from current homepage) ---
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const container = containerRef.current;

    const handleScroll = () => {
      const index = Math.round(container.scrollLeft / container.offsetWidth);
      setActiveIndex(index);
    };

    container.addEventListener("scroll", handleScroll);

    const autoScroll = setInterval(() => {
      if (!container) return;
      const nextIndex = (activeIndex + 1) % images.length;
      container.scrollTo({
        left: nextIndex * container.offsetWidth,
        behavior: "smooth",
      });
      setActiveIndex(nextIndex);
    }, 2000);

    return () => {
      container.removeEventListener("scroll", handleScroll);
      clearInterval(autoScroll);
    };
  }, [activeIndex, images.length]);

  // --- Search box (unchanged behavior from current homepage) ---
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (searchText.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    axios
      .get(`${API_URL}/api/search-all?q=${searchText}`)
      .then((res) => {
        const videoSuggestions = (res.data.videos || []).map(v => ({ ...v, type: 'video' }));
        const blogSuggestions = (res.data.blogs || []).map(b => ({ ...b, type: 'blog' }));
        setSuggestions([...videoSuggestions, ...blogSuggestions]);
      })
      .catch(() => setSuggestions([]));
  }, [searchText]);

  const handleSearch = () => {
    if (!searchText.trim()) return;
    navigate(`/search?query=${encodeURIComponent(searchText.trim())}&type=video`);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!document.querySelector(".search-box-wrapper")?.contains(e.target)) {
        setSuggestions([]);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // --- Latest articles ---
  const [recentPosts, setRecentPosts] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/blogs_listing`)
      .then(res => res.json())
      .then(data => {
        let blogs = [];
        if (Array.isArray(data)) {
          blogs = data;
        } else if (data?.data) {
          blogs = data.data;
        } else if (data?.rows) {
          blogs = data.rows;
        }
        setRecentPosts(blogs.slice(0, 6));
      })
      .catch(err => console.error("Failed to load blogs:", err));
  }, []);

  // --- Learn Through Videos (reuses the same "lessons" feed as the Video Lessons page) ---
  const [homeVideos, setHomeVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videosLoading, setVideosLoading] = useState(true);

  const fetchHomeVideos = useCallback(async () => {
    setVideosLoading(true);
    try {
      const res = await axios.get(`${API_URL}/api/youtube/lessons`);
      const all = res.data.data || [];
      setHomeVideos(all.slice(0, 4));
    } catch (error) {
      console.error("Error loading videos", error);
    }
    setVideosLoading(false);
  }, []);

  useEffect(() => {
    fetchHomeVideos();
  }, [fetchHomeVideos]);

  const formatDuration = (isoDuration) => {
    if (!isoDuration) return '';
    const match = isoDuration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    if (!match) return '';

    const hours = match[1] ? parseInt(match[1]) : 0;
    const minutes = match[2] ? parseInt(match[2]) : 0;
    const seconds = match[3] ? parseInt(match[3]) : 0;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="homepage-container">
      <Helmet>
        <title>MindWork360 | Understand How You Think, Feel and Behave</title>
        <meta name="description" content="Mindwork360 helps you understand the psychology behind everyday life through evidence-informed articles and practical insights on mental health, relationships, and personal growth." />
        <link rel="canonical" href="https://mindwork360.com/" />
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Helmet>

      <img src={rightWave} alt="" title="" role="presentation" className="decorative-wave left-waves" />
      <img src={rightWave} alt="" title="" role="presentation" className="decorative-wave right-wave" />

      {/* Hero Banner */}
      <section className="hn-hero-section hn-hero-section">
        <div className="hero-image-container">
          <img src={banner} alt="MindWork360 Banner" title="MindWork360 — Mental Health & Healing Community" className="hero-bg" />
          <div className="hero-overlay">
            <div className="hero-text-box">
              <img src={logo} alt="MindWork360 Logo" title="MindWork360" className="hero-logo" />
              <h1>Understand Why You Think, Feel and Behave the Way You Do.</h1>
              <p>
                Why do some arguments stay with us long after they're over? Why are some habits so hard to break?
                Mindwork360 helps you understand the psychology behind everyday life through evidence-informed
                articles and practical insights you can actually relate to.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quote cards — unchanged from current homepage */}
      <section className="banner-grid">
        <div className="banner-card card-1">
          <img src={homepage1} alt="There is a way to be happy — mental wellness inspiration" title="There Is a Way To Be Happy" />
          <div className="banner-text">
            There Is a Way To Be Happy:<br />
            If You Don’t Expect Anything,<br />
            You Don’t Get Disappointed.
          </div>
        </div>
        <div className="banner-card card-2">
          <img src={homepage2} alt="A smile is the beauty of the soul" title="A Smile Is The Beauty Of The Soul" />
          <div className="banner-text1">A Smile Is The Beauty Of The Soul</div>
        </div>
        <div className="banner-card card-3">
          <img src={homepage3} alt="Happiness is a habit — cultivate it" title="Happiness Is a Habit – Cultivate It" />
          <div className="banner-text2">Happiness Is a Habit – Cultivate It.</div>
        </div>
        <div className="banner-card card-4">
          <img src={homepage4} alt="You will be exactly as happy as you decide to be" title="You Will Be Exactly As Happy As You Decide To Be" />
          <div className="banner-text3">You Will Be Exactly As Happy As You Decide To Be.</div>
        </div>
      </section>

      <div className="mobile-carousel">
        <div className="mobile-carousel-container" ref={containerRef}>
          {images.map((img, index) => (
            <div className="mobile-carousel-slide" key={index}>
              <img src={img.src} alt={typeof img.text === "string" ? img.text : `Mental health inspiration slide ${index + 1}`} title={typeof img.text === "string" ? img.text : `Mental health inspiration slide ${index + 1}`} className="mobile-carousel-image" loading="lazy" />
              <div className="mobile-carousel-text">{img.text}</div>
            </div>
          ))}
        </div>

        <div className="mobile-carousel-dots">
          {images.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === activeIndex ? "active" : ""}`}
            />
          ))}
        </div>
      </div>

      {/* Every Journey Begins With a Question */}
      <section className="hn-text-section">
        <h2 className="hn-section-title">Every Journey Begins With a Question</h2>
        <p className="hn-question-line">Why do I think this way?</p>
        <p className="hn-question-line">Why do relationships sometimes feel so complicated?</p>
        <p className="hn-question-line">Why do certain habits seem impossible to change?</p>
        <p className="hn-question-line">How can I become happier, calmer, or more confident?</p>
        <p className="hn-section-text">Questions like these are something we all ask at different stages of life.</p>
        <p className="hn-section-text">
          At Mindwork360, you'll find practical, evidence-informed insights that help you understand your thoughts,
          emotions, relationships, and everyday experiences. Whether you're looking for answers, a fresh perspective,
          or practical ways to improve your everyday life, we're here to help you explore, learn, and grow.
        </p>
      </section>

      {/* Find the Answers You're Looking For */}
      <section className="hn-text-section">
        <h2 className="hn-section-title">Find the Answers You're Looking For</h2>
        <p className="hn-section-text">
          Understanding yourself is a journey, and every question is an opportunity to learn something new.
          It grows with every question you ask and every new idea you discover.
        </p>
        <p className="hn-section-text">
          Choose a topic that interests you and explore practical, easy-to-understand content designed to help
          you learn, reflect, and grow.
        </p>
      </section>

      {/* Categories (6 pillars) */}
      <section className="hn-pillars-section">
        <h3 className="hn-section-title">Categories</h3>
        <div className="hn-pillars-grid">
          {pillarsList.map((pillar) => (
            <div
              key={pillar.id}
              className="hn-pillar-card"
              onClick={() => navigate(pillar.path)}
            >
              <img
                src={pillar.imgSrc}
                alt={`${pillar.label} — MindWork360`}
                title={pillar.label}
                className="hn-pillar-image"
                loading="lazy"
              />
              <p className="hn-pillar-label">{pillar.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Keep Exploring What Makes Us Human */}
      <section className="hn-text-section">
        <h2 className="hn-section-title">Keep Exploring What Makes Us Human</h2>
        <p className="hn-section-text">Every experience has something to teach us about ourselves.</p>
        <p className="hn-section-text">
          Whether it's understanding our emotions, building stronger relationships, changing old habits, or
          finding new ways to grow, every topic offers an opportunity to learn, reflect, and see life from a
          different perspective.
        </p>
        <p className="hn-section-text">Wherever your curiosity takes you next, we're here to help you explore it.</p>
      </section>

      {/* Search box — unchanged from current homepage */}
      <section>
        <div className="search-box-wrapper">
          <div className="search-container">
            <input
              id="search"
              name="search"
              className="search-input"
              type="text"
              placeholder="Search here..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />

            <button className="search-icon" onClick={handleSearch}>
              <img src={homepagesearch} alt="Search" title="Search MindWork360" />
            </button>
          </div>

          {suggestions.length > 0 && (
            <div className="search-suggestions">
              {suggestions.map((item, i) => (
                <div
                  key={i}
                  className="suggestion-item"
                  onClick={() => {
                    const title = item.type === 'video' ? item.snippet.title : item.blog_title;
                    const type = item.type === "video" ? "video" : "blog";
                    navigate(`/search?query=${encodeURIComponent(title)}&type=${type}`);
                    setSuggestions([]);
                  }}
                >
                  <img
                    src={item.type === "video" ? videoIcon : blogIcon}
                    alt={item.type === "video" ? "Video" : "Blog"}
                    title={item.type === "video" ? "Video result" : "Blog result"}
                    className="suggestion-icon"
                  />
                  {item.type === 'video' ? item.snippet.title : item.blog_title}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Explore Our Latest Articles */}
      <section className="hn-articles-section">
        <h2 className="hn-section-title">Explore Our Latest Articles</h2>
        <p className="hn-section-text hn-section-text--centered">
          Discover practical insights on mental health, psychology, relationships, personal growth, and healthy living.
        </p>

        <div className="posts-grid2">
          {recentPosts.map(blog => (
            <BlogPostCardHomepage key={blog.id} post={blog} />
          ))}
        </div>

        <div className="load-more-container1">
          <button className="load-more-btn1" onClick={() => navigate("/blogs")}>
            Load More
          </button>
        </div>
      </section>

      {/* Learn Through Videos */}
      <section className="hn-videos-section">
        <h2 className="hn-section-title">Learn Through Videos</h2>
        <p className="hn-section-text hn-section-text--centered">
          Explore videos that simplify psychology, mental health, relationships, and personal growth into
          practical insights you can understand and apply in everyday life.
        </p>

        {videosLoading ? (
          <div className="loading-state">Loading videos...</div>
        ) : (
          <>
            <div className="video-grid">
              {homeVideos.map((item) => {
                const videoId = item.snippet?.resourceId?.videoId || item.id;
                return (
                  <div
                    key={item.id}
                    className="video-card"
                    onClick={() => setSelectedVideo(videoId)}
                  >
                    <div className="thumbnail-wrapper">
                      <img
                        src={item.snippet?.thumbnails?.high?.url || item.snippet?.thumbnails?.medium?.url}
                        alt={item.snippet?.title}
                        title={item.snippet?.title}
                      />
                      <span className="video-duration">
                        {formatDuration(item.contentDetails?.duration)}
                      </span>
                    </div>
                    <div className="video-title">{item.snippet?.title || 'Untitled'}</div>
                  </div>
                );
              })}
            </div>

            <div className="load-more-container1">
              <button className="load-more-btn1" onClick={() => navigate("/videolessons")}>
                View All
              </button>
            </div>
          </>
        )}
      </section>

      <Modal
        isOpen={!!selectedVideo}
        onRequestClose={() => setSelectedVideo(null)}
        className="video-modal"
        overlayClassName="video-overlay"
      >
        {selectedVideo && (
          <div className="modal-player-wrapper">
            <button className="close-modal-btn" onClick={() => setSelectedVideo(null)}>×</button>
            <iframe
              title="YouTube Player"
              src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}
      </Modal>

      {/* FAQ */}
      <section className="hn-faq-section">
        <h2 className="hn-section-title">Frequently Asked Questions</h2>
        {homeFaqs.map((item, idx) => (
          <div className="faq-item" key={idx}>
            <p className="faq-question">{item.question}</p>
            <p className="faq-answer">{item.answer}</p>
          </div>
        ))}
      </section>

      <Footer />
    </div>
  );
};

export default HomePageNew;
