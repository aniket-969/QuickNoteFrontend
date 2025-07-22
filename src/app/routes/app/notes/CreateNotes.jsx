import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { paths } from "../../../../config/paths";
import { Link, useNavigate } from "react-router-dom";
import { createNoteSchema } from './../../../../schema/notes.schema';
import { useCreateNote } from "../../../../hooks/useNotes";

export default function CreateNotePage() {
  const navigate = useNavigate();
  const {createNoteMutation} = useCreateNote();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createNoteSchema),
    defaultValues: {
      title: "",
      content: "",
      tags: "",
    },
  });

  const onSubmit = async (values) => {
   
    // await createNoteMutation.mutateAsync(values);
    
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface px-4">
      <div className="max-w-md w-full bg-bg rounded-lg shadow-lg p-8">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-primary">Create Note</h1>
          <p className="mt-2 text-muted">Add a new note with title, content, and tags</p>
        </div>

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
              placeholder="Note title"
            />
            {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>}
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
              placeholder="Write your note content here..."
            />
            {errors.content && <p className="mt-1 text-sm text-red-500">{errors.content.message}</p>}
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
              placeholder="e.g. work, personal"
            />
            {errors.tags && <p className="mt-1 text-sm text-red-500">{errors.tags.message}</p>}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-primary text-white font-medium rounded hover:bg-primary/90 transition"
            disabled={createNoteMutation.isLoading}
          >
            {createNoteMutation.isLoading ? "Creating..." : "Create Note"}
          </button>

          {/* Error Feedback */}
          {createNoteMutation.isError && (
            <p className="mt-3 text-center text-sm text-red-500">
              {createNoteMutation.error?.response?.data?.message ||
                "Failed to create note. Please try again."}
            </p>
          )}
        </form>

        {/* Back to Notes */}
        <p className="mt-6 text-center text-sm text-muted">
          <Link to={paths.notes.list.getHref()} className="text-primary hover:underline">
            ← Back to Notes
          </Link>
        </p>
      </div>
    </div>
  );
}