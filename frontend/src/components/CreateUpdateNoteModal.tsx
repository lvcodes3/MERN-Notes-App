import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { NoteInterface, CreateUpdateNoteInterface } from "../models/note";

import * as NotesApi from "../network/notes_api";

import formatTimestamp from "../utils/formatTimestamp";

interface CreateUpdateNoteModalProps {
  selectedNote?: NoteInterface;
  setSelectedNote?: (selectedNote: null | NoteInterface) => void;
  setShowCreateUpdateNoteModal: (bool: boolean) => void;
  onNoteSaved: (note: NoteInterface) => void;
}

export const CreateUpdateNoteModal = ({
  selectedNote,
  setSelectedNote,
  setShowCreateUpdateNoteModal,
  onNoteSaved,
}: CreateUpdateNoteModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateUpdateNoteInterface>({
    defaultValues: {
      title: selectedNote?.title || "",
      text: selectedNote?.text || "",
    },
  });

  const onSubmit = async (input: CreateUpdateNoteInterface) => {
    try {
      // creating a note //
      if (!selectedNote) {
        const noteResponse = await NotesApi.createNote(input);
        onNoteSaved(noteResponse);
      }
      // updating a note //
      else {
        // only update if one of the values were changed //
        if (
          input.title !== selectedNote.title ||
          input.text !== selectedNote.text
        ) {
          const noteResponse = await NotesApi.updateNote(
            selectedNote._id,
            input
          );
          onNoteSaved(noteResponse);
        }
        // otherwise clear //
        else {
          setShowCreateUpdateNoteModal(false);
          setSelectedNote!(null);
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
        console.error("Error message:", error.message);
      } else {
        toast.error("An unexpected error occurred.");
        console.error("Unexpected error:", error);
      }
    }
  };

  return (
    <div className="modal modal-open modal-bottom sm:modal-middle">
      <div className="modal-box flex flex-col gap-4">
        <h2 className="text-center text-2xl font-bold">
          {selectedNote ? "Update Note" : "Create Note"}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="title">
              Title{" "}
              {errors.title && (
                <span className="text-red-500">{errors.title?.message}</span>
              )}
            </label>
            <input
              id="title"
              type="text"
              placeholder={!selectedNote ? "Title" : ""}
              {...register("title", { required: "Title is required." })}
              className="w-full h-8"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="text">
              Text{" "}
              {errors.text && (
                <span className="text-red-500">{errors.text?.message}</span>
              )}
            </label>
            <textarea
              id="text"
              placeholder={!selectedNote ? "Text" : ""}
              {...register("text")}
              className="w-full h-8"
            ></textarea>
          </div>

          {selectedNote && (
            <div className="flex flex-col gap-2">
              <label htmlFor="createdAt">Created At</label>
              <input
                id="createdAt"
                type="text"
                value={formatTimestamp(selectedNote.createdAt)}
                readOnly
                className="w-full h-8"
              />
            </div>
          )}

          {selectedNote && (
            <div className="flex flex-col gap-2">
              <label htmlFor="updatedAt">Updated At</label>
              <input
                id="updatedAt"
                type="text"
                value={formatTimestamp(selectedNote.updatedAt)}
                readOnly
                className="w-full h-8"
              />
            </div>
          )}

          <div className="flex justify-center items-center gap-4">
            <button type="submit" disabled={isSubmitting} className="btn">
              {selectedNote ? "Update" : "Create"}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowCreateUpdateNoteModal(false);
                if (selectedNote) {
                  setSelectedNote!(null);
                }
              }}
              className="btn absolute top-2 right-2"
            >
              X
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
