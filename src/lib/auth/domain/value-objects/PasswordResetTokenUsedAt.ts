import { ValidationResult } from "../../../shared/domain/types";
import { DateValueObject } from "../../../shared/domain/value-objects";

export class PasswordResetTokenUsedAt extends DateValueObject{

    constructor(date: Date ){
        super( date );
    }
    public isValid(value: Date): ValidationResult {

        if( !(value instanceof Date) || isNaN(value.getTime()))
            return {isValid: false, error: {errorMsg: 'Domain error: Invalid password reset token usage date. Must be a valid Date object.', propName: 'PasswordResetTokenUsedAt', value: value}};
        
        const now: Date = new Date();
        if (value.getTime() > now.getTime()) { 
            return {
                isValid: false,
                error: {
                    errorMsg: 'Domain error: Password reset token usedAt date cannot be in the future.',
                    propName: 'PasswordResetTokenUsedAt',
                    value: value
                }
            };
        }

        return {isValid: true}
    } 
}