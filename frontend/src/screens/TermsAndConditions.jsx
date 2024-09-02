import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useFrontEndContext } from "../context/FrontEndContext";

function TermsAndConditions() {
  const termsAndConditionsData = [
    {
      title: 'User Account Creation:',
      content:
        'Users can create an account on Zyacom by providing personal information. Admin reviews this information to verify user authenticity.',
    },
    {
      title: 'Appointment Booking:',
      content:
        'Users can schedule appointments with experts. The appointment process begins by selecting an expert from the list.',
    },
    {
      title: 'Appointment Process:',
      content:
        ` To complete an appointment, users must maintain a balance in their Zyacom wallet.
         Users can deposit funds using Visa or debit cards.`,
    },
    {
      title: 'Payment Handling:',
      content:
        `   Payment processes are facilitated by the third-party Stripe API, integrated into Zyacom.
        Zyacom is not liable for any fraud or scams during appointments.`,
    },
    {
      title: 'Semi-Decentralized Platform:',
      content:
        `Zyacom operates as a semi-decentralized platform.
        `,
    },
    {
      title: 'Expert Registration:',
      content:
        `Zyacom ensures legal registration of experts. Skill and KYC verification is conducted during the registration process.`,
    },
    {
      title: 'Verification Process:',
      content:
        `Experts undergo various verification steps, including submitting skill certificates and completing the KYC process.`,
    },
    {
      title: 'Portfolio Management:',
      content:
        `Experts can create and manage portfolios on Zyacom.`,
    },
    {
      title: 'Appointment Pricing and Earnings:',
      content:
        `Experts can set prices for appointments and earn money by completing appointments with users.`,
    },
    {
      title: 'Time Management:',
      content:
        `Experts can manage their schedules based on availability.`,
    },
    {
      title: 'Withdrawal Process:',
      content:
        `Experts can withdraw earnings to their bank accounts by providing valid details on Zyacom.The Zyacom algorithm automatically facilitates withdrawals without accessing bank information on the backend.`,
    },
    {
      title: 'Commissions and Transactions:',
      content:
        `Zyacom charges certain commissions per appointment. All transactions are controlled by the third-party Stripe API.`,
    },
    {
      title: 'User and Expert Responsibilities:',
      content:
        `Users and experts are responsible for the accuracy and truthfulness of the information provided during registration. Users must ensure the confidentiality of their account information, including passwords.
        `,
    },
    {
      title: 'Content Submission:',
      content:
        `Users and experts may submit content such as reviews and feedback on Zyacom. Submitted content must comply with the platform's guidelines and policies.`,
    },
    {
      title: 'Third-Party Links:',
      content:
        `Zyacom may include links to third-party websites for user convenience. Zyacom does not endorse or take responsibility for the content, privacy policies, or practices of these third-party websites.`,
    },
    {
      title: 'Modification or Termination of Service:',
      content:
        'Zyacom reserves the right to modify, suspend, or discontinue any part of the service at any time without notice. Zyacom is not liable for any loss or inconvenience resulting from modifications or service interruptions.',
    },
    {
      title: 'User Conduct:',
      content:
        'Users and experts agree not to engage in any unlawful activities on Zyacom. Any abusive, harassing, or harmful behavior is strictly prohibited.',
    },
    {
      title: 'Data Security:',
      content:
        'Zyacom employs security measures to protect user and expert data. However, users and experts are encouraged to take their own precautions, such as using strong passwords and not sharing sensitive information.',
    },
    {
      title: 'Updates and Notification:',
      content:
        'Zyacom will notify users and experts of any changes to these terms and conditions. Continued use of the platform constitutes acceptance of the revised terms.',
    },
    {
      title: 'Disclaimer of Warranty:',
      content:
        'Zyacom provides the platform "as is" and does not guarantee its suitability for specific purposes. Users and experts use Zyacom at their own risk.',
    },
    {
      title: 'Limitation of Liability:',
      content:
        'Zyacom is not liable for any direct, indirect, incidental, consequential, or punitive damages arising from the use of the platform.',
    },
    {
      title: 'Severability:',
      content:
        'If any provision of these terms is found to be invalid or unenforceable, the remaining provisions remain in full force and effect.',
    },
    {
      title: 'Content Submission:',
      content:
        `Users and experts may submit content such as reviews and feedback on Zyacom. Submitted content must comply with the platform's guidelines and policies.`,
    },

  ];
  const { websiteData} = useFrontEndContext();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header start */}
      <Header />
      {/* Header End */}

      <section className="tk-main-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              {websiteData ? (
                <div dangerouslySetInnerHTML={{ __html: websiteData?.terms_and_condition }} />

              ):(<p>Loading...</p> ) }

             
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

const TermsAndConditionsDataCompo = ({ data }) => {
  return (
    <div >
      {data.map((section, index) => (
        <div key={index} className="mt-4">
          <h4>
            <strong>{section.title}</strong>
          </h4>
          <p>{section.content}</p>
        </div>
      ))}
    </div>
  );
};

export default TermsAndConditions;
