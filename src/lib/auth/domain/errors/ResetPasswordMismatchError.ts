import { DomainRuleViolationError } from "../../../shared/domain/errors";

export class ResetPasswordMismatchError extends DomainRuleViolationError{
    constructor(message: string = 'Passwords do not match.'  ){
        super(message);
        this.name = 'ResetPasswordMismatchError';
    }
}