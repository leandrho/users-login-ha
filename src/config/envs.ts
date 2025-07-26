
import env from 'env-var'
import dotenv from 'dotenv';

dotenv.config();

const envs = {
    PORT: env.get('PORT').required().asPortNumber(),
    AUTH: {
        JWT_ACCESS_SECRET: env.get('JWT_ACCESS_SECRET').required().asString(),
        JWT_REFRESH_SECRET: env.get('JWT_REFRESH_SECRET').required().asString(),// no se usa todavia
        JWT_ACCESS_EXPIRATION_TIME: env.get('JWT_ACCESS_EXPIRATION_TIME').required().asString(),
        JWT_REFRESH_EXPIRATION_TIME: env.get('JWT_REFRESH_EXPIRATION_TIME').required().asString(),
        RESET_PASSWORD_URL: env.get('RESET_PASSWORD_URL').required().asString()
    }

}
export default envs;