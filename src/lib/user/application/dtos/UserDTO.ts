
export type UserDTO = {
    id: string;
    fullName: string;
    email: string;
    role: string;
    createdAt: Date;
    status: string;
    lastLogin?: Date;
}