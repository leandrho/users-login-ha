import { ValidationResult } from "./types";

export interface ValueObject<T>{

    isValid(value: T): ValidationResult;

}