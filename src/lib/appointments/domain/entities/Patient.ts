import { UserId } from "src/lib/user/domain/value-objects";
import { PatientId, PatientBirthday, PhoneNumber, PatientDU } from "../valueo-objects";
import { PatientRegular } from "../types";
import { PatientMedicalInsurance, PatientMedicalInsuranceProps } from "../valueo-objects/PatientMedicalInsurance";


export class Patient{
    constructor(
        public readonly patientId: PatientId,
        public readonly userId: UserId,
        public readonly du: PatientDU,
        public readonly birthDate: PatientBirthday,
        public readonly phones?: PhoneNumber[],
        public readonly medicalInsurance?: PatientMedicalInsurance,
        public readonly isRegularPatient?: PatientRegular,
    ){}

    public updateDU(du: PatientDU): Patient{
        return this.clone({du});
    }

    public updatePhone(phones: PhoneNumber[]):Patient{
        return this.clone({phones});
    }

    public updateMedicalInsurance(newMedicalInsurance: PatientMedicalInsuranceProps):Patient{
        const medicalInsurance = new PatientMedicalInsurance(newMedicalInsurance);
        return this.clone({medicalInsurance});
    }

    public setIsRegularPatient(isRegularPatient: PatientRegular):Patient{
        return this.clone({isRegularPatient});
    }

    public updateBirthDate(birthDate: PatientBirthday): Patient{
        return this.clone({birthDate});
    }

    public toPrimitives(): {patientId: string, userId: string, du: string, birthDate: Date, phones?: string[], medicalInsurance?: PatientMedicalInsuranceProps, isRegularPatient?: boolean} {
        return {
            patientId: this.patientId.value(),
            userId: this.userId.value(),
            du: this.du.value(),
            birthDate: this.birthDate.value(),
            phones: this.phones?.map(p => p.value()) || [],
            medicalInsurance: this.medicalInsurance?.toPrimitives(),
            isRegularPatient: this.isRegularPatient,
        };
    }

    public static create( userId: UserId, birthDate: PatientBirthday, phone: PhoneNumber[], du: PatientDU, medicalInsurance: PatientMedicalInsurance ): Patient{
        return new Patient(
            PatientId.randomId(),
            userId,
            du,
            birthDate,
            phone,
            medicalInsurance,
            false
        );
    }

    private clone(props: Partial<Patient>): Patient {
        return new Patient(
            props.patientId ?? this.patientId,
            props.userId ?? this.userId,
            props.du ?? this.du,
            props.birthDate ?? this.birthDate,
            props.phones ?? this.phones,
            props.medicalInsurance ?? this.medicalInsurance,
            props.isRegularPatient ?? this.isRegularPatient
        );
    }

}