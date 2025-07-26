import { DomainRuleViolationError } from "../../../shared/domain/errors";

export class CreateNewPasswordExpiredTokenError extends DomainRuleViolationError{
    constructor(message: string = 'Password reset token expired.'  ){
        super(message);
        this.name = 'CreateNewPasswordExpiredTokenError';
    }
}