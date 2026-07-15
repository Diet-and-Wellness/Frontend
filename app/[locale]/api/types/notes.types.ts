export interface Note {
  customer_id: string;
  content: string;
}

export interface NoteParams {
  page?: number;
  limit?: number;
}

export interface lastNoteParams {
  customer_id: string;
}
