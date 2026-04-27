// src/store/notesStore.ts
import { create } from "zustand";
import type { CardTypes, ICardType } from "@/types";
import { notes as initialNotes } from "@/mocks";

type NotesStore = {
  notes: ICardType[];
  focusedIdx: number;
  selectedIds: Set<number>;
  editingId: number | null;
  setFocusedIdx: (idx: number) => void;
  toggleSelected: (id: number) => void;
  setEditingId: (id: number | null) => void;
  updateText: (id: number, text: string) => void;
  updateType: (id: number, type: CardTypes) => void;
};

export const useNotesStore = create<NotesStore>((set) => ({
  notes: initialNotes,
  focusedIdx: 0,
  selectedIds: new Set(),
  editingId: null,

  setFocusedIdx: (idx) => set({ focusedIdx: idx }),

  toggleSelected: (id) =>
    set((state) => {
      const next = new Set(state.selectedIds);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return { selectedIds: next };
    }),

  setEditingId: (id) =>
    set((state) => ({
      editingId: id,
      // снимаем выделение с блока при входе в редактирование
      selectedIds:
        id !== null
          ? (() => {
              const s = new Set(state.selectedIds);
              s.delete(id);
              return s;
            })()
          : state.selectedIds,
    })),

  updateText: (id, text) =>
    set((state) => ({
      notes: state.notes.map((n) => (n.id === id ? { ...n, text } : n)),
    })),

  updateType: (id, type) =>
    set((state) => ({
      notes: state.notes.map((n) => (n.id === id ? { ...n, type } : n)),
    })),
}));
