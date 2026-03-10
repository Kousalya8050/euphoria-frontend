import React, { useState, useEffect }  from 'react';
import { useNavigate, useSearchParams } from "react-router-dom";


import './BlogPage.css';
import Footer from "./Footer_page";

// Import your assets - you will need to add these images to your project

import footerWaveImage from './assets/homepage/footer.png'; // Your main wave background

// --- Data for the page (can be replaced with API data later) ---
// const tags = [
//   'Abnormal Psychology', 'Abuse', 'Academic', 'Addiction', 'Ambiverts', 'Animal Behavior', 'Announcements',
//   'Antisocial Personality Disorder', 'Anxiety', 'Autism', 'Behavior', 'Behavioural Psychology', 'Blog',
//   'Body Dysmorphia', 'Book reviews', 'Business', 'Casual', 'Cognitive Psychology', 'Community Submission',
//   'Creativity', 'Depression', 'Dreams', 'Counselling Psychology', 'Entrepreneurship', 'Eating Disorder', 'Family',
//   'Entertainment', 'Extroversion', 'Featured', 'Food', 'Friends', 'Friendships', 'Funny', 'Grief', 'Happiness',
//   'Interviews-Team', 'Intelligence', 'Interviews', 'Interesting Facts'
// ];

const navLinks = [
    { name: 'Home', path: '#', marginLeft: '0px' },
    { name: 'About Us', path: '#', marginLeft: '44px' }, // Example value
    { name: 'Academic', path: '#', marginLeft: '113px' }, // Example value
    { name: 'Casual', path: '#', marginLeft: '187px' }, // Example value
    { name: 'Blogs', path: '#', marginLeft: '238px' },   // Example value
    { name: 'Video Lessons', path: '#', marginLeft: '268px' }, // Example value
  ];
  
  // IMPORTANT: Replace placeholder icon paths with your actual icon image files.
  // These should ideally be white icons, possibly within a light circle as suggested by the image.
  const socialLinks = [
    { name: 'Email', icon: 'path/to/envelope-icon.svg', path: 'mailto:info@example.com' },
    { name: 'Twitter', icon: 'path/to/x-icon.svg', path: '#' },
    { name: 'LinkedIn', icon: 'path/to/linkedin-icon.svg', path: '#' },
    { name: 'WhatsApp', icon: 'path/to/whatsapp-icon.svg', path: '#' },
    { name: 'Info', icon: 'path/to/info-icon.svg', path: '#' }, // Or Instagram, etc.
  ];
  

// const blogPosts = [
//   {
//     id: 1,
//     image: postImage1,
//     title: 'How Relationships Reveal Our True Selves',
//     excerpt: 'Ever wondered who’s behind the stories and advice here at Psych2Go? Meet our amazing team of writers! They’re the ones who dive deep into topics...',
//     author: 'Kelly',
//     date: 'October 29, 2024'
//   },
//   {
//     id: 2,
//     image: postImage2,
//     title: 'Navigating Love with Different Attachment Styles',
//     excerpt: 'Ever wondered who’s behind the stories and advice here at Psych2Go? Meet our amazing team of writers! They’re the ones who dive deep into topics...',
//     author: 'Kelly',
//     date: 'October 29, 2024'
//   },
//   {
//     id: 3,
//     image: postImage2, // Using same image for demo
//     title: 'The Psychology of First Impressions',
//     excerpt: 'Ever wondered who’s behind the stories and advice here at Psych2Go? Meet our amazing team of writers! They’re the ones who dive deep into topics...',
//     author: 'Alex',
//     date: 'October 28, 2024'
//   },
//   {
//     id: 4,
//     image: postImage1, // Using same image for demo
//     title: 'Understanding Imposter Syndrome in the Workplace',
//     excerpt: 'Ever wondered who’s behind the stories and advice here at Psych2Go? Meet our amazing team of writers! They’re the ones who dive deep into topics...',
//     author: 'Jordan',
//     date: 'October 27, 2024'
//   },
//   {
//     id: 5,
//     image: postImage1, // Using same image for demo
//     title: 'Understanding Imposter Syndrome in the Workplace',
//     excerpt: 'Ever wondered who’s behind the stories and advice here at Psych2Go? Meet our amazing team of writers! They’re the ones who dive deep into topics...',
//     author: 'Jordan',
//     date: 'October 27, 2024'
//   },
//   {
//     id: 6,
//     image: postImage2, // Using same image for demo
//     title: 'Understanding Imposter Syndrome in the Workplace',
//     excerpt: 'Ever wondered who’s behind the stories and advice here at Psych2Go? Meet our amazing team of writers! They’re the ones who dive deep into topics...',
//     author: 'Jordan',
//     date: 'October 27, 2024'
//   }
// ];



