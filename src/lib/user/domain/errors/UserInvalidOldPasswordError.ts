import { DomainRuleViolationError } from "./";

export class UserInvalidOldPasswordError extends DomainRuleViolationError{
    constructor(message: string = 'Old password is incorrect.'){
        super(message);
        this.name = 'UserInvalidOldPasswordError';

    }
}