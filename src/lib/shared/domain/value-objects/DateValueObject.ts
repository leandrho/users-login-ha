import { InvalidPropertyError } from "../errors";
import { ValueObject } from "./ValueObject";
import { ValidationResult } from "../types";

export abstract class DateValueObject implements ValueObject<Date>{
    private readonly _value: Date;

    constructor(value: Date){

        const validation: ValidationResult = this.isValid(value);
        if(!validation.isValid && validation.error){
            throw new InvalidPropertyError(validation.error.errorMsg, validation.error.propName, validation.error.value);
        }
        this._value = value;
    }

    public value(): Date {
        return this._value;
    }

    public abstract isValid(value: Date): ValidationResult;


}