import React, { useRef, useState, useEffect } from "react";
import "./BlogPage.css"; 
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./HomePage.css";
import Footer from "./Footer_page";


import homepage1 from './assets/homepage/homepage103.jpg';
import homepage2 from './assets/homepage/h2.jpeg';
import homepage3 from './assets/homepage/h3.jpg';
import homepage4 from './assets/homepage/homepage107.jpg';
import homepage5 from './assets/homepage/homepage5.png';
import homepage6 from './assets/homepage/homepage6.png';
import homepage7 from './assets/homepage/homepage7.png';
import homepage8 from './assets/homepage/homepage8.png';
import homepage9 from './assets/homepage/homepage9.png';
import homepage10 from './assets/homepage/homepage10.png';
import homepage11 from './assets/homepage/homepage11.png';
import homepage12 from './assets/homepage/homepage12.png';
import homepage13 from './assets/homepage/homepage13.png';
import homepage14 from './assets/homepage/homepage14.png';
import homepagesearch from './assets/homepage/homepagesearch.png';
import videoIcon from "./assets/homepage/video3.png";
import blogIcon from "./assets/homepage/blog4.png";


// import emailIcon from './assets/social-email.svg'; // Replace with your actual icon paths
// import twitterIcon from './assets/social-twitter.svg';
// import linkedinIcon from './assets/social-linkedin.svg';
// import whatsappIcon from './assets/social-whatsapp.svg';
// import facebookIcon from './assets/social-facebook.svg';
import rightWave from './assets/homepage/wave-middle-right.png';





