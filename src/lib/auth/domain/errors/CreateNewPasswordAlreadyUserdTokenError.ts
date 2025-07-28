import { DomainRuleViolationError } from "../../../shared/domain/errors";

export class CreateNewPasswordAlreadyUserdTokenError extends DomainRuleViolationError{
    constructor(message: string = 'Password reset token already used.'  ){
        super(message);
        this.name = 'CreateNewPasswordAlreadyUserdTokenError';
    }
}