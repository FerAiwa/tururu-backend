import sendgridMail from '@sendgrid/mail';
// using SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs

async function sendEmailRegistration(userEmail, verificationCode) {
  // BUG? For some reason i just can send e-mails if I set the api key everytime...
  sendgridMail.setApiKey(process.env.SENDGRID_API_KEY);

  const linkActivacion = `${process.env.SERVER}/account/activate?verification_code=${verificationCode}`;
  console.log('sengrid', linkActivacion);
  const msg = {
    to: userEmail,
    from: {
      email: 'feraiwa@sendgrid.com',
      name: 'Tururú Team',
    },
    subject: 'Welcome to Tururú!',
    text: 'We are happy to have you on board!',
    html: `
    Just one extra step before we begin.
    Confirm your account by just clicking the <a href="${linkActivacion}">following link</a>
    Thanks!

    Fer  (Tururú Team)
    `,
  };
  const data = await sendgridMail.send(msg);
  return data;
}

const emailService = {
  sendEmailRegistration,
};
export default emailService;
