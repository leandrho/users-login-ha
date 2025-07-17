import { User } from '../../domain/entities/User';
import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { UserId } from '../../domain/value-objects';
import { UserDTO } from '../dtos/UserDTO';

export class UserQueryService{

    constructor( private readonly userRepository: IUserRepository ){}

    public async findById(id: string): Promise<User | null>{
        return await this.userRepository.findById(new UserId(id));
    }

}