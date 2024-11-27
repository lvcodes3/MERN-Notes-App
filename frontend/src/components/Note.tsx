import { MdDelete } from "react-icons/md";

import { NoteInterface } from "../models/note";

import formatTimestamp from "../utils/formatTimestamp";

interface NoteProps {
  note: NoteInterface;
  setSelectedNote: (note: NoteInterface) => void;
  setShowCreateUpdateNoteModal: (bool: boolean) => void;
  onDeleteNote: (note: NoteInterface) => void;
}

export const Note = ({
  note,
  setSelectedNote,
  setShowCreateUpdateNoteModal,
  onDeleteNote,
}: NoteProps) => {
  const { title, text, createdAt, updatedAt } = note;
  const formattedCreatedAt = formatTimestamp(createdAt);
  const formattedUpdatedAt = formatTimestamp(updatedAt);

  return (
    <div className="w-80 card bg-warning text-primary-content">
      <div className="card-title px-2">
        <h2 className="w-full flex justify-between items-center">
          {title}{" "}
          <MdDelete
            onClick={(e) => {
              e.stopPropagation();
              onDeleteNote(note);
            }}
            className="text-2xl text-red-600 cursor-pointer"
          />
        </h2>
      </div>

      <div
        onClick={() => {
          setSelectedNote(note);
          setShowCreateUpdateNoteModal(true);
        }}
        className="card-body overflow-auto cursor-pointer"
      >
        {text && <p>{text}</p>}
      </div>

      <div className="card-bordered pl-2">
        {formattedCreatedAt === formattedUpdatedAt ? (
          <p className="text-xs">Created: {formattedCreatedAt}</p>
        ) : (
          <p className="text-xs">Updated: {formattedUpdatedAt}</p>
        )}
      </div>
    </div>
  );
};
