
export class UserInvalidPropertyError extends Error{
    public readonly propName: string;
    public readonly propValue: any;

    constructor(message: string, propName: string, propValue: any){
        super(message);
        this.name = 'UserInvalidPropertyError';
        this.propName = propName;
        this.propValue = propValue;
    }

}