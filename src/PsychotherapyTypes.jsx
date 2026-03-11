import axios from "axios";
import React, { useEffect, useState } from "react";

import './PsychotherapyTypes.css';
import Footer from "./Footer_page";
import introImagePsycho from './assets/psychotherapy/creative-minds-office-collaboration.png';
import psychodynamicImg from './assets/psychotherapy/woman-lying-couch-therapy-session.png';
import Ellipse1 from './assets/psychotherapy/Ellipse1.svg';
import Ellipse2 from './assets/psychotherapy/Ellipse2.svg';
import Ellipse3 from './assets/psychotherapy/Ellipse3.svg';

import circleImage from './assets/psychotherapy/caucasian-teenage-girl.png';
import behavioralImg from './assets/psychotherapy/children-psyhology-concept-session-psychologist-treatment.png';
import cognitiveImg from './assets/psychotherapy/visuals-psychiatric-therapy-counseling-sessions.png';
import humanisticImg from './assets/psychotherapy/back-view-female-therapist-holding-clipboard.png';
import holisticImg from './assets/psychotherapy/energy-healing-session-alternative-therapy-energy-work.png';
import familyImg from './assets/psychotherapy/psychologist-explaining-situation-family-session.png'
import otherImg from './assets/psychotherapy/childs-painting-selective-focus-professional-female-psychologist-holding-childs-painting.png'
import Icon1 from './assets/psychotherapy/icon1.svg';
import Icon2 from './assets/psychotherapy/icon2.svg';
import Icon3 from './assets/psychotherapy/icon3.svg';
import Icon4 from './assets/psychotherapy/icon4.svg';
import Icon5 from './assets/psychotherapy/icon5.svg';
import Icon6 from './assets/psychotherapy/icon6.svg';

// import Vector1 from './assets/psychotherapy/Vector1.svg';
// import Vector2 from './assets/psychotherapy/Vector2.svg';
// import Vector3 from './assets/psychotherapy/Vector3.svg';
// import Vector4 from './assets/psychotherapy/Vector4.svg';
// import Vector5 from './assets/psychotherapy/Vector5.svg';
// import Vector6 from './assets/psychotherapy/Vector6.svg';
// import Vector7 from './assets/psychotherapy/Vector7.svg';
// import Vector8 from './assets/psychotherapy/Vector8.svg';
// import Vector9 from './assets/psychotherapy/Vector9.svg';
// import Vector12 from './assets/psychotherapy/Vector12.svg';



