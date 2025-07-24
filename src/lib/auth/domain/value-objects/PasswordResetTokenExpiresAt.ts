import { ValidationResult } from "../../../shared/domain/types";
import { DateValueObject } from "../../../shared/domain/value-objects";


export class PasswordResetTokenExpiresAt extends DateValueObject{

    constructor(date: Date){
        const d: Date = date instanceof Date ? date : new Date(date);
        super( d );
    }
    public isValid(value: Date): ValidationResult {
        if( !(value instanceof Date) || isNaN(value.getTime()))
            return {isValid: false, error: {errorMsg: 'Domain error: Invalid password reset token expiration date. Must be a valid Date object', propName: 'PasswordResetTokenExpiresAt', value: value}};
        
        const now: Date = new Date();
        if (value.getTime() <= now.getTime()) {
            return {
                isValid: false,
                error: {
                    errorMsg: 'Password reset token expiration date must be in the future.',
                    propName: 'PasswordResetTokenExpiresAt',
                    value: value
                }
            };
        }
        return {isValid: true}
    }

    public isExpired(): boolean{
        const now: Date = new Date();
        return this.value().getTime() < now.getTime();
    }
}