const HomePage = () => {
  
  const numColumns = 5;
  const gridRowGapValue = 20; // MUST match row-gap in CSS

  const baseOffsetOddColumn = 8;
  const baseOffsetEvenColumn = 30;
  const [showAll, setShowAll] = useState(false);
  const [initialVisibleCount, setInitialVisibleCount] = useState(3); 
  const BlogPostCardHomepage = ({ post }) => {
    const navigate = useNavigate();
  
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
  
  
  const categoriesList = [
    { id: 'abnormal-psychology',label: 'Abnormal Psychology', imgSrc: homepage5 }, 
    { id: 'abuse', label: 'abuse', imgSrc: homepage6 },                         
    { id: 'addiction', label: 'Addiction', imgSrc: homepage7 },                   
    { id: 'ambiverts', label: 'Ambiverts', imgSrc: homepage8 },                 
    { id: 'autism', label: 'Autism', imgSrc: homepage9 },                       

    { id: 'depression', label: 'Depression', imgSrc: homepage10 },                 
    { id: 'eating-disorder', label: 'Eating Disorder', imgSrc: homepage11 },       
    { id: 'family', label: 'Family', imgSrc: homepage12 },                      
    { id: 'happiness', label: 'Happiness', imgSrc: homepage13 },                 
    { id: 'entertainment', label: 'Entertainment', imgSrc: homepage14 },          
  ];

  // const visibleCategories = showAll ? categoriesList : categoriesList.slice(0, 3);
    

  // const recentPostsData = [
  //   {
  //     id: 1,
  //     image: postImage1, // Use imported image
  //     title: "How Relationships Reveal Our True Selves",
  //     excerpt: "Ever wondered who's behind the stories and advice here at Psych2Go? Meet our amazing team of writers! They're the ones who dive deep into topics...",
  //     author: "Kelly",
  //     date: "October 29, 2024",
  //   },
  //   {
  //     id: 2,
  //     image: postImage2, // Use imported image
  //     title: "How Relationships Reveal Our True Selves",
  //     excerpt: "Ever wondered who's behind the stories and advice here at Psych2Go? Meet our amazing team of writers! They're the ones who dive deep into topics...",
  //     author: "Kelly",
  //     date: "October 29, 2024",
  //   },
  //   {
  //     id: 3,
  //     image: postImage3, // Use imported image
  //     title: "How Relationships Reveal Our True Selves",
  //     excerpt: "Ever wondered who's behind the stories and advice here at Psych2Go? Meet our amazing team of writers! They're the ones who dive deep into topics...",
  //     author: "Kelly",
  //     date: "October 29, 2024",
  //   },
  //   {
  //     id: 4,
  //     image: postImage4, // Use imported image
  //     title: "How Relationships Reveal Our True Selves",
  //     excerpt: "Ever wondered who's behind the stories and advice here at Psych2Go? Meet our amazing team of writers! They're the ones who dive deep into topics...",
  //     author: "Kelly",
  //     date: "October 29, 2024",
  //   },
  // ];

  const [recentPosts, setRecentPosts] = useState([]);


  // const navLinks = [
  //   { name: 'Home', path: '/', marginLeft: '0px' },
  //   { name: 'About Us', path: '/about', marginLeft: '0px' }, // Example value
  //   { name: 'Blogs', path: '/blogs', marginLeft: '0px' }, // Example value
  //   { name: 'Video Lessons', path: '/videolessons', marginLeft: '0px' }, // Example value
  //   { name: 'Life Lessons', path: '/lifelessons', marginLeft: '0px' },   // Example value
  //   { name: 'Psychotherapy Types', path: '/psychotherapy', marginLeft: '0px' }, // Example value
    
  //   { name: 'Resources', path: '/resources', marginLeft: '268px' }, // Example value
  //   { name: 'Contact Us', path: '/contactus', marginLeft: '268px' }, // Example value
  //   { name: 'FAQ', path: '/faq', marginLeft: '330px' }, // Example value
  // ];
 
  // IMPORTANT: Replace placeholder icon paths with your actual icon image files.
  // These should ideally be white icons, possibly within a light circle as suggested by the image.
 
  
  const handleCategoryClick = (categoryLabel) => {
    // We add src=category so the results page knows to change the title
    navigate(`/search?query=${encodeURIComponent(categoryLabel)}&src=category`);
  };
  // const socialLinks = [
  //   { name: 'Email', icon: emailIcon, path: 'mailto:info@euphoria.com' },
  //   { name: 'Twitter', icon: twitterIcon, path: 'https://twitter.com' },
  //   { name: 'LinkedIn', icon: linkedinIcon, path: 'https://linkedin.com' },
  //   { name: 'WhatsApp', icon: whatsappIcon, path: 'https://wa.me/yournumber' },
  //   { name: 'Facebook', icon: facebookIcon, path: 'https://facebook.com' },
  // ];

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

  // --- Mobile Carousel State ---
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
  
    const handleScroll = () => {
      const index = Math.round(container.scrollLeft / container.offsetWidth);
      setActiveIndex(index);
    };
  
    container.addEventListener("scroll", handleScroll);
  
    // ✅ Auto-scroll logic
    const autoScroll = setInterval(() => {
      if (!container) return;
      const nextIndex = (activeIndex + 1) % images.length;
      container.scrollTo({
        left: nextIndex * container.offsetWidth,
        behavior: "smooth",
      });
      setActiveIndex(nextIndex);
    }, 2000); // scroll every 3 seconds
  
    return () => {
      container.removeEventListener("scroll", handleScroll);
      clearInterval(autoScroll);
    };
  }, [activeIndex, images.length]);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 993) {
        setInitialVisibleCount(5); // Show 5 from 993px upwards
      } else if (width >= 577) {
        setInitialVisibleCount(3); // Show 3 from 577px up to 992px (this covers your 768-992 range)
      } else if (width >= 401) {
        setInitialVisibleCount(2); // Show 2 from 401px up to 576px
      } else {
        setInitialVisibleCount(2); // Show 1 for very small screens (<401px)
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [categoriesList.length]);

  const visibleCategories = showAll ? categoriesList : categoriesList.slice(0, initialVisibleCount);

  const [searchText, setSearchText] = useState("");
const [suggestions, setSuggestions] = useState([]);

const navigate = useNavigate();

