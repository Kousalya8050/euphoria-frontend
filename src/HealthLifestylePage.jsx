import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import "./HomePage.css";
import "./FAQPage.css";
import "./HealthLifestylePage.css";
import Footer from "./Footer_page";

const API_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:3000"
    : "https://euphoria-backend-oii0.onrender.com";

const CATEGORY_NAME = "Health & Lifestyle";

const everydayLifeCards = [
  { title: "Eat Well", text: "Build healthy eating habits with balanced, nourishing foods." },
  { title: "Move Your Body", text: "Regular movement, from walking to yoga exercises, supports physical and mental well-being." },
  { title: "Sleep Better", text: "Good sleep and healthy sleep hygiene help your body and mind recover." },
  { title: "Manage Stress", text: "Learning stress management strategies can help you respond to everyday pressures more effectively." },
  { title: "Keep Your Brain Active", text: "Learning, problem-solving, and critical thinking exercises can keep your mind engaged." },
  { title: "Stay Hydrated", text: "Drinking enough water supports everyday energy, concentration, and physical function." },
  { title: "Build Healthy Habits", text: "Small, consistent changes are often easier to maintain than major lifestyle overhauls." },
  { title: "Make Time to Recharge", text: "Rest, relaxation, hobbies, and time with people you enjoy are also part of a healthy lifestyle." },
];

const habitSteps = [
  { title: "Start Small", text: "Choose one simple habit you can realistically repeat, such as taking a daily walk or adding more vegetables to a meal." },
  { title: "Make It Specific", text: "Turn a general goal into a clear action. Instead of \"exercise more,\" try \"walk for 20 minutes after dinner.\"" },
  { title: "Connect It to Your Routine", text: "Attach your new habit to something you already do, such as stretching after waking up or preparing tomorrow's meals after dinner." },
  { title: "Track Your Progress", text: "Keep track of your consistency without expecting perfection. Missing a day doesn't mean you've failed." },
  { title: "Adjust & Keep Going", text: "If a habit isn't working, make it easier or change your approach. Sustainable healthy habits should fit your lifestyle." },
];

const plateCards = [
  { icon: "🥦", title: "Vegetables & Fruits", text: "Include a variety of colourful vegetables and fruits to add fibre, vitamins, minerals, and other nutrients." },
  { icon: "🍳", title: "Protein-Rich Foods", text: "Include foods such as eggs, pulses, beans, dairy, fish, chicken, or other protein sources that fit your diet." },
  { icon: "🌾", title: "Whole Grains & High-Fibre Foods", text: "Choose whole grains and other high-fibre foods more often to support digestion and lasting fullness." },
  { icon: "🥑", title: "Healthy Fats", text: "Include sensible amounts of foods such as nuts, seeds, and healthy oils." },
];

const exerciseFlow = [
  { icon: "🚶", title: "Walk", text: "Walking is a simple way to add more movement to your day and can be adapted to different fitness levels." },
  { icon: "🏋️", title: "Strength", text: "Strength exercises help build and maintain muscle, support bones, and make everyday movements easier." },
  { icon: "🏃", title: "Cardio", text: "Activities such as cycling, swimming, dancing, or brisk walking can improve cardiovascular fitness and increase energy expenditure." },
  { icon: "🧘", title: "Yoga", text: "Yoga exercises combine movement, balance, flexibility, and mindful breathing, making them useful as part of a varied fitness routine." },
  { icon: "🤸", title: "Mobility & Flexibility", text: "Stretching and mobility exercises can help you move comfortably and maintain flexibility as part of an active lifestyle." },
];

const stressCards = [
  { title: "Calm Your Body", text: "Slow breathing, relaxation exercises, yoga, and regular physical activity can help your body shift out of a heightened stress response." },
  { title: "Clear Your Mind", text: "Mindfulness, journaling, taking short breaks, and challenging unhelpful thoughts can help you create mental space during stressful moments." },
  { title: "Manage Your Routine", text: "Good sleep, realistic planning, regular breaks, and setting boundaries can reduce some of the pressures that build up during everyday life." },
  { title: "Stay Connected", text: "Talking with someone you trust can provide emotional support and help you see stressful situations from a different perspective." },
];

const brainHealthFlow = [
  { title: "Move", text: "Regular exercise, including walking, yoga, and strength training, supports overall brain health." },
  { title: "Nourish", text: "A varied diet with vegetables, fruits, whole grains, protein, nuts, and healthy fats provides nutrients that support normal brain function." },
  { title: "Challenge", text: "Reading, learning new skills, solving problems, and critical thinking exercises keep your brain mentally active." },
  { title: "Rest", text: "Quality sleep and good sleep hygiene give your brain time to recover and support memory and concentration." },
];

