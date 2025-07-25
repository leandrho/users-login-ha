import { DomainRuleViolationError } from "../../../shared/domain/errors";

export class PasswordResetTokenFailedError extends DomainRuleViolationError{
    constructor(message: string = 'Password reset token failed.') {
        super(message);
        this.name = 'PasswordResetTokenFailedError';
    }
}