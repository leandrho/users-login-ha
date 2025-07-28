import { DomainRuleViolationError } from "../../../shared/domain/errors";

export class ResetPasswordInvalidTokenError extends DomainRuleViolationError{
    constructor(message: string = 'Password reset token invalid.'  ){
        super(message);
        this.name = 'ResetPasswordInvalidTokenError';
    }
}