const http = require("http");
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

const server = http.createServer((request, response) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465, // SSL port
        secure: true, // Use true for port 465, false for 587
        auth: {
            user: "", // Replace with your Gmail
            pass: "",    // Replace with your app password
        },
    });

    // Read the HTML template from the file
    const htmlTemplatePath = path.join(__dirname, "emailTemplate.html");
    fs.readFile(htmlTemplatePath, "utf8", (err, htmlContent) => {
        if (err) {
            console.error("Error reading email template:", err);
            response.writeHead(500, { "Content-Type": "text/plain" });
            response.end("Failed to read email template.");
            return;
        }

        const mailOptions = {
            from: "",  // Sender email
            to: "", // Receiver email
            subject: "Your Application Has Been Shortlisted",
            html: htmlContent, // Use the read HTML content
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Error sending email:", error);
                response.writeHead(500, { "Content-Type": "text/plain" });
                response.end("Failed to send email.");
                return;
            }
            console.log("Email sent successfully:", info.response);
            response.writeHead(200, { "Content-Type": "text/plain" });
            response.end("Email sent successfully.");
        });
    });
});

server.listen(8080, () => {
    console.log("Server is running on port 8080");
});
