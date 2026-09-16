import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import "./HomePage.css";
import "./FAQPage.css";
import "./MentalHealthPage.css";
import Footer from "./Footer_page";
import mhBanner from "./assets/banner_images/11.jpeg";

const API_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:3000"
    : "https://euphoria-backend-oii0.onrender.com";

const CATEGORY_NAME = "Mental Health";

const everydayLifeCards = [
  {
    title: "Mental Health Is for Everyone",
    text: "Everyone has mental health, and it changes throughout different stages of life.",
  },
  {
    title: "It Shapes Daily Life",
    text: "Mental health affects your thoughts, emotions, relationships, and everyday decisions.",
  },
  {
    title: "Healthy Habits Help",
    text: "Regular sleep, exercise, and simple mental health exercises can improve your emotional well-being.",
  },
  {
    title: "Challenges Are Common",
    text: "Stress, anxiety, and other mental health conditions can affect anyone at any stage of life.",
  },
  {
    title: "Support Is Available",
    text: "A mental health professional or mental health therapist can help when challenges become difficult to manage.",
  },
  {
    title: "Awareness Makes a Difference",
    text: "Mental health awareness helps reduce stigma and encourages people to seek support sooner.",
  },
  {
    title: "Small Steps Count",
    text: "Simple mental health tips, practiced consistently, can make a meaningful difference over time.",
  },
  {
    title: "Everyone's Journey Is Different",
    text: "Every person's mental health is unique, and seeking help is a sign of strength, not weakness.",
  },
];

const journeySteps = [
  {
    title: "Understand",
    text: "Mental health is more than the absence of illness. It influences how you think, feel, behave, and cope with everyday life. Learning the basics is the first step toward building greater mental health awareness and understanding what supports your well-being.",
  },
  {
    title: "Recognise",
    text: "Recognising early signs such as ongoing stress, anxiety, low mood, or emotional exhaustion can help you respond sooner. Learning about common mental health conditions and mental health disorders also makes it easier to understand what you or someone close to you may be experiencing.",
  },
  {
    title: "Support",
    text: "Supporting your mental health can be as simple as building healthier habits, practising mental health exercises, or seeking guidance from a mental health professional or mental health therapist when you need additional support.",
  },
  {
    title: "Grow",
    text: "Good mental health is an ongoing journey rather than a destination. By following practical mental health tips, building healthy routines, and continuing to improve your mental health awareness, you can strengthen your emotional well-being over time.",
  },
];

const feelingsTiles = [
  {
    quote: "Why do I worry about everything?",
    caption: "Sometimes even small situations can feel overwhelming and increase anxiety.",
  },
  {
    quote: "I can't stop overthinking.",
    caption: "Your mind keeps replaying conversations, decisions, or worst-case scenarios.",
  },
  {
    quote: "I'm tired... even after resting.",
    caption: "Emotional exhaustion is a common sign that your mental health may need attention.",
  },
  {
    quote: "Nothing feels exciting anymore.",
    caption: "Losing interest in everyday activities can sometimes be linked to common mental health conditions.",
  },
  {
    quote: "I feel lonely, even around people.",
    caption: "Feeling disconnected is more common than many people realise and deserves care, not judgment.",
  },
  {
    quote: "Stress never seems to switch off.",
    caption: "Learning practical mental health tips and healthy coping strategies can help you manage everyday stress.",
  },
  {
    quote: "I want to feel like myself again.",
    caption: "Simple habits, mindfulness, and regular mental health exercises can support emotional well-being over time.",
  },
  {
    quote: "Maybe I don't have to figure this out alone.",
    caption: "Talking to a mental health professional or mental health therapist can provide guidance, reassurance, and practical support when you need it.",
  },
];

const simpleWaysCards = [
  {
    title: "Prioritize Good Sleep",
    text: "Quality sleep helps your mind recharge and supports better emotional well-being.",
  },
  {
    title: "Stay Physically Active",
    text: "Walking, yoga, and other best exercises for mental health can improve mood and reduce stress.",
  },
  {
    title: "Slow Down and Recharge",
    text: "Mindfulness, breathing exercises, and journaling are simple mental health exercises that help you stay present.",
  },
  {
    title: "Stay Connected",
    text: "Talking to people you trust can make difficult moments easier to navigate.",
  },
  {
    title: "Build Healthy Habits",
    text: "Small mental health tips, like taking breaks, spending time outdoors, and limiting screen time, can support long-term well-being.",
  },
  {
    title: "Seek Support When Needed",
    text: "A mental health professional or mental health therapist can help when you're finding it difficult to cope.",
  },
];

