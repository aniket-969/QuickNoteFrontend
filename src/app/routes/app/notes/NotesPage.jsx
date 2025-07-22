import React, { useState, useEffect } from "react";
import NoteCard from "../../../../components/noteCard";
import { Spinner } from "../../../../components/ui/spinner";
import { useNotesList } from "../../../../hooks/useNotes";

// Debounce hook
function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debounced;
}

export default function NotesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 300);

  // Build query params for API
  const params = {};
  if (selectedTag) params.tag = selectedTag;
  if (debouncedSearch) params.search = debouncedSearch;

  const { notesQuery } = useNotesList(params);

  // Loading & error
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

  // Derive tags from fetched notes
  const allTags = Array.from(new Set(notes.flatMap((n) => n.tags || [])));

  return (
    <div className="bg-surface text-text p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <h1 className="text-3xl font-bold">Your Notes</h1>
          <div className="flex items-center space-x-4 w-full md:w-auto">
            <input
              type="text"
              placeholder="Search notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-3 py-2 border border-border rounded w-full md:w-64"
            />
            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="px-3 py-2 border border-border rounded"
            >
              <option value="">All Tags</option>
              {allTags.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
          </div>
        </div>

        {notes.length === 0 ? (
          <p className="text-center text-muted">No notes found.</p>
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
