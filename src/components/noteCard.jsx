import React from "react";
import { Link } from "react-router-dom";
import { paths } from "../config/paths";

export default function NoteCard({ note }) {
  const { id, title, content, tags = [], createdAt } = note;
  const snippet = content.length > 100 ? content.slice(0, 100) + "..." : content;

  return (
    <Link
      to={paths.notes.detail.getHref(id)}
      className="block bg-surface border border-border rounded-lg shadow-sm hover:shadow-md transition p-4"
    >
      <h2 className="text-lg font-semibold text-text mb-2 truncate">
        {title}
      </h2>
      <p className="text-sm text-muted mb-4">
        {snippet}
      </p>
      <div className="flex flex-wrap gap-2 mb-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="text-xs bg-primary/10 text-primary px-2 py-1 rounded"
          >
            {tag}
          </span>
        ))}
      </div>
      {createdAt && (
        <p className="text-xs text-muted">
          {new Date(createdAt).toLocaleDateString()}
        </p>
      )}
    </Link>
  );
}
