import { UserNotFoundError } from '../../domain/errors';
import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { UserId } from '../../domain/value-objects';

export class UserDeleteUseCase{

    constructor(private readonly userRepository: IUserRepository){}

    public async execute(id: string): Promise<void>{
        const idValidate = new UserId(id);
        const user = await this.userRepository.findById(idValidate);
        if(!user){
            throw new UserNotFoundError('User not found - cannot delete.');
        }
        await this.userRepository.delete(idValidate);
    }

}