import { DomainRuleViolationError } from "../../../shared/domain/errors";

export class PasswordResetTokenNotFoundError extends DomainRuleViolationError{
    constructor(message: string = 'Password reset token not found.') {
        super(message);
        this.name = 'PasswordResetTokenNotFoundError';
    }
}