import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchNotes,
  fetchNote,
  createNote,
  updateNote,
  deleteNote,
} from "../api/queries/notes";
import { toast } from "react-toastify";

export function useNotesList(params) {
  const notesQuery = useQuery({
    queryKey: ["notes", params],
    queryFn: () => fetchNotes(params),
    refetchOnWindowFocus: false,
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to fetch notes");
    },
  });

  return { notesQuery };
}

// Single‐note hook (needs noteId) for detail, update & delete
export function useNote(noteId) {
  const qc = useQueryClient();

  // Fetch detail
  const noteQuery = useQuery({
    queryKey: ["note", noteId],
    queryFn: () => fetchNote(noteId),
    enabled: !!noteId,
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to fetch note");
    },
  });

  // Update
const updateMutation = useMutation({
  mutationFn: (data) => updateNote(noteId, data),
  onSuccess: () => {
    toast.success("Note updated!");
    qc.invalidateQueries(["notes"]);
    qc.invalidateQueries(["note", noteId]);
  },
  onError: (err) => {
    toast.error(err.response?.data?.message || "Failed to update note");
  },
});

// Delete
const deleteMutation = useMutation({
  mutationFn: () => deleteNote(noteId),
  onSuccess: () => {
    toast.success("Note deleted!");
    qc.invalidateQueries(["notes"]);
  },
  onError: (err) => {
    toast.error(err.response?.data?.message || "Failed to delete note");
  },
});

  return { noteQuery, updateMutation, deleteMutation };
}

export function useCreateNote() {
  const qc = useQueryClient();
  const createNoteMutation = useMutation({
    mutationFn: (data) => createNote(data),
    onSuccess: () => {
      toast.success("Note created!");
      qc.invalidateQueries(["notes"]);
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to create note");
    },
  });
  return {createNoteMutation}
}
