import { IEmailService } from "../../application/email/IEmailService";

export class NodemailerEmailService implements IEmailService{
    send(to: string, message: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

}