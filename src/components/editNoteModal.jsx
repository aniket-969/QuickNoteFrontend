import React from "react";

export default function EditNoteModal({ note, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-bg rounded-lg shadow-lg p-6 max-w-lg w-full">
        <h2 className="text-xl font-bold mb-4">Edit Note</h2>
        <p className="text-muted mb-4">
          Editing: <span className="font-medium">{note.title}</span>
        </p>

        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-muted text-text rounded hover:bg-muted/80 transition"
          >
            Cancel
          </button>
          <button
            onClick={() => {
            
              onClose();
            }}
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition"
          >
            Save (later)
          </button>
        </div>
      </div>
    </div>
  );
}