const routineSteps = [
  { title: "Morning | Start Well", text: "Hydrate, eat a nourishing breakfast, and add some movement to your morning." },
  { title: "Daytime | Stay Active", text: "Choose balanced meals, stay hydrated, move regularly, and take short breaks when needed." },
  { title: "Evening | Slow Down", text: "Give yourself time to unwind, reduce unnecessary stimulation, and practise simple stress management strategies." },
  { title: "Night | Rest & Recover", text: "Follow consistent sleep hygiene habits and give yourself enough time for quality sleep." },
  { title: "Every Week | Check In", text: "Notice what's working, adjust what isn't, and keep building healthy habits at a realistic pace." },
];

const healthLifestyleFaqs = [
  { question: "How Do You Build Healthy Habits?", answer: "Start with one small, realistic change and connect it to an existing routine. Repeat it consistently, track your progress, and adjust when needed. Sustainable healthy habits are built gradually rather than through sudden lifestyle changes." },
  { question: "What Is a Lunge Exercise?", answer: "A lunge is a lower-body exercise where you step forward or backward and bend your knees to lower your body. Lunges work muscles in the legs and hips and can be adapted for different fitness levels." },
  { question: "What Exercise Burns the Most Calories?", answer: "Calorie burn depends on the activity, intensity, duration, body size, and individual factors. Activities such as running, cycling, swimming, and high-intensity exercise can burn significant calories, but there is no single best exercise for everyone." },
  { question: "Can Exercise Lower Blood Pressure?", answer: "Regular physical activity can support healthy blood pressure by improving cardiovascular fitness and overall health. People with high blood pressure or other health concerns should discuss suitable exercise with a healthcare professional." },
  { question: "How Can You Get Better Sleep?", answer: "Start with a regular bedtime and wake-up time, reduce caffeine and screen exposure close to bedtime, keep your bedroom comfortable, and create a relaxing wind-down routine." },
  { question: "What Is Sleep Hygiene?", answer: "Sleep hygiene refers to habits and environmental practices that support healthy, consistent sleep. These include maintaining a regular sleep schedule, creating a comfortable sleep environment, and developing a relaxing bedtime routine." },
  { question: "What Is Sleep Apnea?", answer: "Sleep apnea is a sleep disorder in which breathing repeatedly stops or becomes restricted during sleep. Symptoms can include loud snoring, gasping during sleep, morning headaches, and excessive daytime sleepiness. Persistent symptoms should be discussed with a healthcare professional." },
  { question: "How Do You Manage Stress?", answer: "Stress management involves recognising stress and using healthy strategies to respond to it. Exercise, adequate sleep, relaxation techniques, mindfulness, healthy routines, social connection, and setting boundaries can all help." },
  { question: "What Are the Best Exercises for Brain Health?", answer: "Regular physical activity such as walking, cycling, swimming, strength training, and other aerobic activities can support brain health. Activities you enjoy and can maintain consistently are generally the most practical choice." },
  { question: "What Vitamins Are Good for Brain Health?", answer: "Several vitamins and nutrients are important for normal brain function, including B vitamins and vitamins C, D, and E. However, supplements aren't automatically needed. A balanced diet is usually the best starting point, while deficiencies should be addressed with professional guidance." },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": healthLifestyleFaqs.map((item) => ({
    "@type": "Question",
    "name": item.question,
    "acceptedAnswer": { "@type": "Answer", "text": item.answer },
  })),
};

const FlowRow = ({ items }) => (
  <div className="hl-flow" style={{ "--flow-cols": items.length }}>
    {items.map((item) => (
      <div className="hl-flow-item" key={item.title}>
        {item.icon && <span className="hl-flow-icon">{item.icon}</span>}
        <h3 className="hl-flow-title">{item.title}</h3>
        <p className="hl-flow-text">{item.text}</p>
      </div>
    ))}
  </div>
);

