import { Card } from "@/components/UI";
import { useNotesStore } from "@/store/notesStore";

export const Notes = () => {
  const notes = useNotesStore((s) => s.notes);

  return (
    <div
      style={{
        padding: 32,
        display: "flex",
        flexDirection: "column",
        gap: 24,
        maxWidth: 480,
      }}
    >
      {notes.map((item) => (
        <Card item={item} key={item.id} />
      ))}
    </div>
  );
};