const mentalHealthFaqs = [
  {
    question: "What are the 5 signs of mental health problems?",
    answer: "Common signs include feeling anxious or sad for long periods, losing interest in activities you once enjoyed, changes in sleep or appetite, difficulty concentrating, and withdrawing from family or friends. These signs can vary from person to person.",
  },
  {
    question: "How does social media affect mental health?",
    answer: "Social media can help people stay connected, but excessive use may increase stress, anxiety, loneliness, poor sleep, or unhealthy comparisons. Setting healthy boundaries and taking regular breaks can support better mental well-being.",
  },
  {
    question: "What mental health disorders are considered the hardest to live with?",
    answer: "Every mental health disorder affects people differently. Conditions such as major depression, bipolar disorder, schizophrenia, borderline personality disorder, obsessive-compulsive disorder (OCD), and severe anxiety disorders can significantly impact daily life. With the right treatment and support, many people learn to manage these conditions effectively.",
  },
  {
    question: "What has helped with your mental health the most?",
    answer: "There isn't one solution that works for everyone. Many people find that regular exercise, quality sleep, supportive relationships, mindfulness, therapy, and healthy daily routines all contribute to better mental health over time.",
  },
  {
    question: "What massively improved your mental health?",
    answer: "The biggest improvements often come from consistent lifestyle changes rather than one single solution. Building healthy habits, reducing stress, staying connected with others, and seeking help when needed can make a meaningful difference.",
  },
  {
    question: "Do people without any mental health issues actually exist?",
    answer: "Everyone has mental health, just as everyone has physical health. People may experience emotional ups and downs throughout life, even if they never develop a diagnosed mental health condition.",
  },
  {
    question: "When should you see a mental health professional?",
    answer: "If your thoughts, emotions, or behaviours begin affecting your relationships, work, studies, sleep, or daily life, it's a good idea to speak with a mental health professional. Seeking support early can make it easier to manage challenges before they become more difficult.",
  },
  {
    question: "Is mental health the same as mental illness?",
    answer: "No. Mental health refers to your overall emotional, psychological, and social well-being. Mental illness refers to diagnosed conditions that affect how a person thinks, feels, or behaves. Everyone has mental health, but not everyone experiences a mental illness.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": mentalHealthFaqs.map((item) => ({
    "@type": "Question",
    "name": item.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": item.answer,
    },
  })),
};

