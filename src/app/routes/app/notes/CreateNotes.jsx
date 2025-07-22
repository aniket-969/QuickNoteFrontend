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
   
    await createNoteMutation.mutateAsync(values);
    
  };

  return (
  <div className="flex items-center justify-center bg-surface px-4 mt-5">
  <div className="lg:max-w-lg max-w-md w-full bg-bg rounded-lg shadow-lg lg:p-10 p-6">
    <div className="text-center mb-4 ">
      <h1 className="text-2xl font-bold text-primary">Create Note</h1>
      <p className="mt-1 text-sm text-muted">
        Add a new note with title, content, and tags
      </p>
    </div>

    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Title */}
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-text mb-1"
        >
          Title
        </label>
        <input
          id="title"
          type="text"
          {...register("title")}
          className="w-full px-3 py-2 rounded border border-border bg-surface text-text placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Note title"
        />
        {errors.title && (
          <p className="mt-1 text-xs text-red-500">
            {errors.title.message}
          </p>
        )}
      </div>

      {/* Content */}
      <div>
        <label
          htmlFor="content"
          className="block text-sm font-medium text-text mb-1"
        >
          Content
        </label>
        <textarea
          id="content"
          rows={4}
          {...register("content")}
          className="w-full px-3 py-2 rounded border border-border bg-surface text-text placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Write your note content here..."
        />
        {errors.content && (
          <p className="mt-1 text-xs text-red-500">
            {errors.content.message}
          </p>
        )}
      </div>

      {/* Tags */}
      <div>
        <label
          htmlFor="tags"
          className="block text-sm font-medium text-text mb-1"
        >
          Tags (comma separated)
        </label>
        <input
          id="tags"
          type="text"
          {...register("tags")}
          className="w-full px-3 py-2 rounded border border-border bg-surface text-text placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="e.g. work, personal"
        />
        {errors.tags && (
          <p className="mt-1 text-xs text-red-500">
            {errors.tags.message}
          </p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full py-2 bg-primary text-white font-medium rounded hover:bg-primary/90 transition"
        disabled={createNoteMutation.isLoading}
      >
        {createNoteMutation.isLoading ? "Creating..." : "Create Note"}
      </button>

      {/* Error Feedback */}
      {createNoteMutation.isError && (
        <p className="mt-2 text-center text-xs text-red-500">
          {createNoteMutation.error?.response?.data?.message ||
            "Failed to create note. Please try again."}
        </p>
      )}
    </form>

    {/* Back to Notes */}
    <p className="mt-4 text-center text-sm text-muted">
      <Link to={paths.notes.list.getHref()} className="text-primary hover:underline">
        ← Back to Notes
      </Link>
    </p>
  </div>
</div>

  );
}