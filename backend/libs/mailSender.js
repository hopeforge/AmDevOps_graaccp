
var nodemailer = require('nodemailer');

const sender = 'youremail@gmail.com'

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: sender,
        pass: 'yourpassword'
    }
});

const sendMail = (userList, title, body, hbody) => new Promise((resolve, reject) => {

    try {
        userList.forEach(user => {
            var mailOptions = {
                from: sender,
                to: user,
                subject: title,
                text: body,
                html: hbody
            };
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
        });

        resolve(userList)
    } catch (error) {
        reject(error)
    }

})

module.exports = {
    sendMail
}