
export interface ValueObject<T>{

    isValid(value: T): boolean;

}