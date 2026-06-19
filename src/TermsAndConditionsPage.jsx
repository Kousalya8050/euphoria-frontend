import { useEffect } from 'react';
import './LegalPage.css';
import Footer from './Footer_page';

const TermsAndConditionsPage = () => {
  useEffect(() => {
    document.title = 'Terms & Conditions | MindWork360';
  }, []);

  return (
    <div className="legal-page">
      {/* Hero Banner */}
      <div className="legal-hero">
        <h1 className="legal-hero-title">Terms &amp; Conditions</h1>
        <p className="legal-hero-subtitle">
          Please read these terms carefully before using our platform
        </p>
      </div>

      {/* Content Card */}
      <div className="legal-card-wrapper">
        <div className="legal-card">
          <span className="legal-badge">Last Updated: June 19, 2026</span>

          {/* 1. Acceptance of Terms */}
          <div className="legal-section">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing or using the MindWork360 website and any related services, you agree to
              be bound by these Terms and Conditions and our Privacy Policy. If you do not agree with
              any part of these terms, you must not use our platform. These terms constitute a legally
              binding agreement between you and MindWork360.
            </p>
            <p>
              We reserve the right to modify these Terms at any time. We will notify users of
              significant changes by updating the "Last Updated" date on this page and, where
              applicable, through direct communication. Your continued use of the platform following
              any modifications constitutes acceptance of the updated Terms.
            </p>
          </div>

          {/* 2. Use of the Website */}
          <div className="legal-section">
            <h2>2. Use of the Website</h2>
            <p>
              MindWork360 grants you a limited, non-exclusive, non-transferable, and revocable license
              to access and use our platform for personal, non-commercial purposes. This license does
              not include the right to resell or commercially exploit any part of the service, collect
              or use any product listings or descriptions, or make any derivative use of the platform
              or its content.
            </p>
            <p>
              You agree to use our website only for lawful purposes and in a manner that does not
              infringe the rights of others or restrict their enjoyment of the platform. You must not
              use automated systems, bots, or scrapers to access our content without prior written
              permission. We reserve the right to terminate access for users who violate these guidelines.
            </p>
            <p>
              You are responsible for maintaining the confidentiality of your account credentials and
              for all activities that occur under your account. Please notify us immediately if you
              become aware of any unauthorized use of your account or any other breach of security.
            </p>
          </div>

          {/* 3. Intellectual Property */}
          <div className="legal-section">
            <h2>3. Intellectual Property</h2>
            <p>
              All content on MindWork360, including but not limited to text, graphics, logos, icons,
              images, audio clips, videos, and software, is the property of MindWork360 or its content
              suppliers and is protected by applicable intellectual property laws. You may not reproduce,
              distribute, modify, or create derivative works without our prior written consent.
            </p>
            <p>
              The MindWork360 name, logo, and all related product and service names, design marks, and
              slogans are trademarks of MindWork360. You are not permitted to use these marks without
              our express written permission. Unauthorized use of our trademarks may constitute an
              infringement of our rights and applicable laws.
            </p>
            <p>
              If you believe that content on our platform infringes your copyright, please contact us
              with a detailed notice. We will investigate all claims and, where appropriate, remove
              infringing content in accordance with applicable law.
            </p>
          </div>

          {/* 4. User Conduct */}
          <div className="legal-section">
            <h2>4. User Conduct</h2>
            <p>
              Users of MindWork360 are expected to engage respectfully and constructively with all
              content and community features on the platform. You agree not to post, upload, or
              transmit any material that is harmful, threatening, abusive, harassing, defamatory,
              obscene, or otherwise objectionable. We reserve the right to remove such content at
              our sole discretion.
            </p>
            <p>
              You must not attempt to gain unauthorized access to any part of our platform, other
              users' accounts, or computer systems connected to our services. Any attempt to interfere
              with the proper functioning of the website, including through the use of viruses or
              denial-of-service attacks, is strictly prohibited and may result in legal action.
            </p>
            <p>
              Impersonating any person or entity, or falsely claiming an affiliation with any person
              or organization, is not permitted on our platform. We may suspend or terminate accounts
              found to be engaged in such behavior without prior notice.
            </p>
          </div>

          {/* 5. Disclaimer of Warranties */}
          <div className="legal-section">
            <h2>5. Disclaimer of Warranties</h2>
            <p>
              MindWork360 is provided on an "as is" and "as available" basis without any warranties
              of any kind, either express or implied. We do not warrant that the platform will be
              uninterrupted, error-free, or free of viruses or other harmful components. To the
              fullest extent permitted by law, we disclaim all warranties, including implied warranties
              of merchantability, fitness for a particular purpose, and non-infringement.
            </p>
            <p>
              The content available on MindWork360 is intended for general informational purposes only
              and does not constitute professional medical, psychological, or therapeutic advice.
              Always seek the guidance of a qualified health professional regarding any questions or
              concerns you may have about your mental health or well-being.
            </p>
          </div>

          {/* 6. Limitation of Liability */}
          <div className="legal-section">
            <h2>6. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by applicable law, MindWork360 and its affiliates,
              directors, employees, and agents shall not be liable for any indirect, incidental,
              special, consequential, or punitive damages, including loss of profits, data, goodwill,
              or other intangible losses, arising out of or in connection with your use of our platform
              or these Terms.
            </p>
            <p>
              In no event shall our total liability to you for all claims arising from or related to
              these Terms or the use of our services exceed the amount you have paid to us in the
              twelve months preceding the event giving rise to the liability. Some jurisdictions do
              not allow the exclusion of certain warranties or limitation of liability, so some of
              these limitations may not apply to you.
            </p>
            <p>
              We shall not be held responsible for any delays or failures in performance resulting
              from causes beyond our reasonable control, including natural disasters, government
              actions, labor disputes, internet outages, or other force majeure events.
            </p>
          </div>

          {/* 7. Third-Party Content */}
          <div className="legal-section">
            <h2>7. Third-Party Content</h2>
            <p>
              Our platform may display or link to content, products, and services from third parties.
              This content is provided solely as a convenience and does not constitute an endorsement
              or recommendation by MindWork360. We have no control over third-party content and
              accept no responsibility for it.
            </p>
            <p>
              Any transactions you enter into with third parties found on or through our platform are
              solely between you and that third party. We are not responsible for any loss or damage
              arising from such transactions. We encourage you to conduct your own due diligence
              before engaging with any third-party service or content provider.
            </p>
          </div>

          {/* 8. Termination */}
          <div className="legal-section">
            <h2>8. Termination</h2>
            <p>
              We reserve the right to suspend or terminate your access to MindWork360 at any time,
              with or without cause, and with or without notice, at our sole discretion. Grounds for
              termination include, but are not limited to, violation of these Terms, fraudulent
              activity, or behavior that harms other users or the integrity of the platform.
            </p>
            <p>
              Upon termination, your right to use the platform will immediately cease. Any provisions
              of these Terms that by their nature should survive termination — including intellectual
              property provisions, disclaimers, and limitations of liability — shall remain in effect.
              You may also delete your account at any time by contacting our support team.
            </p>
          </div>

          {/* 9. Governing Law */}
          <div className="legal-section">
            <h2>9. Governing Law</h2>
            <p>
              These Terms and Conditions shall be governed by and construed in accordance with the
              laws of the State of California, United States, without regard to its conflict of law
              provisions. Any disputes arising out of or relating to these Terms shall be subject to
              the exclusive jurisdiction of the state and federal courts located in San Francisco
              County, California.
            </p>
            <p>
              If any provision of these Terms is found to be invalid or unenforceable, the remaining
              provisions shall continue to be valid and enforceable to the fullest extent permitted
              by law. Our failure to enforce any right or provision of these Terms will not be
              considered a waiver of those rights.
            </p>
          </div>

          {/* 10. Contact Us */}
          <div className="legal-section">
            <h2>10. Contact Us</h2>
            <p>
              If you have any questions, concerns, or feedback about these Terms and Conditions,
              we encourage you to reach out to our team. We are committed to addressing your inquiries
              in a timely and transparent manner and will do our best to resolve any concerns you may have.
            </p>
            <p>
              You can contact us by email at <strong>legal@mindwork360.com</strong> or by writing to
              MindWork360, 42 Wellness Avenue, Suite 310, San Francisco, CA 94103, United States.
              We aim to respond to all legal and terms-related inquiries within five business days.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TermsAndConditionsPage;
