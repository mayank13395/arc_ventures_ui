const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const cors = require('cors')({origin: true});
const smtpTransport = require('nodemailer-smtp-transport');
admin.initializeApp();

/**
* Here we're using Gmail to send 
*/
let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  requireTLS: true,
    auth: {
        user: 'kumar.mayank1339510@gmail.com',
        pass: 'mayank@123456'
    }
});


// exports.sendMail = functions.https.onRequest((req, res) => {
//     cors(req, res, () => {

//         console.log(req.query.data);
        
      
//         // getting dest email by query string
//         const dest = req.query.dest;

//         let data = req.query.data;

//         const mailOptions = {
//             from: 'code.digishala@gmail.com', // Something like: Jane Doe <janedoe@gmail.com>
//             to: dest,
//             subject: 'Arc-Venture-Mail', // email subject
//             html:`<p>User name:   ${data.name}</p>
//             <br/>

//             <p> User Email: ${data.email} </p>
//             <br/>

//             <p>About: ${data.subject} </p>
//             <br/>

//             <p>Message: ${data.message} </p>
//             <br/>          
//         ` // email content in HTML
//         };
  
//         // returning result
//         return transporter.sendMail(mailOptions, (erro, info) => {
//             if(erro){
//                 return res.send(erro.toString());
//             }
//             return res.send('Sended');
//         });
//     });    
// });





exports.addMessage = functions.https.onCall((data, context) => {
  
      
        // getting dest email by query string
        // const dest = req.query.dest;

        console.log('data 1232142::',data);
        

        const mailOptions = {
            from:  'kumar.mayank1339510@gmail.com', // Something like: Jane Doe <janedoe@gmail.com>
            to: data.email,
            subject: `${data.name} has sent you a message`, // email subject
            text : `${data.message}`
        };
  
        // returning result
         transporter.sendMail(mailOptions, (erro, info) => {
            if(erro){
                console.log('erro32::',erro.message);
                return erro;
                
                // return res.send(erro.toString());
            }else if(info) {
                console.log('info::',info.response);
                
                return 'successful';
            }
            
        });
    }); 
 





exports.emailMessage = functions.https.onRequest((req, res) => {
  const { name, email, sub, message } = req.body;
  return cors(req, res, () => {
    var text = `<div>
      <h4>Information</h4>
      <ul>
        <li>
          Name - ${name || ""}
        </li>
        <li>
          Email - ${email || ""}
        </li>
        <li>
          Subject - ${sub || ""}
        </li>
      </ul>
      <h4>Message:</h4>
      <p>${message || ""}</p>
    </div>`;
    //  var sesAccessKey = 'YOURGMAIL@gmail.com';
    //  var sesSecretKey = 'password';

     var transporter = nodemailer.createTransport(smtpTransport({
      service: 'gmail',
      auth: {
          user: 'code.digishala@gmail.com',
          pass: 'TempPass@123',
        
      }
    }));
    const mailOptions = {
      to: `${email}`,
      from: "no-reply@myemail.com",
      subject: `${name} sent you a new message`,
      text: text,
      html: text
    };
    
    transporter.sendMail(mailOptions, function(error, info){
     if(error){
        console.log(error.message);
     }
     res.status(200).send({
       message: "success"
     })
    });
  }).catch(() => {
    res.status(500).send("error");
  });
});