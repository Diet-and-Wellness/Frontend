export interface NoteParams {
  page?: number;
  limit?: number;
}

export interface lastNoteParams {
  customer_id: string;
}

export interface NoteWriter {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

export interface Note {
  id: string;
  content: string;
  customer: string;
  writer: NoteWriter | null;
  attachments: string[];
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface NoteRequest {
  customer_id: string;
  content: string;
}
