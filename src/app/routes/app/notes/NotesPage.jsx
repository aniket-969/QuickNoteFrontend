import React, { useState, useEffect } from "react";
import NoteCard from "../../../../components/noteCard";
import { Spinner } from "../../../../components/ui/spinner";
import { useNotesList } from "../../../../hooks/useNotes";
import { useDebounce } from "../../../../hooks/useDebounce";
import FilterBar from "../../../../components/filterBar";

export default function NotesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 300);

  const params = {};
  if (selectedTag) params.tag = selectedTag;
  if (debouncedSearch) params.search = debouncedSearch;

  const { notesQuery } = useNotesList(params);

  if (notesQuery.isLoading) {
    return (
        <Spinner />
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

  const allTags = Array.from(new Set(notes.flatMap((n) => n.tags || [])));

  return (
    <div className="bg-surface text-text p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <h1 className="text-3xl font-bold">Your Notes</h1>
         <FilterBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedTag={selectedTag}
            onTagChange={setSelectedTag}
            tags={allTags}
          />
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
