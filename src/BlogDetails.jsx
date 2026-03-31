// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { getBlogBySlug } from "./blogService";

// const BlogDetails = () => {
//   const { slug } = useParams();
//   const [blog, setBlog] = useState(null);

//   useEffect(() => {
//     getBlogBySlug(slug)
//       .then(setBlog)
//       .catch(console.error);
//   }, [slug]);

//   if (!blog) return <div>Loading...</div>;

//   return (
//     <div className="blog-details-wrapper">
//       <h1>{blog.blog_title}</h1>

//       <div dangerouslySetInnerHTML={{ __html: blog.blog_content1 }} />

//       {blog.image1 && <img src={blog.image1} alt={blog.image1_metatag} />}

//       <div dangerouslySetInnerHTML={{ __html: blog.blog_content2 }} />

//       <div dangerouslySetInnerHTML={{ __html: blog.blog_content3 }} />

//       {blog.image2 && <img src={blog.image2} alt={blog.image2_metatag} />}

//       <div dangerouslySetInnerHTML={{ __html: blog.blog_content4 }} />

//       {blog.image3 && <img src={blog.image3} alt={blog.image3_metatag} />}

//       <div dangerouslySetInnerHTML={{ __html: blog.blog_content5 }} />
//     </div>
//   );
// };

// export default BlogDetails;import { useParams } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";

import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getBlogBySlug } from "./blogService";
import "./BlogDetails.css";
import Footer from "./Footer_page";


const BlogDetails = () => {
  const [tocOpen, setTocOpen] = useState(false);
    const navigate = useNavigate(); 
    const [categories, setCategories] = useState([]);
    const { slug } = useParams();
    const [blog, setBlog] = useState(null);
    
    
    useEffect(() => {
    getBlogBySlug(slug)
    .then(setBlog)
    .catch(console.error);
    }, [slug]);
    
    
   
  
  useEffect(() => {
    const API_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:3000"
    : "https://euphoria-backend-oii0.onrender.com";
    fetch(`${API_URL}/api/blog-categories`)
      .then(res => res.json())
      .then(setCategories)
      .catch(console.error);
  }, []);
    
    
    // const headings = useMemo(() => {
    // if (!blog) return [];
    // const container = document.createElement("div");
    // container.innerHTML = `${blog.blog_content1 || ""}${blog.blog_content2 || ""}${blog.blog_content3 || ""}${blog.blog_content4 || ""}${blog.blog_content5 || ""}`;
    // return Array.from(container.querySelectorAll("h2, h3")).map(h => ({
    // id: h.innerText.replace(/\s+/g, "-").toLowerCase(),
    // text: h.innerText,
    // tag: h.tagName
    // }));
    // }, [blog]);
    const headings = useMemo(() => {
      if (!blog) return [];
    
      const container = document.createElement("div");
      container.innerHTML = `
        ${blog.blog_content1 || ""}
        ${blog.blog_content2 || ""}
        ${blog.blog_content3 || ""}
        ${blog.blog_content4 || ""}
        ${blog.blog_content5 || ""}
      `;
    
      const seen = new Set();
    
      return Array.from(container.querySelectorAll("h2, h3"))
        .map(h => ({
          id: h.innerText.replace(/\s+/g, "-").toLowerCase(),
          text: h.innerText,
          tag: h.tagName
        }))
        .filter(h => {
          if (seen.has(h.id)) return false;
          seen.add(h.id);
          return true;
        });
    
    }, [blog]);
    useEffect(() => {
        if (!blog) return;
      
        const content = document.getElementById("content");
        if (!content) return;
      
        const headings = content.querySelectorAll("h2, h3");
      
        headings.forEach(h => {
          const id = h.innerText
            .trim()
            .replace(/\s+/g, "-")
            .toLowerCase();
      
          h.setAttribute("id", id);
        });
      }, [blog]);
      useEffect(() => {
        if (!blog) return;
      
        const hash = window.location.hash.replace("#", "");
        if (!hash) return;
      
        setTimeout(() => {
          const el = document.getElementById(hash);
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
          }
        }, 300);
      }, [blog]);
    
    if (!blog) return <div className="loading">Loading...</div>;
    
    
return (
<div className="blog-page">
{/* Banner */}
<section className="blog-banner">

{blog.banner_image && (
  <img 
  src={blog.banner_image} 
  alt="Blog banner"
  className="banner-image" 
/>
)}
</section>


{/* Main Layout */}
<section className="blog-layout">
{/* LEFT – Table of Contents */}
<aside className="toc">
  <div 
    className="toc-header"
    onClick={() => setTocOpen(!tocOpen)}
  >
    <h4>Table of Contents</h4>
    <span className={`arrow ${tocOpen ? "open" : ""}`}>⌄</span>
  </div>

  <div className={`toc-body ${tocOpen ? "show" : ""}`}>
    <ul>
      {headings.map((h, i) => (
        <li key={i} className={h.tag === "H3" ? "sub" : ""}>
          <a
            href={`#${h.id}`}
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById(h.id);
              if (el) {
                el.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
                window.history.pushState(null, "", `#${h.id}`);
              }

              setTocOpen(false); // close after click (mobile UX)
            }}
          >
            {h.text}
          </a>
        </li>
      ))}
    </ul>

    <hr className="toc-divider" />

    <h4 className="categories-title">Categories</h4>

    <div className="categories">
      {categories.map((cat, i) => (
        <span
          key={i}
          className={cat === blog.product_category ? "active" : ""}
          onClick={() =>
            navigate(`/blogs?category=${encodeURIComponent(cat)}`)
          }
        >
          {cat}
        </span>
      ))}
    </div>
  </div>
</aside>


{/* RIGHT – Content */}
<article className="content">
<p className="category">{blog.product_category}</p>
<h1>{blog.blog_title}</h1>


{/* <div id="content">
<div dangerouslySetInnerHTML={{ __html: blog.blog_content1 }} />
<div dangerouslySetInnerHTML={{ __html: blog.blog_content2 }} />
<div dangerouslySetInnerHTML={{ __html: blog.blog_content3 }} />
{blog.image2 && <img src={blog.image2} alt={blog.image2_metatag} />}
<div dangerouslySetInnerHTML={{ __html: blog.blog_content4 }} />
{blog.image3 && <img src={blog.image3} alt={blog.image3_metatag} />}
<div dangerouslySetInnerHTML={{ __html: blog.blog_content5 }} />
</div> */}

<div id="content">
  <div dangerouslySetInnerHTML={{ __html: blog.blog_content1 }} />

  {blog.image1 && (
    <img src={blog.image1} alt={blog.image1_metatag} />
  )}

  <div dangerouslySetInnerHTML={{ __html: blog.blog_content2 }} />
  <div dangerouslySetInnerHTML={{ __html: blog.blog_content3 }} />

  {blog.image2 && (
    <img src={blog.image2} alt={blog.image2_metatag} />
  )}

  <div dangerouslySetInnerHTML={{ __html: blog.blog_content4 }} />

  {blog.image3 && (
    <img src={blog.image3} alt={blog.image3_metatag} />
  )}

  <div dangerouslySetInnerHTML={{ __html: blog.blog_content5 }} />
</div>
</article>
</section>
<Footer />
</div>
);

};


export default BlogDetails;
