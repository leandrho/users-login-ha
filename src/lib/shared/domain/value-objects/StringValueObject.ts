import { UserInvalidPropertyError } from "../../../user/domain/errors";
import { ValidationResult } from '../types';
import { ValueObject } from './ValueObject';

export abstract class StringValueObject implements ValueObject<string>{

    private readonly _value: string;

    constructor( value: string ){
        
        const v: string = value.trim();
        const validationResult: ValidationResult = this.isValid(v);

        if(!validationResult.isValid && validationResult.error){
            throw new UserInvalidPropertyError(validationResult.error.errorMsg, validationResult.error.propName, validationResult.error.value)
        }
        this._value = v;
    }

    public value(): string {
        return this._value;
    }    

    public abstract isValid(value: string): ValidationResult;//ABSTRACT METHOD
}