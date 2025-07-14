import { UserInvalidPropertyError } from "../Errors/UserInvalidPropertyError";

export class UserFullname{

    private readonly value: string;

    constructor(fullname: string){
        const fname = fullname.trim();
        if(!UserFullname.isValid(fname))
            throw new UserInvalidPropertyError('Domain error: Invalid fullname', 'UserFullname', fullname);
        this.value = fname;
    }

    public static isValid(fullname: string){
        if(!fullname) 
            return false;

        const regexNombre = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s'-]+$/;
        return regexNombre.test(fullname)  && fullname.length <= 72;
    }

}
