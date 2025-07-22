import React from "react";

export default function FilterBar({
  searchTerm,
  onSearchChange,
  selectedTag,
  onTagChange,
  tags,
}) {
  return (
    <div className="flex items-center space-x-4 w-full md:w-auto">
      <input
        type="text"
        placeholder="Search notes..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="px-3 py-2 border border-border rounded w-full md:w-64 bg-white text-black placeholder:text-muted dark:bg-surface dark:text-text dark:placeholder:text-muted focus:outline-none"
      />
      <select
        value={selectedTag}
        onChange={(e) => onTagChange(e.target.value)}
        className="px-3 py-2 border border-border rounded bg-white text-black dark:bg-surface dark:text-text focus:outline-none"
      >
        <option value="">All Tags</option>
        {tags.map((tag) => (
          <option key={tag} value={tag}>
            {tag}
          </option>
        ))}
      </select>
    </div>
  );
}


