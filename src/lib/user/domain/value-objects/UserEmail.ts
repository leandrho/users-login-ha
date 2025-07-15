import { StringValueObject } from "../../../shared/domain/value-objects/StringValueObject";

export class UserEmail extends StringValueObject{

    private static readonly emailRegExp: RegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    constructor(email: string){
        super( email, 'Domain error: Invalid email' , 'UserEmail' );
    }

    public isValid(value: string): boolean {
        return UserEmail.emailRegExp.test(value);
    }
    

}
