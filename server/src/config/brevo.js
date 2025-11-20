import axios from "axios";

export const brevoClient = axios.create({
  baseURL: "https://api.brevo.com/v3",
  headers: {
    "api-key": process.env.BREVO_API_KEY,
    "Content-Type": "application/json",
    "accept": "application/json",
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
    const payload = {
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
    };

    if (html) {
      payload.htmlContent = html;
    } else if (text) {
      payload.textContent = text;
    }

    const response = await brevoClient.post("/smtp/email", payload);

    console.log("✅ Email enviado a:", to);
    return response.data;
  } catch (error) {
    console.error("❌ Error enviando email:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Error sending email");
  }
};