// --- Sub-component for a single blog post card ---
const BlogPostCard = ({ post }) => {
  const navigate = useNavigate();

  const handleReadMore = () => {
    if (!post.slug) return;
    navigate(`/blogs/${post.slug}`);
  };

  return (
    <div className="post-card">
      <div className="post-card-image-wrapper">
        <img
          src={post.image}
          alt={post.title || "Blog image"}
          className="post-card-image"
        />
      </div>

      <div className="post-card-content">
        <h3 className="post-card-title">
          {post.title || "Untitled Blog"}
        </h3>

        <p
          className="post-card-excerpt"
          dangerouslySetInnerHTML={{
            __html: post.excerpt || ""
          }}
        />

        <div className="post-card-meta">
        <a
          href="#"
          className="read-more-link"
          onClick={(e) => {
            e.preventDefault();
            handleReadMore();
          }}
        >
          Read More →
        </a>

          <span className="post-card-author-date">
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
// --- Main Blog Page Component ---
const BlogPage = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [tags, setTags] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);

  const handleExploreMore = () => setShowPopup(true);
  const handleClosePopup = () => setShowPopup(false);
  
  // Detect if mobile/tablet
  useEffect(() => {
    const checkWidth = () => setIsMobile(window.innerWidth <= 992);
    checkWidth();
    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  }, []);

  // Show all tags for desktop, limited for mobile
  const visibleTags = isMobile ? tags.slice(0, 10) : tags;

 
  useEffect(() => {
    fetch("http://localhost:3000/api/blog-categories")
      .then(res => res.json())
      .then(data => {
        setTags(["All", ...data]); 
      })
      .catch(err => console.log(err));
  
      fetch("http://localhost:3000/api/blogs_listing")
      .then(async (res) => {
        if (!res.ok) {
          const txt = await res.text();
          throw new Error(`HTTP ${res.status}: ${txt}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("API /api/blogs returned:", data);
        // common API shapes:
        // 1) data = [ {...}, ... ]
        // 2) data = { success: true, data: [ ... ] }
        // 3) data = { rows: [ ... ] }
        if (Array.isArray(data)) {
          setBlogPosts(data);
        } else if (data && Array.isArray(data.data)) {
          setBlogPosts(data.data);
        } else if (data && Array.isArray(data.rows)) {
          setBlogPosts(data.rows);
        } else {
          // fallback: empty array
          console.warn("Unexpected /api/blogs response shape — using empty array");
          setBlogPosts([]);
        }
      })
      .catch((err) => {
        console.error("Failed to load blogs:", err);
        setBlogPosts([]); // keep UI safe
      });
  }, []);


  const [selectedCategory, setSelectedCategory] = useState(null);
  const handleCategoryClick = (category) => {
    // ALL
    if (category === "All") {
      setSelectedCategory(null);
      navigate("/blogs"); // clear query param
      return;
    }
  
    setSelectedCategory(category);
    navigate(`/blogs?category=${encodeURIComponent(category)}`);
  };
  const filteredPosts = selectedCategory
  ? blogPosts.filter(
      post =>
        String(post.category).trim() === String(selectedCategory).trim()
    )
  : blogPosts;
  const [searchParams] = useSearchParams();
  useEffect(() => {
    const categoryFromUrl = searchParams.get("category");
  
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    } else {
      setSelectedCategory(null);
    }
  }, [searchParams]);
  
  useEffect(() => {
    const categoryFromUrl = searchParams.get("category");
    setSelectedCategory(categoryFromUrl || null);
  }, [searchParams]);








  return (
    <div className="blog-page-container">
      
      
      <main className="blog-content">
        <header className="blog-header">
          <p className="blog-subtitle">Blogs</p>
          <h1 className="blog-main-title">A Place To Have Fun, Learn and Heal</h1>
        </header>

        {/* ✅ TAGS SECTION */}
        <section className="tags-section-wrapper">
          <div className="tags-container">
            {(tags.length > 0 ? visibleTags : []).map((tag, index) => (
             <button
             key={index}
             className={`tag-button ${
               (selectedCategory === null && tag === "All") ||
               selectedCategory === tag
                 ? "tag-button--active"
                 : ""
             }`}
             onClick={() => handleCategoryClick(tag)}
           >
             {tag}
           </button>
            ))}
          </div>

          {isMobile && (
            <button className="explore-more-btn" onClick={handleExploreMore}>
              Explore More
            </button>
          )}

          {showPopup && (
            <div className="tags-popup">
              <div className="popup-header">
                <h4>Select Category</h4>
                <button className="popup-close-btn" onClick={handleClosePopup}>×</button>
              </div>
              <div className="popup-tags-container">
                {tags.map((tag, index) => (
                 <button
                 key={index}
                 className={`tag-button ${
                   (selectedCategory === null && tag === "All") ||
                   selectedCategory === tag
                     ? "tag-button--active"
                     : ""
                 }`}
                 onClick={() => {
                   handleCategoryClick(tag);
                   handleClosePopup();
                 }}
               >
                 {tag}
               </button>
                ))}
              </div>
            </div>
          )}
        </section>


        <section className="posts-grid">
  {(Array.isArray(filteredPosts) ? filteredPosts : []).map(post => (
    <BlogPostCard key={post.id} post={post} />
  ))}
</section>
         {/* --- FOOTER SECTION --- */}
                      {/* <footer className="euphoria-footer">
                      <div
                        className="euphoria-footer-wave-bg"
                        style={{ backgroundImage: `url(${footerWaveImage})` }}
                      >
                        <div className="euphoria-footer-content">
                          <div className="euphoria-footer-logo">
                            Euphoria
                          </div>
                
                          <div className="euphoria-nav-and-socials-container">
                            <nav className="euphoria-footer-nav">
                              {navLinks.map((link) => (
                                <a
                                  key={link.name}
                                  href={link.path}
                                  style={{ marginLeft: link.marginLeft }}
                                >
                                  {link.name}
                                </a>
                              ))}
                            </nav>
                
                            <div className="euphoria-footer-socials">
                              {socialLinks.map((social) => (
                                <a key={social.name} href={social.path} target="_blank" rel="noopener noreferrer" aria-label={social.name}>
                                  <img src={social.icon} alt={social.name} />
                                </a>
                              ))}
                            </div>
                            </div>
                        </div>
                      </div>
                      
                    </footer> */}
                    <Footer />
      </main>
    </div>
  );
};

export default BlogPage;