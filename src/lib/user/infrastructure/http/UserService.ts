import { UserCreatedOutDTO } from "../../application/dtos/UserCreatedOutDTO";
import { UserCreateInDTO } from "../../application/dtos/UserCreateInDTO";
import { UserDTO } from "../../application/dtos/UserDTO";
import { UserUpdatedProfileOutDTO } from "../../application/dtos/UserUpdatedProfileOutDTO";
import { UserUpdatePasswordInDTO } from "../../application/dtos/UserUpdatePasswordInDTO";
import { UserQueryService } from "../../application/query-services/UserQueryService";
import { UserCreateUseCase } from "../../application/use-cases/UserCreateUseCase";
import { UserUpdatePasswordUseCase } from "../../application/use-cases/UserUpdatePasswordUseCase";
import { UserUpdateProfileUseCase } from '../../application/use-cases/UserUpdateProfileUseCase';
import { UpdateUserProps } from "../../domain/types/UpdateUserProps";

export class UserService {

    constructor(
        private readonly userCreateUC: UserCreateUseCase, 
        private readonly userUpdateProfileUC: UserUpdateProfileUseCase,
        private readonly userUpdatePasswordUC: UserUpdatePasswordUseCase,
        private readonly userQueryService: UserQueryService,
    ){}

    public async create(createUser: UserCreateInDTO): Promise<UserCreatedOutDTO>{
        return await this.userCreateUC.execute(createUser);
    }
        
    public async updateProfile(id: string, data: UpdateUserProps):Promise<UserUpdatedProfileOutDTO>{
        return await this.userUpdateProfileUC.execute(id, data);
    }

    public async updatePassword(data: UserUpdatePasswordInDTO): Promise<void>{
        await this.userUpdatePasswordUC.execute(data);
    }

    public async findById(id: string): Promise<UserDTO | null>{
        return await this.userQueryService.findById(id);
    }

    public async findByEmail(email: string): Promise<UserDTO | null>{
        return await this.userQueryService.findByEMail(email);
    }

    public async findAll(): Promise<UserDTO[]>{
        return await this.userQueryService.findAll()
    }

}