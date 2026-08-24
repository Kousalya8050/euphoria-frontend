import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import "./HomePage.css";
import "./FAQPage.css";
import "./PsychologyPage.css";
import Footer from "./Footer_page";

const API_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:3000"
    : "https://euphoria-backend-oii0.onrender.com";

const CATEGORY_NAME = "Psychology";

const everydayLifeCards = [
  { title: "Habits", text: "How psychology explains the behaviours we repeat." },
  { title: "Emotions", text: "How feelings influence the way we think and act." },
  { title: "Decision-Making", text: "Why we make certain choices, even when they seem irrational." },
  { title: "Memory", text: "How our minds process, store, and recall information." },
  { title: "Relationships", text: "How other people and social situations influence our behaviour." },
  { title: "Self-Image", text: "Why we compare ourselves with others and how it shapes our self-view." },
];

const majorAreasTiles = [
  { title: "Cognitive Psychology", text: "Explores how we think, learn, remember, process information, and make decisions." },
  { title: "Behavioral Psychology", text: "Looks at how behaviours develop and how learning, experiences, and the environment influence behaviour." },
  { title: "Social Psychology", text: "Explores how people, relationships, groups, and social situations influence our thoughts and behaviour." },
  { title: "Developmental Psychology", text: "Studies how our thoughts, emotions, behaviour, and abilities change throughout different stages of life." },
  { title: "Humanistic Psychology", text: "Focuses on personal growth, self-understanding, meaning, and the potential to create a fulfilling life." },
  { title: "Sports Psychology", text: "Explores how thoughts, emotions, motivation, confidence, and mental skills can influence sports performance." },
];

const dailyConceptsCards = [
  { title: "Psychology of Habits", text: "Why repeated behaviours become automatic and how our routines shape them." },
  { title: "Cognitive Dissonance", text: "The discomfort we feel when our actions and beliefs don't align." },
  { title: "Projection", text: "When we attribute our own thoughts or feelings to someone else." },
  { title: "Reverse Psychology", text: "Using the opposite suggestion to influence someone's behaviour or decision." },
  { title: "Confirmation Bias", text: "Why we tend to notice information that supports what we already believe." },
  { title: "Social Comparison", text: "How comparing ourselves with others can affect our self-image and feelings." },
];

const lifeStages = [
  { title: "Childhood", text: "Early experiences shape learning, emotions, behaviour, and relationships." },
  { title: "Adolescence", text: "Identity, independence, friendships, and emotions become increasingly important." },
  { title: "Young Adulthood", text: "Relationships, decision-making, work, and independence take on new meaning." },
  { title: "Adulthood", text: "Family, career, relationships, responsibilities, and changing priorities influence our experiences." },
  { title: "Later Life", text: "Changes in cognition, relationships, identity, purpose, and emotional well-being become important parts of psychological development." },
];

const psychologyFaqs = [
  { question: "What Is the Study of Psychology For?", answer: "The study of psychology helps us understand human thoughts, emotions, and behaviour. It is used in areas such as mental health, education, relationships, workplaces, sports, research, and personal development." },
  { question: "What Are the Main Types of Psychology?", answer: "Major areas include cognitive psychology, behavioral psychology, social psychology, developmental psychology, humanistic psychology, and sports psychology. Each focuses on different aspects of human thought and behaviour." },
  { question: "What Is the Psychology of Habits?", answer: "The psychology of habits explores how repeated behaviours become automatic. Habits can be influenced by cues, routines, rewards, motivation, environment, and past experiences." },
  { question: "What Is Cognitive Dissonance in Psychology?", answer: "Cognitive dissonance is the discomfort that can occur when our beliefs, values, or actions conflict with one another. People may change their behaviour or beliefs to reduce this discomfort." },
  { question: "What Is Humanistic Psychology?", answer: "Humanistic psychology focuses on individual experience, personal growth, free will, meaning, and human potential. It views people as capable of making choices and developing a greater understanding of themselves." },
  { question: "What Is Projection in Psychology?", answer: "Projection is a psychological process in which someone attributes their own thoughts, feelings, or behaviours to another person. It can sometimes influence how we interpret relationships and social situations." },
  { question: "What Is Reverse Psychology?", answer: "Reverse psychology involves encouraging someone to do something by suggesting the opposite of what you actually want. It may influence behaviour in some situations, although it does not work consistently with everyone." },
  { question: "What Are the 5 Concepts of Psychology?", answer: "Common psychological concepts include perception, learning, memory, motivation, and emotion. These concepts help explain how people process experiences, develop behaviours, and respond to the world around them." },
  { question: "What Are the Big Questions in Psychology Right Now?", answer: "Psychology continues to explore questions about how the brain and behaviour interact, how technology affects attention and relationships, how people develop and change, and what influences mental health and well-being." },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": psychologyFaqs.map((item) => ({
    "@type": "Question",
    "name": item.question,
    "acceptedAnswer": { "@type": "Answer", "text": item.answer },
  })),
};

