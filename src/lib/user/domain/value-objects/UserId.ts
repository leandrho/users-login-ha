
import { validate as uuidValidate, v4 as uuidv4 } from 'uuid';
import { StringValueObject } from 'src/lib/shared/domain/value-objects/StringValueObject';
import { ValidationResult } from 'src/lib/shared/domain/types';

export class UserId extends StringValueObject{

    constructor(id: string){
        super(id);
    }

    public isValid(value: string): ValidationResult {
        return uuidValidate(value)?
                {isValid: true}:
                {isValid: false, error: {errorMsg: 'Domain error: Invalid id', propName: 'UserId', value: value}}
    }

    public static randomId(): UserId{
        return new UserId(uuidv4());
    }
}