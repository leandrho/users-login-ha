import { DomainRuleViolationError } from "./";

export class UserInvalidPasswordError extends DomainRuleViolationError{
    constructor(message: string = 'Password is invalid.'){
        super(message);
        this.name = 'UserInvalidPasswordError';

    }
}