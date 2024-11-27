import { RequestHandler } from "express";
import bcrypt from "bcrypt";
import Joi from "joi";
import createHttpError from "http-errors";

import UserModel from "../models/user";

// REGISTER //
interface RegisterBody {
  fullname: string;
  email: string;
  password: string;
}

const registerSchema = Joi.object({
  fullname: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

export const register: RequestHandler<
  unknown,
  unknown,
  RegisterBody,
  unknown
> = async (req, res, next) => {
  try {
    const { fullname, email, password } = req.body;

    // validate request body //
    const { error } = registerSchema.validate(req.body);
    if (error) {
      throw createHttpError(400, error.details[0].message);
    }

    // check if email already exists //
    const existingEmail = await UserModel.findOne({
      email,
    }).exec();
    if (existingEmail) {
      throw createHttpError(409, "Registration failed.");
    }

    // hash the password //
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create new user //
    const newUser = await UserModel.create({
      fullname,
      email,
      password: hashedPassword,
    });

    // establish express session //
    req.session.userId = newUser._id;

    // respond with the created user, excluding sensitive data //
    const { password: _, ...userWithoutPassword } = newUser.toObject();
    res.status(201).json(userWithoutPassword);
  } catch (error) {
    next(error);
  }
};

// LOGIN //
interface LoginBody {
  email: string;
  password: string;
}

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const login: RequestHandler<
  unknown,
  unknown,
  LoginBody,
  unknown
> = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // validate request body //
    const { error } = loginSchema.validate(req.body);
    if (error) {
      throw createHttpError(400, error.details[0].message);
    }

    // get user //
    const user = await UserModel.findOne({
      email,
    }).select("+password");
    if (!user) {
      throw createHttpError(401, "Invalid credentials.");
    }

    // validate password //
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw createHttpError(401, "Invalid credentials.");
    }

    // establish express session //
    req.session.userId = user._id;

    // respond with the logged in user, excluding sensitive data //
    const { password: _, ...userWithoutPassword } = user.toObject();
    res.status(200).json(userWithoutPassword);
  } catch (error) {
    next(error);
  }
};

// GET AUTHENTICATED USER //
export const getAuthenticatedUser: RequestHandler<
  unknown,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.session.userId).exec();

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// LOGOUT //
export const logout: RequestHandler<
  unknown,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  req.session.destroy((error) => {
    if (error) {
      next(error);
    } else {
      res.sendStatus(200);
    }
  });
};
