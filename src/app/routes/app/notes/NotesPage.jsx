import React from "react";
import NoteCard from "../../../../components/noteCard";
import { Spinner } from "../../../../components/ui/spinner";
import { Link } from "react-router-dom";
import { paths } from "../../../../config/paths";
import { useNotesList } from "../../../../hooks/useNotes";

export default function NotesPage() {
  const { notesQuery } = useNotesList();

  if (notesQuery.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <Spinner />
      </div>
    );
  }

  if (notesQuery.isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <p className="text-red-500">
          Error loading notes: {notesQuery.error?.message}
        </p>
      </div>
    );
  }

  const notes = notesQuery.data || []; 

  return (
    <div className=" bg-surface text-text p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Your Notes</h1>
         
        </div>

        {notes.length === 0 ? (
          <p className="text-center text-muted">No notes yet. Create your first note!</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} /> 
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
