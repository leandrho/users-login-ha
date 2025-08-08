import { ValidationResult } from 'src/lib/shared/domain/types';
import { NumberValueObject } from 'src/lib/shared/domain/value-objects';

export class DoctorRating extends NumberValueObject{

    constructor(rating: number){
        super(rating);
    }
    
    public isValid(value: number): ValidationResult{
        if(Number.isFinite(value) && (value >= 0 && value <= 5))
            return {isValid: true}
        return {
            isValid: false,
            error: {
                errorMsg: 'Invalid rating value',
                propName: 'DoctorRating',
                value: value
            }
        }
    }

}