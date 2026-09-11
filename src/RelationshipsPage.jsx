import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import "./HomePage.css";
import "./FAQPage.css";
import "./RelationshipsPage.css";
import Footer from "./Footer_page";
import relBanner from "./assets/banner_images/relationship.jpeg";

const API_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:3000"
    : "https://euphoria-backend-oii0.onrender.com";

const CATEGORY_NAME = "Relationships";

const everydayLifeCards = [
  { title: "Communication Matters", text: "Open and honest communication helps people understand each other's needs and feelings." },
  { title: "Trust Takes Time", text: "Trust grows through honesty, consistency, reliability, and mutual respect." },
  { title: "Boundaries Are Healthy", text: "Healthy boundaries help protect your needs while respecting the needs of others." },
  { title: "Conflict Is Normal", text: "Disagreements happen in every relationship. How you handle them can make a difference." },
  { title: "Connection Needs Effort", text: "Strong relationships grow through time, attention, shared experiences, and emotional support." },
  { title: "Every Relationship Is Different", text: "There is no single formula for a healthy relationship. Different connections have different needs and expectations." },
];

const relationshipTypesTiles = [
  { title: "Romantic Relationships", text: "Love, intimacy, communication, and commitment." },
  { title: "Family Relationships", text: "Connection, support, family dynamics, and boundaries." },
  { title: "Friendships", text: "Trust, companionship, shared experiences, and mutual support." },
  { title: "Workplace Relationships", text: "Communication, teamwork, collaboration, and professional boundaries." },
  { title: "Parent-Child Relationships", text: "Attachment, guidance, trust, and emotional connection." },
  { title: "Relationship With Yourself", text: "Self-worth, self-compassion, personal boundaries, and understanding your own needs." },
];

const whatMakesHealthyCards = [
  { title: "Trust", text: "Being honest, reliable, and feeling safe with each other." },
  { title: "Respect", text: "Valuing each other's feelings, choices, needs, and individuality." },
  { title: "Communication", text: "Expressing thoughts and feelings openly while listening to each other." },
  { title: "Healthy Boundaries", text: "Knowing your limits and respecting the other person's boundaries." },
  { title: "Emotional Support", text: "Being able to offer care, understanding, and support during difficult times." },
  { title: "Independence", text: "Maintaining your own identity, interests, friendships, and personal space." },
];

const challengesTiles = [
  { quote: "We keep having the same argument.", caption: "Recurring conflict can make it difficult to feel heard or understood." },
  { quote: "I don't feel understood.", caption: "Poor communication can leave people feeling unheard, dismissed, or disconnected." },
  { quote: "How do I set boundaries without feeling guilty?", caption: "Healthy boundaries can protect your needs while maintaining respect and connection." },
  { quote: "I feel lonely in my relationship.", caption: "You can feel emotionally disconnected even when you're physically close to someone." },
  { quote: "We've grown apart.", caption: "Changes in priorities, interests, or life circumstances can affect emotional connection." },
  { quote: "I don't trust them anymore.", caption: "Broken trust can create insecurity and make rebuilding a relationship difficult." },
  { quote: "Why do I keep choosing unhealthy relationships?", caption: "Past experiences, attachment patterns, self-worth, and learned behaviours can influence relationship choices." },
  { quote: "How do we stay connected in a long distance relationship?", caption: "Distance can make communication and emotional connection more challenging, but intentional communication can help couples stay connected." },
  { quote: "Is this a toxic relationship?", caption: "Repeated manipulation, control, disrespect, or emotional harm can signal an unhealthy or toxic relationship." },
];

const buildHealthierSteps = [
  { title: "Listen", text: "Give the other person your attention and try to understand before responding." },
  { title: "Communicate", text: "Express your thoughts, feelings, and needs honestly and respectfully." },
  { title: "Respect", text: "Value each other's feelings, choices, differences, and boundaries." },
  { title: "Set Boundaries", text: "Be clear about your needs while respecting the limits of others." },
  { title: "Repair", text: "Acknowledge hurt, apologise when needed, and work together to rebuild trust." },
  { title: "Grow Together", text: "Make time for connection, support each other's growth, and keep learning from your experiences." },
];

