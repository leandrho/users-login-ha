import { DomainRuleViolationError } from "../../../shared/domain/errors";

export class ResetPasswordTokenAlreadyUsedError extends DomainRuleViolationError{
    constructor(message: string = 'Password reset token already used.'  ){
        super(message);
        this.name = 'ResetPasswordTokenAlreadyUsedError';
    }
}