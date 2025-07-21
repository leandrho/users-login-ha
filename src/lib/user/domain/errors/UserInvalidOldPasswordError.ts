import { DomainRuleViolationError } from "../../../shared/domain/errors/";

export class UserInvalidOldPasswordError extends DomainRuleViolationError{
    constructor(message: string = 'Old password is incorrect.'){
        super(message);
        this.name = 'UserInvalidOldPasswordError';

    }
}