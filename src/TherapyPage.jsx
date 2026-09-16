import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import "./HomePage.css";
import "./FAQPage.css";
import "./TherapyPage.css";
import Footer from "./Footer_page";
import tsBanner from "./assets/banner_images/17.jpeg";

const API_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:3000"
    : "https://euphoria-backend-oii0.onrender.com";

const CATEGORY_NAME = "Therapy & Self-Help";

const compareRows = [
  {
    therapy: { title: "Professional support", text: "Guided by a qualified therapist or mental health professional." },
    selfHelp: { title: "Self-directed support", text: "Uses books, exercises, habits, educational resources, and other tools." },
  },
  {
    therapy: { title: "Personalised approach", text: "Therapy can be tailored to your concerns, experiences, and goals." },
    selfHelp: { title: "Flexible approach", text: "You can choose strategies that fit your needs and daily routine." },
  },
  {
    therapy: { title: "Useful for persistent challenges", text: "May help with concerns such as anxiety, trauma, relationship difficulties, or persistent emotional distress." },
    selfHelp: { title: "Useful for everyday challenges", text: "Can support stress management, self-awareness, healthy habits, and personal development." },
  },
  {
    therapy: { title: "Structured guidance", text: "Sessions provide a structured space to explore concerns and develop coping strategies." },
    selfHelp: { title: "Learn at your own pace", text: "You can practise self-help techniques independently and gradually build new habits." },
  },
];

const therapyTypeGroups = [
  {
    title: "Thoughts & Behaviours",
    items: [
      { name: "Behavioral Therapy", text: "Focuses on identifying and changing behaviours or patterns that may be affecting everyday life. Behavioral therapy techniques can help people develop healthier responses and coping strategies." },
      { name: "Exposure Therapy", text: "Uses gradual, structured exposure to feared situations or experiences, usually with guidance from a trained professional." },
    ],
  },
  {
    title: "Emotional & Trauma Support",
    items: [
      { name: "Anxiety Therapy", text: "Different therapy approaches can help people understand anxiety, manage difficult thoughts and feelings, and develop healthier coping strategies." },
      { name: "Trauma Therapy", text: "Trauma-focused approaches can help people understand and process the effects of traumatic experiences in a safe, structured setting." },
    ],
  },
  {
    title: "Relationships",
    items: [
      { name: "Couple Therapy", text: "Helps partners work through communication difficulties, recurring conflict, emotional disconnection, and relationship challenges." },
      { name: "Marriage Therapy", text: "A form of relationship therapy that focuses on helping married couples understand patterns, improve communication, and work through difficulties." },
    ],
  },
  {
    title: "Relaxation & Coping",
    items: [
      { name: "Relaxation Therapy", text: "Uses techniques such as controlled breathing, relaxation exercises, and other calming strategies to help manage stress and physical tension." },
    ],
  },
];

const signsTiles = [
  { quote: "I can't manage my emotions.", caption: "Persistent sadness, anger, fear, or overwhelm feels difficult to handle." },
  { quote: "My anxiety is taking over.", caption: "Constant worry or fear is affecting your everyday life. Anxiety therapy may help." },
  { quote: "I keep repeating the same patterns.", caption: "Unhelpful thoughts, behaviours, or relationship patterns keep coming back." },
  { quote: "I can't move past what happened.", caption: "A difficult experience continues to affect your well-being. Trauma therapy may help." },
  { quote: "My relationship is struggling.", caption: "Ongoing conflict or disconnection may benefit from couple therapy or marriage therapy." },
  { quote: "Self-help isn't enough.", caption: "You've tried coping strategies but continue to struggle with the same concerns." },
];

