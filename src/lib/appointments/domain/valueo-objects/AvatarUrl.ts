import { UrlValueObject } from "src/lib/shared/domain/value-objects/UrlValueObject";

export class AvatarUrl extends UrlValueObject{

    constructor(url: string){
        super(url, 'AvatarUrl');
    }

}