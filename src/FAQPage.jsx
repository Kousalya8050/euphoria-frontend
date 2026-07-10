import React, { useState } from "react";
import { Helmet } from 'react-helmet-async';
import './FAQPage.css';
import './Disclaimer.css';
import faqBanner from './assets/faq/photo-woman-with-sad-happy-paper-faces.png';
import ellipse1 from './assets/faq/ellipse1.svg';
import ellipse2 from './assets/faq/ellipse2.svg';
import ellipse3 from './assets/faq/ellipse3.svg';

import Footer from "./Footer_page";


const ITEMS_PER_PAGE = 10;

const allQuestions = [
  {
    question: 'Q1. What is the purpose of this website?',
    answer: 'MindWork360 provides educational mental health content, expert insights, practical wellness resources, and videos designed to help people better understand mental health and emotional well-being. Our content is also focused on helping our community live high performing personal and professional lives, achieving their goals, stay healthy and live through fulfillment in the best sense.',
  },
  {
    question: 'Q2. Is the information on MindWork360 a substitute for professional medical advice?',
    answer: 'No. The content on this website is for educational and informational purposes only. It should not replace professional medical, psychological, or psychiatric advice, diagnosis, or treatment.',
  },
  {
    question: 'Q3. Who creates the content and videos?',
    answer: 'Our content is created and reviewed by mental health professionals, subject matter experts, researchers, and experienced content creators committed to providing accurate and helpful information for our community. Professionals in these areas are welcome to partner with us to showcase their content and research. Please submit a query on our online form found on the Contact Us page of your website.',
  },
  {
    question: 'Q4. Are the videos free to watch?',
    answer: 'Most of our educational videos are available free of charge. Some premium content, courses, or specialized resources may require registration or a subscription.',
  },
  {
    question: 'Q5. How can mental health education help me?',
    answer: 'Mental health education can help you better understand emotions, recognize common mental health challenges, develop coping skills, reduce stigma, and make informed decisions about seeking support.',
  },
  {
    question: 'Q6. Can I use this website if I have a diagnosed mental health condition?',
    answer: 'Yes. Many people with diagnosed mental health conditions find educational resources helpful. However, these resources should complement—not replace—the guidance of your mental healthcare provider.',
  },
  {
    question: 'Q7. Is my personal information kept confidential?',
    answer: 'We take privacy seriously and follow applicable privacy and data protection practices. Please review our Privacy Policy to learn how your information is collected, stored, and used.',
  },
  {
    question: 'Q8. Do I need to create an account to access content?',
    answer: 'Many resources can be accessed without creating an account. However, some features, personalized recommendations, or premium content may require registration.',
  },
  {
    question: 'Q9. How often is new content added?',
    answer: 'We regularly update the website with new articles, videos, expert interviews, and mental health and wellness resources to ensure our content remains relevant, informative and up to date.',
  },
  {
    question: 'Q10. What mental health topics do you cover?',
    answer: 'We cover a wide range of topics, including stress management, anxiety, depression, self-care, mindfulness, health, emotional resilience, relationships & marriage, workplace well-being, and personal growth.',
  },
  {
    question: 'Q11. What should I do if I am experiencing a mental health crisis?',
    answer: 'If you believe you may be in immediate danger or are having thoughts of harming yourself or others, contact emergency services, a crisis helpline, or a qualified mental health professional immediately. You can find some non-profit resources on our website if you reside in certain countries.',
  },
  {
    question: 'Q12. How do I know if I should seek professional help?',
    answer: 'If emotional, behavioral, or mental health concerns are affecting your daily life, relationships, work, or overall well-being, consider consulting a licensed mental health professional for support.',
  },
  {
    question: 'Q13. Are the videos suitable for teenagers?',
    answer: 'Many of our videos are appropriate for teenagers, but some content may be intended for adults. We recommend reviewing content descriptions and consulting parents or guardians when appropriate.',
  },
  {
    question: 'Q14. Can I share your videos and articles with others?',
    answer: 'You may share links to our publicly available content. Reproducing, modifying, or redistributing content is restricted and will require our permission. Please review our Terms of Use for details. All of our content is subject to copyright laws.',
  },
  {
    question: 'Q15. Do you offer online counseling or therapy services?',
    answer: 'Unless specifically stated, this website provides educational content only and does not offer therapy, counseling, or clinical treatment services. We may offer these services in the future.',
  },
  {
    question: 'Q16. How can I stay updated on new content?',
    answer: 'You can subscribe to our newsletter, follow our social media channels, or create an account to receive updates about new videos, articles, and resources.',
  },
  {
    question: 'Q17. Can I suggest topics for future videos or articles?',
    answer: 'Yes. We welcome suggestions from our community and encourage users to submit ideas for topics they would like us to cover. Please submit your requests on our Contact Us form on the MindWork360 website.',
  },
  {
    question: 'Q18. Are mental health challenges common?',
    answer: 'Yes. Mental health challenges affect people of all ages, backgrounds, and cultures. Seeking information and support is a positive step toward maintaining overall well-being.',
  },
  {
    question: 'Q19. Do you provide resources for family members and caregivers?',
    answer: 'Yes. We offer content designed to help family members, caregivers, and loved ones better understand mental health and learn supportive communication and care strategies.',
  },
  {
    question: 'Q20. How can I contact your team?',
    answer: 'You can reach us through our Contact Us page or by using the contact information provided on the website. We aim to respond to inquiries as promptly as possible.',
  },
];

