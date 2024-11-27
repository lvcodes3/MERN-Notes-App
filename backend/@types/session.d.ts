import mongoose from "mongoose";

// adding userId to express session //
declare module "express-session" {
  interface SessionData {
    userId: mongoose.Types.ObjectId;
  }
}
