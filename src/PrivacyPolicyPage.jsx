import { useEffect } from 'react';
import './LegalPage.css';
import Footer from './Footer_page';

const PrivacyPolicyPage = () => {
  useEffect(() => {
    document.title = 'Privacy Policy | MindWork360';
  }, []);

  return (
    <div className="legal-page">
      {/* Hero Banner */}
      <div className="legal-hero">
        <h1 className="legal-hero-title">Privacy Policy</h1>
        <p className="legal-hero-subtitle">
          How we collect, use, and protect your personal information
        </p>
      </div>

      {/* Content Card */}
      <div className="legal-card-wrapper">
        <div className="legal-card">
          <span className="legal-badge">Last Updated: June 19, 2026</span>

          {/* 1. Introduction */}
          <div className="legal-section">
            <h2>1. Introduction</h2>
            <p>
              Welcome to MindWork360. We are committed to protecting the privacy and security of your
              personal information. This Privacy Policy explains how we collect, use, disclose, and
              safeguard your data when you visit our website or use our services. Please read this
              document carefully before accessing or using any part of our platform. By continuing to
              use MindWork360, you acknowledge that you have read and understood this policy.
            </p>
            <p>
              This policy applies to all information collected through our website, mobile applications,
              and any other channels through which you interact with us. If you do not agree with the
              terms outlined here, please discontinue use of our services immediately.
            </p>
          </div>

          {/* 2. Information We Collect */}
          <div className="legal-section">
            <h2>2. Information We Collect</h2>
            <p>
              We collect several types of information in connection with the services we provide.
              Personal information includes your name, email address, phone number, and any details
              you voluntarily provide when creating an account or filling out forms on our website.
              We may also collect billing information when you purchase a subscription or service.
            </p>
            <p>
              Usage data is gathered automatically as you interact with our platform. This includes
              your IP address, browser type and version, pages you visit, time spent on those pages,
              and the links you click. This data helps us understand how our users navigate the site
              and allows us to improve the overall experience.
            </p>
            <p>
              We also collect information through cookies and similar tracking technologies. These
              tools help us remember your preferences, keep you signed in, and deliver personalized
              content. You can manage cookie preferences through your browser settings at any time.
            </p>
          </div>

          {/* 3. How We Use Your Information */}
          <div className="legal-section">
            <h2>3. How We Use Your Information</h2>
            <p>
              The information we collect is used to provide, maintain, and improve our services. We
              use your personal details to create and manage your account, respond to your inquiries,
              and deliver the content and resources you have requested. Your data also helps us
              personalize your experience and recommend relevant tools and articles.
            </p>
            <p>
              We may use your contact information to send you important service-related notifications,
              updates about new features, and occasional promotional communications. You may opt out
              of marketing emails at any time by clicking the unsubscribe link in any email we send.
              Transactional and service communications cannot be opted out of while your account is active.
            </p>
            <p>
              Aggregated and anonymized usage data is analyzed internally to improve our platform,
              detect errors, and understand broad trends in how our community uses MindWork360. This
              data cannot be used to identify you individually.
            </p>
          </div>

          {/* 4. Cookies and Tracking Technologies */}
          <div className="legal-section">
            <h2>4. Cookies and Tracking Technologies</h2>
            <p>
              MindWork360 uses cookies, web beacons, and similar tracking technologies to enhance
              your browsing experience. Essential cookies are required for the site to function
              correctly and cannot be disabled. Preference cookies remember your settings and
              language choices between visits.
            </p>
            <p>
              Analytics cookies allow us to measure website traffic, understand user behavior, and
              identify areas of the site that need improvement. We use third-party analytics tools
              such as Google Analytics to assist with this analysis. These providers may set their
              own cookies on your device. You can opt out of analytics cookies by adjusting your
              browser settings or using your browser's privacy mode.
            </p>
            <p>
              You may configure your browser to refuse cookies entirely or to alert you when a
              website tries to set a cookie. Please note that disabling certain cookies may affect
              the functionality and performance of parts of our website.
            </p>
          </div>

          {/* 5. Third-Party Links */}
          <div className="legal-section">
            <h2>5. Third-Party Links</h2>
            <p>
              Our website may contain links to third-party websites, applications, and services that
              are not operated by MindWork360. These links are provided for your convenience and
              informational purposes only. We have no control over the content, privacy practices,
              or security of these external sites.
            </p>
            <p>
              We strongly encourage you to review the privacy policy of any third-party site you
              visit. MindWork360 is not responsible for the data collection or privacy practices of
              external websites, even if you access them through a link on our platform. Your
              interactions with third-party services are governed solely by their own terms and policies.
            </p>
          </div>

          {/* 6. Data Security */}
          <div className="legal-section">
            <h2>6. Data Security</h2>
            <p>
              We take the security of your personal information seriously and implement a range of
              administrative, technical, and physical safeguards to protect it. All data transmitted
              between your browser and our servers is encrypted using industry-standard SSL/TLS
              protocols. Sensitive data such as passwords is stored in hashed form using secure
              cryptographic algorithms.
            </p>
            <p>
              Access to personal data is restricted to authorized personnel who require it to
              perform their job functions. We conduct regular security assessments and audits to
              identify and address potential vulnerabilities. Despite these measures, no method of
              transmission over the internet or electronic storage is completely secure, and we
              cannot guarantee absolute security.
            </p>
            <p>
              If we become aware of a data breach that affects your personal information, we will
              notify you and relevant authorities as required by applicable law. We will also take
              immediate steps to investigate and mitigate the impact of any breach.
            </p>
          </div>

          {/* 7. Your Rights */}
          <div className="legal-section">
            <h2>7. Your Rights</h2>
            <p>
              Depending on your location, you may have certain rights regarding your personal
              information under applicable data protection laws. These rights may include the right
              to access the personal data we hold about you, the right to request corrections to
              inaccurate information, and the right to request deletion of your data under certain
              circumstances.
            </p>
            <p>
              You may also have the right to object to or restrict certain types of processing,
              the right to data portability, and the right to withdraw consent at any time where
              processing is based on consent. To exercise any of these rights, please contact us
              using the details provided in the Contact Us section below. We will respond to your
              request within the timeframes required by law.
            </p>
          </div>

          {/* 8. Children's Privacy */}
          <div className="legal-section">
            <h2>8. Children's Privacy</h2>
            <p>
              MindWork360 is not directed at children under the age of 13, and we do not knowingly
              collect personal information from children. If you are a parent or guardian and
              believe your child has provided us with personal information without your consent,
              please contact us immediately so we can take appropriate action.
            </p>
            <p>
              If we discover that we have inadvertently collected personal information from a child
              under 13, we will promptly delete that data from our systems. We encourage parents and
              guardians to monitor their children's online activities and to help enforce this policy
              by instructing children never to provide personal information through our services without
              parental supervision.
            </p>
          </div>

          {/* 9. Changes to This Policy */}
          <div className="legal-section">
            <h2>9. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our practices,
              technology, legal requirements, or for other operational reasons. When we make material
              changes, we will revise the "Last Updated" date at the top of this page and, where
              appropriate, notify you by email or through a prominent notice on our website.
            </p>
            <p>
              We encourage you to review this Privacy Policy periodically to stay informed about how
              we are protecting your information. Your continued use of MindWork360 after any changes
              to this policy constitutes your acceptance of those changes. If you do not agree with the
              revised policy, you should discontinue use of our services and request deletion of your account.
            </p>
          </div>

          {/* 10. Contact Us */}
          <div className="legal-section">
            <h2>10. Contact Us</h2>
            <p>
              If you have any questions, concerns, or requests regarding this Privacy Policy or the
              way we handle your personal information, please do not hesitate to get in touch with us.
              Our privacy team is dedicated to addressing your concerns promptly and transparently.
            </p>
            <p>
              You can reach us by email at <strong>privacy@mindwork360.com</strong> or by writing to
              our registered address at MindWork360, 42 Wellness Avenue, Suite 310, San Francisco,
              CA 94103, United States. We aim to respond to all privacy-related inquiries within
              five business days.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;
