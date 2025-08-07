import { ValidationResult } from "../types";
import { StringValueObject } from "./StringValueObject";

export class UrlValueObject extends StringValueObject{

    private static readonly URL_REGEX = /^(?:(?:https?|ftp|sftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/igm;

    constructor(url: string){
        super(url);
    }

    public isValid(value: string): ValidationResult {
        if(UrlValueObject.URL_REGEX.test(value))
            return {isValid: true}

        return {isValid: false, error: {errorMsg: 'Invalid url', propName:'url', value: value}}
    }

}

