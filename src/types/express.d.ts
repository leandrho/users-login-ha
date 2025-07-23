   // src/types/express.d.ts

    // Este archivo extiende la interfaz Request de Express para añadir propiedades personalizadas.
    // Esto permite que TypeScript reconozca `req.user` en tus controladores y middlewares.

    declare global {
        namespace Express {
            // La interfaz Request es la que se usa en los parámetros de los middlewares y controladores de Express.
            interface Request {
                // Añadimos una propiedad 'user' que puede ser opcional (?).
                // Su tipo es un objeto con 'userId' (string) y 'role' (string).
                // Esto se llenará después de que tu middleware de autenticación JWT valide el token.
                user?: { userId: string; role: string; };
            }
        }
    }

    export {}