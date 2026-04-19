import { create } from "zustand";
import type { CardTypes, ICardType } from "@/types";
import { notes as initialNotes } from "@/mocks";
type NotesStore = {
  notes: ICardType[];
  updateText: (id: number, text: string) => void;
  updateType: (id: number, type: CardTypes) => void;
};

export const useNotesStore = create<NotesStore>((set) => ({
  notes: initialNotes,

  updateText: (id, text) =>
    set((state) => ({
      notes: state.notes.map((note) =>
        note.id === id ? { ...note, text } : note,
      ),
    })),

  updateType: (id, type) =>
    set((state) => ({
      notes: state.notes.map((note) =>
        note.id === id
          ? {
              ...note,
              type,
              ...(type === "default" ? { image: undefined } : {}),
            }
          : note,
      ),
    })),
}));
