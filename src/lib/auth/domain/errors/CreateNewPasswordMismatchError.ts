import { DomainRuleViolationError } from "../../../shared/domain/errors";

export class CreateNewPasswordMismatchError extends DomainRuleViolationError{
    constructor(message: string = 'Passwords do not match.'  ){
        super(message);
        this.name = 'CreateNewPasswordMismatchError';
    }
}