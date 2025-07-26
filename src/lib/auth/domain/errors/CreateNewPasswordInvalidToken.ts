import { DomainRuleViolationError } from "../../../shared/domain/errors";

export class CreateNewPasswordInvalidTokenError extends DomainRuleViolationError{
    constructor(message: string = 'Password reset token invalid.'  ){
        super(message);
        this.name = 'CreateNewPasswordInvalidTokenError';
    }
}