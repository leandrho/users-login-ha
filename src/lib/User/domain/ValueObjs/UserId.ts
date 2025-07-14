
import { validate as uuidValidate } from 'uuid';
import { UserInvalidPropertyError } from '../Errors/UserInvalidPropertyError';

export class UserId{
    
    private value: string;
    
    constructor(id: string){
        if(!UserId.isValid(id))
            throw new UserInvalidPropertyError('Domain error: Invalid user id', 'UserId', id);
        
        this.value = id;
    }

    public static isValid(id: string){
        return uuidValidate(id);
    }
}