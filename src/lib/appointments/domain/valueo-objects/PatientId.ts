import { validate as uuidValidate, v4 as uuidv4 } from 'uuid';

import { ValidationResult } from "src/lib/shared/domain/types";
import { StringValueObject } from "src/lib/shared/domain/value-objects";


export class PatientId extends StringValueObject{

    constructor(id: string){
        super(id);
    }
    public isValid(value: string): ValidationResult {
        return uuidValidate(value)?
                {isValid: true}:
                {isValid: false, error: {errorMsg: 'Domain error: Invalid id', propName: 'PatientId', value: value}}
    }

    public static randomId(): PatientId{
        return new PatientId(uuidv4());
    }
}