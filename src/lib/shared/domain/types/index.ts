
export type ValidationResult = {
    isValid: boolean,
    error?: {
        errorMsg: string,
        propName: string,
        value: any
    }
}
export type Address ={
    street: string,
    city: string, 
    state: string,
    country: string,
    zipCode: string,
    extraInfo?: string
}