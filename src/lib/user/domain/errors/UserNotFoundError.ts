import { DomainRuleViolationError } from "./DomainRuleViolationError";

export class UserNotFoundError extends DomainRuleViolationError{
    constructor(message: string = 'User not found.'){
        super(message);
        this.name = 'UserNotFoundError';
    }

}