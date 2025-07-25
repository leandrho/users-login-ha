import { DomainRuleViolationError } from "../../../shared/domain/errors/";

export class UserLoginNotAllowedError extends DomainRuleViolationError{
    constructor(message: string = 'User login is not allowed due to current status.'){
        super(message);
        this.name = 'UserLoginNotAllowedError';
    }
}