import type { Note } from "../types/note";

type Props = {
  notes: Note[];
  selectedNoteId?: number;
  onCreateNew: () => void;
  onSelect: (note: Note) => void;
  onDelete: (note: Note) => void;
};

export const NoteList = ({
  notes,
  selectedNoteId,
  onCreateNew,
  onSelect,
  onDelete,
}: Props) => {
  return (
    <aside className="note-list">
      <div className="note-list__header">
        <h2>ノート一覧</h2>
        <button className="button button--accent" onClick={onCreateNew}>
          新規作成
        </button>
      </div>

      {notes.length === 0 ? (
        <p className="note-list__empty">まだノートがありません</p>
      ) : (
        <ul className="note-list__items">
          {notes.map((note) => (
            <li
              key={note.id}
              className={`note-list__item ${
                selectedNoteId === note.id ? "is-active" : ""
              }`}
              onClick={() => onSelect(note)}
            >
              <div className="note-list__meta">
                <p className="note-list__title">{note.title}</p>
                <p className="note-list__preview">{note.content}</p>
              </div>
              <button
                className="button button--danger"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(note);
                }}
                aria-label={`「${note.title}」を削除`}
              >
                削除
              </button>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
};
