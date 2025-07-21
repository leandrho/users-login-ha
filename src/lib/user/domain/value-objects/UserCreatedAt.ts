import { DateValueObject } from '../../../shared/domain/value-objects/';
import { ValidationResult } from "../../../shared/domain/types";

export class UserCreatedAt extends DateValueObject{

    private static readonly SYSTEM_LAUNCH_YEAR: number = 2025;


    constructor(date: Date | string){
        const d: Date = date instanceof Date ? date : new Date(date);
        super( d );
    }
    public isValid(value: Date): ValidationResult {
        const now: Date = new Date();
        if( isNaN(value.getTime()))
            return {isValid: false, error: {errorMsg: 'Domain error: Invalid date', propName: 'UserCreatedAt', value: value}};

        if(value > now )
            return {isValid: false, error: {errorMsg: 'Domain error: Invalid date - creation date is in the future', propName: 'UserCreatedAt', value: value}};

        if(value.getFullYear() < UserCreatedAt.SYSTEM_LAUNCH_YEAR )
            return {isValid: false, error: {errorMsg: 'Domain error: Invalid date - creation date is before the system launch', propName: 'UserCreatedAt', value: value}};

        return {isValid: true}
    } 
}