import { UserCreatedOutDTO, UserCreateInDTO, UserDTO, UserUpdatedProfileOutDTO, UserUpdatePasswordInDTO, UserUpdatePropsDTO } from "../../application/dtos";
import { UserQueryService } from "../../application/query-services/UserQueryService";
import { UserCreateUseCase, UserUpdatePasswordUseCase, UserUpdateProfileUseCase, UserDeleteUseCase } from "../../application/use-cases";

export class UserService {

    constructor(
        private readonly userCreateUC: UserCreateUseCase, 
        private readonly userUpdateProfileUC: UserUpdateProfileUseCase,
        private readonly userUpdatePasswordUC: UserUpdatePasswordUseCase,
        private readonly userQueryService: UserQueryService,
        private readonly userDeleteUC: UserDeleteUseCase,
    ){}

    public async create(createUser: UserCreateInDTO): Promise<UserCreatedOutDTO>{
        return await this.userCreateUC.execute(createUser);
    }
        
    public async updateProfile(id: string, data: UserUpdatePropsDTO):Promise<UserUpdatedProfileOutDTO>{
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

    public async delete(id: string): Promise<void>{
        return await this.userDeleteUC.execute(id);
    }
}