import sendgridMail from '@sendgrid/mail';
// using SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs

async function sendEmailRegistration(userEmail, verificationCode) {
  // BUG? For some reason i just can send e-mails if I set the api key everytime...
  sendgridMail.setApiKey(process.env.SENDGRID_API_KEY);

  const linkActivacion = `${process.env.SERVER}/account/activate?verification_code=${verificationCode}`;
  const msg = {
    to: userEmail,
    from: {
      email: 'tururu.registration@yopmail.com',
      name: 'Tururú Team',
    },
    subject: 'Welcome to Tururú!',
    text: 'We are happy to have you on board!',
    html: `
    <p>Hello !</p>
    <p> We are very glad to have you onboard...! </p>
    Just one extra step before you can start creating your projects.
    <p> Confirm verify your account by clicking the <a href="${linkActivacion}">following link</a> </p>
    <p>Thanks...!</p>
    <p>Fer  <i>(Tururú Team)</i></p>
    `,
  };
  const data = await sendgridMail.send(msg);

  return data;
}

const emailService = {
  sendEmailRegistration,
};
export default emailService;
