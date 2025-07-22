import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { paths } from "../../../../config/paths";
import { useNote, useTags } from "../../../../hooks/useNotes";
import EditNoteModal from "../../../../components/editNoteModal";
import { Spinner } from "../../../../components/ui/spinner";
import { Edit, Trash2 } from "lucide-react";

export default function NoteDetailsPage() {
  const { id: noteId } = useParams();
  const navigate = useNavigate();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { noteQuery, deleteMutation } = useNote(noteId);
  const { tagQuery } = useTags();
  const allTags = tagQuery.data || [];

  // Combined loading state
  if (noteQuery.isLoading || tagQuery.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <Spinner />
      </div>
    );
  }

  // Combined error handling
  if (noteQuery.isError || tagQuery.isError) {
    const message =
      noteQuery.error?.response?.data?.message ||
      tagQuery.error?.response?.data?.message ||
      "Something went wrong";
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <p className="text-red-500">{message}</p>
      </div>
    );
  }

  const note = noteQuery.data;
  const userTags = note.tags || [];

  const handleDelete = async () => {
    await deleteMutation.mutateAsync();
    navigate(paths.notes.list.getHref());
  };

  return (
    <div className="bg-surface text-text p-6">
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

        {userTags.length > 0 && (
          <div className="flex gap-2 mb-6">
            {userTags.map((tag) => (
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
    className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition"
  >
    <Edit className="w-4 h-4" />
    Edit
  </button>
  <button
    onClick={handleDelete}
    disabled={deleteMutation.isLoading}
    className="flex items-center gap-2 px-4 py-2 bg-destructive text-destructive-foreground rounded hover:bg-destructive/90 transition disabled:opacity-50"
  >
    <Trash2 className="w-4 h-4" />
    Delete
  </button>
</div>

      </div>

      {isEditModalOpen && (
        <EditNoteModal
          note={note}
          allTags={allTags}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
    </div>
  );
}
