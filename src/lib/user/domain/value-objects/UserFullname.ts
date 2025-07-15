import { StringValueObject } from "src/lib/shared/domain/value-objects/StringValueObject";
import { UserInvalidPropertyError } from "../errors/UserInvalidPropertyError";

export class UserFullname extends StringValueObject{
    
    private static readonly regexNombre: RegExp = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s'-]+$/;

    constructor(fullname: string){
        super(fullname,'Domain error: Invalid fullname', 'UserFullname');
    }

    public isValid(value: string): boolean{
        if(!value) 
            return false;

        return UserFullname.regexNombre.test(value)  && value.length <= 72;
    }

}
