import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import "./HomePage.css";
import "./FAQPage.css";
import "./PersonalGrowthPage.css";
import Footer from "./Footer_page";

const API_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:3000"
    : "https://euphoria-backend-oii0.onrender.com";

const CATEGORY_NAME = "Personal Growth";

const everydayLifeCards = [
  { title: "Know Yourself Better", text: "Understand your values, strengths, emotions, and patterns." },
  { title: "Build Better Habits", text: "Create routines that support your well-being and personal growth." },
  { title: "Set Meaningful Goals", text: "Set personal growth goals that reflect what truly matters to you." },
  { title: "Learn From Challenges", text: "Use setbacks and difficult experiences as opportunities to learn and grow." },
  { title: "Improve Your Relationships", text: "Build better communication, boundaries, and emotional awareness." },
  { title: "Keep Learning", text: "Develop new skills, explore new ideas, and stay open to different perspectives." },
  { title: "Step Outside Your Comfort Zone", text: "Taking thoughtful risks and trying new things can build confidence and resilience." },
  { title: "Make Time for Yourself", text: "Create space to reflect, recharge, and focus on your priorities." },
];

const fiveAreasTiles = [
  { title: "Self-Awareness", text: "Understand your thoughts, emotions, values, strengths, and patterns." },
  { title: "Emotional Growth", text: "Learn to recognise, manage, and express your emotions in healthier ways." },
  { title: "Relationships", text: "Develop better communication, boundaries, empathy, and connections with others." },
  { title: "Skills & Learning", text: "Build knowledge, abilities, confidence, and new skills that support your personal growth." },
  { title: "Purpose & Direction", text: "Clarify what matters to you and set goals that align with your values and the life you want." },
];

const causesCards = [
  { title: "Life Experiences", text: "New experiences can challenge our assumptions and change how we see ourselves and the world." },
  { title: "Challenges", text: "Difficult situations can reveal strengths, weaknesses, and areas where we need to grow." },
  { title: "Self-Reflection", text: "Looking honestly at our thoughts, choices, emotions, and patterns can create greater self-awareness." },
  { title: "Relationships", text: "Our interactions with others can teach us about communication, boundaries, empathy, and ourselves." },
  { title: "Learning", text: "New knowledge, skills, perspectives, and feedback can open the door to personal growth." },
  { title: "Intentional Change", text: "Choosing to develop new habits, take risks, or step outside our comfort zone can turn awareness into action." },
];

const growthPlanSteps = [
  { title: "Reflect", text: "Think about your strengths, challenges, values, habits, and the areas of life you'd like to improve." },
  { title: "Choose", text: "Pick one or two areas that matter most to you right now instead of trying to work on everything at once." },
  { title: "Set Goals", text: "Turn what you want to improve into specific, realistic personal growth goals that you can work toward." },
  { title: "Take Action", text: "Break each goal into small steps and build habits that make progress easier to maintain." },
  { title: "Review & Adjust", text: "Check your progress regularly, learn from setbacks, and adjust your goals or approach as your priorities change." },
];

const exercisesCards = [
  { title: "Self-Reflection Journaling", text: "Write about your thoughts, emotions, experiences, and what you have learned from them." },
  { title: "Values Check-In", text: "Identify the values that matter most to you and consider whether your daily choices reflect them." },
  { title: "Strengths Inventory", text: "List your strengths, skills, and past achievements to build greater self-awareness and confidence." },
  { title: "Goal Review", text: "Review your personal growth goals regularly and identify one small action you can take next." },
  { title: "Gratitude Practice", text: "Notice and record things you appreciate to shift your attention toward positive experiences." },
  { title: "Step Outside Your Comfort Zone", text: "Try something unfamiliar or take a thoughtful risk that challenges you to learn and grow." },
];

