import { StringValueObject } from "src/lib/shared/domain/value-objects/StringValueObject";
import { UserInvalidPropertyError } from "../errors/UserInvalidPropertyError";

export class UserFullname extends StringValueObject{

    constructor(fullname: string){
        super(fullname,'Domain error: Invalid fullname', 'UserFullname');
    }

    public isValid(value: string): boolean{
        if(!value) 
            return false;

        const regexNombre = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s'-]+$/;
        return regexNombre.test(value)  && value.length <= 72;
    }

}
