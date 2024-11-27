export interface NoteInterface {
  _id: string;
  title: string;
  text?: string;
  createdAt: string;
  updatedAt: string;
  __v: string;
}

export interface CreateUpdateNoteInterface {
  title: string;
  text?: string;
}
