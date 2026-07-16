import apiClient from "../client";
import { lastNoteParams, NoteParams, NoteRequest } from "../types/notes.types";

export const notesApi = {
  createNote: (data: NoteRequest) => {
    return apiClient.post("/notes", data);
  },
  getNote: (id: string) => {
    return apiClient.get(`/notes/${id}`);
  },
  getAllNotes: (params: NoteParams) => {
    return apiClient.get("/notes", { params });
  },
  getLastNote: (params: lastNoteParams) => {
    return apiClient.get("/notes/last", { params });
  },
  updateNote: (id: string, noteContent: string) => {
    return apiClient.put(`/notes/${id}`, { content: noteContent });
  },
  deleteNote: (id: string) => {
    return apiClient.delete(`/notes/${id}`);
  },
};