const selfHelpEverydayCards = [
  { title: "Understand Your Thoughts", text: "Notice recurring thoughts, emotions, and patterns without judging yourself." },
  { title: "Manage Stress", text: "Use breathing, mindfulness, or relaxation techniques when you feel overwhelmed." },
  { title: "Build Healthy Routines", text: "Prioritise good sleep, regular movement, healthy meals, and time to recharge." },
  { title: "Set Small Goals", text: "Choose realistic goals and focus on one manageable step at a time." },
  { title: "Stay Connected", text: "Talk to people you trust and make time for supportive relationships." },
  { title: "Reflect & Learn", text: "Use journaling and other self-help exercises to understand your experiences and notice what works for you." },
];

const selfHelpSkillsCards = [
  { title: "Self-Awareness", text: "Recognising your thoughts, emotions, needs, strengths, and patterns." },
  { title: "Emotional Skills", text: "Learning to recognise, express, and manage difficult emotions." },
  { title: "Coping Skills", text: "Using healthy strategies to handle stress, setbacks, and challenging situations." },
  { title: "Communication Skills", text: "Expressing your needs clearly, listening actively, and setting healthy boundaries." },
  { title: "Problem-Solving Skills", text: "Breaking challenges into manageable steps and exploring practical solutions." },
  { title: "Self-Care Skills", text: "Building routines that support sleep, physical health, relaxation, and emotional well-being." },
];

const whenNotEnoughCards = [
  { title: "Your concerns persist", text: "You continue to struggle despite trying different self-help strategies." },
  { title: "Daily life is affected", text: "Stress, anxiety, low mood, or other difficulties interfere with work, sleep, relationships, or everyday activities." },
  { title: "You feel overwhelmed", text: "Your usual coping strategies no longer feel sufficient or manageable." },
  { title: "You need personalised guidance", text: "A qualified therapist can help you understand what's happening and explore approaches that fit your situation." },
];

const therapyFaqs = [
  { question: "What Does Therapy Mean?", answer: "Therapy is professional support that can help people understand and manage thoughts, emotions, behaviours, relationships, or difficult experiences. Different therapy approaches are suited to different concerns and goals." },
  { question: "What Are the Three Types of Therapy?", answer: "There isn't one universally accepted list of three types. Therapy can be grouped in different ways, including behavioral approaches, trauma-focused approaches, relationship therapy, and other specialised methods." },
  { question: "What Is Self-Help Therapy?", answer: "Self-help generally refers to strategies and resources people use independently to manage challenges and support their well-being. It can include exercises, journaling, mindfulness, healthy routines, and coping techniques." },
  { question: "What's the Best Form of Therapy?", answer: "There isn't one therapy that is best for everyone. The most suitable approach depends on your concerns, goals, circumstances, and preferences. A qualified mental health professional can help you explore appropriate options." },
  { question: "What Are the Signs I Need Therapy?", answer: "You might consider therapy when emotional or psychological difficulties persist, feel difficult to manage, or begin affecting your relationships, work, sleep, studies, or everyday life. You don't have to wait for a crisis to seek support." },
  { question: "Can Anxiety Get Better Without Therapy?", answer: "Some people experience improvement in mild or temporary anxiety through self-help strategies, healthy routines, social support, and stress management. Persistent or severe anxiety may benefit from professional support such as anxiety therapy." },
  { question: "What Is the Hardest Part of Therapy?", answer: "Starting therapy, discussing difficult experiences, being vulnerable, and facing uncomfortable thoughts or emotions can feel challenging. Progress may also take time, and finding the right therapist or approach can be part of the process." },
  { question: "What Is Stronger Than Therapy?", answer: "There isn't a single approach that is universally stronger than therapy. Depending on the situation, therapy may be combined with self-help, social support, lifestyle changes, or other professional care." },
  { question: "What Does Self-Help Mean?", answer: "Self-help means taking intentional steps to support your own well-being, manage everyday challenges, and develop useful skills. It can include self-reflection, journaling, mindfulness, exercise, healthy routines, and other practical strategies." },
  { question: "How Do You Use Self-Help?", answer: "Start with one area you'd like to improve and choose a practical strategy that feels manageable. This could include journaling, relaxation exercises, setting boundaries, improving routines, or practising healthier coping skills." },
  { question: "What Are Some Examples of Self-Help Skills?", answer: "Self-help skills include emotional regulation, communication, problem-solving, self-awareness, stress management, healthy coping, goal setting, and self-care. These skills can be developed gradually through regular practice." },
  { question: "What Does Red Light Therapy Do?", answer: "Red light therapy uses specific wavelengths of light for various proposed health and wellness applications. It is different from psychological therapy and shouldn't be confused with treatments used for mental health concerns." },
  { question: "What Is Occupational Therapy?", answer: "Occupational therapy is a healthcare profession that helps people develop, regain, or maintain skills needed for everyday activities and independence. It is different from psychological therapy and has a different scope of practice." },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": therapyFaqs.map((item) => ({
    "@type": "Question",
    "name": item.question,
    "acceptedAnswer": { "@type": "Answer", "text": item.answer },
  })),
};

