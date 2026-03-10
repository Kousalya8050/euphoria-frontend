import React, { useState } from 'react';
import './FAQPage.css';
import faqBanner from './assets/faq/photo-woman-with-sad-happy-paper-faces.png';
import ellipse1 from './assets/faq/ellipse1.svg';
import ellipse2 from './assets/faq/ellipse2.svg';
import ellipse3 from './assets/faq/ellipse3.svg';
import rightWave from './assets/homepage/wave-middle-right.png';
import footerWaveImage from './assets/homepage/footer.png'; // Your main wave background
import Footer from "./Footer_page";

const navLinks = [
  { name: 'Home', path: '#', marginLeft: '0px' },
  { name: 'About Us', path: '#', marginLeft: '44px' }, // Example value
  { name: 'Academic', path: '#', marginLeft: '113px' }, // Example value
  { name: 'Casual', path: '#', marginLeft: '187px' }, // Example value
  { name: 'Blog', path: '#', marginLeft: '238px' },   // Example value
  { name: 'Video Lessons', path: '#', marginLeft: '268px' }, // Example value
];

// IMPORTANT: Replace placeholder icon paths with your actual icon image files.
// These should ideally be white icons, possibly within a light circle as suggested by the image.
const socialLinks = [
  { name: 'Email', icon: 'path/to/envelope-icon.svg', path: 'mailto:info@example.com' },
  { name: 'Twitter', icon: 'path/to/x-icon.svg', path: '#' },
  { name: 'LinkedIn', icon: 'path/to/linkedin-icon.svg', path: '#' },
  { name: 'WhatsApp', icon: 'path/to/whatsapp-icon.svg', path: '#' },
  { name: 'Info', icon: 'path/to/info-icon.svg', path: '#' }, // Or Instagram, etc.
];
const ITEMS_PER_PAGE = 10;

const allQuestions = [
  {
    question: 'Q1. What is React?',
    answer: 'React is a JavaScript library for building user interfaces.',
  },
  {
    question: 'Q2. What is a component in React?',
    answer: 'A component is a reusable piece of UI that can have its own state and props.',
  },
  {
    question: 'Q3. What is JSX?',
    answer: 'JSX stands for JavaScript XML. It allows us to write HTML in React.',
  },
  {
    question: 'Q4. What are props in React?',
    answer: 'Props are inputs passed to components to configure them.',
  },
  {
    question: 'Q5. What is state in React?',
    answer: 'State is a built-in object that stores property values that belong to the component.',
  },
  {
    question: 'Q6. What is useState?',
    answer: 'useState is a React Hook that lets you add state to functional components.',
  },
  {
    question: 'Q7. What is useEffect?',
    answer: 'useEffect is a Hook that runs side effects in function components.',
  },
  {
    question: 'Q8. How do you pass data between components?',
    answer: 'You pass data using props from parent to child.',
  },
  {
    question: 'Q9. What is conditional rendering?',
    answer: 'Conditional rendering allows you to render different UI based on conditions.',
  },
  {
    question: 'Q10. What is React Router?',
    answer: 'React Router is a library for routing in React applications.',
  },

  // Page 2
  {
    question: 'Q11. What is a key in React lists?',
    answer: 'A key is a special string attribute needed to keep track of list items.',
  },
  {
    question: 'Q12. What is a fragment in React?',
    answer: 'A fragment lets you group elements without adding extra nodes to the DOM.',
  },
  {
    question: 'Q13. What is context in React?',
    answer: 'Context provides a way to pass data through the component tree without passing props manually.',
  },
  {
    question: 'Q14. What are controlled components?',
    answer: 'Components that are controlled by React state are called controlled components.',
  },
  {
    question: 'Q15. What is memoization in React?',
    answer: 'Memoization is an optimization to avoid unnecessary re-renders.',
  },
  {
    question: 'Q16. What is lazy loading?',
    answer: 'Lazy loading lets you load components only when they are needed.',
  },
  {
    question: 'Q17. What is Redux?',
    answer: 'Redux is a state management library often used with React.',
  },
  {
    question: 'Q18. What is a reducer function?',
    answer: 'A reducer is a function that determines changes to an application’s state.',
  },
  {
    question: 'Q19. What is the virtual DOM?',
    answer: 'The virtual DOM is a programming concept where a virtual representation of the UI is kept in memory.',
  },
  {
    question: 'Q20. What is hydration in React?',
    answer: 'Hydration is the process of React attaching event handlers to server-rendered HTML.',
  },

  // Page 3 (dummy extras)
  {
    question: 'Q21. Dummy Question 21?',
    answer: 'This is dummy answer for question 21.',
  },
  {
    question: 'Q22. Dummy Question 22?',
    answer: 'This is dummy answer for question 22.',
  },
  {
    question: 'Q23. Dummy Question 23?',
    answer: 'This is dummy answer for question 23.',
  },
  {
    question: 'Q24. Dummy Question 24?',
    answer: 'This is dummy answer for question 24.',
  },
  {
    question: 'Q25. Dummy Question 25?',
    answer: 'This is dummy answer for question 25.',
  }
];

const FAQPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(allQuestions.length / ITEMS_PER_PAGE);

  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = allQuestions.slice(startIdx, startIdx + ITEMS_PER_PAGE);

  return (
    
    <div className="faq-container">
        
        <div className="faq-banner-outer-wrapper"> {/* NEW WRAPPER */}
  <div className="faq-banner-title-section"> {/* NEW SECTION for heading/underline */}
    <h2 className="faq-banner-heading">Frequently Asked Questions</h2>
    <div className="faq-underline"></div>
  </div>

  <div className="faq-banner-image-section"> {/* NEW SECTION for image/ellipses */}
    <img src={faqBanner} alt="FAQ Banner" className="faq-banner-image" />

    {/* Ellipse Images (These can stay, their CSS will handle visibility) */}
    <img src={ellipse3} alt="ellipse" className="ellipse-img1 ellipse1" />
    <img src={ellipse1} alt="ellipse" className="ellipse-img2 ellipse3" />
    <img src={ellipse2} alt="ellipse" className="ellipse-img3 ellipse2" />
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
                        <img src={social.icon} alt={social.name} />
                      </a>
                    ))}
                  </div>
                  </div>
              </div>
            </div>
           
          </footer> */}
          <Footer />
    </div>
  );
};

export default FAQPage;
