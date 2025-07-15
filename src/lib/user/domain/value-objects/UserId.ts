
import { validate as uuidValidate } from 'uuid';
import { UserInvalidPropertyError } from '../errors/UserInvalidPropertyError';
import { StringValueObject } from 'src/lib/shared/domain/value-objects/StringValueObject';
import { ValidationResult } from 'src/lib/shared/domain/value-objects/types';

export class UserId extends StringValueObject{

    
    constructor(id: string){
        super(id);
    }

    public isValid(value: string): ValidationResult {
        return uuidValidate(value)?
                {isValid: true}:
                {isValid: false, error: {errorMsg: 'Domain error: Invalid id', propName: 'UserId', value: value}}
    }
}