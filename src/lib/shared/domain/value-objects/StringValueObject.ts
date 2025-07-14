import { UserInvalidPropertyError } from "../../../user/domain/errors/UserInvalidPropertyError";

export abstract class StringValueObject {

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