const personalGrowthFaqs = [
  { question: "What Is Meant by Personal Growth?", answer: "Personal growth is the ongoing process of understanding yourself, developing your abilities, changing unhelpful patterns, and becoming more intentional about how you live. It can involve emotional, social, personal, and practical development." },
  { question: "What Is Personal Growth and Development?", answer: "Personal growth and personal development are closely related terms. Both involve improving self-awareness, skills, habits, relationships, and overall well-being. Personal development can also include structured efforts toward specific goals." },
  { question: "Why Is Personal Growth Important?", answer: "Personal growth can help you understand yourself better, respond to challenges more effectively, build healthier habits and relationships, and make choices that better reflect your values and goals." },
  { question: "What Are the 5 Areas of Personal Growth?", answer: "Five common areas are self-awareness, emotional growth, relationships, skills and learning, and purpose and direction. Working on these areas can help create a more balanced approach to personal growth." },
  { question: "What Causes Personal Growth?", answer: "Personal growth can be influenced by life experiences, challenges, relationships, self-reflection, learning, feedback, and intentional change. People often grow when they become willing to learn from their experiences and try new approaches." },
  { question: "How Do You Grow in Your Personal Life?", answer: "Start by identifying an area you want to improve, set a realistic goal, and take small actions consistently. Learning from experiences, developing healthy habits, and making time for self-reflection can support continued growth." },
  { question: "How Do You Create a Personal Growth Plan?", answer: "Start by reflecting on where you are now, choose one or two areas to improve, set specific personal growth goals, break them into manageable actions, and review your progress regularly." },
  { question: "How Do You Know If You Are Making Personal Progress?", answer: "Personal growth may show up as greater self-awareness, healthier habits, better emotional regulation, stronger relationships, increased confidence, or making choices that are more aligned with your values." },
  { question: "How Do You Take Risks for Personal Growth?", answer: "Start with thoughtful risks rather than reckless decisions. Try something outside your comfort zone, consider the possible outcomes, and treat the experience as an opportunity to learn rather than a guarantee of success." },
  { question: "How Do You Value Time and Concentrate on Personal Growth?", answer: "Identify what matters most, reduce unnecessary distractions, and set aside regular time for your goals, learning, reflection, and healthy routines. Consistency is often more useful than trying to make major changes all at once." },
  { question: "Can Personal Growth Drive Friends Away?", answer: "It can sometimes change relationships. As your values, boundaries, interests, or priorities develop, some relationships may become less compatible. Healthy friendships can often adapt as both people grow and change." },
  { question: "What Is the Power of Personal Growth?", answer: "Personal growth can help you become more aware of your patterns, make intentional choices, handle challenges, and build a life that reflects your values. Its impact often comes from small changes maintained over time." },
  { question: "How Can Personal Growth Counseling Help?", answer: "Personal growth counseling can provide a structured space to explore goals, self-doubt, relationships, life transitions, recurring patterns, and personal challenges. A qualified professional can help you gain perspective and identify practical ways forward." },
  { question: "Is Personal Growth a One-Time Goal?", answer: "No. Personal growth is an ongoing process rather than a destination. Your priorities, circumstances, relationships, and goals can change throughout life, so growth often involves continuing to reflect, learn, adapt, and make intentional choices." },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": personalGrowthFaqs.map((item) => ({
    "@type": "Question",
    "name": item.question,
    "acceptedAnswer": { "@type": "Answer", "text": item.answer },
  })),
};

