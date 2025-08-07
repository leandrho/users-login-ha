import { ValidationResult } from "src/lib/shared/domain/types";
import { StringValueObject } from "src/lib/shared/domain/value-objects";

export class PhoneNumber extends StringValueObject{

    private static readonly PHONE_REGEX = /^\+?[0-9]{7,15}$/; 

    constructor(phoneNumber: string){
        super(phoneNumber);
    }

    public isValid(value: string): ValidationResult {
        if(PhoneNumber.PHONE_REGEX.test(value))
            return {isValid: true};
        return {
            isValid: false,
            error: {
                errorMsg: 'Invalid phone number',
                propName: 'PhoneNumber',
                value: value
            }
        }
    }

}