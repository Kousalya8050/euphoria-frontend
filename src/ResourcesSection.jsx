import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './ResourcesSection.css';
import Footer from "./Footer_page";
import neverGiveUp from './assets/resources/never-give-up.png';
import learnToRest from './assets/resources/learn-to-rest.png';
import whenLifeGetsBlurry from './assets/resources/when-life-blurry.png';
import successRevenge from './assets/resources/success-revenge.png';
import contactIllustration from './assets/resources/contact2.jpg';


const ResourcesSection = () => {
  const [popup, setPopup] = useState({
      show: false,
      type: "", // "success" | "error"
      message: ""
    });
   
      const images = [
        { src: neverGiveUp, text: "Never Give Up" },
        { src: learnToRest, text: "Learn to Rest" },
        { src: whenLifeGetsBlurry, text: "When Life Gets Blurry" },
        { src: successRevenge, text: "Success is the Best Revenge" },
      ];

      const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const container = containerRef.current;

    const handleScroll = () => {
      const index = Math.round(container.scrollLeft / container.offsetWidth);
      setActiveIndex(index);
    };

    container.addEventListener("scroll", handleScroll);

    // ✅ Auto-scroll logic
    const autoScroll = setInterval(() => {
      if (!container) return;
      const nextIndex = (activeIndex + 1) % images.length;
      container.scrollTo({
        left: nextIndex * container.offsetWidth,
        behavior: "smooth",
      });
      setActiveIndex(nextIndex);
    }, 3000); // scroll every 3 seconds
    return () => {
      container.removeEventListener("scroll", handleScroll);
      clearInterval(autoScroll);
    };
  }, [activeIndex, images.length]);


  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const API_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:3000"
    : "https://euphoria-backend-oii0.onrender.com";

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!name.trim()) {
      setPopup({
        show: true,
        type: "error",
        message: "Name is required"
      });
      return;
    }
  
    if (!email.trim()) {
      setPopup({
        show: true,
        type: "error",
        message: "Email is required"
      });
      return;
    }
  
   
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setPopup({
        show: true,
        type: "error",
        message: "Please enter a valid email address"
      });
      return;
    }
  
    try {
      const res = await axios.post(`${API_URL}/api/newsletter/subscribe`, {
        name,
        email,
      });
  
      
      setPopup({
        show: true,
        type: "success",
        message: res.data.message || "Subscribed successfully!"
      });
  
      
      setName("");
      setEmail("");
  
    } catch (error) {
      
      setPopup({
        show: true,
        type: "error",
        message: error.response?.data?.message || "Something went wrong. Please try again."
      });
    }
  };
  const navigate = useNavigate();



  useEffect(() => {
    if (popup.show) {
      const timer = setTimeout(() => {
        setPopup({ show: false, type: "", message: "" });
      }, 3000);
  
      return () => clearTimeout(timer);
    }
  }, [popup.show]);
    return (
      <div className="resources-container">
        <h2 className="resources-heading">RESOURCES</h2>
  
        {/* <div className="images-layout">
         
          <div className="img-box never-give-up">
            <div className="bg-square green-bg"></div>
            <img src={neverGiveUp} alt="Never Give Up" />
          </div>
  
          <div className="img-box learn-to-rest">
            <div className="bg-square lightgreen-bg"></div>
            <img src={learnToRest} alt="Learn to Rest" />
          </div>
  
          
          <div className="img-box blurry-focus">
            <div className="bg-square darkgreen-bg"></div>
            <img src={whenLifeGetsBlurry} alt="Blurry Focus" />
          </div>
  
          
          <div className="img-box success-revenge">
            <div className="bg-square lime-bg"></div>
            <img src={successRevenge} alt="Success is the Best Revenge" />
          </div>
        </div> */}
        {/* ✅ Desktop Grid Layout */}
      <div className="images-layout desktop-only_r">
        <div className="img-box never-give-up">
          <div className="bg-square green-bg"></div>
          <img src={neverGiveUp} alt="Never Give Up" />
        </div>

        <div className="img-box learn-to-rest">
          <div className="bg-square lightgreen-bg"></div>
          <img src={learnToRest} alt="Learn to Rest" />
        </div>

        <div className="img-box blurry-focus">
          <div className="bg-square darkgreen-bg"></div>
          <img src={whenLifeGetsBlurry} alt="When Life Gets Blurry" />
        </div>

        <div className="img-box success-revenge">
          <div className="bg-square lime-bg"></div>
          <img src={successRevenge} alt="Success is the Best Revenge" />
        </div>
      </div>

      {/* ✅ Mobile/Tablet Carousel */}
      <div className="mobile-carousel_r">
        <div className="mobile-carousel-container_r" ref={containerRef}>
          {images.map((img, index) => (
            <div className="mobile-carousel-slide_r" key={index}>
              <img
                src={img.src}
                alt={`Slide ${index + 1}`}
                className="mobile-carousel-image_r"
              />
              {/* <div className="mobile-carousel-text">{img.text}</div> */}
            </div>
          ))}
        </div>

        <div className="mobile-carousel-dots_r">
          {images.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === activeIndex ? "active" : ""}`}
            />
          ))}
        </div>
      </div>
      <div className="section-divider"></div>
        {/* Charitable Organizations Section */}
        <div className="charity-section">
        <div className="region-buttons">
            {[
              ...new Set(
                [
                  "Canada",
                  "Ireland",
                  "UK",
                  "India",
                  "Germany",
                  "USA",
                ] 
              ),
            ].map((region) => (
              <button
                key={region}
                className="region-button"
                onClick={() =>
                  document.getElementById(region.replace(/\s+/g, "-")).scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  })
                }
              >
                {region}
              </button>
            ))}
          </div>
          <h3>Charitable Organizations for Mental Health</h3>
          <p>
            Here’s a list of well-known and reputable charitable organizations focused on mental health. These organizations work on advocacy, awareness, support services, and research globally and regionally.
          </p>

          {Object.entries(
            [
              {
                name: "Canadian Mental Health Association",
                region: "Canada",
                focus: "Research, Promoting Mental Health, Supporting Individuals with Mental Illness",
                website: "www.cmha.ca",
                url: "https://cmha.ca/",
              },
              {
                name: "Mental Health Commission of Canada",
                region: "Canada",
                focus: "National Mental Health Strategy, Improved Access to Services, Recovery-Oriented Car, Reducing Stigma and Discrimination",
                website: "www.mentalhealthcommission.ca",
                url: "https://mentalhealthcommission.ca/",
              },
              {
                name: "Youth Mental Health Canada",
                region: "Canada",
                focus: "Youth Engagement, Early Intervention and Prevention, Culturally Sensitive Services, Community-Based Solutions",
                website: "www.ymhc.ngo",
                url: "https://ymhc.ngo/",
              },
              {
                name: "Centre for Addiction and Mental Health",
                region: "Canada",
                focus: "Research, Better Mental Health Care for All",
                website: "www.camh.ca",
                url: "https://www.camh.ca/",
              },
              {
                name: "Alzheimer Society of Canada",
                region: "Canada",
                focus: "Supporting individuals with Alzheimer's disease and other forms of dementia, as well as their caregivers",
                website: "www.alzheimer.ca",
                url: "https://alzheimer.ca/",
              },
              {
                name: "Mental Health Ireland",
                region: "Ireland",
                focus: "Promoting understanding and improving mental health across Ireland",
                website: "www.mentalhealthireland.ie",
                url: "https://www.mentalhealthireland.ie/",
              },
              {
                name: "Pieta House",
                region: "Ireland",
                focus: "Provide free, therapeutic approach to people who are in suicidal distress, engage in self-harm, or bereaved by suicide",
                website: "www.pieta.ie",
                url: "https://www.pieta.ie/",
              },
              {
                name: "Samaritans",
                region: "Ireland",
                focus: "Providing emotional support to individuals struggling with emotional distress, difficult life situations, or suicidal thoughts",
                website: "www.samaritans.org",
                url: "https://www.samaritans.org/samaritans-ireland/",
              },
              {
                name: "Bodywhys",
                region: "Ireland",
                focus: "Voluntary organisation supporting people affected by eating disorders",
                website: "www.bodywhys.ie",
                url: "https://www.bodywhys.ie/",
              },
              {
                name: "AWARE",
                region: "Ireland",
                focus: "Providing support, education, and information services to individuals affected by anxiety, depression, bipolar disorder, and related mood conditions",
                website: "www.aware.ie",
                url: "https://www.aware.ie/",
              },
              {
                name: "Mental Health Foundation",
                region: "UK",
                focus: "Promoting good mental health and addressing mental health issues through research, prevention, and advocacy",
                website: "www.mentalhealth.org.uk",
                url: "https://www.mentalhealth.org.uk/",
              },
              {
                name: "Mental Health UK",
                region: "UK",
                focus: "Raising awareness about mental health issues, promoting well-being, and advocating for better mental health support and services",
                website: "www.mentalhealth-uk.org",
                url: "https://mentalhealth-uk.org/",
              },
              {
                name: "Mind",
                region: "UK",
                focus: "Provide support, campaign for change, and offer workplace training to create mentally healthy environments",
                website: "www.mentalhealth-uk.org",
                url: "https://mentalhealth-uk.org/",
              },
              {
                name: "Rethink Mental Illness",
                region: "UK",
                focus: "Equality, rights, fair treatment, and the maximum quality of life for all those severely affected by mental illness",
                website: "www.rethink.org",
                url: "https://www.rethink.org/",
              },
              {
                name: "YoungMinds",
                region: "UK",
                focus: "Offers information and advice to young people, parents and carers for improving the mental health and well-being",
                website: "www.youngminds.org.uk",
                url: "https://www.youngminds.org.uk/",
              },
              {
                name: "Sangath",
                region: "India",
                focus: "Transforming Mental Health Rooted in Care, Driven by Research, Powered by Community",
                website: "www.sangath.in",
                url: "https://www.sangath.in/",
              },
              {
                name: "The MINDS Foundation",
                region: "India",
                focus: "Eliminating the stigma surrounding mental illness through education, training, and providing access to cost-effective, high-quality care",
                website: "www.mindsfoundation.org",
                url: "https://www.mindsfoundation.org/",
              },
              {
                name: "The Banyan",
                region: "India",
                focus: "Enabling Access To Comprehensive, Integrated, Person-Centred Mental Health Care For Persons Living In Poverty And Homelessness ",
                website: "www.thebanyan.org",
                url: "https://thebanyan.org/",
              },
              {
                name: "AASRA",
                region: "India",
                focus: "Suicide prevention and emotional support through crisis intervention",
                website: "www.aasra.info",
                url: "https://www.aasra.info/",
              },
              {
                name: "Mindroot Foundation",
                region: "India",
                focus: "Combating mental health and substance use disorders through awareness campaigns and educational programs",
                website: "www.mindroot.org",
                url: "https://www.mindroot.org/",
              },
              {
                name: "Irrsinnig Menschlich",
                region: "Germany",
                focus: "Raise awareness and end public and structural discrimination",
                website: "www.sangath.in",
                url: "https://www.sangath.in/",
              },
              {
                name: "Caritas",
                region: "Germany",
                focus: "Promoting social solidarity and cohesion, particularly for vulnerable populations, through initiatives and campaigns",
                website: "www.irrsinnig-menschlich.de",
                url: "https://www.irrsinnig-menschlich.de/en/",
              },
              {
                name: "Deutsche Depressionshilfe",
                region: "Germany",
                focus: "Dedicated to research and raising awareness about depression, providing information and support to individuals",
                website: "www.deutsche-depressionshilfe.de",
                url: "https://www.deutsche-depressionshilfe.de/",
              },
              {
                name: "DGPPN",
                region: "Germany",
                focus: "Setting standards for mental health care and promoting research",
                website: "www.dgppn.de",
                url: "https://www.dgppn.de/",
              },
              {
                name: "The German Center for Mental Health",
                region: "Germany",
                focus: "Improving mental healthcare through collaborative research, prevention, and early intervention",
                website: "www.dzpg.org",
                url: "https://www.dzpg.org/en/",
              },
              ,
              {
                name: "Irrsinnig Menschlich",
                region: "Germany",
                focus: "Raise awareness and end public and structural discrimination",
                website: "www.sangath.in",
                url: "https://www.sangath.in/",
              },
              {
                name: "American Psychological Association",
                region: "USA",
                focus: "One of the largest psychology organizations globally. Focus on: research, clinical practice, education, policy",
                website: "www.apa.org",
                url: "https://www.apa.org/",
              },
              {
                name: "American Academy of Child & Adolescent Psychiatry",
                region: "USA",
                focus: "Promoting the healthy development of children, adolescents, and families through research, advocacy, training, and evidence-based clinical care",
                website: "www.aacap.org",
                url: "https://www.aacap.org/",
              },
              {
                name: "American Psychiatric Association",
                region: "USA",
                focus: "Focuses on advancing high-quality psychiatric care, research, and education",
                website: "www.psychiatry.org",
                url: "https://www.psychiatry.org/",
              },
              {
                name: "National Institute of Mental Health",
                region: "USA",
                focus: "Focuses on transforming the understanding and treatment of mental illnesses through basic and clinical research, aiming to prevent, cure, and improve public health",
                website: "www.nimh.nih.gov",
                url: "https://www.nimh.nih.gov/",
              },
              {
                name: "Substance Abuse and Mental Health Services Administration",
                region: "USA",
                focus: "Focuses on preventing substance use and overdoses, improving mental health and suicide prevention access, promoting youth/family resilience, integrating behavioral and physical healthcare, and strengthening the behavioral health workforce",
                website: "www.samhsa.gov",
                url: "https://www.samhsa.gov/",
              },
              {
                name: "Swiss Society of Psychiatry and Psychotherapy",
                region: "Switzerland",
                focus: "Advancing psychiatric excellence through professional training, high clinical standards, and research in Switzerland",
                website: "www.so-psy.ch",
                url: "https://so-psy.ch/en/",
              },
              {
                name: "Swiss Conference for Academic Psychiatry",
                region: "Switzerland",
                focus: "Promoting academic careers in psychiatry, facilitating scientific exchange, and enhancing the visibility of psychiatric research and teaching at Swiss universities",
                website: "www.scapsy.ch",
                url: "https://scapsy.ch/",
              },
              {
                name: "Swiss Psychological Society",
                region: "Switzerland",
                focus: "Focuses on high-quality academic research, education, and professional development",
                website: "www.swisspsychologicalsociety.ch",
                url: "https://www.swisspsychologicalsociety.ch/",
              },
              {
                name: "Federation of Swiss Psychologists",
                region: "Switzerland",
                focus: "Ensuring high professional standards, promoting evidence-based practice",
                website: "www.psychologie.ch",
                url: "https://www.psychologie.ch/en",
              },
              {
                name: "The Mental Health Association Switzerland",
                region: "Switzerland",
                focus: "Community-driven prevention movement dedicated to building a mentally fit future through early intervention and awareness",
                website: "www.thementalhealthassociation.com",
                url: "https://www.thementalhealthassociation.com/",
              },
              {
                name: "Australian Psychological Society",
                region: "Australia",
                focus: "Focus on promoting community wellbeing, advancing ethical standards, and advocating for the profession",
                website: "www.psychology.org.au",
                url: "https://psychology.org.au/",
              },
              {
                name: "Royal Australian and New Zealand College of Psychiatrists",
                region: "Australia",
                focus: "Training psychiatrists, setting professional standards, and influencing mental health policy to ensure high-quality care in Australia and New Zealand",
                website: "www.ranzcp.org",
                url: "https://www.ranzcp.org/",
              },
              {
                name: "Psychotherapy and Counselling Federation of Australia",
                region: "Australia",
                focus: "Focuses on regulating, supporting, and promoting the counselling and psychotherapy profession in Australia",
                website: "www.pacfa.org.au",
                url: "https://www.pacfa.org.au/",
              },
              {
                name: "SANE Australia",
                region: "Australia",
                focus: "Focuses on reducing stigma, providing peer-supported services, and offering resources for individuals, families, and professionals",
                website: "www.sane.org",
                url: "https://www.sane.org/",
              }
            
            ].reduce((groups, org) => {
              if (!groups[org.region]) groups[org.region] = [];
              groups[org.region].push(org);
              return groups;
            }, {})
          ).map(([region, orgs]) => (
            <div key={region} className="region-section" id={region.replace(/\s+/g, "-")}>
              <h2 className="region-heading">{region}</h2>
              {orgs.map((org, index) => (
                <div className="charity-box" key={index}>
                  <p>
                    <strong>{org.name}</strong>
                  </p>
                  <p>Focus: {org.focus}</p>
                  <p>
                    Website:{" "}
                    <a href={org.url} target="_blank" rel="noreferrer">
                      {org.website}
                    </a>
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>
        {/* Newsletter Section */}
        <div className="newsletter-section_r">
        <div className="newsletter-left_r">
            <h3>Ideas to Help You Learn, Heal and Grow</h3>
            <p>
            Get weekly insights for better relationships, deeper self-knowledge, and inner calm.
            Sign up for inspiration, plus 10% off your first shop order.
            By signing up, you agree to receive email marketing material from The School of Life.
            You can unsubscribe at any time. For more details, please refer to our Privacy Policy.
            </p>
        </div>
        <div className="newsletter-form_r">
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input 
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />

        <label>Email</label>
        <input 
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />

        <button type="submit">Submit</button>
      </form>
    </div>
        </div>
        {popup.show && (
          <div
            className="popup-overlay"
            onClick={() => setPopup({ show: false, type: "", message: "" })}
          >
            <div
              className={`popup ${popup.type}`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="icon-wrapper">
                {popup.type === "success" ? (
                  <svg className="success-icon" viewBox="0 0 52 52">
                    <circle className="success-circle" cx="26" cy="26" r="25" />
                    <path className="success-check" d="M14 27l7 7 17-17" />
                  </svg>
                ) : (
                  <svg className="error-icon" viewBox="0 0 52 52">
                    <circle className="error-circle" cx="26" cy="26" r="25" />
                    <path className="error-cross" d="M16 16 36 36 M36 16 16 36" />
                  </svg>
                )}
              </div>

              <p className="popup-message">{popup.message}</p>
            </div>
          </div>
        )}



        <div className="contact-section_r">
        <div className="contact-left_r">
          <h4 className="contact-title">CONTACT</h4>
          <h3>No matter the challenge, we're by your side in more ways than one</h3>
          <p>
            We’re committed to helping people find fulfilment all over the world. As well as a complete online affiliate store,
            we also have international schools & flagship stores (see below). Each of these branches of The School of Life offer
            people and businesses around the world the chance to find fulfilment in person.
          </p>
          <p className="contact-note">
            <strong>Struggling with depression? You’re not alone.</strong><br />
            <span className="green-link">Browse our directory and connect with a therapist who’s right for you.</span>
          </p>
          <button className="connect-button" onClick={() => navigate("/contactus")} >Connect with Us</button>
        </div>
        <div className="contact-right_r">
          <img src={contactIllustration} alt="Contact Illustration" />
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
                  <Footer />


      </div>
    );
  };
  
  export default ResourcesSection;
