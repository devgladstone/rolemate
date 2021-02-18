import sgMail from "@sendgrid/mail";

const {
  SENDGRID_API_KEY,
  SENDGRID_VERIFIED_SENDER,
  SENDGRID_CONFIRMATION_TEMPLATE_ID,
  DOMAIN,
} = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

export function sendConfirmation(email, verificationCode) {
  const msg = {
    to: email, // Change to your recipient
    from: SENDGRID_VERIFIED_SENDER, // Change to your verified sender
    template_id: SENDGRID_CONFIRMATION_TEMPLATE_ID,

    dynamic_template_data: {
      subject: "Welcome to rolemate.",
      preheader: "Activate your account.",
      verifyUrl: `${DOMAIN}/activate?code=${verificationCode}&email=${email}`,
    },
    hideWarnings: true // hide warnings about content needing {{{}}}
  };
  return sgMail.send(msg);
}
