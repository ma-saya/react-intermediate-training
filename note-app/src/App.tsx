import { useState } from "react";
import "./App.css";
import { NoteEditor } from "./componets/NoteEditor";
import { NoteList } from "./componets/NoteList";
import type { Note } from "./types/note";

export default function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  const handleSave = (note: Note) => {
    if (editingNote) {
      setNotes(notes.map((n) => (n.id === note.id ? note : n)));
      setEditingNote(null);
    } else {
      setNotes([...notes, note]);
    }
  };

  const handleDelete = (note: Note) => {
    setNotes(notes.filter((n) => n.id !== note.id));
    if (editingNote?.id === note.id) {
      setEditingNote(null);
    }
  };

  return (
    <main className="note-app">
      <header className="note-app__header">
        <p className="note-app__eyebrow">Notebook</p>
        <h1>マイノート</h1>
      </header>

      <section className="note-app__workspace">
        <NoteList
          notes={notes}
          selectedNoteId={editingNote?.id}
          onCreateNew={() => setEditingNote(null)}
          onSelect={(note) => setEditingNote(note)}
          onDelete={handleDelete}
        />
        <NoteEditor
          key={editingNote ? editingNote.id : "new"}
          initialNote={editingNote || undefined}
          onSave={handleSave}
          onCancel={() => setEditingNote(null)}
        />
      </section>
    </main>
  );
}
