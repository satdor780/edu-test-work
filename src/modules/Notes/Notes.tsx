// src/components/Notes/Notes.tsx
import { useEffect, useRef } from "react";
import { Card } from "@/components/UI";
import { useNotesStore } from "@/store/notesStore";

export const Notes = () => {
  const notes = useNotesStore((s) => s.notes);
  const focusedIdx = useNotesStore((s) => s.focusedIdx);
  const editingId = useNotesStore((s) => s.editingId);
  const setFocusedIdx = useNotesStore((s) => s.setFocusedIdx);
  const toggleSelected = useNotesStore((s) => s.toggleSelected);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // в режиме редактирования не перехватываем клавиши
      if (editingId !== null) return;

      console.log(e.key)

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setFocusedIdx(Math.min(focusedIdx + 1, notes.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setFocusedIdx(Math.max(focusedIdx - 1, 0));
      } else if (e.key === " ") {
        e.preventDefault();
        toggleSelected(notes[focusedIdx].id);
      }
    };

    el.addEventListener("keydown", handleKeyDown);
    return () => el.removeEventListener("keydown", handleKeyDown);
  }, [focusedIdx, editingId, notes, setFocusedIdx, toggleSelected]);

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      onFocus={() => containerRef.current?.focus()}
      style={{
        padding: 32,
        display: "flex",
        flexDirection: "column",
        gap: 16,
        maxWidth: 480,
        outline: "none",
      }}
    >
      {notes.map((item, idx) => (
        <Card item={item} idx={idx} key={item.id} />
      ))}
    </div>
  );
};