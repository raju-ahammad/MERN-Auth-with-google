var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');

const apiKey = process.env.SENDGRID_API_KEY

var options = {
    auth: {
        api_key: apiKey
    }
}
 
var mailer = nodemailer.createTransport(sgTransport(options));



const sendEmail = (to, url, txt) => {
    var email = {
        to: to,
        from: 'rajuahammad036@gmail.com',
        subject: 'Test Mail',
        text: 'Job Up test mail',
        html: `
        <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
            <h2 style="text-align: center; text-transform: uppercase;color: teal;">Welcome to the JobUp</h2>
            <p>Congratulations! You're almost set to start using JOBUP.
                Just click the button below to validate your email address.
            </p>
            
            <a href=${url} style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">${txt}</a>
        
            <p>If the button doesn't work for any reason, you can also click on the link below:</p>
        
            <div>${url}</div>
        </div>
        `
    };
     
    mailer.sendMail(email, function(err, res) {
        if (err) { 
            console.log(err) 
        }
        console.log(res);
    });
}

module.exports = sendEmail