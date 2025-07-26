
export interface IEmailService{
    send(to: string, message: string): Promise<void>;
}