const relationshipsFaqs = [
  { question: "What Makes a Healthy Relationship?", answer: "A healthy relationship is built on trust, respect, honest communication, emotional support, mutual boundaries, and the freedom for each person to maintain their own identity and interests." },
  { question: "What Are the Signs of a Healthy Relationship?", answer: "Signs of a healthy relationship include feeling respected and heard, communicating openly, trusting each other, handling disagreements respectfully, supporting each other's goals, and feeling comfortable expressing your needs." },
  { question: "What Are the Signs of an Unhealthy Relationship?", answer: "Frequent disrespect, controlling behaviour, manipulation, constant criticism, broken trust, poor communication, or feeling afraid to express yourself can be signs of an unhealthy relationship." },
  { question: "How Can You Improve Communication in a Relationship?", answer: "Start by listening without interrupting, expressing your feelings clearly, avoiding blame, and discussing problems when both people are calm. Honest communication works best when both people feel heard and respected." },
  { question: "How Do You Set Healthy Boundaries in a Relationship?", answer: "Identify what you are comfortable with, communicate your limits clearly, and be consistent about them. Healthy boundaries protect your needs while allowing the other person to have their own needs and boundaries." },
  { question: "Why Do Couples Keep Having the Same Arguments?", answer: "Recurring arguments can happen when the underlying issue isn't resolved, communication patterns become repetitive, or both people feel unheard. Understanding the pattern and addressing the root concern can help break the cycle." },
  { question: "How Do You Rebuild Trust in a Relationship?", answer: "Rebuilding trust usually takes time. Honest communication, consistent actions, accountability, keeping promises, and giving the other person space to process what happened can gradually restore trust." },
  { question: "Why Do I Feel Lonely in My Relationship?", answer: "Feeling lonely in a relationship can happen when emotional needs aren't being met or when communication and connection have declined. Spending meaningful time together and talking openly about your needs can help." },
  { question: "How Do You Know If a Relationship Is Worth Saving?", answer: "Consider whether both people are willing to communicate, take responsibility, respect boundaries, and work on the relationship. A difficult period doesn't necessarily mean a relationship cannot improve." },
  { question: "What Is Emotional Intimacy?", answer: "Emotional intimacy is the sense of closeness that develops when people feel safe sharing their thoughts, feelings, vulnerabilities, and experiences with each other." },
  { question: "Why Do People Keep Choosing Unhealthy Relationships?", answer: "Past experiences, attachment patterns, self-esteem, learned behaviours, and beliefs about relationships can influence our choices. Recognising these patterns can be an important first step toward healthier relationships." },
  { question: "How Do Relationships Affect Mental Health?", answer: "Supportive relationships can provide connection, belonging, and emotional support, while persistent conflict, isolation, or unhealthy relationship patterns can negatively affect mental well-being." },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": relationshipsFaqs.map((item) => ({
    "@type": "Question",
    "name": item.question,
    "acceptedAnswer": { "@type": "Answer", "text": item.answer },
  })),
};

