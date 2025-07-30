
import * as env from 'env-var'
import * as dotenv from 'dotenv';

dotenv.config();

const envs = {
    PORT: env.get('PORT').required().asPortNumber(),
    AUTH: {
        JWT_ACCESS_SECRET: env.get('JWT_ACCESS_SECRET').required().asString(),
        JWT_REFRESH_SECRET: env.get('JWT_REFRESH_SECRET').required().asString(),// no se usa todavia
        JWT_ACCESS_EXPIRATION_TIME: env.get('JWT_ACCESS_EXPIRATION_TIME').required().asString(),
        JWT_REFRESH_EXPIRATION_TIME: env.get('JWT_REFRESH_EXPIRATION_TIME').required().asString(),
        RESET_PASSWORD_URL: env.get('RESET_PASSWORD_URL').required().asString(),
        RESET_PASSWORD_TOKEN_EXPIRATION_MINUTES: env.get('RESET_PASSWORD_TOKEN_EXPIRATION_MINUTES').required().asInt(),
    },
    EMAIL: {
            HOST: env.get('EMAIL_HOST').required().asString(),
            PORT: env.get('EMAIL_PORT').required().asInt(),
            FROM_ADDRESS: env.get('EMAIL_FROM_ADDRESS').required().asString(),
            SERVICE: env.get('EMAIL_SERVICE').required().asString(),
            SECURE: env.get('EMAIL_SECURE').required().asBool(),
            AUTH: {
                USER: env.get('EMAIL_USER').required().asString(),
                PASS: env.get('EMAIL_PASS').required().asString(),
            }
    }


}
export default envs;