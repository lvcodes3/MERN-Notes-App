import { NoteInterface, CreateUpdateNoteInterface } from "../models/note";

const BASE_URL = "/api/notes";

const defaultHeaders = {
  "Content-Type": "application/json",
};

const fetchData = async (input: RequestInfo, init?: RequestInit) => {
  const response = await fetch(input, init);

  if (response.ok) {
    return response;
  } else {
    const errorBody = await response.json();
    const errorMessage = errorBody.error || "An error occurred.";
    throw new Error(errorMessage);
  }
};

export const fetchNotes = async (): Promise<NoteInterface[]> => {
  const response = await fetchData(BASE_URL, {
    method: "GET",
  });
  return await response.json();
};

export const createNote = async (
  note: CreateUpdateNoteInterface
): Promise<NoteInterface> => {
  const response = await fetchData(BASE_URL, {
    method: "POST",
    headers: defaultHeaders,
    body: JSON.stringify(note),
  });
  return await response.json();
};

export const updateNote = async (
  noteId: string,
  note: CreateUpdateNoteInterface
): Promise<NoteInterface> => {
  const response = await fetchData(`${BASE_URL}/${noteId}`, {
    method: "PATCH",
    headers: defaultHeaders,
    body: JSON.stringify(note),
  });
  return await response.json();
};

export const deleteNote = async (noteId: string): Promise<void> => {
  await fetchData(`${BASE_URL}/${noteId}`, {
    method: "DELETE",
  });
};
