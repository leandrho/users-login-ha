import { DomainRuleViolationError } from "../../domain/errors/DomainRuleViolationError";

export class UserInvalidPasswordError extends DomainRuleViolationError{
    constructor(message: string = 'Password is invalid.'){
        super(message);
        this.name = 'UserInvalidPasswordError';

    }
}