const PsychologyPage = () => {
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
      .catch((err) => console.error("Failed to load psychology articles:", err));
  }, []);

  return (
    <div className="ps-page">
      <Helmet>
        <title>Psychology | Understand the Mind and Human Behaviour</title>
        <meta
          name="description"
          content="Explore psychology basics, human behaviour, emotions, habits, and major areas of psychology with practical, easy-to-understand guidance."
        />
        <link rel="canonical" href="https://mindwork360.com/psychology" />
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Helmet>

      {/* Hero */}
      <section className="ps-hero">
        <div className="ps-hero-inner">
          <h1 className="ps-h1">Psychology</h1>
          <p className="ps-hero-text">
            Psychology helps us understand why we think, feel, behave, and interact the way we do.
            Explore the basics of psychology, major branches, everyday psychological concepts,
            human behaviour, and approaches used to support mental and emotional well-being.
          </p>
        </div>
      </section>

      {/* What Is Psychology? */}
      <section className="ps-section">
        <h2 className="ps-section-title">What Is Psychology?</h2>
        <p className="ps-section-text">
          Psychology is the scientific study of how people think, feel, and behave. It helps us
          understand everything from emotions, habits, and decision-making to relationships,
          personality, and human development. By exploring psychology, we can better understand
          ourselves, make sense of human behaviour, and learn how our thoughts and experiences
          shape the way we respond to everyday life.
        </p>
      </section>

      {/* Psychology in Everyday Life */}
      <section className="ps-section">
        <h2 className="ps-section-title">Psychology in Everyday Life</h2>
        <p className="ps-section-text">
          Psychology helps explain many of the thoughts, feelings, and behaviours we experience
          every day.
        </p>

        <div className="ps-cards-grid ps-cards-grid--3col">
          {everydayLifeCards.map((card, idx) => (
            <div className="ps-card" key={card.title}>
              <span className="ps-card-number">{idx + 1}</span>
              <h3 className="ps-card-title">{card.title}</h3>
              <p className="ps-card-text">{card.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Explore the Major Areas of Psychology */}
      <section className="ps-section">
        <h2 className="ps-section-title">Explore the Major Areas of Psychology</h2>
        <p className="ps-section-text">
          Psychology covers different areas of human thought, behaviour, and development. Explore
          some of the major branches of psychology and what they can help us understand.
        </p>

        <div className="ps-masonry">
          {majorAreasTiles.map((tile) => (
            <div className="ps-masonry-tile" key={tile.title}>
              <p className="ps-masonry-quote">{tile.title}</p>
              <p className="ps-masonry-caption">{tile.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Psychology Concepts You Encounter Every Day */}
      <section className="ps-section">
        <h2 className="ps-section-title">Psychology Concepts You Encounter Every Day</h2>
        <p className="ps-section-text">
          Psychology can help explain many of the thoughts, reactions, and behaviours we
          experience every day.
        </p>

        <div className="ps-cards-grid ps-cards-grid--3col">
          {dailyConceptsCards.map((card, idx) => (
            <div className="ps-card" key={card.title}>
              <span className="ps-card-number">{idx + 1}</span>
              <h3 className="ps-card-title">{card.title}</h3>
              <p className="ps-card-text">{card.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Psychology Across Different Stages of Life */}
      <section className="ps-section">
        <h2 className="ps-section-title">Psychology Across Different Stages of Life</h2>
        <p className="ps-section-text">
          Our thoughts, emotions, relationships, and behaviour continue to change as we move
          through life. Developmental psychology helps us understand how these changes shape who
          we become.
        </p>

        <div className="ps-journey">
          {lifeStages.map((stage, idx) => (
            <div className="ps-journey-step" key={stage.title}>
              <div className="ps-journey-marker">
                <span className="ps-journey-number">{idx + 1}</span>
              </div>
              <div className="ps-journey-content">
                <h3 className="ps-journey-title">{stage.title}</h3>
                <p className="ps-journey-text">{stage.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* From Psychology to Psychotherapy */}
      <section className="ps-section">
        <h2 className="ps-section-title">From Psychology to Psychotherapy</h2>
        <p className="ps-section-text">
          Psychology helps us understand how thoughts, emotions, and behaviour shape our lives.
          Psychotherapy applies this knowledge through different therapeutic approaches to help
          people work through emotional, behavioural, and mental health challenges.
        </p>
        <div className="ps-view-all">
          <button className="ps-view-all-btn" onClick={() => navigate("/psychotherapy")}>
            Explore Psychotherapy Types →
          </button>
        </div>
      </section>

      {/* Explore Psychology Articles */}
      <section className="ps-section">
        <h2 className="ps-section-title">Explore Psychology Articles</h2>
        <p className="ps-section-text">
          Go deeper into psychology with practical, easy-to-understand articles on human
          behaviour, emotions, habits, relationships, personality, and everyday life.
        </p>

        <div className="ps-articles-grid">
          {articles.map((post) => (
            <div className="post-card2" key={post.id}>
              <div className="post-card2-image-wrapper">
                <img
                  src={post.image}
                  alt={post.title || "Psychology article"}
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

        <div className="ps-view-all">
          <button
            className="ps-view-all-btn"
            onClick={() => navigate(`/blogs?category=${encodeURIComponent(CATEGORY_NAME)}`)}
          >
            Explore All Psychology Articles →
          </button>
        </div>
      </section>

      {/* FAQ */}
      <section className="ps-section ps-faq-section">
        <h2 className="ps-section-title">Frequently Asked Questions About Psychology</h2>
        {psychologyFaqs.map((item) => (
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

export default PsychologyPage;
