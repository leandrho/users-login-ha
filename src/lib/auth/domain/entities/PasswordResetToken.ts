import { UserId } from "../../../user/domain/value-objects";
import { PasswordResetTokenCreatedAt, PasswordResetTokenExpiresAt, PasswordResetTokenId, PasswordResetTokenValue } from "../value-objects";
import { PasswordResetTokenUsedAt } from "../value-objects/PasswordResetTokenUsedAt";


export class PasswordResetToken{

    constructor(
        public readonly id: PasswordResetTokenId,
        public readonly token: PasswordResetTokenValue,
        public readonly expiresAt: PasswordResetTokenExpiresAt,
        public readonly userId: UserId,
        public readonly createdAt: PasswordResetTokenCreatedAt,
        public usedAt?: PasswordResetTokenUsedAt,
    ){}

    public markAsUsed(): void{
        this.usedAt = new PasswordResetTokenUsedAt(new Date());
    }

    public isUsed(): boolean{
        return this.usedAt !== undefined && this.usedAt !== null;
    }

    public isExpired(): boolean{
        return this.expiresAt.isExpired();
    }

    public isValid(): boolean{
        return !this.isExpired() && !this.isUsed();
    }

    public toPrimitive():{id: string, token: string, expiresAt: Date, userId: string, createdAt: Date, usedAt?: Date}{
        return {
            id: this.id.value(),
            token: this.token.value(),
            expiresAt: this.expiresAt.value(),
            userId: this.userId.value(),
            createdAt: this.createdAt.value(),
            usedAt: this.usedAt?.value(),
        }
    }

    public static fromPrimitives( id: string, token: string, expiresAt: Date, userId: string, createdAt: Date, usedAt?: Date ): PasswordResetToken{
        return new PasswordResetToken(
            new PasswordResetTokenId(id),
            new PasswordResetTokenValue(token),
            new PasswordResetTokenExpiresAt(expiresAt),
            new UserId(userId),
            new PasswordResetTokenCreatedAt(createdAt),
            usedAt ? new PasswordResetTokenUsedAt(usedAt) : undefined,
        );
    }

    public static createNew( userId: string, expiresInMinutes: number = 15): PasswordResetToken{
        
        const now: Date = new Date();
        const expiresAt = new Date(now.getTime() + expiresInMinutes * 60 * 1000);

        return new PasswordResetToken(
            PasswordResetTokenId.randomId(),
            PasswordResetTokenValue.generateToken(),
            new PasswordResetTokenExpiresAt(expiresAt),
            new UserId(userId),
            new PasswordResetTokenCreatedAt(new Date()),
        );
    }
    

}