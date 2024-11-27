import "dotenv/config";
import express, { NextFunction, Request, Response, urlencoded } from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import createHttpError, { isHttpError } from "http-errors";
import morgan from "morgan";

import env from "./utils/validateEnv";

import { requiresAuth } from "./middlewares/auth";

import usersRoute from "./routes/users.route";
import notesRoute from "./routes/notes.route";

const app = express();

// middlewares //
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(
  session({
    secret: env.SESSION_SECRET, // secret key used to sign the session ID cookie
    resave: false, // session is not saved to the session store if it wasn't modified during the request
    saveUninitialized: false, // empty sessions will not be saved
    cookie: {
      maxAge: 60 * 60 * 1000, // 1 hour
    },
    rolling: true, // session cookie's expiration time is reset on every request
    store: MongoStore.create({
      // session data will be stored with MongoDB to store sessions persistently
      mongoUrl: env.MONGO_CONNECTION_STRING,
    }),
  })
);
app.use(morgan("dev"));

// routes //
app.use("/api/users", usersRoute);
app.use("/api/notes", requiresAuth, notesRoute);

// no route handler //
app.use((req, res, next) => {
  next(createHttpError(404, "Endpoint not found."));
});

// error handler //
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  let errorMessage = "An unknown error occurred.";
  let errorStatusCode = 500;
  if (isHttpError(error)) {
    errorStatusCode = error.status;
    errorMessage = error.message;
  }
  res.status(errorStatusCode).json({ error: errorMessage });
});

export default app;
