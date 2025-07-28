import { DomainRuleViolationError } from "../../../shared/domain/errors";

export class ResetPasswordExpiredTokenError extends DomainRuleViolationError{
    constructor(message: string = 'Password reset token expired.'  ){
        super(message);
        this.name = 'ResetPasswordExpiredTokenError';
    }
}