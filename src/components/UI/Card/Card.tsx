import type { ICardType } from "@/types";
import type { FC } from "react";
import { useNotesStore } from "@/store/notesStore";
import { CardEdit, CardView } from "./components";
import styles from "./Card.module.css";

export const Card: FC<{ item: ICardType; idx: number }> = ({ item, idx }) => {
  const focusedIdx = useNotesStore((s) => s.focusedIdx);
  const selectedIds = useNotesStore((s) => s.selectedIds);
  const editingId = useNotesStore((s) => s.editingId);
  const setFocusedIdx = useNotesStore((s) => s.setFocusedIdx);
  const toggleSelected = useNotesStore((s) => s.toggleSelected);
  const setEditingId = useNotesStore((s) => s.setEditingId);

  const isEditing = editingId === item.id;
  const isFocused = focusedIdx === idx && editingId === null;
  const isSelected = selectedIds.has(item.id) && !isEditing;

  const handleMouseEnter = () => {
    if (editingId !== null) return;
    setFocusedIdx(idx);
  };

  const handleClick = () => {
    if (editingId !== null) return;
    setFocusedIdx(idx);
    toggleSelected(item.id);
  };

  const handleSetEdit = (val: boolean) => {
    if (val) {
      setEditingId(item.id);
    } else {
      setEditingId(null);
    }
  };

  return (
    <div
      className={`${styles.wrap}
        ${isFocused ? styles.focused : ""}
        ${isSelected ? styles.selected : ""}
        ${isEditing ? styles.editing : ""}`}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
    >
      {isEditing ? (
        <CardEdit key="edit" setEdit={handleSetEdit} item={item} />
      ) : (
        <CardView key="view" item={item} setEdit={handleSetEdit} />
      )}
    </div>
  );
};
