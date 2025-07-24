import { IUserRepository } from "../../../user/domain/repositories/IUserRepository";
import { RegisterUserInDTO, RegisterUserOutDTO } from "../dtos";
import { IPasswordHasher } from "../../../shared/application/security/IPasswordHasher";
import { User } from "../../../user/domain/entities";
import { UserEmail, UserPassword, UserRoleEnum } from "../../../user/domain/value-objects";
import { UserDuplicatedEmailError } from "../../../user/domain/errors";

export class AuthRegisterUserUseCase {

    constructor(private readonly userRepository: IUserRepository, private readonly passwordHasher: IPasswordHasher){}

    public async execute(userInDTO: RegisterUserInDTO): Promise<RegisterUserOutDTO>{
        const user: User | null = await this.userRepository.findByEmail(new UserEmail(userInDTO.email));
        if(user)
            throw new UserDuplicatedEmailError(userInDTO.email, 'User with this email already exists');
        
        const newUser: User = User.createNew(userInDTO.fullName, userInDTO.email, userInDTO.password, UserRoleEnum.USER);
        const hpas: string = await this.passwordHasher.hash(newUser.password.value());
        newUser.updatePassword(new UserPassword(hpas));

        await this.userRepository.save(newUser);
        return {message: 'User created successfully'}
    }

}