const PsychotherapyTypes = () => {

  const [popup, setPopup] = useState({
        show: false,
        type: "", // "success" | "error"
        message: ""
      });
      

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

useEffect(() => {
    if (popup.show) {
      const timer = setTimeout(() => {
        setPopup({ show: false, type: "", message: "" });
      }, 3000);
  
      return () => clearTimeout(timer);
    }
  }, [popup.show]);


  return (
    <>
    <div className="therapy-container">
    <h3 className="psy_heading_h3">Psychotherapy Types</h3>
      {/* Intro Section */}
      <div className="psy-intro-section">
        <div className="psy-intro-left">
          <div className="psy-intro-bg-box"></div>
          <img src={introImagePsycho} alt="Psychotherapy Intro" className="psy-intro-img" />
        </div>
        <div className="psy-intro-right">
          <h3 className="psy-intro-title">WHAT IS PSYCHOTHERAPY?</h3>
          <p className="psy-intro-paragraph">
          Online psychotherapy at The School of Life is a truly global service which assists clients from over 40 countries. Our highly skilled and qualified practitioners help you get to the root of issues and will give you new clarity on your past and your present.
          </p>
          <p className="psy-intro-paragraph">
          Our online psychotherapists use the ideas of The School of Life – found in our YouTube films and books – to work with you to unpack your story and offer you a chance to spend concentrated time on yourself, deepening insight into whatever feels most urgent. The journey is always creative, with the therapist actively listening and proposing ideas, perspectives, and challenges with sensitivity and insight.
          </p>
          {/* <button className="psy-read-more">Read More</button> */}
        </div>
      </div>

      <h2 className="psy-main-heading">Types of Psychotherapy</h2>

      <div className="therapy-type-section">
        {/* Section 1: Content Left, Image Right with Circle */}
        <div className="therapy-type-block">
          <div className="therapy-text">
            <h4>Psychodynamic Therapy</h4>
            <ul>
              <li><strong >Psychodynamic Therapy</strong>: Explores unconscious thoughts and early life experiences.</li>
              <li><strong>Brief Psychodynamic Therapy</strong>: A shorter, focused version of psychodynamic therapy.</li>
            </ul>
          </div>
          <div className="therapy-image-wrapper">
            <img src={psychodynamicImg} alt="Psychodynamic Therapy" className="therapy-img" />
            <img src={circleImage} alt="Circle graphic" className="circle-image" />
            <img src={Ellipse1} alt="Circle graphic" className="green-circle" />
            <img src={Ellipse2} alt="Circle graphic" className="green-circle1" />
           
          </div>
        </div>

        {/* Section 2: Image Left, Content Right */}
        <div className="therapy-type-block reverse">
          <div className="therapy-image-wrapper">
            <img src={behavioralImg} alt="Behavioral Therapy" className="therapy-img3" />
            <img src={Ellipse3} alt="Circle graphic" className="green-circle2" />
          </div>
          <div className="therapy-text">
            <h4>Behavioral Therapy</h4>
            <ul>
              <li><strong>Applied Behavior Analysis (ABA)</strong>: Often used for autism and behavioral issues.</li>
              <li><strong>Exposure Therapy</strong>: Helps with phobias and anxiety by gradual exposure.</li>
              <li><strong>Aversion Therapy</strong>: Links unwanted behavior with discomfort.</li>
            </ul>
          </div>
        </div>

        {/* Section 3: Image Farther Left, Content Right */}
        <div className="therapy-type-block reverse offset-image-left">
          <div className="therapy-image-wrapper offset-img-wrapper">
            <img src={cognitiveImg} alt="Cognitive Therapy" className="therapy-img1" />
            <img src={Ellipse1} alt="Circle graphic" className="green-circle3" />
          </div>
          <div className="therapy-text">
            <h4>Cognitive Therapy</h4>
            <ul>
              <li><strong>Cognitive Behavioral Therapy (CBT)</strong>: Combines cognitive and behavioral strategies.</li>
              <li><strong>Rational Emotive Behavior Therapy (REBT)</strong>: Focuses on challenging irrational beliefs.</li>
              <li><strong>Mindfulness-Based Cognitive Therapy (MBCT)</strong>: Combines cognitive therapy with mindfulness strategies.</li>
            </ul>
          </div>
        </div>

        {/* Section 4: Content Left, Image Right */}
        <div className="therapy-type-block">
          <div className="therapy-text">
            <h4>Humanistic Therapy</h4>
            <ul>
              <li><strong>Client-Centered (Rogerian) Therapy</strong>: Emphasizes empathy and unconditional positive regard.</li>
              <li><strong>Gestalt Therapy</strong>: Focuses on awareness and the present moment.</li>
              <li><strong>Existential Therapy</strong>: Explores meaning, freedom, and responsibility.</li>
            </ul>
          </div>
          <div className="therapy-image-wrapper">
            <img src={humanisticImg} alt="Humanistic Therapy" className="therapy-img3" />
            <img src={Ellipse2} alt="Circle graphic" className="green-circle4" />
          </div>
        </div>

        {/* Section 5: Image Left, Content Right */}
        <div className="therapy-type-block reverse">
          <div className="therapy-image-wrapper">
            <img src={holisticImg} alt="Holistic Therapy" className="therapy-img2" />
          </div>
          <div className="therapy-text">
            <h4>Holistic & Integrative Therapy</h4>
            <ul>
              <li><strong>Integrative Psychotherapy</strong>: Tailors different approaches to fit the client.</li>
              <li><strong>Transpersonal Therapy</strong>: Includes spiritual aspects of the human experience.</li>
            </ul>
            <h5>Somatic & Body-Centered Therapy</h5>
            <ul>
              <li><strong>Somatic Experiencing</strong>: Focuses on the body's awareness to release trauma.</li>
              <li><strong>Sensorimotor Psychotherapy</strong>: Combines somatic and attachment theories.</li>
            </ul>
          </div>
        </div>

        {/* Section 6: Content Left, Image Right */}
        <div className="therapy-type-block">
          <div className="therapy-text">
            <h4>Family & Couples Therapy</h4>
            <ul>
              <li><strong>Systemic Therapy</strong>: Looks at family dynamics and patterns.</li>
              <li><strong>Emotionally Focused Therapy (EFT)</strong>: Strengthens emotional bonds.</li>
              <li><strong>Gottman Method</strong>: Evidence-based therapy for couples.</li>
            </ul>
          </div>
          <div className="therapy-image-wrapper">
            <img src={familyImg} alt="Humanistic Therapy" className="therapy-img3" />
            <img src={Ellipse3} alt="Circle graphic" className="green-circle5" />
          </div>
        </div>
        {/* Section 7: Image Left, Content Right */}
        <div className="therapy-type-block reverse">
          <div className="therapy-image-wrapper">
            <img src={otherImg} alt="Holistic Therapy" className="therapy-img" />
          </div>
          <div className="therapy-text">
            <h4>Other Specialized Therapies</h4>
            <ul>
              <li><strong>Dialectical Behavior Therapy (DBT)</strong>: Designed for emotion regulation and borderline personality disorder.</li>
              <li><strong>Acceptance and Commitment Therapy (ACT)</strong>: Uses mindfulness and values-based living.</li>
              <li><strong>Eye Movement Desensitization and Reprocessing (EMDR)</strong>: Treats trauma and PTSD.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    {/* Newsletter Section */}
<div className="newsletter-section">
  <div className="newsletter-left">
    <h3>Ideas to Help You Learn, Heal and Grow</h3>
    <p>
      Get weekly insights for better relationships, deeper self-knowledge, and inner calm.
      Sign up for inspiration, plus 10% off your first shop order.
      By signing up, you agree to receive email marketing material from The School of Life.
      You can unsubscribe at any time. For more details, please refer to our Privacy Policy.
    </p>
  </div>
  <div className="newsletter-form">
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
        url: "hhttps://mentalhealth-uk.org/",
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

<div className="therapy-benefits-wrapper desktop-layout">
<div className="therapy-benefits-wrapper">
  {/* <svg className="therapy-svg-lines" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
    <circle cx="400" cy="300" r="220" fill="none" stroke="#C5D8A4" strokeWidth="1.5" strokeDasharray="6 4"/>
  </svg> */}
{/* <img src={Vector1} alt="Icon1" className="therapy-icon vector1" />
<img src={Vector2} alt="Icon1" className="therapy-icon vector1" />
<img src={Vector3} alt="Icon1" className="therapy-icon vector2" />
<img src={Vector4} alt="Icon1" className="therapy-icon vector3" />
<img src={Vector5} alt="Icon1" className="therapy-icon vector3" />
<img src={Vector6} alt="Icon1" className="therapy-icon vector4" />
<img src={Vector1} alt="Icon1" className="therapy-icon vector6" />
<img src={Vector2} alt="Icon1" className="therapy-icon vector6" />
<img src={Vector3} alt="Icon1" className="therapy-icon vector7" />
<img src={Vector4} alt="Icon1" className="therapy-icon vector8" />
<img src={Vector5} alt="Icon1" className="therapy-icon vector8" />
<img src={Vector6} alt="Icon1" className="therapy-icon vector9" /> */}
  <img src={Icon1} alt="Icon1" className="therapy-icon icon1" />
  <img src={Icon2} alt="Icon2" className="therapy-icon icon2" />
  <img src={Icon3} alt="Icon3" className="therapy-icon icon3" />
  <img src={Icon5} alt="Icon4" className="therapy-icon icon4" />
  <img src={Icon4} alt="Icon5" className="therapy-icon icon5" />
  <img src={Icon6} alt="Icon6" className="therapy-icon icon6" />

  <div className="therapy-center-text">How Exactly Can Therapy Help Us?</div>

  <div className="benefit-text bt2">Improved Self-Awareness</div>
  <div className="benefit-text bt1">Emotional Support</div>
  <div className="benefit-text bt3">Better Relationships</div>
  <div className="benefit-text bt4">Behavioral Change</div>
  <div className="benefit-text bt5">Goal Clarity and Motivation</div>
  <div className="benefit-text bt6">Mental Health Management</div>
  <div className="benefit-text bt7">Healing from Trauma</div>
  <div className="benefit-text bt8">Coping Strategies</div>
  <div className="benefit-text bt9">Problem-Solving Skills</div>
  <div className="benefit-text bt10">Increased Resilience</div>
</div>
</div>
<div className="therapy-benefits-wrapper-mobile">
  <div className="therapy-center-text">How Exactly Can Therapy Help Us?</div>

  <div className="therapy-mobile-pair">
    <img src={Icon1} alt="Icon1" className="therapy-icon" />
    <div className="therapy-benefit-texts">
      <div className="benefit-text">Improved Self-Awareness</div>
      <div className="benefit-text">Emotional Support</div>
    </div>
  </div>

  <div className="therapy-mobile-pair">
    <img src={Icon2} alt="Icon2" className="therapy-icon" />
    <div className="therapy-benefit-texts">
      <div className="benefit-text">Better Relationships</div>
      <div className="benefit-text">Behavioral Change</div>
    </div>
  </div>

  <div className="therapy-mobile-pair">
    <img src={Icon3} alt="Icon3" className="therapy-icon" />
    <div className="therapy-benefit-texts">
      <div className="benefit-text">Goal Clarity and Motivation</div>
      <div className="benefit-text">Mental Health Management</div>
    </div>
  </div>

  <div className="therapy-mobile-pair">
    <img src={Icon4} alt="Icon4" className="therapy-icon" />
    <div className="therapy-benefit-texts">
      <div className="benefit-text">Healing from Trauma</div>
      <div className="benefit-text">Coping Strategies</div>
    </div>
  </div>

  <div className="therapy-mobile-pair">
    <img src={Icon5} alt="Icon5" className="therapy-icon5" />
    <div className="therapy-benefit-texts">
      <div className="benefit-text">Problem-Solving Skills</div>
      <div className="benefit-text">Increased Resilience</div>
    </div>
  </div>
</div>


{/* --- FOOTER SECTION --- */}
<Footer />


    </>
  );
};

export default PsychotherapyTypes;
