import React, { useState, useEffect} from "react";
import { useCallback } from "react";

import axios from "axios";
import DOMPurify from "dompurify";
import "./CreateBlog.css";

const CreateBlog = () => {
  const initialFormState = {
    id: "",
    blog_title: "",
    slug: "",
    product_category: "",
    blog_meta_title: "",
    blog_meta_description: "",
    banner_metatag: "",
    thumbnail_metatag: "",
    blog_content1: "",
    blog_content2: "",
    blog_content3: "",
    blog_content4: "",
    blog_content5: "",
    image1_metatag: "",
    image2_metatag: "",
    image3_metatag: "",
    h2_1: "", h3_1: "",
    h2_2: "", h3_2: "",
    h2_3: "", h3_3: "",
    h2_4: "", h3_4: "",
    h2_5: "", h3_5: "",
    h2_6: "", h3_6: "",
    h2_7: "", h3_7: "",
    h2_8: "", h3_8: "",
    h2_9: "", h3_9: "",
    h2_10: "", h3_10: ""
  };
  const [form, setForm] = useState(initialFormState);

  const [bannerImage, setBannerImage] = useState(null);
  const [thumbnailImage, setThumbnailImage] = useState(null);
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);

  
  const [preview, setPreview] = useState({});

  const [mainTab, setMainTab] = useState("create");
  const [statusTab, setStatusTab] = useState("pending");
  const [blogs, setBlogs] = useState([]);
  
  const [showModal, setShowModal] = useState(false);
const [selectedBlog, setSelectedBlog] = useState(null);


const [isEdit, setIsEdit] = useState(false);
const [editId, setEditId] = useState(null);
const [editContents] = useState(null);



  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFile = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      if (field === "banner_image") setBannerImage(file);
      if (field === "thumbnail_image") setThumbnailImage(file);
      if (field === "image1") setImage1(file);
      if (field === "image2") setImage2(file);
      if (field === "image3") setImage3(file);

      setPreview((prev) => ({
        ...prev,
        [field]: URL.createObjectURL(file),
      }));
    }
  };

  const handleContentChange = (e, field) => {
    
    setForm({ ...form, [field]: e.target.innerHTML });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);

  //   const data = new FormData();
  //   Object.keys(form).forEach((key) => data.append(key, form[key]));
  //   if (bannerImage) data.append("banner_image", bannerImage);
  //   if (thumbnailImage) data.append("thumbnail_image", thumbnailImage);
  //   if (image1) data.append("image1", image1);
  //   if (image2) data.append("image2", image2);
  //   if (image3) data.append("image3", image3);

  //   try {
  //       await axios.post("http://localhost:3000/api/blogs", data, {
  //           headers: {
  //               "Content-Type": "multipart/form-data",
  //               Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
  //             },
  //         });
  //     alert("Blog Created Successfully!");
  //     setForm({});
  //   } catch (error) {
  //     console.error(error);
  //     alert("Error creating blog!");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  
  //   const data = new FormData();
  
  //   Object.keys(form).forEach((key) => {
  //     if (key === "product_category" && form.product_category === "Others") {
  //       data.append("product_category", customCategory);
  //     } else {
  //       data.append(key, form[key]);
  //     }
  //   });
  
  //   if (bannerImage) data.append("banner_image", bannerImage);
  //   if (thumbnailImage) data.append("thumbnail_image", thumbnailImage);
  //   if (image1) data.append("image1", image1);
  //   if (image2) data.append("image2", image2);
  //   if (image3) data.append("image3", image3);
  
  //   try {
  //     await axios.post("http://localhost:3000/api/blogs", data, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //         Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
  //       },
  //     });
  
  //     alert("Blog Created Successfully!");
  //     setForm({});
  //     setCustomCategory("");
  //   } catch (error) {
  //     console.error(error);
  //     alert("Error creating blog!");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const API_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:3000"
    : "https://euphoria-backend-oii0.onrender.com";
    const handleSubmit = async (e) => {
      e.preventDefault();
    
      // Create FormData
      const formData = new FormData();
    
      // 1. Append text fields (Exclude 'id' from body as it's in the URL)
      Object.keys(form).forEach((key) => {
        if (key !== "id") {
          formData.append(key, form[key] || "");
        }
      });
    
      // 2. Append HTML Content
      for (let i = 1; i <= 5; i++) {
        const html = document.getElementById(`content${i}`)?.innerHTML || "";
        formData.append(`blog_content${i}`, html);
      }
    
      // 3. Append Files
      if (bannerImage) formData.append("banner_image", bannerImage);
      if (thumbnailImage) formData.append("thumbnail_image", thumbnailImage);
      if (image1) formData.append("image1", image1);
      if (image2) formData.append("image2", image2);
      if (image3) formData.append("image3", image3);
    
      try {
        if (isEdit && editId) {
          // ✅ UPDATE
          await axios.put(`${API_URL}/api/blogs/${editId}`, formData);
          alert("Blog updated successfully");
        } else {
          // ✅ CREATE
          await axios.post(`${API_URL}/api/blogs`, formData);
          alert("Blog created successfully");
        }
    
        // 4. RESET EVERYTHING (Prevents duplicates and leaks)
        setIsEdit(false);
        setEditId(null);
        setForm(initialFormState);
        setPreview({});
        setBannerImage(null);
        setThumbnailImage(null);
        setImage1(null);
        setImage2(null);
        setImage3(null);
        
        // Clear contentEditable manually
        for (let i = 1; i <= 5; i++) {
          const el = document.getElementById(`content${i}`);
          if (el) el.innerHTML = "";
        }
    
        setMainTab("list");
        fetchBlogs();
    
      } catch (err) {
        console.error("Submission failed:", err);
        alert("Error: " + (err.response?.data?.details || "Failed to save"));
      }
    };
  

  const categories = ["Self-Assessments", "Toxic Behaviors", "Mindfulness", "Therapy Techniques", "Emotional Intelligence & Growth", "General Wellbeing", "Others"];
  const [customCategory, setCustomCategory] = useState("");



