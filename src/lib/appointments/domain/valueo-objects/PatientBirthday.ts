import { DateValueObject } from '../../../shared/domain/value-objects/';
import { ValidationResult } from "../../../shared/domain/types";

export class PatientBirthday extends DateValueObject{
    
    private static readonly MIN_BIRTH_YEAR: number = 1920;

    constructor(date: Date | string){
        const d: Date = date instanceof Date ? date : new Date(date);
        super( d );
    }
    public isValid(value: Date): ValidationResult {
        const now: Date = new Date();
        if( isNaN(value.getTime()))
            return {isValid: false, error: {errorMsg: 'Domain error: Invalid date', propName: 'PatientBirthday', value: value}};

        if(value > now )
            return {isValid: false, error: {errorMsg: 'Domain error: Invalid date - creation date is in the future', propName: 'PatientBirthday', value: value}};

        if(value.getFullYear() < PatientBirthday.MIN_BIRTH_YEAR )
            return {isValid: false, error: {errorMsg: 'Domain error: Invalid date - are you that old?', propName: 'PatientBirthday', value: value}};

        return {isValid: true}
    } 
}