
export type EmailRetStatus = {
    message: string,
    error: boolean,
}
export type EmailOptions = {
    to: string,
    subject: string,
    body: string,
}
export interface IEmailService{
    send(opts: EmailOptions): Promise<EmailRetStatus>;
}