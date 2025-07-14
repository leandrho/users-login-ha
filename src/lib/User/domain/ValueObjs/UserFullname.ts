import { UserInvalidPropertyError } from "../Errors/UserInvalidPropertyError";

export class UserFullname{

    private readonly value: string;

    constructor(fullname: string){
        if(!UserFullname.isValid(fullname))
            throw new UserInvalidPropertyError('Domain error: Invalid fullname', 'UserFullname', fullname);
        this.value = fullname;
    }

    public static isValid(fullname: string){
        const fname = fullname.trim();
        if(!fname) 
            return false;

        const regexNombre = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s'-]+$/;
        return regexNombre.test(fname)  && fname.length <= 72;
    }

}
