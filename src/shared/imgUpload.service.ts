import * as nodemailer from "nodemailer";

export class ImgUploadService {
transporter: any;

constructor() {
    this.transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_APP_PASSWORD,
        },
    });
}


async sendEmail(to: string, subject: string, html: string) {
    try {
        const mailOptions = {
            from: process.env.GMAIL_USER,
            to,
            subject,
            html,
        };

        await this.transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
}


}