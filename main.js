// app.js
const nodemailer = require("nodemailer");
require("dotenv").config();

// Configure transport for Zoho Mail
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVICE,
  port: process.env.EMAIL_PORT,
  secure: true, // true for 465 (SSL); use secure: false for 587 (TLS)
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Email sending function
const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"Your App" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    });
    console.log("Message sent: %s", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

// Main function to send an email
const main = async () => {
  try {
    const to = "sangsakawira@gmail.com";
    const subject = "Welcome to Our Service!";
    const text = "Thank you for signing up!";
    const html = "<p>Thank you for <b>signing up!</b></p>";

    const result = await sendEmail(to, subject, text, html);
    console.log("Email sent successfully:", result);
  } catch (error) {
    console.error("Failed to send email:", error);
  }
};

main();