
export interface IEmailService{
    send(to: string, subject: string, message: string): Promise<void>;
}