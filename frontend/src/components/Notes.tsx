import { NoteInterface } from "../models/note";

import { Note } from "./Note";

interface NotesProps {
  notes: NoteInterface[];
  onDeleteNote: (note: NoteInterface) => void;
  setSelectedNote: (note: NoteInterface) => void;
  setShowCreateUpdateNoteModal: (bool: boolean) => void;
}

export const Notes = ({
  notes,
  onDeleteNote,
  setSelectedNote,
  setShowCreateUpdateNoteModal,
}: NotesProps) => {
  return (
    <div className="p-4 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-6 justify-items-center">
      {notes.map((note) => (
        <Note
          key={note._id}
          note={note}
          onDeleteNote={onDeleteNote}
          setSelectedNote={setSelectedNote}
          setShowCreateUpdateNoteModal={setShowCreateUpdateNoteModal}
        />
      ))}
    </div>
  );
};
