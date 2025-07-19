import { DomainRuleViolationError } from "./";

export class UserInvalidPropertyError extends DomainRuleViolationError{
    public readonly propName: string;
    public readonly propValue: any;

    constructor(message: string, propName: string, propValue: any){
        super(message);
        this.name = 'UserInvalidPropertyError';
        this.propName = propName;
        this.propValue = propValue;
    }

}