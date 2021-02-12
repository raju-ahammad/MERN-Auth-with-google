const nodemailer = require('nodemailer');
const {google} = require('googleapis');
const {OAuth2} = google.auth;

const OAUTH_PALYGROUND = "https://developers.google.com/oauthplayground"

const {
    MAILING_SERVICE_CLIENT_ID,
    MAILING_SERVICE_CLIENT_SECRET,
    MAILING_SERVICE_REFRESH_TOKEN,
    SENDER_EMAIL_ADRESS
} = process.env

const oauth2Client = new OAuth2(
    MAILING_SERVICE_CLIENT_ID,
    MAILING_SERVICE_CLIENT_SECRET,
    MAILING_SERVICE_REFRESH_TOKEN,
    OAUTH_PALYGROUND
)

//send mail
const sendEmail = (to, url) => {
    oauth2Client.setCredentials({
        refresh_token: MAILING_SERVICE_REFRESH_TOKEN
    })

    const accessToken = oauth2Client.getAccessToken();
    const smtpTransPort = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: SENDER_EMAIL_ADRESS,
            clientId: MAILING_SERVICE_CLIENT_ID,
            clientSecret: MAILING_SERVICE_CLIENT_SECRET,
            refreshToken: MAILING_SERVICE_REFRESH_TOKEN,
            accessToken
        }
    })

    const mailOptions = {
        from : SENDER_EMAIL_ADRESS,
        to: to,
        subject: "Test email",
        html: `
        <div>
            <h2>Welcome to jobup</h2>
            <p>Congratulations ! </p>
            <a href=${url}>click here</a>
            <div>${url}</div>
        </div>
        `
    }

    smtpTransPort.sendMail(mailOptions, (err, info) => {
        if(err) return err;
        return info
    })
}

module.exports = sendEmail