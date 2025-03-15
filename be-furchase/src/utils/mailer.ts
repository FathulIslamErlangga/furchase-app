import nodemailer from "nodemailer";
import "dotenv/config";
export const sendMailForgotPassword = async (email: string, token: string) => {
  console.log("sending to email");
  const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER!,
      pass: process.env.EMAIL_PASS!,
    },
  });

  const verifications = `${process.env.PATH_URL}/api/forgot-password?token=${token}`;

  const mailOpstion = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Forgot Password",
    html: ` <h1>Forgot to Passwrod</h1>
  <p>Please click the link below to reset password </p>
  <a href=${verifications}>change password</a>`,
  };

  const info = await transport.sendMail(mailOpstion);
  console.log("send to email succsessfuly:", info);
};
