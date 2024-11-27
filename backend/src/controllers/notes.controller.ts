import { RequestHandler } from "express";
import mongoose from "mongoose";
import Joi from "joi";
import createHttpError from "http-errors";

import NoteModel from "../models/note";

// CREATE NOTE //
interface CreateNoteInterface {
  title: string;
  text?: string;
}

const createNoteSchema = Joi.object({
  title: Joi.string().min(1).required(),
  text: Joi.string().allow("").optional(),
});

export const createNote: RequestHandler<
  unknown,
  unknown,
  CreateNoteInterface,
  unknown
> = async (req, res, next) => {
  try {
    const { title, text } = req.body;

    // validate request body //
    const { error } = createNoteSchema.validate(req.body);
    if (error) {
      throw createHttpError(400, error.details[0].message);
    }

    // create new note //
    const newNote = await NoteModel.create({
      userId: req.session.userId,
      title,
      text,
    });

    // respond with the new note //
    res.status(201).json(newNote);
  } catch (error) {
    next(error);
  }
};

// GET NOTES //
export const getNotes: RequestHandler<
  unknown,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const notes = await NoteModel.find({
      userId: req.session.userId,
    }).exec();
    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
};

// GET NOTE //
interface GetNotesParams {
  noteId: string;
}

export const getNote: RequestHandler<
  GetNotesParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const { noteId } = req.params;

    // validate noteId //
    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, "Invalid note id.");
    }

    // get note //
    const note = await NoteModel.findById(noteId).exec();
    if (!note) {
      throw createHttpError(404, "Note not found.");
    }

    // respond with note //
    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

// UPDATE NOTE //
interface UpdateNoteParams {
  noteId: string;
}

interface UpdateNoteInterface {
  title?: string;
  text?: string;
}

const updateNoteSchema = Joi.object({
  title: Joi.string().min(1).optional(),
  text: Joi.string().min(0).optional(),
});

export const updateNote: RequestHandler<
  UpdateNoteParams,
  unknown,
  UpdateNoteInterface,
  unknown
> = async (req, res, next) => {
  try {
    const { noteId } = req.params;
    const { title, text } = req.body;

    // validate noteId //
    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, "Invalid note id.");
    }

    // validate req body //
    const { error } = updateNoteSchema.validate(req.body);
    if (error) {
      throw createHttpError(400, error.details[0].message);
    }

    // get note //
    const note = await NoteModel.findById(noteId);
    if (!note) {
      throw createHttpError(404, "Note not found.");
    }

    // update note //
    if (title !== undefined) note.title = title;
    if (text !== undefined) note.text = text;
    const updatedNote = await note.save();

    // respond with updated note //
    res.status(200).json(updatedNote);
  } catch (error) {
    next(error);
  }
};

// DELETE NOTE //
interface DeleteNoteParams {
  noteId: string;
}

export const deleteNote: RequestHandler<
  DeleteNoteParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const { noteId } = req.params;

    // validate noteId //
    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, "Invalid note id.");
    }

    // delete note //
    const deletedNote = await NoteModel.findByIdAndDelete(noteId);
    if (!deletedNote) {
      throw createHttpError(404, "Note not found.");
    }

    // respond with 204 - no content //
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