const MentalHealthPage = () => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/blogs_listing`)
      .then((res) => res.json())
      .then((data) => {
        let blogs = [];
        if (Array.isArray(data)) {
          blogs = data;
        } else if (data?.data) {
          blogs = data.data;
        } else if (data?.rows) {
          blogs = data.rows;
        }

        const filtered = blogs.filter(
          (post) => String(post.category).trim().toLowerCase() === CATEGORY_NAME.toLowerCase()
        );

        setArticles(filtered.slice(0, 6));
      })
      .catch((err) => console.error("Failed to load mental health articles:", err));
  }, []);

  return (
    <div className="mh-page">
      <Helmet>
        <title>Mental Health: Practical Ways to Support Your Well-Being</title>
        <meta
          name="description"
          content="Discover practical mental health tips, common conditions, self-care strategies, and expert-backed guidance to support your emotional well-being every day."
        />
        <link rel="canonical" href="https://mindwork360.com/mental-health" />
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Helmet>

      {/* Hero */}
      <section className="mh-hero">
        <img src={mhBanner} alt="" role="presentation" className="mh-hero-bg" />
        <div className="mh-hero-scrim" />
        <div className="mh-hero-inner">
          <h1 className="mh-h1">Mental Health</h1>
          <p className="mh-hero-text">
            Mental health is part of everyone's life. It influences how we handle stress, build
            relationships, make decisions, and cope with life's ups and downs. Whether you're
            looking to understand your emotions, improve your well-being, or simply learn more about
            how the mind works, this is a place to begin.
          </p>
        </div>
      </section>

      {/* Mental Health in Everyday Life */}
      <section className="mh-section">
        <h2 className="mh-section-title">Mental Health in Everyday Life</h2>
        <p className="mh-section-text">
          Mental health influences how we think, feel, and respond to everyday life. Knowing the
          basics can help you recognize challenges, build healthier habits, and know when to seek
          support.
        </p>

        <div className="mh-cards-grid">
          {everydayLifeCards.map((card, idx) => (
            <div className="mh-card" key={card.title}>
              <span className="mh-card-number">{idx + 1}</span>
              <h3 className="mh-card-title">{card.title}</h3>
              <p className="mh-card-text">{card.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Your Mental Health Journey */}
      <section className="mh-section">
        <h2 className="mh-section-title">Your Mental Health Journey</h2>
        <p className="mh-section-text">
          Taking care of your mental health doesn't happen overnight. It begins with understanding
          yourself, recognising what you're experiencing, finding the right support, and building
          habits that help you feel your best over time.
        </p>

        <div className="mh-journey">
          {journeySteps.map((step, idx) => (
            <div className="mh-journey-step" key={step.title}>
              <div className="mh-journey-marker">
                <span className="mh-journey-number">{idx + 1}</span>
              </div>
              <div className="mh-journey-content">
                <h3 className="mh-journey-title">{step.title}</h3>
                <p className="mh-journey-text">{step.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Everyday Thoughts. Real Feelings. */}
      <section className="mh-section">
        <h2 className="mh-section-title">Everyday Thoughts. Real Feelings.</h2>
        <p className="mh-section-text">
          Mental health challenges don't always look the same. Sometimes they show up as racing
          thoughts, emotional exhaustion, self-doubt, or feeling disconnected. If any of these
          experiences feel familiar, you're not alone. Understanding them is the first step toward
          improving your mental health and knowing when to seek the right support.
        </p>

        <div className="mh-masonry">
          {feelingsTiles.map((tile) => (
            <div className="mh-masonry-tile" key={tile.quote}>
              <p className="mh-masonry-quote">"{tile.quote}"</p>
              <p className="mh-masonry-caption">{tile.caption}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Simple Ways to Support Your Mental Health */}
      <section className="mh-section">
        <h2 className="mh-section-title">Simple Ways to Support Your Mental Health</h2>

        <div className="mh-cards-grid mh-cards-grid--3col">
          {simpleWaysCards.map((card, idx) => (
            <div className="mh-card" key={card.title}>
              <span className="mh-card-number">{idx + 1}</span>
              <h3 className="mh-card-title">{card.title}</h3>
              <p className="mh-card-text">{card.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Article */}
      <section className="mh-section">
        <h2 className="mh-section-title">Featured Article</h2>
        <p className="mh-section-text">
          Explore our complete collection of mental health articles covering anxiety, stress,
          emotional well-being, self-care, resilience, and more.
        </p>

        {articles.length === 0 ? (
          <p style={{ fontSize: "18px", color: "#777", margin: "20px 0" }}>
            No blogs available for this category.
          </p>
        ) : (
        <div className="mh-articles-grid">
          {articles.map((post) => (
            <div className="post-card2" key={post.id}>
              <div className="post-card2-image-wrapper">
                <img
                  src={post.image}
                  alt={post.title || "Mental health article"}
                  title={post.title || "MindWork360 Article"}
                  className="post-card2-image"
                />
              </div>
              <div className="post-card2-content">
                <h3 className="post-card2-title">{post.title || "Untitled Article"}</h3>
                <p
                  className="post-card2-excerpt"
                  dangerouslySetInnerHTML={{ __html: post.excerpt || "" }}
                />
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

        <div className="mh-view-all">
          <button
            className="mh-view-all-btn"
            onClick={() => navigate(`/blogs?category=${encodeURIComponent(CATEGORY_NAME)}`)}
          >
            View All Articles
          </button>
        </div>
      </section>

      {/* FAQ */}
      <section className="mh-section mh-faq-section">
        <h2 className="mh-section-title">Frequently Asked Questions</h2>
        {mentalHealthFaqs.map((item) => (
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

export default MentalHealthPage;
