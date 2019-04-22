// using SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs

import sendgridMail from '@sendgrid/mail';

async function sendEmailRegistration(userEmail, verificationCode) {
  //BUG? For some reason i just can send e-mails if I set the api key everytime...
  sendgridMail.setApiKey(process.env.SENDGRID_API_KEY);

  const linkActivacion = `http://localhost:3000/account/activate?verification_code=${verificationCode}`;
  const msg = {
    to: userEmail,
    from: {
      email: 'feraiwa@sendgrid.com',
      name: 'Social Network :)',
    },
    subject: 'Welcome to Hack a Bos Social Network',
    text: 'Start meeting people of your interests',
    html: `To confirm the account <a href="${linkActivacion}">activate it here</a>`,
  };
  const data = await sendgridMail.send(msg);
  return data;
}

export const emailService = { sendEmailRegistration }