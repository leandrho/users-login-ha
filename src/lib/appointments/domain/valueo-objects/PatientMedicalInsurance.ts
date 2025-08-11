import { ValueObject } from "src/lib/shared/domain/value-objects";
import { Patient } from '../entities/Patient';
import { ValidationResult } from "src/lib/shared/domain/types";
import { InvalidPropertyError } from "src/lib/shared/domain/errors";

export type PatientMedicalInsuranceProps = {
    name: string,
    type: string,
    membershipNumber: string,
    expirationDate: Date,
};

export class PatientMedicalInsurance implements ValueObject<PatientMedicalInsuranceProps>{

    public readonly name: string;
    public readonly type: string;
    public readonly membershipNumber: string;
    public readonly expirationDate: Date;

    constructor(props: PatientMedicalInsuranceProps){
        const ret = this.isValid(props);
        if(!ret.isValid){
            throw new InvalidPropertyError("Medical Insurence is invalid", "PatientMedicalInsurance", props);
        }
        this.name = props.name;
        this.type = props.type;
        this.membershipNumber = props.membershipNumber;
        this.expirationDate = props.expirationDate;
    }

    public isValid(value: PatientMedicalInsuranceProps): ValidationResult {
        if((value.name.length < 100 && value.name.length > 1)
            && isFinite(Number(value.membershipNumber))
            && (value.expirationDate.getTime() > new Date().getTime())
        ){
            return {isValid: true};
        }
        return {
            isValid: false,
            error: {
                errorMsg: 'Invalid medical insurance - please check the data',
                propName: 'PatientMedicalInsurance',
                value: value
            }
        }
    }
    public equals(other: PatientMedicalInsurance): boolean {
        if (!other) return false;
        return (
            this.name === other.name &&
            this.type === other.type &&
            this.membershipNumber === other.membershipNumber &&
            (this.expirationDate?.getTime() ?? null) === (other.expirationDate?.getTime() ?? null)
        );
    }
    public toPrimitives(): PatientMedicalInsuranceProps {
        return {
            name: this.name,
            type: this.type,
            membershipNumber: this.membershipNumber,
            expirationDate: this.expirationDate,
        };
    }

}