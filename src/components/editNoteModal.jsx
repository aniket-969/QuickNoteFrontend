import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateNoteSchema } from "../schema/notes.schema";
import { useNote } from "../hooks/useNotes";

export default function EditNoteModal({ note, onClose }) {
  const { updateMutation } = useNote(note._id);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(updateNoteSchema),
    defaultValues: {
      title: note.title,
      content: note.content,
      tags: note.tags?.join(", ") || "",
    },
  });

  const onSubmit = async (data) => {
    await updateMutation.mutateAsync(data);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-bg rounded-lg shadow-lg p-6 max-w-lg w-full">
        <h2 className="text-xl font-bold mb-4">Edit Note</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-text mb-1">
              Title
            </label>
            <input
              id="title"
              type="text"
              {...register("title")}
              className="w-full px-4 py-3 rounded border border-border bg-surface text-text placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>

          {/* Content */}
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-text mb-1">
              Content
            </label>
            <textarea
              id="content"
              rows={6}
              {...register("content")}
              className="w-full px-4 py-3 rounded border border-border bg-surface text-text placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.content && (
              <p className="mt-1 text-sm text-red-500">{errors.content.message}</p>
            )}
          </div>

          {/* Tags */}
          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-text mb-1">
              Tags (comma separated)
            </label>
            <input
              id="tags"
              type="text"
              {...register("tags")}
              className="w-full px-4 py-3 rounded border border-border bg-surface text-text placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.tags && (
              <p className="mt-1 text-sm text-red-500">{errors.tags.message}</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-muted text-text rounded hover:bg-muted/80 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={updateMutation.isLoading}
              className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition disabled:opacity-50"
            >
              {updateMutation.isLoading ? "Saving..." : "Save"}
            </button>
          </div>

          {/* Mutation Error */}
          {updateMutation.isError && (
            <p className="mt-3 text-center text-sm text-red-500">
              {updateMutation.error?.response?.data?.message ||
                "Failed to update note. Please try again."}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
