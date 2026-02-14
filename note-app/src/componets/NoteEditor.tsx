import { useState } from "react";
import type { Note } from "../types/note";

type Props = {
  initialNote?: Note;
  onSave: (note: Note) => void;
  onCancel: () => void;
};

export const NoteEditor = ({ initialNote, onSave, onCancel }: Props) => {
  const [title, setTitle] = useState(initialNote?.title || "");
  const [content, setContent] = useState(initialNote?.content || "");

  const isDisabled = !title.trim() || !content.trim();

  const handleSave = () => {
    if (isDisabled) return;

    onSave({
      id: initialNote?.id || Date.now(),
      title: title.trim(),
      content: content.trim(),
    });

    if (!initialNote) {
      setTitle("");
      setContent("");
    }
  };

  return (
    <section className="note-editor">
      <div className="note-editor__header">
        <h2>{initialNote ? "ノートを編集" : "新しいノート"}</h2>
        <p>{initialNote ? "内容を更新して保存" : "タイトルと本文を入力して保存"}</p>
      </div>

      <label className="note-editor__label" htmlFor="note-title">
        タイトル
      </label>
      <input
        id="note-title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="例: 会議メモ"
        className="note-editor__input"
      />

      <label className="note-editor__label" htmlFor="note-content">
        本文
      </label>
      <textarea
        id="note-content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="内容を入力してください"
        rows={12}
        className="note-editor__textarea"
      />

      <div className="note-editor__actions">
        <button className="button button--primary" onClick={handleSave} disabled={isDisabled}>
          保存
        </button>
        {initialNote && (
          <button className="button button--ghost" onClick={onCancel}>
            キャンセル
          </button>
        )}
      </div>
    </section>
  );
};
