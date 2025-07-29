
import express, {Application, Request, Response, NextFunction} from "express";
import { json } from "body-parser";
import dotenv from "dotenv";

import {userRouter, authRouter, authTokenService} from './dependencies'
import { authenticateTokenMid } from './lib/shared/infrastructure/http/middlewares/authenticateTokenMid';
import { errorHandler } from "./lib/shared/infrastructure/http/middlewares/errorHandlerMid";

dotenv.config();

const app: Application = express();

app.use(json());

app.use('/api/users/', authenticateTokenMid(authTokenService), userRouter.router);
app.use('/api/auth/', authRouter.router)
app.use(errorHandler);
// app.use((err: any, req: Request, res: Response, next: NextFunction) => {
//     console.error("Global Error Handler:", err);
//     const status = err.statusCode || 500;
//     const message = err.message || 'An unexpected error occurred.';
//     res.status(status).json({ message: message });
// });

const port: number = parseInt(process.env.PORT ?? "3000");

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

export default app;
