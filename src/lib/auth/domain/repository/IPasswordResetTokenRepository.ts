import { UserId } from "../../../user/domain/value-objects";
import { PasswordResetToken } from "../entities/PasswordResetToken";
import { PasswordResetTokenId, PasswordResetTokenValue } from "../value-objects";

export interface IPasswordResetTokenRepository{
    
    save(token: PasswordResetToken): Promise<void>;
    findByToken(tokenValue: PasswordResetTokenValue): Promise<PasswordResetToken | null>;
    findById(tokenId: PasswordResetTokenId): Promise<PasswordResetToken | null>
    delete(tokenId: PasswordResetTokenId):Promise<void>

    findByUserId(userId: UserId): Promise<PasswordResetToken[]>
    deleteByUserId(userId: UserId):Promise<void>

}