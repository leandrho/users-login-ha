import { ValidationResult } from "../../../shared/domain/types";
import { StringValueObject } from "../../../shared/domain/value-objects";

import { v4 as uuidv4, validate as uuidValidate } from "uuid";

export class PasswordResetTokenId extends StringValueObject{
    
    constructor(id: string){
        super(id);
    }
    
    public isValid(value: string): ValidationResult {
        if(uuidValidate(value))
            return {isValid: true}

        return {isValid: false, error: {errorMsg: 'Domain error: Invalid id', propName: 'PasswordResetTokenId', value: value}}
    }

    public static randomId(): PasswordResetTokenId{
        return new PasswordResetTokenId(uuidv4());
    }

}