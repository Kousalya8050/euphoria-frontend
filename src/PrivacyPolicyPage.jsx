import { Helmet } from 'react-helmet-async';
import './LegalPage.css';
import Footer from './Footer_page';
import banner from './assets/homepage/banner_for_landing.jpg';

const PrivacyPolicyPage = () => {
  return (
    <div className="legal-page">
      <Helmet>
        <title>Privacy Policy | MindWork360 Data Protection & Privacy</title>
        <meta name="description" content="Learn how MindWork360 protects your privacy, handles personal information, uses cookies, and safeguards your data in accordance with our Privacy Policy." />
      </Helmet>
      {/* Hero Banner */}
      <div className="legal-hero-banner">
        <img src={banner} alt="Privacy Policy Banner" className="legal-hero-bg" />
        <div className="legal-hero-overlay">
          <h1 className="legal-hero-title">Privacy Policy</h1>
          <p className="legal-hero-subtitle">
            How we collect, use, and protect your personal information
          </p>
        </div>
      </div>

      {/* Content Card */}
      <div className="legal-card-wrapper">
        <div className="legal-card">
          <span className="legal-badge">Last Updated: July 16, 2025</span>

          <div className="legal-section">
            <h2>Enterprise Online Privacy Statement</h2>
            <h3>PRIVACY AND DATA PROTECTION AT MindWork360</h3>
            <p>
              This policy has been updated on July 16, 2026, to reflect MindWork360's commitment (1)
              for international data transfers as related to the invalidation of the EU-U.S. Privacy
              Shield by the European Court of Justice (EJC).
            </p>
            <p>
              At MindWork360 our commitment to privacy goes beyond the minimum legal and regulatory
              requirements. We strive for best-in-class data protection and privacy management, which
              requires a sound data privacy governance structure and an effective data privacy compliance
              and best practices program to ensure MindWork360 meets ever-changing and increasingly-complex
              regulatory standards and all contractually agreed privacy obligations.
            </p>
            <p>
              MindWork360's Global Privacy and Data Protection Office has strategic and operational
              responsibility for this program, which is adequately resourced and appropriately organized
              to ensure the policies and compliance processes, technology and physical controls and
              security we rely upon to govern the collection, use, storage and transfer of personal data
              all over the world meets statutory and regulatory requirements. Therefore, MindWork360's
              approach is to coordinate the contribution of several corporate disciplines – including
              ethics and compliance, legal, human resources, and information and physical security –
              to achieve our "best in class" data protection and privacy management objectives.
            </p>
          </div>

          <div className="legal-section">
            <h2>Strong Board and Executive Management Commitment</h2>
            <p>
              Our CLEAR Values are the distinguishing hallmarks of MindWork360's performance and
              reputation. They inform our decisions and drive personal responsibility. MindWork360's
              CLEAR Values define a culture in which the way we achieve our objectives matters as much,
              if not more, than our results.
            </p>
          </div>

          <div className="legal-section">
            <h2>MindWork360's Ethics and Compliance Office (ECO)</h2>
            <p>
              ECO's Charter and responsibilities are evidenced by Board resolution, which assigns
              day-to-day management responsibility for MindWork360's ethics and compliance program
              to a Chief Ethics and Compliance Officer.
            </p>
            <p>
              The ECO Mission: Promote throughout the global MindWork360 community a culture of
              performance with integrity that encourages ethical conduct, reinforces the CLEAR Values,
              and drives compliance with the Code of Business Conduct, internal policies, and the law.
            </p>
          </div>

          <div className="legal-section">
            <h2>MindWork360's Global Privacy and Data Protection Office (PDPO)</h2>
            <p>
              Based in the European Union (EU), MindWork360's global PDPO is a well-resourced and
              qualified strategic compliance function that operates under the authority of MindWork360's
              global Ethics and Compliance Office.
            </p>
            <p>
              The PDPO is responsible and accountable to advise MindWork360's businesses on best
              practices in privacy compliance, and to develop policies, procedures, training, risk
              assessment and monitoring programs that enable MindWork360 to provide adequate levels of
              personal data protection for its clients, employees and other relevant individuals in all
              geographies and jurisdictions the world over.
            </p>
          </div>

          <div className="legal-section">
            <h2>Compliance Policies, Standards, and Processes</h2>
            <p>
              A strong, globally-applicable Privacy and Data Protection Policy which reflects the
              Generally Accepted Privacy Principles ("GAPP") applicable to the collection, use,
              storage, and processing of personal data.
            </p>
            <p>
              Comprehensive and cohesive compliance standards, processes, and procedures, which ensure
              consistent privacy and data protection across all of MindWork360's legal entities and businesses.
            </p>
          </div>

          <div className="legal-section">
            <h2>Employee Training and Awareness</h2>
            <p>
              MindWork360 takes a holistic approach to ensure privacy-aware employees throughout the
              employment lifecycle including new-hire instructions, annual awareness briefings, targeted
              training for high-risk populations, and periodic awareness messaging through newsletters
              and PDPO bulletins.
            </p>
          </div>

          <div className="legal-section">
            <h2>Strong Risk Management Programs</h2>
            <p>
              In light of the inherent exposures to MindWork360's operational and strategic goals,
              MindWork360 is committed to ensuring that risk, issue, and opportunity management is a
              core competency, and an integral part of MindWork360's business operations that supports
              and informs reliable, quality decision making.
            </p>
            <p>
              The resources in both the Ethics and Compliance Office and its Privacy and Data Protection
              Office are integral parts of MindWork360's overall risk assessment program and posture,
              which includes internal and external audit and monitoring functions. With regular privacy
              risk assessments, the PDPO monitors emerging exposures and remediates weaknesses in an
              effort to constantly mature MindWork360's compliance capabilities. A consistent Privacy
              Impact Assessment program is carried out on new and changed services, systems, and
              processes, aiming to disclose potential issues before they become a problem.
            </p>
            <p>
              Formal data breach handling procedures and a robust 24/7 operated incident response
              center supplement regulatory and contractual notification requirements, enabling constant
              vigilance and readiness in case of a crisis.
            </p>
          </div>

          <div className="legal-section">
            <h2>Strong, Collaborative Cross-Disciplinary Partnerships</h2>
            <p>
              Inclusive of key internal stakeholders, including strong collaborative ties to
              MindWork360's information and physical security, legal, human resources, and key business
              unit personnel without whom strict compliance with privacy laws is not possible.
            </p>
          </div>

          <div className="legal-section">
            <h2>Flexible Service Delivery Model</h2>
            <p>
              A strong and robust global service delivery model that is flexible enough to meet the
              privacy requirements of the highly sensitive, regulated, and classified data environments.
            </p>
          </div>

          <div className="legal-section">
            <h2>Formal Dispute Resolution Mechanism</h2>
            <p>
              A one-stop point of contact for our employees and clients for any privacy related matters
              regardless of the geography, business, or service. If you have specific concerns or
              requests, please feel free to send an email to{' '}
              <a href="mailto:360mindwork@gmail.com">360mindwork@gmail.com</a>.
            </p>
            <p>
              This Privacy Statement applies to all MindWork360-owned websites, domains, and services
              and those of our wholly owned subsidiaries ("MindWork360 sites or services"), except that
              a privacy policy or statement specific to a particular MindWork360 service or program may
              supersede or supplement this Privacy Statement. Personal information concerning MindWork360
              and its customers, including outsourcing and other services clients, business partners,
              employees, former employees, and applicants for employment ("covered individuals") collected
              and processed offline is also governed by this Privacy Statement except where the contract
              with a covered individual defines different requirements which will take precedence over
              this Privacy Statement.
            </p>
          </div>

          <div className="legal-section">
            <h2>Collection of Personal Information</h2>
            <p>
              Personal information is any information that personally identifies an individual or from
              which an individual could be identified. This may include a name, address, telephone
              number, email address and other private personal attributes.
            </p>
            <p>
              MindWork360 collects, uses, stores and transfers (collectively "processes") personal
              information to manage its relationship with its customers, employees, business partners
              and other third parties ("covered individuals") and better serve covered individuals by
              personalizing their experience and interaction with MindWork360. Such processing is done
              in compliance with applicable laws, including appropriate notice and consent, along with
              required filings with data protection authorities, where required.
            </p>
            <p>
              MindWork360 may collect and process personal information through a variety of means,
              including, as examples, access to MindWork360 sites or services, or other ordering
              channels, employment processes, during conversations or correspondence with MindWork360
              representatives, through purchase of goods or services or in the course of an online
              application.
            </p>
          </div>

          <div className="legal-section">
            <h2>Use of Personal Information</h2>

            <h3>Fulfilling your Transaction Request</h3>
            <p>
              If we receive any requests related to, for example, a product or service, a callback,
              or specific marketing materials, we will use your personal information to fulfill your
              request. In this context, we may share information with others, for instance, MindWork360's
              group companies and business partners, involved in fulfillment. In connection with a
              transaction, we may also contact you as part of our customer satisfaction surveys or for
              market research purposes subject to applicable laws and regulations.
            </p>

            <h3>Personalizing your Experience on our Web Sites</h3>
            <p>
              We may use information we collect about you to provide you with a personalized experience
              on our Web sites, such as providing you with content in which you may be interested and
              making navigation on our sites easier.
            </p>

            <h3>Providing Support</h3>
            <p>
              We may use your personal information to support MindWork360 products or services you have
              purchased from us, including technical support, where we may sometimes have incidental
              access to data that you have provided to us or data that is located on your system. This
              data may contain information about you, your organization's employees, customers, partners,
              or suppliers (collectively "customer data"). This Privacy Statement does not apply to our
              access to or handling of your customer data; the conditions regarding the handling and
              processing of your customer data is covered by the applicable terms of use or other
              agreements between you and MindWork360 and its group companies.
            </p>

            <h3>Marketing</h3>
            <p>
              The information you provide to MindWork360, as well as the information we have lawfully
              collected about you indirectly, may be used by MindWork360 for marketing purposes. We
              will offer you the opportunity to opt-in to MindWork360 using your information in this
              way. You may at any time choose not to receive marketing materials from us by following
              the unsubscribe instructions included in each e-mail you may receive, or by contacting
              MindWork360 directly at{' '}
              <a href="mailto:360mindwork@gmail.com">360mindwork@gmail.com</a>.
            </p>
            <p>
              Some of our offerings may be co-branded, that is sponsored by both MindWork360 and third
              parties, such as MindWork360 Alliance Partners. If you sign up for these offerings, be
              aware that your information may also be collected by and shared with those third parties.
              We encourage you to familiarize yourself with their privacy policies to gain an
              understanding of the manner in which they will handle information about you. If you would
              like to review, rectify or request deletion of any Personal Information we have about you,
              you can submit a request by emailing MindWork360's privacy office at{' '}
              <a href="mailto:360mindwork@gmail.com">360mindwork@gmail.com</a>.
            </p>

            <h3>Recruitment</h3>
            <p>
              In connection with a job application or inquiry, whether advertised on a MindWork360 Web
              site or otherwise, you may provide us with information about yourself, such as a resume.
              We may use this information throughout MindWork360 and its group companies in order to
              address your inquiry or consider you for employment purposes.
            </p>

            <h3>Monitoring or Recording of Calls, Chats and Other Interactions</h3>
            <p>
              Certain online transactions may involve you calling us or us calling you. They may also
              involve online chats. Please be aware that it is MindWork360's general practice to monitor
              and in some cases record such interactions for staff training or quality assurance purposes
              or to retain evidence of a particular transaction or interaction.
            </p>
          </div>

          <div className="legal-section">
            <h2>Mobile Applications and Use of Information in the Social Computing Environment</h2>
            <p>
              MindWork360 makes available mobile applications for download from various mobile
              application marketplaces. MindWork360 also provides social computing tools on some of
              its websites to enable collaboration among members who have registered to use them.
              These include forums, wikis, blogs and other social media platforms.
            </p>
            <p>
              When downloading and using these applications or registering to use these social computing
              tools, you may be asked to provide certain personal information. These applications and
              tools may also include supplemental privacy statements with specific information about
              collection and handling practices. We encourage you to read those supplemental statements
              to understand how the tools and applications may process your data.
            </p>
            <p>
              Any other content you post, such as pictures, information, opinions, or any other type of
              personal information that you make available to other participants on these social platforms
              or applications, is not subject to this Privacy Statement. Rather, such content is subject
              to the terms of use of those applications or platforms, and any additional guidelines and
              privacy information provided in relation to their use, as well as the process by which you
              can remove your content from such tools. You should be aware that the content you post on
              any such social computing platforms may be made broadly available to others inside and
              outside MindWork360.
            </p>
          </div>

          <div className="legal-section">
            <h2>Protect the Rights and Property</h2>
            <p>
              We may also use or share your information to protect the rights or property of MindWork360,
              our business partners, suppliers, clients, or others when we have reasonable grounds to
              believe that such rights or property have been or could be affected. In addition, we
              reserve the right to disclose your personal information as required by law and when we
              believe that disclosure is necessary to protect our rights, or the rights of others, or
              to comply with a judicial proceeding, court order, law enforcement or legal process.
            </p>
          </div>

          <div className="legal-section">
            <h2>Sharing of Personal Information</h2>
            <p>
              MindWork360 will not sell, rent or lease your personal information to others.
            </p>
            <p>
              As a global organization with business processes, management structures and technical
              systems that cross borders, MindWork360 may share information about you within MindWork360
              and transfer it to countries in the world where we do business in connection with the
              uses identified above and in accordance with this Privacy Statement. Our Privacy Statement
              and our internal policies and practices are designed to provide a globally consistent level
              of protection for personal information all over the world. Even in countries whose laws
              provide for less protection for your information, MindWork360 will still handle and protect
              your information in the manner described in this Privacy Statement.
            </p>
            <p>
              MindWork360 retains service providers, suppliers, and other alliance partners located in
              various countries to manage or support its business operations, provide professional
              services, deliver customer services and solutions, and otherwise process information on
              MindWork360's behalf. It is MindWork360's practice to require such service providers,
              suppliers and alliance partners to handle personal data and other confidential information
              in a manner consistent with MindWork360's policies.
            </p>
            <p>
              Circumstances may arise where, whether for strategic or other business reasons, MindWork360
              decides to sell, buy, merge or otherwise reorganize businesses in some countries. Such a
              transaction may involve the disclosure of personal information to prospective or actual
              purchasers, or the receipt of such information from sellers. It is MindWork360's practice
              to seek appropriate protection for information in these types of transactions.
            </p>
            <p>
              Please be aware that in certain circumstances, personal information may be subject to
              disclosure to government agencies pursuant to judicial proceeding, court order, law
              enforcement or legal process. We may also share your information to protect the rights or
              property of MindWork360, our business partners, suppliers or clients, and others when we
              have reasonable grounds to believe that such rights or property have been or could be affected.
            </p>
          </div>

          <div className="legal-section">
            <h2>Choices and Privacy Preferences</h2>
            <p>
              Registration is not required to gain access to MindWork360 websites. However, if you
              choose to receive certain services, specific material and information your subscription
              is required on certain MindWork360 websites.
            </p>
            <p>
              In this regard, MindWork360 may collect personal information from you including your
              name, phone number, email address, or other information you choose to provide at various
              times, for example, when you complete an online form or request or participate in an
              online community.
            </p>
            <p>
              You can make or change your choices about receiving either subscription or general
              communications at the data collection point, within your account preference settings or
              by using other methods, which are listed in this Privacy Statement. You may opt-out at
              any time using the links at the bottom of any email.
            </p>
            <p>
              Please note, this option does not apply to communications primarily for the purpose of
              administering business relationships, including contracts, support, or other administrative
              and transactional notices where the primary purpose of these communications is not
              promotional in nature.
            </p>
          </div>

          <div className="legal-section">
            <h2>International Data Transfers</h2>
            <p>
              MindWork360 recognizes and respects the varying national laws and obligations and their
              impact on cross-border data transfers. When transferring personal information outside of
              the country of collection for the purposes identified above, MindWork360 will do so in
              compliance with applicable law.
            </p>
            <p>
              In the development of MindWork360's privacy policies and standards, we respect and take
              into account the major privacy and data protection principles and frameworks around the
              world and any amendments applied thereto from time-to-time, including the OECD Guidelines
              on the Protection of Privacy and Transborder Flows of Personal Data, the EU General Data
              Protection Regulation (GDPR), the UK Data Protection Act 2018, the APEC Privacy Framework,
              Canada's Personal Information Protection and Electronic Documents Act (PIPEDA), and the
              Australian Privacy Principles under the Privacy Act 1988.
            </p>

            <h3>EU Personal Data Transfers</h3>
            <p>
              For personal data originating from a European Union (EU) member state, MindWork360 uses
              a variety of lawful data transfer mechanisms for this purpose, including EU Standard
              Contractual Clauses.
            </p>
            <p>
              MindWork360 has an intragroup agreement on the transfer and processing of personal data
              within the MindWork360 group worldwide which has the EU Standard Contractual Clauses
              incorporated. This agreement allows MindWork360 to ensure that personal data, including
              data originating from the EU, which is transferred cross-border and processed by other
              MindWork360 group companies, including those located outside the EU, is adequately
              protected in accordance with applicable data protection law.
            </p>
          </div>

          <div className="legal-section">
            <h2>Privacy Shield Framework</h2>
            <p><strong>A message to our customers about EU–US Privacy Shield</strong></p>
            <p>
              The recent decision of the European Court of Justice (ECJ) invalidating the standing
              Privacy Shield framework — in place to streamline and legitimize data transfers between
              the US and EU member nations — has caused substantial uncertainty and concern across all
              industries and companies.
            </p>
            <p><strong>Facts:</strong></p>
            <p>
              On July 16, 2020, the European Court of Justice (ECJ) ruled the "Privacy Shield" to be
              invalid. There are alternative means to legitimize EU-US personal data transfers,
              including obtaining an individual's informed and freely given consent, the use in data
              transfer agreements of the EU standard contractual clauses ("SCCs"), or "binding
              corporate rules."
            </p>
            <p>
              Although MindWork360 had been certified for compliance with the Privacy Shield framework,
              we have used and maintained properly executed data transfer agreements, including the
              SCCs, to legitimize all of our customer personal data transfers globally, including those
              that were necessary to conduct customer and company business between the US and EU nations.
              These agreements continue in full force and effect today.
            </p>
            <p><strong>Implications:</strong></p>
            <p>
              We already have EU standard contractual clauses in place between our EU and US entities
              to legitimize transfers of the personal data which we receive in the US from our customers
              located within the EU / Switzerland. We will continue to rely on these agreements. We are
              comfortable that the ECJ's judgement does not impact on the validity of our reliance on
              the EU's standard contractual clauses, which enable data subjects to enforce their rights
              under the law of the EU Member State in which the exporting party is established.
            </p>
            <p><strong>MindWork360's response:</strong></p>
            <p>
              At MindWork360, our commitment to privacy goes beyond the minimum legal and regulatory
              requirements. Highlights of our approach include: ISO 27001 certified, tier IV classified
              data centers and delivery centers around the world to host and manage customer data; first
              class services including built-in privacy and data protection; a strong and robust global
              service delivery model; comprehensive and cohesive compliance standards ensuring consistent
              privacy and data protection across all businesses and jurisdictions; and a one-stop point
              of contact for any privacy related matters.
            </p>
            <p>
              If you have specific questions, please feel free to send an email to:{' '}
              <a href="mailto:360mindwork@gmail.com">360mindwork@gmail.com</a>.
            </p>
            <p>
              MindWork360, and all other U.S. based MindWork360 entities and affiliates ('covered
              MindWork360 entities'), comply with the EU-U.S. Privacy Shield Framework as set forth
              by the U.S. Department of Commerce regarding the collection, use, and retention of
              personal information transferred from the European Union to the United States. If there
              is any conflict between the terms in this Enterprise Online Privacy Statement and the
              Privacy Shield Principles, the Privacy Shield Principles shall govern.
            </p>

            <h3>MindWork360 U.S. based entities covered under Privacy Shield</h3>
            <p>All U.S. subsidiaries with the MindWork360 brand.</p>

            <h3>Enforcement, Independent Recourse Mechanism and Liability</h3>
            <p>
              <strong>Enforcement:</strong> MindWork360 is subject to the investigatory and enforcement
              powers of the Federal Trade Commission (FTC).
            </p>
            <p>
              <strong>Recourse Mechanism:</strong> In compliance with the Privacy Shield Principles,
              MindWork360, for itself and on behalf of the covered MindWork360 entities, commits to
              resolve complaints about its collection or use of personal information. EU individuals
              with inquiries or complaints regarding our Privacy Shield policy should first contact
              MindWork360's Privacy and Data Protection Office at:{' '}
              <a href="mailto:360mindwork@gmail.com">360mindwork@gmail.com</a>
            </p>
            <p>
              MindWork360, for itself and on behalf of the covered MindWork360 entities, has further
              committed to cooperate with EU data protection authorities (DPAs) with regard to
              unresolved Privacy Shield complaints. The services of EU DPAs are provided at no cost
              to you.
            </p>
            <p>
              <strong>Liability:</strong> In the context of an onward transfer, MindWork360, and any
              of the covered MindWork360 entities, has responsibility for the processing of personal
              information it receives under the Privacy Shield and subsequently transfers to a third
              party acting as an agent on its behalf.
            </p>
          </div>

          <div className="legal-section">
            <h2>Transfer of Personal Data from the United Kingdom to the U.S. post 'Brexit'</h2>
            <p>
              The European Council and the United Kingdom (UK) have agreed to extend the period for
              withdrawal of the UK from the European Union (EU) beyond March 29, 2019. During the
              extension period, the UK will remain a Member State of the EU; as a Member State, EU
              law will remain applicable to and in the UK, therefore transfers of personal data from
              the UK to the U.S. made under the Privacy Shield will remain legal until the date the
              UK and the EU implement the withdrawal ("Applicable Withdrawal Date").
            </p>
            <p>
              MindWork360 complies with the EU-U.S. Privacy Shield Framework ("Privacy Shield") as
              set forth by the U.S. Department of Commerce regarding the collection, use, and retention
              of personal information transferred from the European Union and the United Kingdom to the
              United States in reliance on Privacy Shield. To learn more about the Privacy Shield
              program, and to view our certification, please visit:{' '}
              <a href="http://www.privacyshield.gov" target="_blank" rel="noopener noreferrer">
                www.privacyshield.gov
              </a>
            </p>
          </div>

          <div className="legal-section">
            <h2>California Consumer Privacy Act – CCPA</h2>
            <p>
              MindWork360 is committed to the lawful treatment and confidential handling of sensitive
              information, including personal information about California residents, and has adopted
              a set of global information management policies including privacy and data protection,
              security, system access, information classification, and other relevant policies governing
              the collection, use, disclosure, transfer, retention, and deletion of information.
            </p>
            <p>
              MindWork360 as a "Service Provider" (as defined in the CCPA) confirms that it will
              process personal information which it retains, uses, or discloses in connection with its
              performance under any contract: (1) only on behalf of and for the benefit of the
              "Business" (as defined in the CCPA) from which it has received the personal information;
              (2) only in accordance with the contract and Business's prior written instructions, if
              any; unless (3) as otherwise required by the CCPA. MindWork360 confirms that it will
              not process personal information for any purpose other than for the specific purpose of
              performing the services specified in the contract.
            </p>
          </div>

          <div className="legal-section">
            <h2>Information Security, Accuracy, and Retention</h2>
            <p>
              Security is a high priority for MindWork360 and to protect the personal data and other
              confidential information and maintain its accuracy and integrity we have implemented
              appropriate administrative, technical and physical safeguards to prevent unauthorized
              access, use or disclosure. We require the same high standard of information security
              and information management of any third parties we share your data with.
            </p>
            <p>
              We will retain personal information only for as long as legally required or permitted
              and in accordance with MindWork360 records and information management policies. We
              respect your right to privacy and upon your request MindWork360 will no longer use your
              personal information unless required to provide you services or as necessary to comply
              with MindWork360's legal obligations, resolve complaints and disputes, and enforce our
              agreements.
            </p>
          </div>

          <div className="legal-section">
            <h2>Access to Your Personal Information</h2>
            <p>
              MindWork360 has implemented technology, management processes and policies aimed to
              maintain data accuracy. According to applicable laws, MindWork360 provides individuals
              with reasonable access to personal information that they provided to MindWork360 and
              the reasonable ability to review and correct the data or ask for anonymization, blockage,
              or deletion, as applicable. To protect your privacy and security when submitting an
              access request, we will take reasonable steps to verify your identity before granting
              access to your data. To submit your access request, please contact the MindWork360
              Global Privacy and Data Protection Office at{' '}
              <a href="360mindwork@gmail.com">360mindwork@gmail.com</a>.
            </p>
          </div>

          <div className="legal-section">
            <h2>Dispute Resolution</h2>
            <p>
              MindWork360 is committed to resolve any complaints you may have in relation to your
              privacy and MindWork360's collection and use of your personal information. Please send
              any privacy related complaints or requests, including request for access to information
              to <a href="360mindwork@gmail.com">360mindwork@gmail.com</a>.
            </p>
            <p>
              EU/Swiss individuals may also reach out their national privacy authorities and ask for
              their support. MindWork360 is committed to coordinate and collaborate with foreign
              regulators, including EU member state privacy authorities.
            </p>
          </div>

          <div className="legal-section">
            <h2>Children's Privacy</h2>
            <p>
              This site is intended for adult use only. MindWork360 does not knowingly collect
              information from children as defined by local law, and does not target its websites,
              social computer tools or mobile applications to children under these ages. We encourage
              parents and guardians to take an active role in their children's online and mobile
              activities and interests and ask that minors should not submit any personal information.
            </p>
          </div>

          <div className="legal-section">
            <h2>Cookies, Web Beacons and Other Technologies</h2>
            <p>
              A cookie is a string of information that a web site saves on a visitor's computer and
              then the visitor's browser provides to the web site operator each time the visitor
              returns to the information collecting web site. When MindWork360 collects cookies or
              makes use of a browser's local storage capabilities, they help MindWork360 identify
              visitors, their usage of the site, and their Web site access preferences. MindWork360
              may also use information derived from cookies or local storage to direct the visitor to
              information similar to what they visited and thereby market MindWork360 products and
              services by personalizing the experience on the visitor's web page on MindWork360's
              site. Visitors will be offered the opportunity to control cookie placement. Visitors who
              do not wish to have any cookies placed on their computers should set their browsers to
              refuse cookies before using MindWork360's web site, with the drawback that certain
              features of the web site may not function properly without the aid of cookies. Visitors
              that want to limit third party advertising cookies can enable their browser's "Do Not
              Track" functionality.
            </p>
            <p>
              Pages on MindWork360's web site will occasionally embed content from third party sites,
              such as Instagram, Facebook, Pinterest, YouTube for videos and other third party websites.
              MindWork360's web site also allows for content to be shared through social networks but
              only at your request. Embedding and sharing content may result in cookies being set by
              those third party sites. MindWork360 does not control the dissemination of those cookies.
              Please visit these third party sites if you wish to learn more about their use of cookies
              and similar tools.
            </p>
            <p>
              Please note that the web site is constantly being updated and this list will change over
              time. If you have any additional questions about the use of a particular cookie please do
              not hesitate to email{' '}
              <a href="mailto:360mindwork@gmail.com">360mindwork@gmail.com</a>.
            </p>
          </div>

          <div className="legal-section">
            <h2>Online Advertising</h2>
            <p>
              MindWork360 makes use of third party advertising systems to promote content on this
              website. These services will often make use of cookies and pixel tags to provide targeted
              advertisements based on your activities and interests. MindWork360 does not permit third
              parties to advertise on this site but we do use external sites to advertise our products
              and services. Please visit these third party sites for additional details regarding their
              privacy policies and practices.
            </p>
          </div>

          <div className="legal-section">
            <h2>External Links</h2>
            <p>
              MindWork360 sites or services may provide links to third-party applications, products,
              services, or websites for your convenience and information. MindWork360 does not control
              those third party sites or their privacy practices, which may differ from MindWork360's
              practices. We do not endorse or make any representations about third-party sites and
              privacy practices. The personal data you choose to provide to or that is collected by
              these third parties is not covered by this MindWork360 Privacy Statement. We encourage
              you to review the privacy policy of any site you interact with before allowing the
              collection and use of your personal information.
            </p>
            <p>
              We may also provide social media features that enable you to share information with your
              social networks and to interact with MindWork360 and its group companies on various social
              media sites. Your use of these features may result in the collection or sharing of
              information about you, depending on the feature. We encourage you to review the privacy
              policies and settings on the social media sites with which you interact to make sure you
              understand the information that may be collected, used, and shared by those sites.
            </p>
          </div>

          <div className="legal-section">
            <h2>Notification of Changes</h2>
            <p>
              We will post a notice for 30 days at the top of this page notifying users when this
              Privacy Statement is updated or modified in a material way. If we are going to use your
              personal information in a manner different from that stated at the time of collection,
              we will notify you, and you will have, subject to legal and/or contractual provisions,
              a choice as to whether or not we can use your personal information in such a way.
            </p>
          </div>

          <div className="legal-section">
            <h2>Inquiries and Contact</h2>
            <p>
              We value your opinion. If you have any comments or questions about this Privacy
              Statement, MindWork360's handling of your personal information, or a possible breach of
              your privacy you can send an email to the MindWork360 Global Privacy and Data Protection
              Office at{' '}
              <a href="mailto:360mindwork@gmail.com">360mindwork@gmail.com</a>.
            </p>
            <p>
              Individuals living inside the EU and Switzerland seeking further information, guidance
              and advice may also contact their local privacy authorities.
            </p>
            <p>
              We will treat your requests or complaints confidentially. Our representative will contact
              you within a reasonable time after receipt of your complaint to address your concerns and
              outline options regarding how they may be resolved. We will aim to ensure that your
              complaint is resolved in timely and appropriate manner.
            </p>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;
