import { InvalidPropertyError } from "../../../shared/domain/errors/";


export class UserInvalidPropertyError extends InvalidPropertyError{

    constructor(message: string, propName: string, propValue: any){
        super(message, propName, propValue);
        this.name = 'UserInvalidPropertyError';
    }

}