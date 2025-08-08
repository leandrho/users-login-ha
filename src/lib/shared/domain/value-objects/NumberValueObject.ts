import { InvalidPropertyError } from "../errors";
import { ValidationResult } from "../types";
import { ValueObject } from "./ValueObject";

export abstract class NumberValueObject implements ValueObject<number>{
    
    private readonly _value: number;

    constructor( value: number ){
        
        const validationResult: ValidationResult = this.isValid(value);

        if(!validationResult.isValid && validationResult.error){
            throw new InvalidPropertyError(validationResult.error.errorMsg, validationResult.error.propName, validationResult.error.value)
        }
        this._value = value;
    }

    public value(): number {
        return this._value;
    }    

    public abstract isValid(value: number): ValidationResult;//ABSTRACT METHOD
}