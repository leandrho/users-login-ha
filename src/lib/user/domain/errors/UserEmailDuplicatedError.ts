import { DomainRuleViolationError } from "../../../shared/domain/errors/";

export class UserDuplicatedEmailError extends DomainRuleViolationError{
    public readonly email: string;

    constructor(email: string, message: string = `User with email ${email} already exists.`){
        super(message);
        this.name = 'UserDuplicatedEmailError';
        this.email = email;
    }

}