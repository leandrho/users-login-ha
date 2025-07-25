import { UserId } from "../../../user/domain/value-objects";
import { PasswordResetToken } from "../../domain/entities/PasswordResetToken";
import { PasswordResetTokenNotFoundError } from "../../domain/errors/PasswordResetTokenNotFoundError";
import { IPasswordResetTokenRepository } from "../../domain/repository/IPasswordResetTokenRepository";
import { PasswordResetTokenValue, PasswordResetTokenId } from "../../domain/value-objects";



export class InMemoryPasswordResetTokenRepository implements IPasswordResetTokenRepository{

    private tokens : PasswordResetToken[] = [];

    constructor(){}

    public async save(token: PasswordResetToken): Promise<void> {
        const existingTokenIndex = this.tokens.findIndex(t => t.id.value() === token.id.value());
        if (existingTokenIndex !== -1) {
            this.tokens[existingTokenIndex] = token;
        } else {
            this.tokens.push(token);
        }
    }
    public async findByToken(tokenValue: PasswordResetTokenValue): Promise<PasswordResetToken | null> {
        const token = this.tokens.find( (tok) => tok.token.value() === tokenValue.value());
        return token ?? null;
    }
    public async findById(tokenId: PasswordResetTokenId): Promise<PasswordResetToken | null> {
        const token = this.tokens.find( (tok) => tok.id.value() === tokenId.value());
        return token ?? null;
    }
    public async delete(tokenId: PasswordResetTokenId): Promise<void> {
        const initialLength = this.tokens.length
        this.tokens = this.tokens.filter( (tok) => tokenId.value() !== tok.id.value());
        if(initialLength === this.tokens.length)
            throw new PasswordResetTokenNotFoundError(`Password reset token with ID ${tokenId.value()} not found.`);

    }
    public async findByUserId(userId: UserId): Promise<PasswordResetToken[]> {
        return this.tokens.filter( (tok) => tok.userId.value() === userId.value());
    }
    public async deleteByUserId(userId: UserId): Promise<void> {
        this.tokens = this.tokens.filter( (tok) => userId.value() !== tok.userId.value());
    }
    
}