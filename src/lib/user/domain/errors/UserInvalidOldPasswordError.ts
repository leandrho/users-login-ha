import { DomainRuleViolationError } from "../../domain/errors/DomainRuleViolationError";

export class UserInvalidOldPasswordError extends DomainRuleViolationError{
    constructor(message: string = 'Old password is incorrect.'){
        super(message);
        this.name = 'UserInvalidOldPasswordError';

    }
}