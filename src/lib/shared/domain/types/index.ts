
export type ValidationResult = {
    isValid: boolean,
    error?: {
        errorMsg: string,
        propName: string,
        value: any
    }
}