import { ValidationResult } from "../../../shared/domain/types";
import { DateValueObject } from "../../../shared/domain/value-objects";


export class PasswordResetTokenCreatedAt extends DateValueObject{

    private static readonly SYSTEM_LAUNCH_YEAR: number = 2025;

    constructor(date: Date ){
        super( date );
    }
    public isValid(value: Date): ValidationResult {

        if( !(value instanceof Date) || isNaN(value.getTime()))
            return {isValid: false, error: {errorMsg: 'Domain error: Invalid creation date', propName: 'PasswordResetTokenCreatedAt', value: value}};
        
        const now: Date = new Date();
        if (value.getTime() > now.getTime()) { 
            return {
                isValid: false,
                error: {
                    errorMsg: 'Domain error: Password reset token creation date cannot be in the future.',
                    propName: 'PasswordResetTokenCreatedAt',
                    value: value
                }
            };
        }
        if(value.getFullYear() < PasswordResetTokenCreatedAt.SYSTEM_LAUNCH_YEAR )
            return {isValid: false, error: {errorMsg: 'Domain error: Invalid date - creation date is before the system launch', propName: 'PasswordResetTokenCreatedAt', value: value}};

        return {isValid: true}
    } 
}