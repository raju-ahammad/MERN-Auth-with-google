var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');

const apiKey = process.env.SENDGRID_API_KEY

var options = {
    auth: {
        api_key: apiKey
    }
}
 
var mailer = nodemailer.createTransport(sgTransport(options));



const sendEmail = (to) => {
    var email = {
        to: to,
        from: 'rajuahammad036@gmail.com',
        subject: 'Post A New Alert',
        text: 'Job Up Post A New Job',
        html: `
        <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
            <h2 style="text-align: center; text-transform: uppercase;color: teal;">Welcome to the JobUp</h2>
            
            <p>Job Up POst A new Job. PLease check all the job</p>
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