import { UserId } from "src/lib/user/domain/value-objects";
import { DoctorId, DoctorPhoneNumber, DoctorAvatarUrl, DoctorLicenseNumber, DoctorRating } from "../valueo-objects";
import { DoctorSpecialty, DoctorBio } from '../types';
import { Address } from "src/lib/shared/domain/types";

export class Doctor {
    constructor(
        public readonly doctorId: DoctorId, 
        public readonly userId: UserId,
        public readonly specialties: DoctorSpecialty[], 
        public readonly licenseNumbers: DoctorLicenseNumber[], 
        public readonly avatar?: DoctorAvatarUrl, 
        public readonly addresses?: Address[],
        public readonly phoneNumbers?: DoctorPhoneNumber[],
        public readonly bio?: DoctorBio,
        public readonly rating?: DoctorRating,
    ){}

    public updateSpecialties(specialties: DoctorSpecialty[]):Doctor{
        return this.clone({specialties});
    }

    public updateBio(bio: DoctorBio):Doctor{
        return this.clone({bio});
    }

    public updateLicenseNumbers(licenseNumbers: DoctorLicenseNumber[]):Doctor{
       return this.clone({licenseNumbers});
    }

    public updateAvatar(avatar: DoctorAvatarUrl):Doctor{
          return this.clone({avatar});
    }

    public updateAddresses(addresses: Address[]):Doctor{
        return this.clone({addresses});
    }

    public updatePhoneNumbers(phoneNumbers: DoctorPhoneNumber[]):Doctor{
         return this.clone({phoneNumbers});
    }

    public updateRating(rating: DoctorRating):Doctor{
         return this.clone({rating});
    }

    public static createDoctor(userId: UserId, specialties: DoctorSpecialty[], licenseNumbers: DoctorLicenseNumber[], avatar?: DoctorAvatarUrl, addresses?: Address[], phoneNumbers?: DoctorPhoneNumber[], bio?: DoctorBio ):Doctor{
        return new Doctor(
            DoctorId.randomId(),
            userId,
            specialties,
            licenseNumbers,
            avatar,
            addresses,
            phoneNumbers,
            bio,
            new DoctorRating(5)
        );
    }

    public toPrimitives(){
        return {
            doctorId: this.doctorId.value(),
            userId: this.userId.value(),
            specialty: this.specialties,
            licenseNumbers: this.licenseNumbers.map((lic) => lic.value()),
            avatar: this.avatar?.value(),
            addresses: this.addresses,
            phoneNumbers: this.phoneNumbers?.map( p => p.value() ),
            bio: this.bio,
            rating: this.rating?.value()
        }
    }

    private clone(props: Partial<Doctor>): Doctor {
        return new Doctor(
            props.doctorId ?? this.doctorId,
            props.userId ?? this.userId,
            props.specialties ?? this.specialties,
            props.licenseNumbers ?? this.licenseNumbers,
            props.avatar ?? this.avatar,
            props.addresses ?? this.addresses,
            props.phoneNumbers ?? this.phoneNumbers,
            props.bio ?? this.bio,
            props.rating ?? this.rating
        );
    }

}