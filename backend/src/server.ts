import mongoose from "mongoose";

import app from "./app";

import env from "./utils/validateEnv";

// connect to db //
mongoose
  .connect(env.MONGO_CONNECTION_STRING)
  .then(() => {
    console.log("Mongoose connected.");

    // main //
    app.listen(env.PORT, () => {
      console.log(`Server listening on Port ${env.PORT}...`);
    });
  })
  .catch(console.error);
