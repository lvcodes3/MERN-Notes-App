import { useEffect, useState } from "react";

import { NoteInterface } from "../models/note";

import * as NotesApi from "../network/notes_api";

import { Navbar } from "../components/Navbar";
import { Notes } from "../components/Notes";
import { CreateUpdateNoteModal } from "../components/CreateUpdateNoteModal";

const Home = () => {
  const [notes, setNotes] = useState<NoteInterface[]>([]);

  const [notesLoading, setNotesLoading] = useState<boolean>(true);

  const [showNotesLoadingError, setShowNotesLoadingError] =
    useState<boolean>(false);

  const [selectedNote, setSelectedNote] = useState<null | NoteInterface>(null);

  const [showCreateUpdateNoteModal, setShowCreateUpdateNoteModal] =
    useState<boolean>(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        setShowNotesLoadingError(false);
        setNotesLoading(true);
        const notes = await NotesApi.fetchNotes();
        setNotes(notes);
      } catch (error) {
        console.error(error);
        setShowNotesLoadingError(true);
      } finally {
        setNotesLoading(false);
      }
    };
    loadData();
  }, []);

  const deleteNote = async (note: NoteInterface) => {
    try {
      await NotesApi.deleteNote(note._id);

      setNotes((prevNotes) =>
        prevNotes.filter((prevNote) => prevNote._id !== note._id)
      );
    } catch (error) {
      console.error(error);
    }
  };

  const loaderDiv = (
    <div className="w-full h-[calc(100vh-64px)] lg:h-[calc(100vh-80px)] flex justify-center items-center">
      <span className="loading loading-bars loading-lg"></span>
    </div>
  );

  const loaderErrorDiv = (
    <div className="w-full h-[calc(100vh-64px)] lg:h-[calc(100vh-80px)] flex justify-center items-center">
      <p className="text-2xl">
        Something went wrong.
        <br />
        Please refresh the page.
      </p>
    </div>
  );

  const notesDiv = (
    <div>
      <h1 className="p-2 text-center text-3xl">Your Notes</h1>

      <Notes
        notes={notes}
        onDeleteNote={(note) => {
          deleteNote(note);
        }}
        setSelectedNote={setSelectedNote}
        setShowCreateUpdateNoteModal={setShowCreateUpdateNoteModal}
      />
    </div>
  );

  const noNotesDiv = (
    <div className="w-full h-[calc(100vh-64px)] lg:h-[calc(100vh-80px)] flex justify-center items-center">
      <p className="text-2xl">You don't have any notes yet.</p>
    </div>
  );

  return (
    <div className="w-screen h-screen">
      {/* Navbar */}
      <Navbar setShowCreateUpdateNoteModal={setShowCreateUpdateNoteModal} />

      {/* Notes Loading */}
      {notesLoading && loaderDiv}

      {/* Notes Loading Error */}
      {showNotesLoadingError && loaderErrorDiv}

      {/* Notes */}
      {!notesLoading && !showNotesLoadingError && (
        <>{notes.length > 0 ? notesDiv : noNotesDiv}</>
      )}

      {/* Create Note Modal */}
      {!selectedNote && showCreateUpdateNoteModal && (
        <CreateUpdateNoteModal
          setShowCreateUpdateNoteModal={setShowCreateUpdateNoteModal}
          onNoteSaved={(note) => {
            setNotes([...notes, note]);
            setShowCreateUpdateNoteModal(false);
          }}
        />
      )}

      {/* Update Note Modal */}
      {selectedNote && showCreateUpdateNoteModal && (
        <CreateUpdateNoteModal
          selectedNote={selectedNote}
          setSelectedNote={setSelectedNote}
          setShowCreateUpdateNoteModal={setShowCreateUpdateNoteModal}
          onNoteSaved={(updatedNote) => {
            setNotes((prevNotes) =>
              prevNotes.map((note) =>
                note._id === updatedNote._id ? updatedNote : note
              )
            );
            setShowCreateUpdateNoteModal(false);
            setSelectedNote(null);
          }}
        />
      )}
    </div>
  );
};

export default Home;