const HealthLifestylePage = () => {
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
      .catch((err) => console.error("Failed to load health & lifestyle articles:", err));
  }, []);

  return (
    <div className="hl-page">
      <Helmet>
        <title>Health & Lifestyle | Healthy Eating, Sleep & Exercise</title>
        <meta
          name="description"
          content="Learn about healthy eating habits, exercise, sleep, stress management, brain health, and simple lifestyle changes for better everyday well-being."
        />
        <link rel="canonical" href="https://mindwork360.com/health-lifestyle" />
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Helmet>

      {/* Hero */}
      <section className="hl-hero">
        <div className="hl-hero-inner">
          <h1 className="hl-h1">Health & Lifestyle</h1>
          <p className="hl-hero-text">
            Your everyday habits can shape how you feel, think, move, and function. From healthy
            eating and regular exercise to better sleep and stress management, small lifestyle
            choices can support your overall health and well-being.
          </p>
        </div>
      </section>

      {/* Health & Lifestyle in Everyday Life */}
      <section className="hl-section">
        <h2 className="hl-section-title">Health & Lifestyle in Everyday Life</h2>
        <p className="hl-section-text">
          Health isn't only about what you do when you're unwell. Everyday choices around food,
          movement, sleep, stress, and healthy habits all contribute to how you feel and function
          over time.
        </p>

        <div className="hl-cards-grid">
          {everydayLifeCards.map((card, idx) => (
            <div className="hl-card" key={card.title}>
              <span className="hl-card-number">{idx + 1}</span>
              <h3 className="hl-card-title">{card.title}</h3>
              <p className="hl-card-text">{card.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How to Build Healthier Habits? */}
      <section className="hl-section">
        <h2 className="hl-section-title">How to Build Healthier Habits?</h2>
        <p className="hl-section-text">
          Healthy habits are easier to maintain when you start small and make them part of your
          regular routine. Instead of trying to change everything at once, focus on one realistic
          behaviour and build from there.
        </p>

        <div className="hl-journey">
          {habitSteps.map((step, idx) => (
            <div className="hl-journey-step" key={step.title}>
              <div className="hl-journey-marker">
                <span className="hl-journey-number">{idx + 1}</span>
              </div>
              <div className="hl-journey-content">
                <h3 className="hl-journey-title">{step.title}</h3>
                <p className="hl-journey-text">{step.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Healthy Eating Habits */}
      <section className="hl-section">
        <h2 className="hl-section-title">Healthy Eating Habits</h2>
        <p className="hl-section-text">
          Healthy eating isn't about following a perfect diet. It's about building healthy food and
          habits that give your body the nutrients and energy it needs while being realistic enough
          to maintain over time.
        </p>

        <div className="hl-plate-wrap">
          <div className="hl-cards-grid hl-cards-grid--2col">
            {plateCards.map((card) => (
              <div className="hl-card" key={card.title}>
                <span className="hl-card-icon">{card.icon}</span>
                <h3 className="hl-card-title">{card.title}</h3>
                <p className="hl-card-text">{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Move More: Exercise for Everyday Health */}
      <section className="hl-section">
        <h2 className="hl-section-title">Move More: Exercise for Everyday Health</h2>
        <p className="hl-section-text">
          Regular physical activity supports your overall health, energy, mood, strength, and
          mobility. You don't need to follow one perfect workout. The best exercise is one that
          suits your goals, abilities, and lifestyle and that you can do consistently.
        </p>

        <FlowRow items={exerciseFlow} />
      </section>

      {/* How Can You Manage Stress? */}
      <section className="hl-section">
        <h2 className="hl-section-title">How Can You Manage Stress?</h2>
        <p className="hl-section-text">
          Stress is a normal response to challenging situations, but ongoing stress can affect your
          mood, sleep, concentration, and overall well-being. Stress management involves finding
          healthy ways to reduce stress and respond to difficult situations more effectively.
        </p>

        <div className="hl-cards-grid">
          {stressCards.map((card, idx) => (
            <div className="hl-card" key={card.title}>
              <span className="hl-card-number">{idx + 1}</span>
              <h3 className="hl-card-title">{card.title}</h3>
              <p className="hl-card-text">{card.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Brain Health */}
      <section className="hl-section">
        <h2 className="hl-section-title">Brain Health: How Can You Keep Your Brain Healthy?</h2>
        <p className="hl-section-text">
          Brain health is influenced by many everyday habits. Regular movement, nutritious food,
          quality sleep, mental stimulation, and effective stress management can all support
          healthy brain function as part of an overall healthy lifestyle.
        </p>

        <FlowRow items={brainHealthFlow} />
      </section>

      {/* Creating Your Personal Health & Lifestyle Routine */}
      <section className="hl-section">
        <h2 className="hl-section-title">Creating Your Personal Health & Lifestyle Routine</h2>
        <p className="hl-section-text">
          A healthy routine doesn't have to be complicated. The goal is to create simple habits
          around food, movement, sleep, and stress management that fit your lifestyle and can be
          maintained over time.
        </p>

        <div className="hl-journey">
          {routineSteps.map((step, idx) => (
            <div className="hl-journey-step" key={step.title}>
              <div className="hl-journey-marker">
                <span className="hl-journey-number">{idx + 1}</span>
              </div>
              <div className="hl-journey-content">
                <h3 className="hl-journey-title">{step.title}</h3>
                <p className="hl-journey-text">{step.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Explore Health & Lifestyle Articles */}
      <section className="hl-section">
        <h2 className="hl-section-title">Explore Health & Lifestyle Articles</h2>
        <p className="hl-section-text">
          Explore practical, evidence-informed articles on healthy eating, exercise, sleep, stress
          management, brain health, and everyday healthy habits.
        </p>

        <div className="hl-articles-grid">
          {articles.map((post) => (
            <div className="post-card2" key={post.id}>
              <div className="post-card2-image-wrapper">
                <img
                  src={post.image}
                  alt={post.title || "Health & lifestyle article"}
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

        <div className="hl-view-all">
          <button
            className="hl-view-all-btn"
            onClick={() => navigate(`/blogs?category=${encodeURIComponent(CATEGORY_NAME)}`)}
          >
            Explore All Health & Lifestyle Articles →
          </button>
        </div>
      </section>

      {/* FAQ */}
      <section className="hl-section hl-faq-section">
        <h2 className="hl-section-title">Frequently Asked Questions on Health & Lifestyle</h2>
        {healthLifestyleFaqs.map((item) => (
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

export default HealthLifestylePage;
