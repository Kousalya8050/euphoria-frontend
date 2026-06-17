import { useEffect} from "react";
import './AboutUsPage.css';
import './Disclaimer.css';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import Footer from "./Footer_page";

import "swiper/css/autoplay";

// Import decorative assets
import aboutUsBanner from './assets/aboutuspage/aboutUsBanner.png'; 


// Import all 15 grid images
import gridImg1 from './assets/aboutuspage/gridImg101.png';
import gridImg2 from './assets/aboutuspage/gridImg20.png';
import gridImg3 from './assets/aboutuspage/gridImg301.png';
import gridImg4 from './assets/aboutuspage/gridImg40.png';
import gridImg5 from './assets/aboutuspage/gridImg501.png';
import gridImg6 from './assets/aboutuspage/gridImg60.png';
import gridImg7 from './assets/aboutuspage/gridImg70.png';
import gridImg8 from './assets/aboutuspage/gridImg801.png';
import gridImg9 from './assets/aboutuspage/gridImg901.png';
import gridImg10 from './assets/aboutuspage/gridImg1000.png';
import gridImg11 from './assets/aboutuspage/gridImg1100.png';
import gridImg12 from './assets/aboutuspage/gridImg1200.png';
import gridImg13 from './assets/aboutuspage/gridImg1300.png';
import gridImg14 from './assets/aboutuspage/gridImg1400.png';
import gridImg15 from './assets/aboutuspage/gridImg1500.png';
import infoImage1 from './assets/aboutuspage/infoImage1.png'; // Woman with emoji cards
import infoImage2 from './assets/aboutuspage/infoImage2.png'; // Meditating silhouette


const AboutUsPage = () => {
  useEffect(() => {
    document.title = "About Us | Euphoria";
  }, []);
  // Array to make mapping over grid images easier
  const collageImages = [
    gridImg1, gridImg2, gridImg3, gridImg4, gridImg5,
    gridImg6, gridImg7, gridImg8, gridImg9, gridImg10,
    gridImg11, gridImg12, gridImg13, gridImg14, gridImg15
  ];
  const paragraphText = `We’re committed to keeping MindWork360 supportive, respectful, and constructive. That means we encourage empathy, privacy, and thoughtful discussion—and we prioritize content that helps people move forward (not feel judged, dismissed, or overwhelmed). If you’re sharing, you’ll be met with compassion. If you’re looking for ideas, you’ll find tools and perspectives. And if you’re not ready to post, you’re welcome to simply read and learn at your own pace.
  
  
  MindWork360 is for anyone who wants to improve well-being and performance in a healthy way—whether you’re dealing with a specific mental health challenge, trying to build better habits, seeking stronger relationships, or working toward personal or professional growth.
  `;
  const paragraphText1 = `Over time, we also plan to add access to therapists who may be able to help with mental health concerns, psychotherapy, and improving human performance and relationships, so members can more easily find additional support when they want it. MindWork360 is a community and educational platform and does not provide medical advice, diagnosis, or emergency services. If you’re in immediate danger or think you may harm yourself or someone else, please contact your local emergency number right now or reach out to a crisis hotline in your country.`;

  
  // IMPORTANT: Replace placeholder icon paths with your actual icon image files.
  // These should ideally be white icons, possibly within a light circle as suggested by the image.

  

  return (
    <div className="about-us-page-container">

      

      <main className="about-us-content">
        <img src={aboutUsBanner} alt="Team holding emoji faces" className="about-us-banner-image" />

        <div className="about-us-text-section">
          <h3 className="about-us-subtitle">About Us</h3>
          <h1 className="about-us-title"> A Place To Have Fun, Learn and Heal</h1>
          <p className="about-us-paragraph">
          MindWork360 is a community built for people who want to better understand their mental health, strengthen their relationships, and improve how they show up in everyday life. We believe meaningful change happens when support is practical, honest, and grounded in both lived experience and credible information—so you can take the next step with more clarity and less isolation.
          </p>
        </div>

        {/* <div className="collage-background">
      <div className="collage-container">
        {collageImages.map((image, index) => (
          <div key={index} className={`collage-image-wrapper image-${index + 1}`}>
            <img src={image} alt={`Collage item ${index + 1}`} />
          </div>
        ))}
      </div>
    </div> */}
    <div className="collage-background">
  {/* ✅ Desktop Grid */}
  <div className="collage-container desktop-collage">
    {collageImages.map((image, index) => (
      <div key={index} className={`collage-image-wrapper image-${index + 1}`}>
        <img src={image} alt={`Collage item ${index + 1}`} />
      </div>
    ))}
  </div>

  {/* ✅ Mobile/Tablet Carousel */}
  <div className="collage-carousel">
  {/* <Swiper
    modules={[Autoplay, FreeMode]}
    spaceBetween={12}            // small gap
    slidesPerView={'auto'}      // auto so CSS width controls slide size
    freeMode={true}             // allows smooth drag + momentum
    loop={true}
    autoplay={{
      delay: 1000,
      disableOnInteraction: false,
    }}
    grabCursor={true}           // shows grab cursor
    centeredSlides={false}
    speed={2500}
  >
    {collageImages.map((image, index) => (
      <SwiperSlide key={index} className="collage-swiper-slide">
        <div className="collage-carousel-slide">
          <img
            src={image}
            alt={`Collage item ${index + 1}`}
            className="collage-carousel-image"
          />
        </div>
      </SwiperSlide>
    ))}
  </Swiper> */}
  <Swiper
  modules={[Autoplay]}
  spaceBetween={12}
  slidesPerView={"auto"}
  autoplay={{
    delay: 1800,
    disableOnInteraction: false,
  }}
  grabCursor={true}
  speed={1200}
  loop={false}
  simulateTouch={true}
  allowTouchMove={true}          // ✅ ensures mouse & touch drag
  touchStartPreventDefault={false}
  cssMode={false}                // ✅ important: cssMode disables grab
  watchSlidesProgress={true}
>
  {collageImages.map((image, index) => (
    <SwiperSlide key={index} className="collage-swiper-slide">
      <div className="collage-carousel-slide">
        <img
          src={image}
          alt={`Collage item ${index + 1}`}
          className="collage-carousel-image"
        />
      </div>
    </SwiperSlide>
  ))}
</Swiper>
</div>
</div>
    <div className="about-us-text-section">
          <p className="about-us-paragraph">
          At MindWork360, you’ll find multiple ways to engage depending on what you need today. Our forums are a place to ask questions, share wins and setbacks, and connect with others who “get it.” Our blogs offer approachable, real-world guidance you can actually use—whether you’re managing stress, navigating anxiety, recovering from burnout, or working on communication and connection. We also share research papers and summaries to help bridge the gap between clinical concepts and daily life, along with curated links to trusted resources so you can explore further with confidence.
          </p>
        </div>
        {/* --- NEW ALTERNATING INFO SECTIONS --- */}
        <div className="info-sections-container">
          {/* Section 1: Text Left, Image Right */}
          <div className="info-section">
            <div className="info-text-block">
              <p className="about-us-paragraph">{paragraphText}</p>
            </div>
            <div className="info-image-block">
              <img src={infoImage1} alt="Woman expressing emotions with cards" />
            </div>
          </div>

          {/* Section 2: Image Left, Text Right */}
          <div className="info-section info-section--reverse">
            <div className="info-text-block">
              <p className="about-us-paragraph">{paragraphText1}</p>
            </div>
            <div className="info-image-block">
              <img
                src={infoImage2}
                alt="Silhouette of a person meditating at sunset"
              />
            </div>
          </div>
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
    
      </main>
      
    
    </div>
  );
};

export default AboutUsPage;