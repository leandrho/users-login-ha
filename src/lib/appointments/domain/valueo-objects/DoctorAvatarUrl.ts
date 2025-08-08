import { ValidationResult } from "src/lib/shared/domain/types";
import { UrlValueObject } from "src/lib/shared/domain/value-objects";

export class DoctorAvatarUrl extends UrlValueObject{

    constructor(url: string){
        super(url);
    }
    public isValid(value: string): ValidationResult {
        const resValidation: ValidationResult = super.isValid(value);
        if(!resValidation.isValid)
            return {
                isValid: false,
                error: {
                    errorMsg: 'Invalid avatar url',
                    propName: 'DoctorAvatarUrl',
                    value: value
                }
            };
        return resValidation;
    }
}