const PersonalGrowthPage = () => {
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
      .catch((err) => console.error("Failed to load personal growth articles:", err));
  }, []);

  return (
    <div className="pg-page">
      <Helmet>
        <title>Personal Growth | Goals, Tips & Personal Development</title>
        <meta
          name="description"
          content="What is personal growth? Learn how personal growth works, why it matters, how to set goals, and practical ways to make meaningful progress."
        />
        <link rel="canonical" href="https://mindwork360.com/personal-growth" />
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Helmet>

      {/* Hero */}
      <section className="pg-hero">
        <div className="pg-hero-inner">
          <h1 className="pg-h1">Personal Growth</h1>
          <p className="pg-hero-text">
            Personal growth is the ongoing process of understanding yourself, developing new
            skills, building healthier habits, and making choices that help you grow. It can shape
            how you approach challenges, relationships, goals, and everyday life.
          </p>
        </div>
      </section>

      {/* Personal Growth in Everyday Life */}
      <section className="pg-section">
        <h2 className="pg-section-title">Personal Growth in Everyday Life</h2>
        <p className="pg-section-text">
          Personal growth happens through the small choices we make every day. Learning from
          experiences, changing unhelpful habits, and becoming more self-aware can help you move
          toward the life you want.
        </p>

        <div className="pg-cards-grid">
          {everydayLifeCards.map((card, idx) => (
            <div className="pg-card" key={card.title}>
              <span className="pg-card-number">{idx + 1}</span>
              <h3 className="pg-card-title">{card.title}</h3>
              <p className="pg-card-text">{card.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* The 5 Areas of Personal Growth */}
      <section className="pg-section">
        <h2 className="pg-section-title">The 5 Areas of Personal Growth</h2>
        <p className="pg-section-text">
          Personal growth can happen in different parts of life. Focusing on these five areas can
          help you understand where you want to grow and set more meaningful personal growth
          goals.
        </p>

        <div className="pg-masonry">
          {fiveAreasTiles.map((tile) => (
            <div className="pg-masonry-tile" key={tile.title}>
              <p className="pg-masonry-quote">{tile.title}</p>
              <p className="pg-masonry-caption">{tile.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What Causes Personal Growth? */}
      <section className="pg-section">
        <h2 className="pg-section-title">What Causes Personal Growth?</h2>
        <p className="pg-section-text">
          Personal growth can come from many sources. Sometimes we actively choose to grow, while
          at other times life experiences push us to change, learn, and adapt.
        </p>

        <div className="pg-cards-grid pg-cards-grid--3col">
          {causesCards.map((card, idx) => (
            <div className="pg-card" key={card.title}>
              <span className="pg-card-number">{idx + 1}</span>
              <h3 className="pg-card-title">{card.title}</h3>
              <p className="pg-card-text">{card.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Create Your Personal Growth Plan */}
      <section className="pg-section">
        <h2 className="pg-section-title">Create Your Personal Growth Plan</h2>
        <p className="pg-section-text">
          A personal growth plan gives you a clear direction instead of trying to change
          everything at once. Start by understanding where you are, decide what you want to
          improve, and take small, consistent steps toward your goals.
        </p>

        <div className="pg-journey">
          {growthPlanSteps.map((step, idx) => (
            <div className="pg-journey-step" key={step.title}>
              <div className="pg-journey-marker">
                <span className="pg-journey-number">{idx + 1}</span>
              </div>
              <div className="pg-journey-content">
                <h3 className="pg-journey-title">{step.title}</h3>
                <p className="pg-journey-text">{step.text}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="pg-section-text" style={{ marginTop: "45px" }}>
          Small, consistent progress matters more than trying to change everything at once.
        </p>
      </section>

      {/* Simple Exercises for Personal Growth */}
      <section className="pg-section">
        <h2 className="pg-section-title">Simple Exercises for Personal Growth</h2>
        <p className="pg-section-text">
          You don't need a major life change to work on personal growth. Simple exercises can help
          you build self-awareness, clarify your goals, and develop habits that support ongoing
          personal development.
        </p>

        <div className="pg-cards-grid pg-cards-grid--3col">
          {exercisesCards.map((card, idx) => (
            <div className="pg-card" key={card.title}>
              <span className="pg-card-number">{idx + 1}</span>
              <h3 className="pg-card-title">{card.title}</h3>
              <p className="pg-card-text">{card.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Explore Personal Growth Articles */}
      <section className="pg-section">
        <h2 className="pg-section-title">Explore Personal Growth Articles</h2>
        <p className="pg-section-text">
          Explore practical articles on self-awareness, habits, confidence, motivation, personal
          growth goals, personal development, and building a more intentional life.
        </p>

        <div className="pg-articles-grid">
          {articles.map((post) => (
            <div className="post-card2" key={post.id}>
              <div className="post-card2-image-wrapper">
                <img
                  src={post.image}
                  alt={post.title || "Personal growth article"}
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

        <div className="pg-view-all">
          <button
            className="pg-view-all-btn"
            onClick={() => navigate(`/blogs?category=${encodeURIComponent(CATEGORY_NAME)}`)}
          >
            Explore All Personal Growth Articles →
          </button>
        </div>
      </section>

      {/* FAQ */}
      <section className="pg-section pg-faq-section">
        <h2 className="pg-section-title">Frequently Asked Questions About Personal Growth</h2>
        {personalGrowthFaqs.map((item) => (
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

export default PersonalGrowthPage;
