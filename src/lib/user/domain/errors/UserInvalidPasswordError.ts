import { DomainRuleViolationError } from "../../../shared/domain/errors/";

export class UserInvalidPasswordError extends DomainRuleViolationError{
    constructor(message: string = 'Password is invalid.'){
        super(message);
        this.name = 'UserInvalidPasswordError';

    }
}