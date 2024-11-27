import { Router } from "express";

import * as NotesController from "../controllers/notes.controller";

const router = Router();

router.post("/", NotesController.createNote);

router.get("/", NotesController.getNotes);

router.get("/:noteId", NotesController.getNote);

router.patch("/:noteId", NotesController.updateNote);

router.delete("/:noteId", NotesController.deleteNote);

export default router;