// const cleanPastedContent = (e) => {
//   e.preventDefault();

//   const html = e.clipboardData.getData("text/html");
//   const text = e.clipboardData.getData("text/plain");

//   // If bold/HTML formatting exists → paste HTML
//   if (html) {
//     document.execCommand("insertHTML", false, html);
//   } else {
//     document.execCommand("insertText", false, text);
//   }
// };



const cleanPastedContent = (e) => {
  e.preventDefault();

  const html = e.clipboardData.getData("text/html");
  const text = e.clipboardData.getData("text/plain");

  if (html) {
    const cleanHtml = DOMPurify.sanitize(html, {
      ALLOWED_TAGS: [
        "p", "span", "br", "b", "strong", "i", "em",
        "h1", "h2", "h3", "h4", "div", 
        "ul", "ol", "li" 
      ],
      ALLOWED_ATTR: ["style", "dir"],
    });

    document.execCommand("insertHTML", false, cleanHtml);
  } else {
    
    document.execCommand("insertText", false, text);
  }
};

  const renderBlogTable = () => (
    <table className="table">
      <thead style={{ textAlign: "left" }}>
        <tr style={{backgroundColor: " #ededed"}}> 
          <th>Title</th>
          <th>Category</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
  
      <tbody>
        {blogs.map(blog => (
          <tr key={blog.id}>
            <td
  style={{
    maxWidth: "430px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  }}
  title={blog.title}
>
  {blog.title}
</td>
            <td>{blog.category}</td>
            <td>
              <span className={`badge bg-${blog.status}`}>
                {blog.status}
              </span>
            </td>
            <td className="d-flex gap-3" style={{ minWidth: "180px", whiteSpace: "nowrap" ,display: "flex", gap: "5px", alignItems: "center"}}>
  <span
    style={{ cursor: "pointer" }}
    title="View"
    onClick={() => handleView(blog.slug)}
  >
    👁️
  </span>

  {/* Only show Approve if the blog is NOT already approved */}
  {blog.status !== "approved" && (
                <span
                  style={{ cursor: "pointer" }}
                  title="Approve"
                  onClick={() => handleStatus(blog.id, "approved")}
                >
                  ✔️
                </span>
              )}

              {/* Only show Reject if the blog is NOT already rejected */}
              {blog.status !== "rejected" && (
                <span
                  style={{ cursor: "pointer" }}
                  title="Reject"
                  onClick={() => handleStatus(blog.id, "rejected")}
                >
                  ❌
                </span>
              )}

  <span
    style={{ cursor: "pointer" }}
    title="Delete"
    onClick={() => handleDelete(blog.id)}
  >
    🗑️
  </span>
  <span
  style={{ cursor: "pointer", marginRight: "10px" }}
  title="Edit"
  onClick={() => handleEdit(blog)}
>
  ✏️
</span>
</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
  // useEffect(() => {
  //   if (mainTab === "list") fetchBlogs();
  // }, [statusTab, mainTab]);
  
  
  // const fetchBlogs = async () => {
  //   const res = await axios.get(
  //     `http://localhost:3000/api/blogs_listing?status=${statusTab}`
  //   );
  //   setBlogs(res.data);
  // };
  
  const fetchBlogs = useCallback(async () => {
    const API_URL =
    window.location.hostname === "localhost"
      ? "http://localhost:3000"
      : "https://euphoria-backend-oii0.onrender.com";
    try {
      const res = await axios.get(
        `${API_URL}/api/blogs_listing?status=${statusTab}`
      );
  
      setBlogs(res.data);
    } catch (err) {
      console.error("Failed to fetch blogs:", err);
    }
  }, [statusTab]);

  useEffect(() => {
    if (mainTab === "list") {
      fetchBlogs();
    }
  }, [statusTab, mainTab, fetchBlogs]);

  const handleView = async (slug) => {
    try {
      const res = await axios.get(
        `${API_URL}/api/blogs/${slug}`
      );
  
      console.log("BLOG DETAILS:", res.data);
  
      setSelectedBlog(res.data);
      setShowModal(true);
    } catch (err) {
      console.error(err);
      alert("Unable to load blog");
    }
  };

  const handleStatus = async (id, status) => {
    console.log("▶ handleStatus triggered");
    console.log("ID:", id);
    console.log("STATUS:", status);
    console.log("URL:", `${API_URL}/api/blogs/${id}/status`);
  
    try {
      const response = await axios.patch(
        `${API_URL}/api/blogs/${id}/status`,
        { status },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      console.log("✅ PATCH SUCCESS");
      console.log("RESPONSE STATUS:", response.status);
      console.log("RESPONSE DATA:", response.data);
  
      alert(`Blog ${status}`);
      fetchBlogs();
    } catch (err) {
      console.log("❌ PATCH FAILED");
  
      if (err.response) {
        // Server responded but rejected
        console.log("RESPONSE STATUS:", err.response.status);
        console.log("RESPONSE DATA:", err.response.data);
        console.log("RESPONSE HEADERS:", err.response.headers);
      } else if (err.request) {
        // Request sent but no response (CORS / network)
        console.log("NO RESPONSE RECEIVED");
        console.log("REQUEST:", err.request);
      } else {
        // Something else
        console.log("ERROR MESSAGE:", err.message);
      }
  
      alert("Status update failed");
    }
  };

  
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this blog?")) return;
  
    try {
      await axios.delete(
        `${API_URL}0/api/blogs/${id}`
      );
      alert("Blog deleted");
      fetchBlogs();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  // const handleEdit = async (blog) => {
  //   console.log("✏️ EDIT CLICKED:", blog);
  
  //   try {
  //     const res = await axios.get(
  //       `http://localhost:3000/api/blogs/${blog.slug}`
  //     );
  
  //     const fullBlog = res.data;
  
  //     // 1️⃣ Switch tab
  //     setEditContents(fullBlog);
  //     setMainTab("create");
  //     setIsEdit(true);
  //     setEditId(fullBlog.id);
  
  //     // 2️⃣ Prefill NORMAL inputs
  //     setForm({
  //       blog_title: fullBlog.blog_title || "",
  //       slug: fullBlog.slug || "",
  //       product_category: fullBlog.product_category?.trim() || "",
  //       blog_meta_title: fullBlog.blog_meta_title || "",
  //       blog_meta_description: fullBlog.blog_meta_description || "",
  //       banner_metatag: fullBlog.banner_metatag || "",
  //       thumbnail_metatag: fullBlog.thumbnail_metatag || "",
  //       image1_metatag: fullBlog.image1_metatag || "",
  //       image2_metatag: fullBlog.image2_metatag || "",
  //       image3_metatag: fullBlog.image3_metatag || "",
  
  //       ...Object.fromEntries(
  //         Array.from({ length: 10 }, (_, i) => [
  //           [`h2_${i + 1}`, fullBlog[`h2_${i + 1}`] || ""],
  //           [`h3_${i + 1}`, fullBlog[`h3_${i + 1}`] || ""],
  //         ]).flat()
  //       )
  //     });
  //     console.log(
  //       form.product_category,
  //       categories.includes(form.product_category)
  //     );
  
  //     // 3️⃣ Inject HTML into contentEditable DIVs
  //     setTimeout(() => {
  //       for (let i = 1; i <= 5; i++) {
  //         const el = document.getElementById(`content${i}`);
  //         if (el) {
  //           el.innerHTML = fullBlog[`blog_content${i}`] || "";
  //         }
  //       }
  //     }, 0);
  
  //     // 4️⃣ Prefill image previews (IMPORTANT)
  //     setPreview({
  //       banner_image: fullBlog.banner_image || null,
  //       thumbnail_image: fullBlog.thumbnail_image || null,
  //       image1: fullBlog.image1 || null,
  //       image2: fullBlog.image2 || null,
  //       image3: fullBlog.image3 || null,
  //     });
  
  //   } catch (err) {
  //     console.error("Failed to load blog for edit", err);
  //     alert("Unable to load blog for editing");
  //   }
  // };
  
  useEffect(() => {
    if (!editContents) return;
  
    for (let i = 1; i <= 5; i++) {
      const el = document.getElementById(`content${i}`);
      if (el) {
        el.innerHTML = editContents[`blog_content${i}`] || "";
      }
    }
  }, [editContents, mainTab]);
   
  const handleEdit = async (blog) => {
    try {
      const res = await axios.get(`${API_URL}/api/blogs/${blog.slug}`);
      const fullBlog = res.data;
  
      // 1. Set Edit Mode and ID immediately
      setIsEdit(true);
      setEditId(fullBlog.id);
      setMainTab("create");
  
      // 2. Clear current file selections (so old files don't stay in memory)
      setBannerImage(null);
      setThumbnailImage(null);
      setImage1(null);
      setImage2(null);
      setImage3(null);
  
      const clean = (val) => (val === null || val === undefined ? "" : val);
  
      // 3. Map Form Fields
      const updatedForm = {
        id: fullBlog.id,
        blog_title: clean(fullBlog.blog_title),
        slug: clean(fullBlog.slug),
        product_category: clean(fullBlog.product_category),
        blog_meta_title: clean(fullBlog.blog_meta_title),
        blog_meta_description: clean(fullBlog.blog_meta_description),
        banner_metatag: clean(fullBlog.banner_metatag),
        thumbnail_metatag: clean(fullBlog.thumbnail_metatag),
        image1_metatag: clean(fullBlog.image1_metatag),
        image2_metatag: clean(fullBlog.image2_metatag),
        image3_metatag: clean(fullBlog.image3_metatag),
      };
  
      for (let i = 1; i <= 10; i++) {
        updatedForm[`h2_${i}`] = clean(fullBlog[`h2_${i}`]);
        updatedForm[`h3_${i}`] = clean(fullBlog[`h3_${i}`]);
      }
      setForm(updatedForm);
  
      // 4. Handle Custom Category
      if (!categories.includes(fullBlog.product_category?.trim())) {
        setCustomCategory(fullBlog.product_category || "");
      }
  
      // 5. Inject HTML into contentEditable
      setTimeout(() => {
        for (let i = 1; i <= 5; i++) {
          const el = document.getElementById(`content${i}`);
          if (el) el.innerHTML = fullBlog[`blog_content${i}`] || "";
        }
      }, 400);
  
      // 6. Set Previews (using encodeURI for filenames with spaces)
      setPreview({
        banner_image: fullBlog.banner_image ? encodeURI(fullBlog.banner_image) : null,
        thumbnail_image: fullBlog.thumbnail_image ? encodeURI(fullBlog.thumbnail_image) : null,
        image1: fullBlog.image1 ? encodeURI(fullBlog.image1) : null,
        image2: fullBlog.image2 ? encodeURI(fullBlog.image2) : null,
        image3: fullBlog.image3 ? encodeURI(fullBlog.image3) : null,
      });
  
    } catch (err) {
      console.error("Edit failed:", err);
      alert("Could not load blog data");
    }
  };




  














  return (
    <div className="container_d py-5" style={{ fontFamily: "'Inter', sans-serif" }}>
     <div className="d-flex mb-4 border-bottom">
  <span
    className={`tab-item me-4 ${mainTab === "create" ? "active-tab" : ""}`}
    onClick={() => setMainTab("create")}
  >
    Create Blog
  </span>

  <span
    className={`tab-item ${mainTab === "list" ? "active-tab" : ""}`}
    onClick={() => setMainTab("list")}
  >
    Blog List
  </span>
</div>

{mainTab === "create" && (
  <>

      <h2 style={{ textAlign: "center", marginBottom: "30px" }}>{isEdit ? "Edit Blog" : "Create Blog"}</h2>

      <form  key={editId || "new"} onSubmit={handleSubmit}>
      <input type="hidden" name="id" value={form.id || ""} />
        {/* Blog Title */}
        <label>Blog Title</label>
        <input name="blog_title" value={form.blog_title} onChange={handleChange} className="form-control mb-3" required />

        {/* Slug */}
        <label>Slug</label>
        <input name="slug" value={form.slug} onChange={handleChange} className="form-control mb-3" required />

        {/* Category */}
        {/* <label>Blog Category</label>
        <select name="product_category" value={form.product_category} onChange={handleChange} className="form-select mb-3" required>
          <option value="">Select category</option>
          {categories.map((cat, idx) => <option key={idx}>{cat}</option>)}
        </select> */}
        <label>Blog Category</label>

        <select
          name="product_category"
          value={form.product_category}
          onChange={handleChange}
          className="form-select mb-2"
          required
        >
          <option value="">Select category</option>
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* Show textbox only when Others is selected */}
        {form.product_category === "Others" && (
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Enter custom category"
            value={customCategory}
            onChange={(e) => setCustomCategory(e.target.value)}
            required
          />
        )}

        {/* Meta Title */}
        <label>Meta Title</label>
        <input name="blog_meta_title" value={form.blog_meta_title} onChange={handleChange} className="form-control mb-3" required />

        {/* Meta Description */}
        <label>Meta Description</label>
        <input name="blog_meta_description" value={form.blog_meta_description} onChange={handleChange} className="form-control mb-3" required />

        {/* Banner */}
        <label>Banner Image</label>
        <input type="file" onChange={(e) => handleFile(e, "banner_image")} className="form-control mb-3" />
        {preview.banner_image && <img 
    src={preview.banner_image} // The URL is now encoded from handleEdit
    alt="Preview" 
    style={{ height: "80px", width: "120px", objectFit: "cover" }}
    onError={(e) => { e.target.src = "https://placehold.co/120x80?text=Error+Loading"; }} 
  />
  }

        <label>Banner Metatag</label>
        <input name="banner_metatag" value={form.banner_metatag} onChange={handleChange} className="form-control mb-3" placeholder="Banner metatag" />

        {/* Thumbnail */}
        <label>Thumbnail Image</label>
        <input type="file" onChange={(e) => handleFile(e, "thumbnail_image")} className="form-control mb-3" />

        {preview.thumbnail_image && <img src={preview.thumbnail_image} alt="Thumbnail Preview" style={{ height: "80px", width: "120px", objectFit: "cover", borderRadius: "4px", marginBottom: "22px"}}/>}
        <label>Thumbnail Metatag</label>
        <input name="thumbnail_metatag" value={form.thumbnail_metatag} onChange={handleChange} className="form-control mb-3" placeholder="Thumbnail metatag" />

        {/* Contents */}
        {/* {[1, 2, 3, 4, 5].map((num) => (
          <div key={num} className="mb-3">
            <label>Content {num}</label>
            <div
              contentEditable
              onInput={(e) => handleContentChange(e, `blog_content${num}`)}
              className="form-control"
              style={{ minHeight: "100px" }}
            ></div>
          </div>
        ))} */}
        {[1, 2, 3, 4, 5].map((num) => (
        <div
            key={num}
            style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}
        >
            <label className="labletitle" style={{ width: "150px" }}>
            Content {num}
            </label>

            <div
            id={`content${num}`}
            contentEditable={true}
            className="input2"
            style={{
                padding: "10px",
                width: "80%",
                marginLeft: "80px",
                border: "1px solid #ccc",
                minHeight: "120px",
                borderRadius: "5px",
                outline: "none",
            }}
            onInput={(e) => handleContentChange(e, `blog_content${num}`)}
            onPaste={cleanPastedContent}
            ></div>
        </div>
        ))}

        {/* Images 1-3 */}
        {[1, 2, 3].map((num) => (
          <div key={num}>
            <label>Image {num}</label>
            <input type="file" onChange={(e) => handleFile(e, `image${num}`)} className="form-control mb-2" />
            {preview[`image${num}`] && <img src={preview[`image${num}`]} height="80" alt={`Image${num} Preview`} />}
            <label>Image {num} Metatag</label>
            <input
              name={`image${num}_metatag`}
              value={form[`image${num}_metatag`]}
              onChange={handleChange}
              className="form-control mb-3"
              placeholder={`Image ${num} Metatag`}
            />
          </div>
        ))}

        {/* H2/H3 Headings */}
        <h4 className="mt-4">Headings (H2 & H3)</h4>
        {[...Array(10)].map((_, i) => (
          <div key={i} className="mb-3">
            <label className="form-label">
              Heading {i + 1} (H2)
            </label>
            <input
              name={`h2_${i + 1}`}
              value={form[`h2_${i + 1}`]}
              onChange={handleChange}
              className="form-control mb-2"
              placeholder={`Enter Heading ${i + 1}`}
            />
            <label className="form-label">
              Sub Heading {i + 1} (H3)
            </label>
            <input
              name={`h3_${i + 1}`}
              value={form[`h3_${i + 1}`]}
              onChange={handleChange}
              className="form-control"
              placeholder={`Enter Sub Heading ${i + 1}`}
            />
          </div>
        ))}

        {/* Submit */}
        <button type="submit" className="submit-button">
  {isEdit ? "Update Blog" : "Submit Blog"}
</button>
      </form>
      </>
)}
{mainTab === "list" && (
  <>
    <ul className="status-tabs mb-3_c">
      {[
        { key: "pending", label: "Pending Review" },
        { key: "approved", label: "Approved" },
        { key: "rejected", label: "Rejected" },
        { key: "all", label: "All Submissions" }
      ].map(tab => (
        <li
          key={tab.key}
          className={`status-tab ${statusTab === tab.key ? "active" : ""}`}
          onClick={() => setStatusTab(tab.key)}
        >
          {tab.label}
        </li>
      ))}
    </ul>

    {renderBlogTable()}
  </>
)}

{showModal && selectedBlog && (
  <div
    className="modal-overlay_d"
    onClick={() => setShowModal(false)}   // ✅ outside click closes
  >
    <div
      className="modal-container_d"
      onClick={(e) => e.stopPropagation()} // ✅ prevent inside close
    >

      {/* Close */}
      <span
        className="modal-close_d"
        onClick={() => setShowModal(false)}
      >
        ✖
      </span>

      {/* BLOG DETAILS */}
      <div className="blog-page_d">
        {/* <section className="blog-banner_d">
          {selectedBlog.banner_image && (
            <img
              src={selectedBlog.banner_image}
              className="banner-image_d"
              alt="Banner"
            />
          )}
        </section> */}
        <section className="blog-banner_d">
          {selectedBlog.banner_image && (
            <img
              src={encodeURI(selectedBlog.banner_image)} // Added encodeURI for safety
              className="banner-image_d"
              alt="Banner"
            />
          )}
        </section>

        {/* <section className="blog-layout_d">
          <article className="content">
            <p className="category">{selectedBlog.product_category}</p>
            <h1>{selectedBlog.blog_title}</h1>

            <div dangerouslySetInnerHTML={{ __html: selectedBlog.blog_content1 }} />
            <div dangerouslySetInnerHTML={{ __html: selectedBlog.blog_content2 }} />
            <div dangerouslySetInnerHTML={{ __html: selectedBlog.blog_content3 }} />

            {selectedBlog.image2 && (
              <img src={selectedBlog.image2} alt="" />
            )}

            <div dangerouslySetInnerHTML={{ __html: selectedBlog.blog_content4 }} />

            {selectedBlog.image3 && (
              <img src={selectedBlog.image3} alt="" />
            )}

            <div dangerouslySetInnerHTML={{ __html: selectedBlog.blog_content5 }} />
          </article>
        </section> */}
        <section className="blog-layout_d">
    <article className="content">
      <p className="category">{selectedBlog.product_category}</p>
      <h1>{selectedBlog.blog_title}</h1>

      <div dangerouslySetInnerHTML={{ __html: selectedBlog.blog_content1 }} />
      
      {/* ADDED IMAGE 1 HERE */}
      {selectedBlog.image1 && (
        <img src={encodeURI(selectedBlog.image1)} alt="" style={{ maxWidth: '100%', margin: '20px 0' }} />
      )}

      <div dangerouslySetInnerHTML={{ __html: selectedBlog.blog_content2 }} />
      <div dangerouslySetInnerHTML={{ __html: selectedBlog.blog_content3 }} />

      {selectedBlog.image2 && (
        <img src={encodeURI(selectedBlog.image2)} alt="" style={{ maxWidth: '100%', margin: '20px 0' }} />
      )}

      <div dangerouslySetInnerHTML={{ __html: selectedBlog.blog_content4 }} />

      {selectedBlog.image3 && (
        <img src={encodeURI(selectedBlog.image3)} alt="" style={{ maxWidth: '100%', margin: '20px 0' }} />
      )}

      <div dangerouslySetInnerHTML={{ __html: selectedBlog.blog_content5 }} />
    </article>
  </section>
      </div>

      {/* ACTION BUTTONS */}
      <div className="modal-actions_d">
        <button
          className="approve-btn_d"
          onClick={() => {
            handleStatus(selectedBlog.id, "approved");
            setShowModal(false);
          }}
        >
          ✅ Approve
        </button>

        <button
          className="reject-btn_d"
          onClick={() => {
            handleStatus(selectedBlog.id, "rejected");
            setShowModal(false);
          }}
        >
          ❌ Reject
        </button>

        <button
          className="cancel-btn_create"
          onClick={() => setShowModal(false)}
        >
          Cancel
        </button>
      </div>

    </div>
  </div>
)}

      <button
        onClick={() => {
            localStorage.removeItem("admin_logged_in");
            window.location.href = "/admin_login";
        }}
        style={{ marginBottom: "20px", marginTop: "20px" }}
        >
        Logout
      </button>


    </div>
  );
};

export default CreateBlog;
