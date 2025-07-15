
import { StringValueObject } from "src/lib/shared/domain/value-objects/StringValueObject";

export class UserPassword extends StringValueObject{

    private static readonly passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;

    constructor(password: string){
        super(password, 'Domain error: Invalid password', 'UserPassword');
    }

    public isValid( value: string ): boolean {
        return UserPassword.passwordRegex.test(value) && value.length <= 22;
    }

}
