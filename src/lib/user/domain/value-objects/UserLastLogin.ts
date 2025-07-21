import { DateValueObject } from '../../../shared/domain/value-objects/';
import { ValidationResult } from "../../../shared/domain/types";

export class UserLastLogin extends DateValueObject{
    
    constructor(date: Date | string){
        const d: Date = date instanceof Date ? date : new Date(date);
        super( d );
    }
    public isValid(value: Date): ValidationResult {
        
        if( isNaN(value.getTime()))
            return {isValid: false, error: {errorMsg: 'Domain error: Invalid date', propName: 'UserLastLogin', value: value}};
        
        const now: Date = new Date();
        if(value > now )
            return {isValid: false, error: {errorMsg: 'Domain error: Invalid date - creation date is in the future', propName: 'UserLastLogin', value: value}};

        return {isValid: true}
    }
    
}