import { ValidationResult } from "../../../shared/domain/types";
import { StringValueObject } from "../../../shared/domain/value-objects";
import { v4 as uuidv4, validate as uuidValidate } from "uuid";

export class PasswordResetTokenValue extends StringValueObject{
    constructor(value: string){
        super(value);
    }
    public isValid(value: string): ValidationResult {
        if(uuidValidate(value))
            return {isValid: true}

        return {isValid: false, error: {errorMsg: 'Domain error: Invalid token', propName: 'PasswordResetTokenValue', value: value}}
    }

    public static generateToken(): PasswordResetTokenValue{
        return new PasswordResetTokenValue(uuidv4());
    }

}