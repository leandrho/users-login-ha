import { StringValueObject } from '../../../shared/domain/value-objects/';
import { ValidationResult } from "../../../shared/domain/types";

export class UserFirstName extends StringValueObject{
    
    private static readonly regexNombre: RegExp = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s'-]+$/;

    constructor(firstname: string){
        super(firstname);
    }

    public isValid(value: string): ValidationResult{
        if(!value) 
            return {isValid: false, error: {errorMsg: 'Domain error: Invalid firstname - cannot be empty', propName: 'UserFirstName', value: value}};

        if(!UserFirstName.regexNombre.test(value))
            return {isValid: false, error: {errorMsg: 'Domain error: Invalid firstname - contains invalid characters', propName: 'UserFirstName', value: value}};

        if(value.length > 50)
            return {isValid: false, error: {errorMsg: 'Domain error: Invalid firstname - too long', propName: 'UserFirstName', value: value}};

        return {isValid: true}
    }

}
