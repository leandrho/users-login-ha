import { DomainRuleViolationError } from "../../../shared/domain/errors/";

export class UserStatusUpdateNotAllowedError extends DomainRuleViolationError{

    constructor(message: string = 'User status update is not allowed due to domain rules.'){
        super(message);
        this.name = 'UserStatusUpdateNotAllowedError';
    }
}