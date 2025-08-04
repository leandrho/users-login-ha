
export type UserDTO = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    createdAt: Date;
    status: string;
    lastLogin?: Date;
}