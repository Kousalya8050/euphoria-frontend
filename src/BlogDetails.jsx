import { useEffect, useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import { getBlogBySlug } from "./blogService";
import "./BlogDetails.css";
import Footer from "./Footer_page";

const BlogDetails = () => {
  const [tocOpen, setTocOpen] = useState(false);
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);

  // --- HELPER: Resolve Image URLs Safely ---
  const getSafeUrl = (path) => {
    if (!path || path === "null") return "";

    // 1. Fix Double URL if backend sent a "Frankenstein" link
    if (path.includes("https://") && path.lastIndexOf("https://") > 0) {
      return path.substring(path.lastIndexOf("https://"));
    }

    // 2. If it's already a Cloud URL, return it
    if (path.startsWith("http")) return path;

    // 3. If it's an old local relative path, add backend prefix
    const API_URL = window.location.hostname === "localhost"
      ? "http://localhost:3000"
      : "https://euphoria-backend-oii0.onrender.com";
      
    return `${API_URL}/${path}`;
  };


  useEffect(() => {
    getBlogBySlug(slug).then(setBlog).catch(console.error);
  }, [slug]);

  useEffect(() => {
    const API_URL = window.location.hostname === "localhost"
      ? "http://localhost:3000"
      : "https://euphoria-backend-oii0.onrender.com";
    fetch(`${API_URL}/api/blog-categories`)
      .then((res) => res.json())
      .then(setCategories)
      .catch(console.error);
  }, []);

  const cleanHTML = (html) => {
    if (!html) return "";
    const parts = html.split(/(?=<h[23])/i); 
    const seenPlainText = new Set();
    return parts
      .filter((part) => {
        const plainText = part.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim();
        if (!plainText) return true;
        if (seenPlainText.has(plainText)) return false;
        seenPlainText.add(plainText);
        return true;
      })
      .join("");
  };

  const headings = useMemo(() => {
    if (!blog) return [];
    const seenText = new Set();
    const result = [];

    const addHeading = (text, tag) => {
      if (!text || text.trim() === "") return;
      // Headings never contain commas, so splitting on "," is safe for fields
      // where the admin stored multiple headings as "H1, H2, H3"
      const parts = text.split(",");
      parts.forEach(part => {
        const cleanText = part.trim();
        if (cleanText && !seenText.has(cleanText.toLowerCase())) {
          seenText.add(cleanText.toLowerCase());
          result.push({
            id: cleanText.replace(/\s+/g, "-").toLowerCase().replace(/[?.,!]/g, ""),
            text: cleanText,
            tag: tag.toUpperCase(),
          });
        }
      });
    };

    // Primary: HTML content h2/h3 tags in correct document order
    const container = document.createElement("div");
    container.innerHTML = [1, 2, 3, 4, 5].map(i => blog[`blog_content${i}`] || "").join("");
    container.querySelectorAll("h2, h3").forEach(el => addHeading(el.textContent, el.tagName));

    // Secondary: database heading fields — deduplicated against HTML above.
    // Useful for supplemental entries (e.g. FAQ h3 subheadings) not tagged in HTML.
    for (let i = 1; i <= 10; i++) {
      if (blog[`h2_${i}`]) addHeading(blog[`h2_${i}`], "H2");
      if (blog[`h3_${i}`]) addHeading(blog[`h3_${i}`], "H3");
    }

    return result;
  }, [blog]);

  useEffect(() => {
    if (!blog) return;
    const content = document.getElementById("content");
    if (!content) return;
    const headingEls = content.querySelectorAll("h2, h3");
    headingEls.forEach((h) => {
      const id = h.textContent.trim().replace(/\s+/g, "-").toLowerCase().replace(/[?.,!]/g, "");
      h.setAttribute("id", id);
    });
  }, [blog]);

  if (!blog) return <div className="loading">Loading...</div>;

  return (
    <div className="blog-page">
      <Helmet>
        <title>{blog.blog_title ? `${blog.blog_title} | MindWork360` : 'Blog | MindWork360'}</title>
        <meta name="description" content={blog.excerpt ? blog.excerpt.replace(/<[^>]+>/g, '').substring(0, 160) : 'Read this article on MindWork360 — mental health and psychology insights.'} />
      </Helmet>
      <section className="blog-banner">
        {blog.banner_image && (
          <img
            src={getSafeUrl(blog.banner_image)}
            alt={blog.blog_title || "Blog Banner"}
            title={blog.blog_title || "MindWork360 Blog"}
            className="banner-image"
          />
        )}
      </section>

      <section className="blog-layout">
        <aside className="toc">
          <div className="toc-header" onClick={() => setTocOpen(!tocOpen)}>
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
                        const offset = 80;
                        const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
                        window.scrollTo({ top: elementPosition - offset, behavior: "smooth" });
                        window.history.pushState(null, "", `#${h.id}`);
                      }
                      setTocOpen(false);
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
                  onClick={() => navigate(`/blogs?category=${encodeURIComponent(cat)}`)}
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>
        </aside>

        <article className="content">
          <p className="category">{blog.product_category}</p>
          <h1>{blog.blog_title}</h1>

          <div id="content">
            <div dangerouslySetInnerHTML={{ __html: cleanHTML(blog.blog_content1) }} />
            {blog.image1 && <img src={getSafeUrl(blog.image1)} alt={blog.blog_title || "Blog image"} title={blog.blog_title || "MindWork360 Blog"} className="blog-mid-img" />}
            
            <div dangerouslySetInnerHTML={{ __html: cleanHTML(blog.blog_content2) }} />
            <div dangerouslySetInnerHTML={{ __html: cleanHTML(blog.blog_content3) }} />
            
            {blog.image2 && <img src={getSafeUrl(blog.image2)} alt={blog.blog_title || "Blog image"} title={blog.blog_title || "MindWork360 Blog"} className="blog-mid-img" />}
            
            <div dangerouslySetInnerHTML={{ __html: cleanHTML(blog.blog_content4) }} />
            
            {blog.image3 && <img src={getSafeUrl(blog.image3)} alt={blog.blog_title || "Blog image"} title={blog.blog_title || "MindWork360 Blog"} className="blog-mid-img" />}
            
            <div dangerouslySetInnerHTML={{ __html: cleanHTML(blog.blog_content5) }} />
          </div>
        </article>
      </section>
      <Footer />
    </div>
  );
};

export default BlogDetails;