const FAQPage = () => {


  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(allQuestions.length / ITEMS_PER_PAGE);

  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = allQuestions.slice(startIdx, startIdx + ITEMS_PER_PAGE);

  return (
    
    <div className="faq-container">
      <Helmet>
        <title>MindWork360 FAQ | Help Center, Support & Common Questions</title>
        <meta name="description" content="Explore the MindWork360 FAQ page for quick answers about platform features, user accounts, subscriptions, technical issues, and customer support." />
      </Helmet>

        <div className="faq-banner-outer-wrapper"> {/* NEW WRAPPER */}
  <div className="faq-banner-title-section"> {/* NEW SECTION for heading/underline */}
    <h2 className="faq-banner-heading">Frequently Asked Questions</h2>
    <div className="faq-underline"></div>
  </div>

  <div className="faq-banner-image-section"> {/* NEW SECTION for image/ellipses */}
    <img src={faqBanner} alt="FAQ Banner" title="Frequently Asked Questions — MindWork360" className="faq-banner-image" />

    {/* Ellipse Images (These can stay, their CSS will handle visibility) */}
    <img src={ellipse3} alt="" title="" className="ellipse-img1 ellipse1" />
    <img src={ellipse1} alt="" title="" className="ellipse-img2 ellipse3" />
    <img src={ellipse2} alt="" title="" className="ellipse-img3 ellipse2" />
  </div>
</div>
      

      {currentItems.map((item, idx) => (
        <div className="faq-item" key={idx}>
          <p className="faq-question">{item.question}</p>
          <p className="faq-answer">{item.answer}</p>
        </div>
      ))}

      <div className="faq-pagination">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            className={`faqpage-button ${currentPage === i + 1 ? 'active' : ''}`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        {currentPage < totalPages && (
          <button className="faqpage-button next" onClick={() => setCurrentPage(currentPage + 1)}>
            Next
          </button>
        )}
      </div>
      {/* --- FOOTER SECTION --- */}
            {/* <footer className="euphoria-footer">
            <div
              className="euphoria-footer-wave-bg"
              style={{ backgroundImage: `url(${footerWaveImage})` }}
            >
              <div className="euphoria-footer-content">
                <div className="euphoria-footer-logo">
                  Euphoria
                </div>
      
                <div className="euphoria-nav-and-socials-container">
                  <nav className="euphoria-footer-nav">
                    {navLinks.map((link) => (
                      <a
                        key={link.name}
                        href={link.path}
                        style={{ marginLeft: link.marginLeft }}
                      >
                        {link.name}
                      </a>
                    ))}
                  </nav>
      
                  <div className="euphoria-footer-socials">
                    {socialLinks.map((social) => (
                      <a key={social.name} href={social.path} target="_blank" rel="noopener noreferrer" aria-label={social.name}>
                        <img src={social.icon} alt={social.name} title={social.name} />
                      </a>
                    ))}
                  </div>
                  </div>
              </div>
            </div>
           
          </footer> */}
          <div className="disclaimer-section">
            <h2 className="disclaimer-heading">Disclaimer</h2>
            <p className="disclaimer-text">
              MindWork360 is a community and educational platform and does not provide medical advice,
              diagnosis, or emergency services. If you're in immediate danger or think you may harm
              yourself or someone else, please contact your local mental health emergency number right
              now or reach out to a crisis hotline in your country of residence. You can find such
              resources on our website at <a href="https://www.mindwork360.com" target="_blank" rel="noopener noreferrer">www.mindwork360.com</a>
            </p>
          </div>
          <Footer />
    </div>
  );
};

export default FAQPage;
