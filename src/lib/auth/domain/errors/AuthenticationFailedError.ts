import { DomainRuleViolationError } from "../../../shared/domain/errors";

export class AuthenticationFailedError extends DomainRuleViolationError{
    constructor(message: string = 'Authentication failed. Invalid credentials or inactive account.') {
        super(message);
        this.name = 'AuthenticationFailedError';
    }
}