import { PrismaClient, User as PrismaUser } from "@prisma/client";
import { User } from "../../domain/entities";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { UserId, UserEmail } from "../../domain/value-objects";
import { UserNotFoundError } from "../../domain/errors";


export class PrismaUserRepository implements IUserRepository{
    
    private prisma: PrismaClient;
    
    constructor(){
        this.prisma = new PrismaClient()
    }

    public async save(user: User): Promise<void> {
        const userPrimitives = user.toPrimitives();
        await this.prisma.user.upsert({
            where: {
                id: userPrimitives.id,
            },
            update: {
                fullName: userPrimitives.fullName,
                password: userPrimitives.password,
                role: userPrimitives.role,
                status: userPrimitives.status,
                lastLogin: userPrimitives.lastLogin ?? null
            },
            create: {
                ...userPrimitives,
                lastLogin: userPrimitives.lastLogin ?? null
            }
        });
        // const userData: PrismaUser | null =  await this.prisma.user.findUnique({
        //     where: {
        //         id: userPrimitives.id
        //     }
        // })
        // if(userData){
        //     await this.prisma.user.update({
        //         data: {
        //             fullName: userPrimitives.fullName,
        //             password: userPrimitives.password,
        //             role: userPrimitives.role,
        //             status: userPrimitives.status,
        //             lastLogin: userPrimitives.lastLogin
        //         },
        //         where: {id: userData.id}
        //     });
        // } else{
        //     await this.prisma.user.create({
        //         data: userPrimitives
        //     })
        // }
    }
    public async delete(id: UserId): Promise<void> {
        try {
            await this.prisma.user.delete({
                where: { id: id.value() }
            })
        } 
        catch (error: any) {
            if(error.code === 'P2025')
                throw new UserNotFoundError();
            else
                throw error;
        }
    }
    public async findById(id: UserId): Promise<User | null> {
        const userP: PrismaUser | null = await this.prisma.user.findUnique({
            where: { id: id.value() }
        });
        if(!userP) return null;

        return User.fromPrimitives(userP.id, userP.fullName, userP.email, userP.password, userP.role, userP.createdAt, userP.status, userP.lastLogin ?? undefined )
    }
    public async findByEmail(email: UserEmail): Promise<User | null> {
        const userP: PrismaUser | null = await this.prisma.user.findUnique({
            where: { email: email.value() }
        });
        if(!userP) return null;

        return User.fromPrimitives(userP.id, userP.fullName, userP.email, userP.password, userP.role, userP.createdAt, userP.status, userP.lastLogin ?? undefined )
    }
    public async findAll(): Promise<User[]> {
        const userPs: PrismaUser[] = await this.prisma.user.findMany();
        return userPs.map( userP => User.fromPrimitives(userP.id, userP.fullName, userP.email, userP.password, userP.role, userP.createdAt, userP.status, userP.lastLogin ?? undefined ) );
    }
}