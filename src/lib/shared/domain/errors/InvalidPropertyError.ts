import { DomainRuleViolationError } from "./DomainRuleViolationError";

export class InvalidPropertyError extends DomainRuleViolationError{
    public readonly propName: string;
    public readonly propValue: any;

    constructor(message: string, propName: string, propValue: any){
        super(message);
        this.name = 'InvalidPropertyError';
        this.propName = propName;
        this.propValue = propValue;
    }

}