import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { paths } from "../../../../config/paths";
import { useNote } from "../../../../hooks/useNotes";
import EditNoteModal from "../../../../components/editNoteModal";
import { Edit, Trash2 } from "lucide-react";

export default function NoteDetailsPage() {
  const { id: noteId } = useParams();
  const navigate = useNavigate();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // useNote gives us detail, update, and delete
  const { noteQuery, deleteMutation } = useNote(noteId);

  const handleDelete = async () => {
   
      await deleteMutation.mutateAsync();
      
      navigate(paths.notes.list.getHref());
    
  };

  if (noteQuery.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <p>Loading...</p>
      </div>
    );
  }

  if (noteQuery.isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <p className="text-red-500">
          {noteQuery.error?.response?.data?.message || "Failed to load note"}
        </p>
      </div>
    );
  }

  const note = noteQuery?.data?.data;

  return (
    <div className="min-h-screen bg-surface text-text p-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">{note.title}</h1>
          <Link
            to={paths.notes.list.getHref()}
            className="text-primary hover:underline"
          >
            ← Back
          </Link>
        </div>

        <p className="text-muted mb-4">
          {new Date(note.createdAt).toLocaleString()}
        </p>

        <div className="prose mb-4">{note.content}</div>

        {note.tags?.length > 0 && (
          <div className="flex gap-2 mb-6">
            {note.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs bg-primary/10 text-primary px-2 py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex gap-4">
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition"
          >
            <Edit/>
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            <Trash2/>
          </button>
        </div>
      </div>

      {/* Modal for editing */}
      {isEditModalOpen && (
        <EditNoteModal
          note={note}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
    </div>
  );
}
