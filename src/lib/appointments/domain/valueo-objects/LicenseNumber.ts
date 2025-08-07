import { ValidationResult } from "src/lib/shared/domain/types";
import { StringValueObject } from "src/lib/shared/domain/value-objects";

export class LicenseNumber extends StringValueObject{

    private static readonly MAX_LICENCE_LENGTH = 15;
    private static readonly MIN_LICENCE_LENGTH = 2;
    private static readonly DIGITS_REGEX = /^[0-9]+$/;

    constructor(licenseNumber: string){
        super(licenseNumber);
    }

    public isValid(value: string): ValidationResult {
        if( LicenseNumber.DIGITS_REGEX.test(value) 
            && value.length >= LicenseNumber.MIN_LICENCE_LENGTH 
            && value.length <= LicenseNumber.MAX_LICENCE_LENGTH
        ){
            return {isValid: true}
        }

        return {
            isValid: false,
            error: {
                errorMsg: 'Invalid licence number',
                propName: 'LicenceNumber',
                value: value
            }
        }

    }
}