useEffect(() => {
  const API_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:3000"
    : "https://euphoria-backend-oii0.onrender.com";
  if (searchText.trim().length < 2) {
    setSuggestions([]);
    return;
  }

  // Call the new unified API
  axios
    .get(`${API_URL}/api/search-all?q=${searchText}`)
    .then((res) => {
      // Combine blogs and videos into one list for suggestions
      const videoSuggestions = (res.data.videos || []).map(v => ({ ...v, type: 'video' }));
      const blogSuggestions = (res.data.blogs || []).map(b => ({ ...b, type: 'blog' }));
      setSuggestions([...videoSuggestions, ...blogSuggestions]);
    })
    .catch(() => setSuggestions([]));
}, [searchText]);

  const handleSearch = () => {
    if (!searchText.trim()) return;
    navigate( `/search?query=${encodeURIComponent(searchText.trim())}&type=video`);
  };
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!document.querySelector(".search-box-wrapper")?.contains(e.target)) {
        setSuggestions([]); // close dropdown on outside click
      }
    };
  
    document.addEventListener("click", handleClickOutside);
  
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);



  useEffect(() => {
    const API_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:3000"
    : "https://euphoria-backend-oii0.onrender.com";
    fetch(`${API_URL}/api/blogs_listing`)
      .then(res => res.json())
      .then(data => {
  
        // Handle different API shapes (same as BlogPage)
        let blogs = [];
  
        if (Array.isArray(data)) {
          blogs = data;
        } else if (data?.data) {
          blogs = data.data;
        } else if (data?.rows) {
          blogs = data.rows;
        }
  
        // Take only first 4
        setRecentPosts(blogs.slice(0, 6));
      })
      .catch(err => console.error("Failed to load blogs:", err));
  }, []);




  

  return (
    <div className="homepage-container">
      {/* These are the new decorative images placed in the background */}
     
      <img src={rightWave} alt="Decorative middle left wave" className="decorative-wave left-waves" />
      <img src={rightWave} alt="Decorative middle right wave" className="decorative-wave right-wave" />
      {/* <header className="header">
      <div className="green-bar">
      <div className="logo">Euphoria</div>
      </div>
        
        <nav className="nav">
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Academy</a>
          <a href="#">Clinic</a>
          <a href="#">Shop</a>
          <a href="#">Workshops</a>
        </nav>
        <div className="auth-buttons">
          <button className="btn-outline">Login</button>
          <button className="btn">Sign Up</button>
        </div>
      </header> */}

      <section className="banner-grid">
        <div className="banner-card card-1">
          <img src={homepage1} alt="Card 1" />
          <div className="banner-text">
            There Is a Way To Be Happy:<br />
            If You Don’t Expect Anything,<br />
            You Don’t Get Disappointed.
          </div>
        </div>
        <div className="banner-card card-2">
          <img src={homepage2} alt="Card 2" />
          <div className="banner-text1">A Smile Is The Beauty Of The Soul</div>
        </div>
        <div className="banner-card card-3">
          <img src={homepage3} alt="Card 3" />
          <div className="banner-text2">Happiness Is a Habit – Cultivate It.</div>
        </div>
        <div className="banner-card card-4">
          <img src={homepage4} alt="Card 4" />
          <div className="banner-text3">You Will Be Exactly As Happy As You Decide To Be.</div>
        </div>
      </section>

      <div className="mobile-carousel">
        <div className="mobile-carousel-container" ref={containerRef}>
          {images.map((img, index) => (
            <div className="mobile-carousel-slide" key={index}>
              <img src={img.src} alt={`Slide ${index + 1}`} className="mobile-carousel-image" />
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


      <section className="intro-section">
        <h2 className="intro-title">A Place To Have Fun, Learn and Heal</h2>
        {/* <p className="intro-text"  style={{fontFamily: "'Poppins', sans-serif"}}>
          When I first built Psych2Go in 2008, my vision was to establish a platform for people to communicate, create, and discuss all things psychology, mental health and life. Being the loner in high school, and an introvert, I didn’t know there was a place that allowed friendships, learning and community to develop. Thanks to Tumblr, I was able to post content about psychology, mental health awareness, and other content related to psychology. From there, a small community was formed. You all came to offer answers to questions I had, and even ask more questions on topics I myself was starting to learn about. Those were the best days of Psych2Go, at least for me. Now, we have so many animators, writers, voice actors, and over a thousand videos on Youtube about all things psychology and mental health and everything in between. However, things at Psych2Go is beginning to feel a little too corporate. Too repetitive, too distant from what we used to be.
        </p> */}
        <p className="intro-text"  style={{fontFamily: "'Inter', sans-serif"}}>
          When I first built Psych2Go in 2008, my vision was to establish a platform for people to communicate, create, and discuss all things psychology, mental health and life. Being the loner in high school, and an introvert, I didn’t know there was a place that allowed friendships, learning and community to develop. Thanks to Tumblr, I was able to post content about psychology, mental health awareness, and other content related to psychology. From there, a small community was formed. You all came to offer answers to questions I had, and even ask more questions on topics I myself was starting to learn about. Those were the best days of Psych2Go, at least for me. Now, we have so many animators, writers, voice actors, and over a thousand videos on Youtube about all things psychology and mental health and everything in between. However, things at Psych2Go is beginning to feel a little too corporate. Too repetitive, too distant from what we used to be.
        </p>
        {/* <p className="intro-text" style={{ fontFamily: "'Roboto', sans-serif"  }}>
          When I first built Psych2Go in 2008, my vision was to establish a platform for people to communicate, create, and discuss all things psychology, mental health and life. Being the loner in high school, and an introvert, I didn’t know there was a place that allowed friendships, learning and community to develop. Thanks to Tumblr, I was able to post content about psychology, mental health awareness, and other content related to psychology. From there, a small community was formed. You all came to offer answers to questions I had, and even ask more questions on topics I myself was starting to learn about. Those were the best days of Psych2Go, at least for me. Now, we have so many animators, writers, voice actors, and over a thousand videos on Youtube about all things psychology and mental health and everything in between. However, things at Psych2Go is beginning to feel a little too corporate. Too repetitive, too distant from what we used to be.
        </p>
        <p className="intro-text"  style={{fontFamily: "'Playfair Display', serif"}}>
          When I first built Psych2Go in 2008, my vision was to establish a platform for people to communicate, create, and discuss all things psychology, mental health and life. Being the loner in high school, and an introvert, I didn’t know there was a place that allowed friendships, learning and community to develop. Thanks to Tumblr, I was able to post content about psychology, mental health awareness, and other content related to psychology. From there, a small community was formed. You all came to offer answers to questions I had, and even ask more questions on topics I myself was starting to learn about. Those were the best days of Psych2Go, at least for me. Now, we have so many animators, writers, voice actors, and over a thousand videos on Youtube about all things psychology and mental health and everything in between. However, things at Psych2Go is beginning to feel a little too corporate. Too repetitive, too distant from what we used to be.
        </p>
        <p className="intro-text"  style={{fontFamily: "'DM Serif Display', serif"}}>
          When I first built Psych2Go in 2008, my vision was to establish a platform for people to communicate, create, and discuss all things psychology, mental health and life. Being the loner in high school, and an introvert, I didn’t know there was a place that allowed friendships, learning and community to develop. Thanks to Tumblr, I was able to post content about psychology, mental health awareness, and other content related to psychology. From there, a small community was formed. You all came to offer answers to questions I had, and even ask more questions on topics I myself was starting to learn about. Those were the best days of Psych2Go, at least for me. Now, we have so many animators, writers, voice actors, and over a thousand videos on Youtube about all things psychology and mental health and everything in between. However, things at Psych2Go is beginning to feel a little too corporate. Too repetitive, too distant from what we used to be.
        </p>
        <p className="intro-text"  style={{fontFamily: "'Space Grotesk', sans-serif"}}>
          When I first built Psych2Go in 2008, my vision was to establish a platform for people to communicate, create, and discuss all things psychology, mental health and life. Being the loner in high school, and an introvert, I didn’t know there was a place that allowed friendships, learning and community to develop. Thanks to Tumblr, I was able to post content about psychology, mental health awareness, and other content related to psychology. From there, a small community was formed. You all came to offer answers to questions I had, and even ask more questions on topics I myself was starting to learn about. Those were the best days of Psych2Go, at least for me. Now, we have so many animators, writers, voice actors, and over a thousand videos on Youtube about all things psychology and mental health and everything in between. However, things at Psych2Go is beginning to feel a little too corporate. Too repetitive, too distant from what we used to be.
        </p>
        <p className="intro-text"  style={{fontFamily: "'Karla', sans-serif"}}>
          When I first built Psych2Go in 2008, my vision was to establish a platform for people to communicate, create, and discuss all things psychology, mental health and life. Being the loner in high school, and an introvert, I didn’t know there was a place that allowed friendships, learning and community to develop. Thanks to Tumblr, I was able to post content about psychology, mental health awareness, and other content related to psychology. From there, a small community was formed. You all came to offer answers to questions I had, and even ask more questions on topics I myself was starting to learn about. Those were the best days of Psych2Go, at least for me. Now, we have so many animators, writers, voice actors, and over a thousand videos on Youtube about all things psychology and mental health and everything in between. However, things at Psych2Go is beginning to feel a little too corporate. Too repetitive, too distant from what we used to be.
        </p>
        <p className="intro-text"  style={{fontFamily: "Crimson Text', serif"}}>
          When I first built Psych2Go in 2008, my vision was to establish a platform for people to communicate, create, and discuss all things psychology, mental health and life. Being the loner in high school, and an introvert, I didn’t know there was a place that allowed friendships, learning and community to develop. Thanks to Tumblr, I was able to post content about psychology, mental health awareness, and other content related to psychology. From there, a small community was formed. You all came to offer answers to questions I had, and even ask more questions on topics I myself was starting to learn about. Those were the best days of Psych2Go, at least for me. Now, we have so many animators, writers, voice actors, and over a thousand videos on Youtube about all things psychology and mental health and everything in between. However, things at Psych2Go is beginning to feel a little too corporate. Too repetitive, too distant from what we used to be.
        </p>
        <p className="intro-text"  style={{fontFamily: "'Merriweather', serif"}}>
          When I first built Psych2Go in 2008, my vision was to establish a platform for people to communicate, create, and discuss all things psychology, mental health and life. Being the loner in high school, and an introvert, I didn’t know there was a place that allowed friendships, learning and community to develop. Thanks to Tumblr, I was able to post content about psychology, mental health awareness, and other content related to psychology. From there, a small community was formed. You all came to offer answers to questions I had, and even ask more questions on topics I myself was starting to learn about. Those were the best days of Psych2Go, at least for me. Now, we have so many animators, writers, voice actors, and over a thousand videos on Youtube about all things psychology and mental health and everything in between. However, things at Psych2Go is beginning to feel a little too corporate. Too repetitive, too distant from what we used to be.
        </p>
        <p className="intro-text"  style={{fontFamily: "'Space Grotesk', sans-serif"}}>
          When I first built Psych2Go in 2008, my vision was to establish a platform for people to communicate, create, and discuss all things psychology, mental health and life. Being the loner in high school, and an introvert, I didn’t know there was a place that allowed friendships, learning and community to develop. Thanks to Tumblr, I was able to post content about psychology, mental health awareness, and other content related to psychology. From there, a small community was formed. You all came to offer answers to questions I had, and even ask more questions on topics I myself was starting to learn about. Those were the best days of Psych2Go, at least for me. Now, we have so many animators, writers, voice actors, and over a thousand videos on Youtube about all things psychology and mental health and everything in between. However, things at Psych2Go is beginning to feel a little too corporate. Too repetitive, too distant from what we used to be.
        </p>
        <p className="intro-text"  style={{fontFamily: "'Lora', serif"}}>
          When I first built Psych2Go in 2008, my vision was to establish a platform for people to communicate, create, and discuss all things psychology, mental health and life. Being the loner in high school, and an introvert, I didn’t know there was a place that allowed friendships, learning and community to develop. Thanks to Tumblr, I was able to post content about psychology, mental health awareness, and other content related to psychology. From there, a small community was formed. You all came to offer answers to questions I had, and even ask more questions on topics I myself was starting to learn about. Those were the best days of Psych2Go, at least for me. Now, we have so many animators, writers, voice actors, and over a thousand videos on Youtube about all things psychology and mental health and everything in between. However, things at Psych2Go is beginning to feel a little too corporate. Too repetitive, too distant from what we used to be.
        </p>
        <p className="intro-text"  style={{fontFamily: "'Bodoni Moda', serif"}}>
          When I first built Psych2Go in 2008, my vision was to establish a platform for people to communicate, create, and discuss all things psychology, mental health and life. Being the loner in high school, and an introvert, I didn’t know there was a place that allowed friendships, learning and community to develop. Thanks to Tumblr, I was able to post content about psychology, mental health awareness, and other content related to psychology. From there, a small community was formed. You all came to offer answers to questions I had, and even ask more questions on topics I myself was starting to learn about. Those were the best days of Psych2Go, at least for me. Now, we have so many animators, writers, voice actors, and over a thousand videos on Youtube about all things psychology and mental health and everything in between. However, things at Psych2Go is beginning to feel a little too corporate. Too repetitive, too distant from what we used to be.
        </p>
        <p className="intro-text"  style={{fontFamily: "'Caveat', cursive"}}>
          When I first built Psych2Go in 2008, my vision was to establish a platform for people to communicate, create, and discuss all things psychology, mental health and life. Being the loner in high school, and an introvert, I didn’t know there was a place that allowed friendships, learning and community to develop. Thanks to Tumblr, I was able to post content about psychology, mental health awareness, and other content related to psychology. From there, a small community was formed. You all came to offer answers to questions I had, and even ask more questions on topics I myself was starting to learn about. Those were the best days of Psych2Go, at least for me. Now, we have so many animators, writers, voice actors, and over a thousand videos on Youtube about all things psychology and mental health and everything in between. However, things at Psych2Go is beginning to feel a little too corporate. Too repetitive, too distant from what we used to be.
        </p>
        <p className="intro-text"  style={{fontFamily: "'Dancing Script', cursive"}}>
          When I first built Psych2Go in 2008, my vision was to establish a platform for people to communicate, create, and discuss all things psychology, mental health and life. Being the loner in high school, and an introvert, I didn’t know there was a place that allowed friendships, learning and community to develop. Thanks to Tumblr, I was able to post content about psychology, mental health awareness, and other content related to psychology. From there, a small community was formed. You all came to offer answers to questions I had, and even ask more questions on topics I myself was starting to learn about. Those were the best days of Psych2Go, at least for me. Now, we have so many animators, writers, voice actors, and over a thousand videos on Youtube about all things psychology and mental health and everything in between. However, things at Psych2Go is beginning to feel a little too corporate. Too repetitive, too distant from what we used to be.
        </p>
        <p className="intro-text"  style={{fontFamily: "'Chivo Mono', monospace"}}>
          When I first built Psych2Go in 2008, my vision was to establish a platform for people to communicate, create, and discuss all things psychology, mental health and life. Being the loner in high school, and an introvert, I didn’t know there was a place that allowed friendships, learning and community to develop. Thanks to Tumblr, I was able to post content about psychology, mental health awareness, and other content related to psychology. From there, a small community was formed. You all came to offer answers to questions I had, and even ask more questions on topics I myself was starting to learn about. Those were the best days of Psych2Go, at least for me. Now, we have so many animators, writers, voice actors, and over a thousand videos on Youtube about all things psychology and mental health and everything in between. However, things at Psych2Go is beginning to feel a little too corporate. Too repetitive, too distant from what we used to be.
        </p> */}

        <div className="intro-buttons">
          <button className="read-more-button" onClick={() => navigate("/about")}>Read More</button>
          {/* <div className="search-container">
            <input className="search-input" type="text" placeholder="Search here..." />
            <button className="search-icon"><img src={homepagesearch} alt="Card 4" /></button>
          </div> */}
          
        </div>
      </section>

      <section className="category-section-homepage">
      <h3 className="section-title-homepage">Categories</h3>
      <div className="category-grid-homepage">
        {visibleCategories.map((category, index) => {
          const columnIndex = index % numColumns; // This still refers to the *potential* column index if all were shown in a 5-column grid
          const isEvenStyledColumn = (columnIndex + 1) % 2 === 0;

          let finalTransformOffsetY = isEvenStyledColumn
            ? baseOffsetEvenColumn
            : baseOffsetOddColumn;

          // You might need to adjust 'isAfterFirstRow' logic if your numColumns for display changes dynamically in CSS
          // For now, assuming numColumns is your max potential columns (5)
          const actualDisplayColumns = window.innerWidth >= 1024 ? 5 : (window.innerWidth >= 768 ? 4 : 3); // Get current display columns
          const isAfterFirstRow = index >= actualDisplayColumns;


          const itemStyle = {
            transform: `translateY(${finalTransformOffsetY}px)`,
            transition: "transform 0.3s ease",
          };

          if (isEvenStyledColumn && isAfterFirstRow) {
            itemStyle.transform = `translateY(${
              baseOffsetEvenColumn - gridRowGapValue
            }px)`;
          }

          // These specific index overrides might need careful reconsideration if the number of visible items changes often.
          // They might become less predictable.
          if (index === 6 || index === 8) { // These indices refer to the *original* categoriesList index
            itemStyle.transform = "translateY(30px)";
          }

          return (
            <div
              key={category.id}
              className="category-card-homepage"
              style={{ ...itemStyle, cursor: "pointer" }} // Added cursor pointer
              onClick={() => handleCategoryClick(category.label)} // Added click handler
            >
              <img
                src={category.imgSrc}
                alt={category.label}
                className="category-image-homepage"
              />
              <p className="category-label-homepage">{category.label}</p>
            </div>
          );
        })}
      </div>

      <div className="view-all-container-homepage">
        {/* Only show "View More/Less" if there are more categories than initially visible */}
        {categoriesList.length > initialVisibleCount && (
          <button
            className="btn-view-all-homepage"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "View Less" : "View More"}
          </button>
        )}
      </div>
    </section>
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
        <img src={homepagesearch} alt="Search" />
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

            navigate(
              `/search?query=${encodeURIComponent(title)}&type=${type}`
            );

            setSuggestions([]);
        }}
      >
        {/* <span>{item.type === 'video' ? "🎥 " : "📝 "}</span> */}
        <img
          src={item.type === "video" ? videoIcon : blogIcon}
          alt="icon"
          className="suggestion-icon"
        />
        {item.type === 'video' ? item.snippet.title : item.blog_title}
      </div>
    ))}
  </div>
)}
  </div>
</section>


<section className="recent-posts-section">


<div className="posts-grid2">
                {recentPosts.map(blog => (
                  <BlogPostCardHomepage key={blog.id} post={blog} />
                ))}
              </div>

<div className="load-more-container1">
  <button
    className="load-more-btn1"
    onClick={() => navigate("/blogs")}
  >
    Load More
  </button>
</div>

</section>

  
      {/* --- END RECENT POSTS SECTION --- */}


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
    <div className="footer-nav-column">
      {firstColumnLinks.map(link => (
        <a key={link.name} href={link.path}>{link.name}</a>
      ))}
    </div>

    <div className="footer-nav-column1">
      {secondColumnLinks.map(link => (
        <a key={link.name} href={link.path}>{link.name}</a>
      ))}
    </div>
  </nav>

  <div className="euphoria-footer-socials">
    {socialLinks.map(social => (
      <a
        key={social.name}
        href={social.path}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={social.name}
      >
        <img src={social.icon} alt={social.name} />
      </a>
    ))}
  </div>
</div>

        </div>
      </div>
     
    </footer> */}
    <Footer />
    
   
      </div>
  );
};

export default HomePage;
