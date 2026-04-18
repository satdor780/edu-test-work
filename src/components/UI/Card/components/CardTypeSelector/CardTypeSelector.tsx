import { useState, useEffect, useRef, type FC } from "react";
import {
  CardTypesIcon1,
  CardTypesIcon2,
  CardTypesIcon3,
  CardTypesIcon4,
} from "@/components/icons";
import styles from "./CardTypeSelector.module.css";
import { useNotesStore } from "@/store";

const icons = [CardTypesIcon1, CardTypesIcon2, CardTypesIcon3, CardTypesIcon4];

import type { CardTypes } from "@/types";

const CARD_TYPES: CardTypes[] = [
  "default",
  "image_bottom",
  "image_top",
  "image_left",
];

export const CardTypeSelector: FC<{ itemId: number }> = ({ itemId }) => {
  const { notes, updateType } = useNotesStore();
  const note = notes.find((n) => n.id === itemId);
  const selected = note?.type ?? "default";

  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const SelectedIcon = icons[CARD_TYPES.indexOf(selected)];

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      {open && (
        <div className={styles.panel}>
          {icons.map((Icon, i) => (
            <button
              key={i}
              className={`${styles.option} ${selected === CARD_TYPES[i] ? styles.active : ""}`}
              onClick={() => {
                updateType(itemId, CARD_TYPES[i]);
                setOpen(false);
              }}
            >
              <Icon />
            </button>
          ))}
        </div>
      )}

      <button
        className={styles.trigger}
        onClick={() => setOpen((prev) => !prev)}
      >
        <SelectedIcon />
      </button>
    </div>
  );
};
