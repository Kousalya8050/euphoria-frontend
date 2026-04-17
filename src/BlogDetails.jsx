import { useEffect, useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
    document.title = "Blog Details | Euphoria";
  }, []);

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

  // --- HELPER: Aggressive Deduplication for the Body ---
  const cleanHTML = (html) => {
    if (!html) return "";
    // Split into sections starting with H2 or H3
    const parts = html.split(/(?=<h[23])/i); 
    const seenPlainText = new Set();
    
    return parts
      .filter((part) => {
        // Strip tags to compare actual text content
        const plainText = part.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim();
        if (!plainText) return true; // Keep spacing/br tags
        if (seenPlainText.has(plainText)) return false;
        seenPlainText.add(plainText);
        return true;
      })
      .join("");
  };

  // --- 1. TOC HEADINGS LOGIC (Content + Metadata Columns) ---
  const headings = useMemo(() => {
  if (!blog) return [];

  const seenText = new Set();
  const result = [];

  // Helper to add headings and prevent duplicates
  const addHeading = (text, tag) => {
    if (!text) return;

    // Split by comma ONLY if the comma is followed by a space and a Capital letter 
    // (This prevents splitting a single question that contains a comma)
    // If your DB doesn't follow that pattern, we use a simpler split and filter.
    const items = text.split(/,(?=\s+[A-Z])|,(?=\s*")|(?<=\?)\s*,/).filter(i => i.trim() !== "");
    
    // If the split didn't work (no comma-space-Capital), just use the whole string
    const finalItems = items.length > 0 ? items : [text];

    finalItems.forEach(item => {
      const cleanText = item.trim().replace(/^,|,$/g, ""); // Remove leading/trailing commas
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

  // 1. Parse from HTML Content Blocks (this is where headings usually live)
  const container = document.createElement("div");
  container.innerHTML = [1, 2, 3, 4, 5].map(i => blog[`blog_content${i}`] || "").join("");
  const htmlHeadings = container.querySelectorAll("h2, h3");
  htmlHeadings.forEach(el => addHeading(el.innerText, el.tagName));

  // 2. Parse from Metadata Columns (h2_1...10 and h3_1...10)
  // This picks up the FAQ questions stored in h3_5, h3_6, etc.
  for (let i = 1; i <= 10; i++) {
    // Check H2 columns
    if (blog[`h2_${i}`]) addHeading(blog[`h2_${i}`], "H2");
    // Check H3 columns (where your FAQ questions usually are)
    if (blog[`h3_${i}`]) addHeading(blog[`h3_${i}`], "H3");
  }

  return result;
}, [blog]);

  // --- 2. ID INJECTION FOR SCROLLING ---
  useEffect(() => {
    if (!blog) return;
    const content = document.getElementById("content");
    if (!content) return;

    // Inject IDs into the actual rendered HTML so TOC links work
    const headingEls = content.querySelectorAll("h2, h3");
    headingEls.forEach((h) => {
      const id = h.innerText.trim().replace(/\s+/g, "-").toLowerCase().replace(/[?]/g, "");
      h.setAttribute("id", id);
    });
  }, [blog]);

  if (!blog) return <div className="loading">Loading...</div>;

  return (
    <div className="blog-page">
      <section className="blog-banner">
        {blog.banner_image && (
          <img src={encodeURI(blog.banner_image)} alt="Banner" className="banner-image" />
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
                        el.scrollIntoView({ behavior: "smooth", block: "start" });
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
            {blog.image1 && <img src={encodeURI(blog.image1)} alt="" className="blog-mid-img" />}
            
            <div dangerouslySetInnerHTML={{ __html: cleanHTML(blog.blog_content2) }} />
            <div dangerouslySetInnerHTML={{ __html: cleanHTML(blog.blog_content3) }} />
            
            {blog.image2 && <img src={encodeURI(blog.image2)} alt="" className="blog-mid-img" />}
            
            {/* cleanHTML specifically removes the double Conclusion here */}
            <div dangerouslySetInnerHTML={{ __html: cleanHTML(blog.blog_content4) }} />
            
            {blog.image3 && <img src={encodeURI(blog.image3)} alt="" className="blog-mid-img" />}
            
            <div dangerouslySetInnerHTML={{ __html: cleanHTML(blog.blog_content5) }} />
          </div>
        </article>
      </section>
      <Footer />
    </div>
  );
};

export default BlogDetails;