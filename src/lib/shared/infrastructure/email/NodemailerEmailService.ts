import { EmailOptions, EmailRetStatus, IEmailService } from "../../application/email/IEmailService";
import * as nodemailer from 'nodemailer'

export type EmailServiceConfigInfo = {
    host: string, 
    port: number, 
    fromAddress: string, 
    service: string,
    secure: boolean 
    auth: { 
        user: string, 
        pass: string,
    }
}

export class NodemailerEmailService implements IEmailService{
    
    private transporter: nodemailer.Transporter;
    private fromAddress: string;
    
    constructor( emailServiceInfo: EmailServiceConfigInfo ){

        if (!emailServiceInfo.host || !emailServiceInfo.port || !emailServiceInfo.auth.user || !emailServiceInfo.auth.pass || !emailServiceInfo.fromAddress) {
            console.error('Missing essential email service configuration info.');
            throw new Error('Email service configuration is incomplete.');
        }

        this.transporter = nodemailer.createTransport({ 
            host: emailServiceInfo.host,
            port: emailServiceInfo.port,
            secure: emailServiceInfo.secure,
            auth: {
                user: emailServiceInfo.auth.user,
                pass: emailServiceInfo.auth.pass,
            },
        });

        this.fromAddress = emailServiceInfo.fromAddress;

        this.transporter.verify((error,) => {
            if (error) {
                console.error('Error connecting to email server:', error);
            } else {
                console.log('Email server connection successful. Ready to send emails.');
            }
        });
    }

    public async send(opts: EmailOptions): Promise<EmailRetStatus> {
        try {
            const res: nodemailer.SentMessageInfo = await this.transporter.sendMail({
                from: this.fromAddress,
                to: opts.to,
                subject: opts.subject,
                html: opts.body
            });
            return {message: res.response, error: false};
        } catch (error) {
            const msg = error instanceof Error ? error.message : 'Unknown error - NodemailerEmailService';
            return { message: msg, error: true };
        }
    }

}