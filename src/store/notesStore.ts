import { create } from "zustand";
import type { ICardType } from "@/types";
import { notes as initialNotes } from "@/mocks";

type NotesStore = {
  notes: ICardType[];

  updateText: (id: number, text: string) => void;
};

export const useNotesStore = create<NotesStore>((set) => ({
  notes: initialNotes,

  updateText: (id, text) =>
    set((state) => ({
      notes: state.notes.map((note) =>
        note.id === id ? { ...note, text } : note,
      ),
    })),
}));
