import { Helmet } from 'react-helmet-async';
import './LegalPage.css';
import Footer from './Footer_page';
import banner from './assets/homepage/banner_for_landing.jpg';

const TermsAndConditionsPage = () => {
  return (
    <div className="legal-page">
      <Helmet>
        <title>MindWork360 Terms of Service | Terms & Conditions</title>
        <meta name="description" content="Review the MindWork360 Terms of Service for information about user rights, responsibilities, acceptable use, account policies, and legal terms for our platform." />
      </Helmet>
      {/* Hero Banner */}
      <div className="legal-hero-banner">
        <img src={banner} alt="Terms of Service Banner" className="legal-hero-bg" />
        <div className="legal-hero-overlay">
          <h1 className="legal-hero-title">Terms of Service</h1>
          <p className="legal-hero-subtitle">
            Please read these terms carefully before using our platform
          </p>
        </div>
      </div>

      {/* Content Card */}
      <div className="legal-card-wrapper">
        <div className="legal-card">
          <span className="legal-badge">Last Updated: July 16, 2025</span>

          <div className="legal-section">
            <h2>MindWork360 Site Terms</h2>
            <p>
              This site located at "mindwork360.com" is a website (Site) owned and operated by
              MindWork360 Inc. and/or its affiliates (MindWork360 or Our or We or Us) and is intended
              to provide information that might be of interest to users.
            </p>
            <p>
              Your access to, and use of the Site hosted at "mindwork360.com" and any other websites
              controlled by MindWork360 (together Our Sites) and all the content of them that
              MindWork360 and its subsidiaries and affiliated companies may make available to you, as
              well as any services We may provide through any of Our Sites, are governed by and subject
              to these MindWork360 Site Terms (Terms) and all applicable laws. Please read them carefully.
            </p>
            <p>
              By accessing and browsing Our Sites, you accept, without limitation or qualification,
              these Terms and acknowledge that Other Agreements between you and MindWork360 are, subject
              to section 12 (Other Agreements; Access to Software and Services) of these Terms,
              superseded and of no force or effect.
            </p>
          </div>

          <div className="legal-section">
            <h2>Copyright</h2>
            <p>
              All content of Our Sites, including but not limited to the text, graphics, logos, button
              icons, audio clips, video clips, data compilations, Software, and images, and their
              arrangement or compilation on Our Sites (Content), unless otherwise noted, are the
              copyrighted material of MindWork360 or its content providers and are protected by United
              States and international copyright laws. Copyright &copy; 2005-2020 MindWork360. All
              rights reserved.
            </p>
          </div>

          <div className="legal-section">
            <h2>Trademarks</h2>
            <p>
              "MindWork360" and the MindWork360 logo and other MindWork360 graphics, logos and service
              names are trademarks, registered trademarks, or trade dress of MindWork360 in the United
              States and/or other countries. MindWork360's trademarks or trade dress may not be used
              in connection with any other product or service that is not MindWork360's, or in any
              manner that is likely to cause confusion among existing or future customers, or in any
              manner which denigrates or discredits MindWork360. All other trademarks and logos or
              registered trademarks and logos found on Our Sites or mentioned in them belong to their
              respective owners. Nothing contained on Our Sites should be construed as granting, by
              implication, estoppel, or otherwise, any license or right to use any trademark displayed
              on Our Sites without the written permission of MindWork360 or such third party that owns
              the trademarks. MindWork360 will enforce its intellectual property rights to the fullest
              extent permitted by law. You may not use the name, logo, proprietary Content or any
              trademark of MindWork360 without MindWork360's express written permission.
            </p>
          </div>

          <div className="legal-section">
            <h2>Limited License</h2>
            <p>
              MindWork360 grants you a limited, revocable, non-exclusive license to access and make
              personal use of Our Sites (License), and not to download (except for page caching) or
              modify any portion of it without MindWork360's express written consent. This License is
              for online access only and does not allow you to commercially exploit Our Sites or any
              of their Content. This License does not allow you to make derivatives of Our Site or use
              any data mining or other data extraction or gathering tools on Our Sites. Unless otherwise
              specified by MindWork360 in a separate license or Other Agreement your right to use any
              Software, data, documentation or other Content that you access or download from Our Sites
              is subject to these Terms. You may create a hyperlink to Our Site homepage subject to
              strict compliance with these Terms. Any unauthorized use of Our Sites in contravention of
              these Terms or a breach of this License terminates the permissions granted under this
              License with immediate effect.
            </p>
          </div>

          <div className="legal-section">
            <h2>Access to Our Sites</h2>
            <p>
              When you access Our Sites, you are responsible for complying with these Terms as well as
              any and all use of Our Sites through any account that you may setup through or on Our
              Sites. Some Content will only be available to you if you have created an account.
            </p>
            <p>
              Whenever you access Our Sites or create or maintain any account on Our Sites you agree
              to provide true, accurate, current, and complete information. It is your responsibility
              to obtain and maintain all equipment, services and Software needed for access to and use
              of Our Sites as well as paying any related charges. It is also your responsibility to
              maintain the confidentiality of your login credentials and password(s) and to restrict
              access to your computing device used to access your account. Should you believe your
              password or other security information for any of Our Sites has been breached in any way,
              you must immediately notify Us. MindWork360 reserves the right to refuse you access to
              Our Sites and to terminate accounts in Our sole discretion.
            </p>
          </div>

          <div className="legal-section">
            <h2>Professional Services and Advice</h2>
            <p>
              In accessing any of Our Sites, no client, advisory, fiduciary or professional relationship
              is implicated or established and neither MindWork360 nor any other person is, in connection
              with Our Sites, engaged in rendering auditing, accounting, tax, legal, advisory, consulting
              or other professional services or advice.
            </p>
          </div>

          <div className="legal-section">
            <h2>Liability and Warranties</h2>
            <p>
              OUR SITES AND ALL CONTENT IN THEM HAS BEEN COMPILED FROM A VARIETY OF SOURCES AND OUR
              SITES MAY INCLUDE TECHNICAL INACCURACIES OR TYPOGRAPHICAL ERRORS. EVERYTHING ON OUR SITES
              (INCLUDING SOFTWARE) IS PROVIDED TO YOU "AS IS" WITHOUT WARRANTY OF ANY KIND, EITHER
              EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
              MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE OR NON-INFRINGEMENT. YOUR USE OF OUR
              SITES IS ENTIRELY AT YOUR OWN RISK.
            </p>
            <p>
              MINDWORK360 DOES NOT WARRANT THAT OUR SITES, VARIOUS SERVICES PROVIDED THROUGH OUR SITES,
              AND ANY INFORMATION, SOFTWARE OR OTHER MATERIAL DOWNLOADED FROM OUR SITES, WILL BE
              UNINTERRUPTED, ERROR-FREE, OR FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS.
            </p>
            <p>
              MINDWORK360 MAKES NO WARRANTIES OR REPRESENTATIONS AS TO THE ACCURACY OF THE CONTENT ON
              OUR SITES. MINDWORK360 ASSUMES NO LIABILITY OR RESPONSIBILITY FOR ANY ERRORS OR OMISSIONS
              IN THE CONTENT OF OUR SITES. MINDWORK360 USES ALL REASONABLE EFFORT TO ENSURE THE
              ACCURACY OF THE CONTENT ON OUR SITES BUT RESERVES THE RIGHT TO CHANGE IN ITS SOLE
              DISCRETION OUR SITES, IN ANY WAY AND/OR AT ANY TIME, WITHOUT NOTICE.
            </p>
            <p>
              UNLESS SPECIFIED IN AN OTHER AGREEMENT BETWEEN YOU AND US, AND TO THE EXTENT ALLOWABLE
              UNDER APPLICABLE LAW, MINDWORK360 SHALL NOT BE LIABLE FOR ANY DAMAGES OF ANY KIND ARISING
              FROM YOUR USE OF OUR SITES OR FROM YOUR USE OF ANY CONTENT (INCLUDING SOFTWARE) OR
              SERVICES INCLUDED ON OR MADE AVAILABLE TO YOU THROUGH OUR SITES, INCLUDING, WITHOUT
              LIMITATION, DIRECT, INDIRECT, SPECIAL, PUNITIVE, INCIDENTAL, OR CONSEQUENTIAL DAMAGES,
              AND INCLUDING, WITHOUT LIMITATION, ANY LOST REVENUES, LOST PROFITS, OR THIRD PARTY
              CLAIMS, EVEN IF MINDWORK360 HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES OR FOR
              ANY CLAIM BY ANOTHER PARTY.
            </p>
          </div>

          <div className="legal-section">
            <h2>External Links</h2>
            <p>
              Links on Our Sites may lead to servers maintained by individuals or organizations other
              than MindWork360. MindWork360 has no control and makes no warranties or representations
              as to the accuracy, timeliness, suitability or any other aspect of the information located
              on such servers, and neither monitors nor endorses such servers or content.
            </p>
          </div>

          <div className="legal-section">
            <h2>Submission of Personal Information</h2>
            <p>
              Please read MindWork360's Privacy Policy. These Terms are deemed to incorporate, and
              should be read together with, MindWork360's Privacy Policy.
            </p>
          </div>

          <div className="legal-section">
            <h2>Images</h2>
            <p>
              Images of people or places displayed on Our Sites are either the property of, or used
              with permission by, MindWork360. Your use of these images is strictly prohibited unless
              specifically permitted by these Terms, specific permission provided elsewhere on Our Sites
              or you write directly to and obtain permission from MindWork360. Please contact{' '}
              <a href="mailto:360mindwork@gmail.com">360mindwork@gmail.com</a> for permission.
            </p>
          </div>

          <div className="legal-section">
            <h2>Revisions to Content</h2>
            <p>
              MindWork360 may at any time revise these Terms by updating this posting. You are bound
              by the most current Terms every time you visit Our Sites, therefore you should periodically
              and carefully review these Terms to which you are bound.
            </p>
          </div>

          <div className="legal-section">
            <h2>Other Agreements; Access to Software and Services</h2>
            <p>
              MindWork360 may provide products (such as hardware or software), services (such as
              software subscription services, hardware maintenance or repair or software maintenance,
              installation, or training) or access via Our Sites under the terms of a separate agreement
              between You and MindWork360, such as a license agreement or separate terms of sale and
              warranty terms (each, an Other Agreement). MindWork360's obligations regarding any product,
              service, or access that it makes available to you under any Other Agreement shall be
              governed solely by the Other Agreement under which such product, service or access is
              provided and these Terms shall not be deemed or construed to alter the terms of any such
              Other Agreement. If there is an inconsistency between these Terms and any Other Agreement,
              the terms of the Other Agreement will control.
            </p>
            <p>
              For example, the use of any software that is made available to download from Our Sites
              (Software) is governed by the terms of the end user license agreement, if any, that
              accompanies or is included with the Software (License Agreement). You may not install any
              Software that is accompanied by or includes a License Agreement unless you first have
              agreed to the License Agreement. If there is no License Agreement, then these Terms will
              govern your use of that Software.
            </p>
          </div>

          <div className="legal-section">
            <h2>Choice of Law, Jurisdiction and Severability</h2>
            <p>
              The contents of Our Sites are governed by the laws of the state of Delaware in the United
              States, and any claims rising directly or indirectly out of any materials contained on Our
              Sites are subject to these same laws without regard to any conflict of law principles.
            </p>
            <p>
              Any dispute that arises out of your use of Our Sites or to services provided by MindWork360
              where the aggregated amount of such claim is greater than $10,000 shall be heard in a state
              or federal court in the State of California, and you consent to the exclusive jurisdiction
              of such courts.
            </p>
            <p>
              If any clause of these Terms shall be deemed to be invalid, void or unenforceable for any
              reason, that clause shall be deemed severable and shall not affect the enforceability of
              the remainder of these Terms.
            </p>
          </div>

          <div className="legal-section">
            <h2>Changes to Terms of Service</h2>
            <p>
              You can review the most current version of the Terms of Service at any time at this page.
            </p>
            <p>
              We reserve the right, at our sole discretion, to update, change or replace any part of
              these Terms of Service by posting updates and changes to our website. It is your
              responsibility to check our website periodically for changes. Your continued use of or
              access to our website or the Services following the posting of any changes to these Terms
              of Service constitutes acceptance of those changes.
            </p>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TermsAndConditionsPage;
