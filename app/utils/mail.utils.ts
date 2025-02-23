import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

const transporter = nodemailer.createTransport({
  service: process.env.MAIL_SERVICE,
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
  tls: { rejectUnauthorized: false },
} as SMTPTransport.Options);

type SendEmailProps = {
  sender: Mail.Address;
  //   recepients: Mail.Address[];
  recepients: string;
  subject: string;
  message: string;
};

export const sendMail = async ({
  sender,
  recepients,
  subject,
  message,
}: SendEmailProps) => {
  return await transporter.sendMail({
    from: sender,
    to: recepients,
    subject,
    html: `<h1>${message}</h1>`,
    text: message,
  });
};
