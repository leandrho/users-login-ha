
import {Request, Response, NextFunction} from 'express'
import { UserNotFoundError, UserInvalidPropertyError, UserInvalidPasswordError, UserDuplicatedEmailError, UserInvalidOldPasswordError, UserStatusUpdateNotAllowedError, UserLoginNotAllowedError } from '../../../../user/domain/errors';
import { AuthenticationFailedError, PasswordMismatchError, PasswordResetTokenFailedError, PasswordResetTokenNotFoundError, ResetPasswordExpiredTokenError, ResetPasswordInvalidTokenError, ResetPasswordTokenAlreadyUsedError } from '../../../../auth/domain/errors';
import { DomainRuleViolationError, InvalidPropertyError } from '../../../../shared/domain/errors';
import { ZodError } from 'zod';


export const errorHandler = ( err: Error, req: Request, res: Response, next: NextFunction ) => {
    console.error('Error Handler: ', {err});

    let statusCode = 500;
    let message = 'Internal Server Error';
    let details: any = {error: 'Something went wrong!'};

    if (err instanceof ZodError) {
        statusCode = 400; // Bad Request
        message = 'Validation failed.';
        // details = err.errors.map(e => ({ path: e.path.join('.'), message: e.message }));
    }

    else if (err instanceof UserNotFoundError) {
        statusCode = 404; // Not Found
        message = err.message;
    } else if (err instanceof UserDuplicatedEmailError) {
        statusCode = 409; // Conflict
        message = err.message;
        details = { email: err.email };
    } else if (err instanceof InvalidPropertyError || err instanceof UserInvalidPropertyError) {
        statusCode = 400; // Bad Request
        message = err.message;
        details = { property: err.propName, value: err.propValue };
    } else if (err instanceof PasswordMismatchError) {
        statusCode = 400; // Bad Request
        message = err.message;
    }
    else if (  err instanceof PasswordResetTokenNotFoundError ||
               err instanceof ResetPasswordExpiredTokenError ||
               err instanceof ResetPasswordTokenAlreadyUsedError ||
               err instanceof ResetPasswordInvalidTokenError ||
               err instanceof PasswordResetTokenFailedError) {

        statusCode = 400; 
        message = err.message;

    } else if (err instanceof UserInvalidPasswordError) {
        statusCode = 400; // Bad Request
        message = err.message;
    } else if (err instanceof UserInvalidOldPasswordError) {
        statusCode = 400; // Bad Request
        message = err.message;
    } else if (err instanceof UserLoginNotAllowedError) {
        statusCode = 403; // Forbidden
        message = err.message;
    } else if (err instanceof UserStatusUpdateNotAllowedError) {
        statusCode = 403; // Forbidden
        message = err.message;
    } else if (err instanceof AuthenticationFailedError) {
        statusCode = 401; // Unauthorized
        message = err.message;
    }
    else if (err instanceof DomainRuleViolationError) {
        statusCode = 400;
        message = err.message;
    }

    res.status(statusCode).json({
        message,
        details,
        timestamp: new Date().toISOString(),
        path: req.originalUrl,
    });           

}


