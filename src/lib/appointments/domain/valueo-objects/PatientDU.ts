
import { ValidationResult } from "src/lib/shared/domain/types";
import { StringValueObject } from "src/lib/shared/domain/value-objects";

export class PatientDU extends StringValueObject{


    constructor(patientDU: string){
        super(patientDU);
    }

    public isValid(value: string): ValidationResult {
        if( isFinite(Number(value)) && (value.length >= 7 && value.length <= 12))
            return {isValid: true};
        return {
            isValid: false,
            error: {
                errorMsg: 'Invalid unique document number',
                propName: 'PatientDU',
                value: value
            }
        }
    }

}