const RelationshipsPage = () => {
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
      .catch((err) => console.error("Failed to load relationships articles:", err));
  }, []);

  return (
    <div className="rel-page">
      <Helmet>
        <title>Relationships | Build Healthier and Stronger Connections</title>
        <meta
          name="description"
          content="Learn about healthy relationships, relationship advice, communication, boundaries, conflict, trust, and ways to build stronger connections."
        />
        <link rel="canonical" href="https://mindwork360.com/relationships" />
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Helmet>

      {/* Hero */}
      <section className="rel-hero">
        <img src={relBanner} alt="" role="presentation" className="rel-hero-bg" />
        <div className="rel-hero-scrim" />
        <div className="rel-hero-inner">
          <h1 className="rel-h1">Relationship</h1>
          <p className="rel-hero-text">
            Relationships shape how we connect, communicate, and experience life with the people
            around us. Whether it's a partner, family member, friend, or colleague, understanding
            relationships can help us build stronger connections, communicate better, and navigate
            challenges with greater awareness. Explore practical relationship advice on
            communication, healthy relationships, boundaries, conflict, emotional connection,
            friendships, family, and more.
          </p>
        </div>
      </section>

      {/* Relationships in Everyday Life */}
      <section className="rel-section">
        <h2 className="rel-section-title">Relationships in Everyday Life</h2>
        <p className="rel-section-text">
          Relationships are part of everyday life. The way we communicate, set boundaries, handle
          conflict, and support each other can shape the quality of our connections.
        </p>

        <div className="rel-cards-grid rel-cards-grid--3col">
          {everydayLifeCards.map((card, idx) => (
            <div className="rel-card" key={card.title}>
              <span className="rel-card-number">{idx + 1}</span>
              <h3 className="rel-card-title">{card.title}</h3>
              <p className="rel-card-text">{card.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Exploring Different Types of Relationships */}
      <section className="rel-section">
        <h2 className="rel-section-title">Exploring Different Types of Relationships</h2>
        <p className="rel-section-text">
          We experience different kinds of relationships throughout life. Each has its own role,
          needs, and challenges.
        </p>

        <div className="rel-masonry">
          {relationshipTypesTiles.map((tile) => (
            <div className="rel-masonry-tile" key={tile.title}>
              <p className="rel-masonry-quote">{tile.title}</p>
              <p className="rel-masonry-caption">{tile.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What Makes a Relationship Healthy? */}
      <section className="rel-section">
        <h2 className="rel-section-title">What Makes a Relationship Healthy?</h2>
        <p className="rel-section-text">
          Healthy relationships are built on more than love or connection. Trust, respect,
          communication, boundaries, and emotional support all play a role in creating a strong
          and lasting relationship.
        </p>

        <div className="rel-cards-grid rel-cards-grid--3col">
          {whatMakesHealthyCards.map((card, idx) => (
            <div className="rel-card" key={card.title}>
              <span className="rel-card-number">{idx + 1}</span>
              <h3 className="rel-card-title">{card.title}</h3>
              <p className="rel-card-text">{card.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Common Relationship Challenges */}
      <section className="rel-section">
        <h2 className="rel-section-title">Common Relationship Challenges</h2>
        <p className="rel-section-text">
          Even healthy relationships can go through difficult periods. Recognising common
          relationship challenges can help you understand what is happening and find healthier
          ways to respond.
        </p>

        <div className="rel-masonry">
          {challengesTiles.map((tile) => (
            <div className="rel-masonry-tile" key={tile.quote}>
              <p className="rel-masonry-quote">"{tile.quote}"</p>
              <p className="rel-masonry-caption">{tile.caption}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How to Build Healthier Relationships */}
      <section className="rel-section">
        <h2 className="rel-section-title">How to Build Healthier Relationships</h2>
        <p className="rel-section-text">
          Healthy relationship tips aren't about following a perfect formula. Strong relationships
          grow through small, consistent actions, shared relationship goals, and a willingness to
          understand and support each other.
        </p>

        <div className="rel-journey">
          {buildHealthierSteps.map((step, idx) => (
            <div className="rel-journey-step" key={step.title}>
              <div className="rel-journey-marker">
                <span className="rel-journey-number">{idx + 1}</span>
              </div>
              <div className="rel-journey-content">
                <h3 className="rel-journey-title">{step.title}</h3>
                <p className="rel-journey-text">{step.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Explore Relationship Articles */}
      <section className="rel-section">
        <h2 className="rel-section-title">Explore Relationship Articles</h2>
        <p className="rel-section-text">
          Explore practical, easy-to-understand articles on communication, healthy relationships,
          boundaries, conflict, emotional connection, friendships, family, and more.
        </p>

        <div className="rel-articles-grid">
          {articles.map((post) => (
            <div className="post-card2" key={post.id}>
              <div className="post-card2-image-wrapper">
                <img
                  src={post.image}
                  alt={post.title || "Relationships article"}
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

        <div className="rel-view-all">
          <button
            className="rel-view-all-btn"
            onClick={() => navigate(`/blogs?category=${encodeURIComponent(CATEGORY_NAME)}`)}
          >
            Explore All Relationship Articles →
          </button>
        </div>
      </section>

      {/* FAQ */}
      <section className="rel-section rel-faq-section">
        <h2 className="rel-section-title">Frequently Asked Questions About Relationships</h2>
        {relationshipsFaqs.map((item) => (
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

export default RelationshipsPage;
