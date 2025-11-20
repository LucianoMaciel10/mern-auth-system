import axios from "axios";

export const brevoClient = axios.create({
  baseURL: "https://api.brevo.com/v3",
  headers: {
    "api-key": process.env.BREVO_API_KEY,
    "Content-Type": "application/json",
  },
});

/**
 * Send email via Brevo
 * @param {string} to - recipient email
 * @param {string} subject - subject of the email
 * @param {string} text - plain text content
 * @param {string} html - html content
 */
export const sendEmailBrevo = async ({ to, subject, text, html }) => {
  try {
    await brevoClient.post("/smtp/email", {
      sender: {
        email: process.env.SENDER_EMAIL,
        name: "MERN Auth System",
      },
      to: [
        {
          email: to,
        },
      ],
      subject,
      textContent: text || undefined,
      htmlContent: html || undefined,
    });

    console.log("Email enviado a:", to);
  } catch (error) {
    console.error(error.response?.data || error);
    throw new Error("Error sending email");
  }
};
