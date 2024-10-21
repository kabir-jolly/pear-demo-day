import axios from "axios";

const SENDGRID_API_KEY =
  "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";
const SENDGRID_API_URL = "https://api.sendgrid.com/v3/mail/send";

interface Founder {
  name: string;
  email: string;
  linkedIn: string;
  photo: string;
}

interface Company {
  logo: string;
  name: string;
  website: string;
  shortDescription: string;
  longDescription: string;
  pitchVideo: string;
  founders: Founder[];
}

interface Investor {
  name: string;
  email: string;
}

export const sendIntroEmail = async (investor: Investor, company: Company) => {
  const recipientEmail = "kabir.s.jolly@gmail.com"; // Set recipient email to a variable
  const data = {
    personalizations: [
      {
        to: [{ email: recipientEmail }], // Use the variable for the recipient email
        subject: `Introduction request from ${investor.name}`,
      },
    ],
    from: { email: investor.email },
    content: [
      {
        type: "text/plain",
        value: `Hello ${company.founders[0].name},\n\nI'm ${investor.name}, an investor interested in your company ${company.name}. I'd love to schedule a meeting to discuss your venture further.\n\nBest regards,\n${investor.name}`,
      },
    ],
  };

  try {
    await axios.post(SENDGRID_API_URL, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${SENDGRID_API_KEY}`,
      },
    });
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