const TherapyPage = () => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/blogs_listing`)
      .then((res) => res.json())
      .then((data) => {
        let blogs = [];
        if (Array.isArray(data)) blogs = data;
        else if (data?.data) blogs = data.data;
        else if (data?.rows) blogs = data.rows;

        const filtered = blogs.filter(
          (post) => String(post.category).trim().toLowerCase() === CATEGORY_NAME.toLowerCase()
        );
        setArticles(filtered.slice(0, 6));
      })
      .catch((err) => console.error("Failed to load therapy articles:", err));
  }, []);

  return (
    <div className="ts-page">
      <Helmet>
        <title>Therapy & Self-Help | Types, Benefits & Practical Tips</title>
        <meta
          name="description"
          content="Learn what therapy means, explore common therapy approaches, understand when you may need support, and discover practical self-help strategies."
        />
        <link rel="canonical" href="https://mindwork360.com/therapy" />
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Helmet>

      {/* Hero */}
      <section className="ts-hero">
        <img src={tsBanner} alt="" role="presentation" className="ts-hero-bg" />
        <div className="ts-hero-scrim" />
        <div className="ts-hero-inner">
          <h1 className="ts-h1">Therapy & Self-Help</h1>
          <p className="ts-hero-text">
            Therapy can provide professional support when life feels difficult to manage, while
            self-help offers practical ways to understand yourself and cope with everyday
            challenges. Explore therapy approaches, self-help strategies, and ways to find the
            support that fits your needs.
          </p>
        </div>
      </section>

      {/* What Does Therapy Mean? */}
      <section className="ts-section">
        <h2 className="ts-section-title">What Does Therapy Mean?</h2>
        <p className="ts-section-text">
          Therapy is a form of professional support that helps people understand their thoughts,
          emotions, behaviours, relationships, or difficult experiences. Different approaches, such
          as behavioral therapy, anxiety therapy, exposure therapy, and trauma therapy, are used for
          different needs.
        </p>
        <p className="ts-section-text">
          Therapy isn't only about treating a mental health condition. It can also provide a safe,
          structured space to work through challenges, develop coping skills, improve
          relationships, and make meaningful changes.
        </p>
        <p className="ts-section-text">
          Therapy and self-help can also complement each other. Self-help strategies can support
          everyday well-being, while a qualified therapist can provide personalised guidance when
          challenges become difficult to manage alone.
        </p>
      </section>

      {/* Therapy or Self-Help: Which Do You Need? */}
      <section className="ts-section">
        <h2 className="ts-section-title">Therapy or Self-Help: Which Do You Need?</h2>
        <p className="ts-section-text">
          Therapy and self-help can both support personal well-being, but they serve different
          purposes. Self-help can be useful for everyday challenges and personal development, while
          therapy provides professional, personalised support for concerns that may be harder to
          manage alone.
        </p>

        <div className="ts-compare">
          <div className="ts-compare-col">
            <h3 className="ts-compare-header">THERAPY</h3>
            {compareRows.map((row) => (
              <div className="ts-compare-item" key={row.therapy.title}>
                <p className="ts-compare-item-title">{row.therapy.title}</p>
                <p className="ts-compare-item-text">{row.therapy.text}</p>
              </div>
            ))}
          </div>
          <div className="ts-compare-col">
            <h3 className="ts-compare-header">SELF-HELP</h3>
            {compareRows.map((row) => (
              <div className="ts-compare-item" key={row.selfHelp.title}>
                <p className="ts-compare-item-title">{row.selfHelp.title}</p>
                <p className="ts-compare-item-text">{row.selfHelp.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Are the Different Types of Therapy? */}
      <section className="ts-section">
        <h2 className="ts-section-title">What Are the Different Types of Therapy?</h2>
        <p className="ts-section-text">
          There are many types of therapy, and each approach focuses on different concerns,
          experiences, or goals. Some work with thoughts and behaviours, while others focus on
          anxiety, trauma, relationships, or coping skills.
        </p>

        <div className="ts-journey">
          {therapyTypeGroups.map((group, idx) => (
            <div className="ts-journey-step" key={group.title}>
              <div className="ts-journey-marker">
                <span className="ts-journey-number">{idx + 1}</span>
              </div>
              <div className="ts-journey-content">
                <h3 className="ts-journey-title">{group.title}</h3>
                {group.items.map((item) => (
                  <div className="ts-journey-subitem" key={item.name}>
                    <p className="ts-journey-subitem-title">{item.name}</p>
                    <p className="ts-journey-subitem-text">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* What Are the Signs You Might Need Therapy? */}
      <section className="ts-section">
        <h2 className="ts-section-title">What Are the Signs You Might Need Therapy?</h2>
        <p className="ts-section-text">
          You don't have to be experiencing a mental health condition to consider therapy. Ongoing
          emotional difficulties, relationship problems, or struggles that interfere with daily
          life may be signs that additional support could help.
        </p>
        <p className="ts-section-text" style={{ fontWeight: 700, color: "#1a1a1a", marginBottom: "30px" }}>
          You Might Relate To...
        </p>

        <div className="ts-masonry">
          {signsTiles.map((tile) => (
            <div className="ts-masonry-tile" key={tile.quote}>
              <p className="ts-masonry-quote">"{tile.quote}"</p>
              <p className="ts-masonry-caption">{tile.caption}</p>
            </div>
          ))}
        </div>

        <p className="ts-section-text" style={{ marginTop: "45px" }}>
          <strong>When to seek support:</strong> If these difficulties persist or start affecting
          your work, relationships, sleep, or daily life, speaking with a qualified mental health
          professional may be worth considering.
        </p>
      </section>

      {/* Self-Help: What Does It Mean? */}
      <section className="ts-section">
        <h2 className="ts-section-title">Self-Help: What Does It Mean?</h2>
        <p className="ts-section-text">
          Self-help means using practical strategies, resources, and everyday habits to understand
          yourself, manage challenges, and support your well-being without relying solely on
          professional support.
        </p>
        <p className="ts-section-text">
          It can include self-help exercises, journaling, mindfulness, relaxation techniques,
          healthy routines, goal setting, and learning new coping skills.
        </p>
        <span className="ts-tagline">
          Understand yourself • Manage challenges • Build healthy habits • Develop coping skills
        </span>
      </section>

      {/* How to Use Self-Help in Everyday Life */}
      <section className="ts-section">
        <h2 className="ts-section-title">How to Use Self-Help in Everyday Life</h2>
        <p className="ts-section-text">
          Self-help doesn't have to mean making major changes. Small, consistent practices can help
          you manage everyday challenges, understand yourself better, and support your emotional
          well-being.
        </p>

        <div className="ts-cards-grid ts-cards-grid--3col">
          {selfHelpEverydayCards.map((card, idx) => (
            <div className="ts-card" key={card.title}>
              <span className="ts-card-number">{idx + 1}</span>
              <h3 className="ts-card-title">{card.title}</h3>
              <p className="ts-card-text">{card.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What Are Self-Help Skills? */}
      <section className="ts-section">
        <h2 className="ts-section-title">What Are Self-Help Skills?</h2>
        <p className="ts-section-text">
          Self-help skills are practical abilities that help you manage everyday challenges,
          understand yourself, and take better care of your emotional well-being. They can be
          developed gradually through practice and self-reflection.
        </p>

        <div className="ts-cards-grid ts-cards-grid--3col">
          {selfHelpSkillsCards.map((card, idx) => (
            <div className="ts-card" key={card.title}>
              <span className="ts-card-number">{idx + 1}</span>
              <h3 className="ts-card-title">{card.title}</h3>
              <p className="ts-card-text">{card.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* When Self-Help Isn't Enough */}
      <section className="ts-section">
        <h2 className="ts-section-title">When Self-Help Isn't Enough</h2>
        <p className="ts-section-text">
          Self-help can be useful for managing everyday stress and building healthier habits, but
          it isn't the right solution for every situation. If difficulties continue despite your
          efforts or begin affecting your daily life, relationships, work, or well-being,
          professional support may be helpful.
        </p>
        <p className="ts-section-text" style={{ fontWeight: 700, color: "#1a1a1a", marginBottom: "30px" }}>
          Consider Professional Support When:
        </p>

        <div className="ts-cards-grid">
          {whenNotEnoughCards.map((card, idx) => (
            <div className="ts-card" key={card.title}>
              <span className="ts-card-number">{idx + 1}</span>
              <h3 className="ts-card-title">{card.title}</h3>
              <p className="ts-card-text">{card.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Explore Therapy & Self-Help Articles */}
      <section className="ts-section">
        <h2 className="ts-section-title">Explore Therapy & Self-Help Articles</h2>
        <p className="ts-section-text">
          Explore practical, evidence-informed articles on therapy, self-help, coping skills,
          therapeutic approaches, emotional well-being, and finding the right kind of support.
        </p>

        {articles.length === 0 ? (
          <p style={{ fontSize: "18px", color: "#777", margin: "20px 0" }}>
            No blogs available for this category.
          </p>
        ) : (
        <div className="ts-articles-grid">
          {articles.map((post) => (
            <div className="post-card2" key={post.id}>
              <div className="post-card2-image-wrapper">
                <img
                  src={post.image}
                  alt={post.title || "Therapy article"}
                  title={post.title || "MindWork360 Article"}
                  className="post-card2-image"
                />
              </div>
              <div className="post-card2-content">
                <h3 className="post-card2-title">{post.title || "Untitled Article"}</h3>
                <p className="post-card2-excerpt" dangerouslySetInnerHTML={{ __html: post.excerpt || "" }} />
                <div className="post-card2-meta">
                  <a
                    href={`/blogs/${post.slug}`}
                    className="read-more-link2"
                    onClick={(e) => {
                      e.preventDefault();
                      if (post.slug) navigate(`/blogs/${post.slug}`);
                    }}
                  >
                    Read More →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        )}

        <div className="ts-view-all">
          <button
            className="ts-view-all-btn"
            onClick={() => navigate(`/blogs?category=${encodeURIComponent(CATEGORY_NAME)}`)}
          >
            Explore All Therapy & Self-Help Articles →
          </button>
        </div>
      </section>

      {/* FAQ */}
      <section className="ts-section ts-faq-section">
        <h2 className="ts-section-title">Frequently Asked Questions About Therapy & Self-Help</h2>
        {therapyFaqs.map((item) => (
          <div className="faq-item" key={item.question}>
            <p className="faq-question">{item.question}</p>
            <p className="faq-answer">{item.answer}</p>
          </div>
        ))}
      </section>

      <Footer />
    </div>
  );
};

export default TherapyPage;
