import { UserInvalidPropertyError } from "../../../user/domain/errors/UserInvalidPropertyError";
import { ValueObject } from './ValueObject';

export abstract class StringValueObject implements ValueObject<string>{

    private readonly _value: string;

    constructor(value: string, propName: string, errorMsg: string){
        
        const v: string = value.trim();
        if(!this.isValid(v)){
            throw new UserInvalidPropertyError(errorMsg, propName, v)
        }
        this._value = v;
    }

    public value(): string {
        return this._value;
    }    

    public abstract isValid(value: string): boolean;//ABSTRACT METHOD
}