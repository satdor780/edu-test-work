import { useState, useEffect, useRef, type FC } from "react";
import { CardTypesIcon1, CardTypesIcon2, CardTypesIcon3, CardTypesIcon4 } from "@/components/icons";
import styles from './CardTypeSelector.module.css';

const icons = [CardTypesIcon1, CardTypesIcon2, CardTypesIcon3, CardTypesIcon4];

export const CardTypeSelector: FC = () => {
  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const SelectedIcon = icons[selected];

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      {open && (
        <div className={styles.panel}>
          {icons.map((Icon, i) => (
            <button
              key={i}
              className={`${styles.option} ${selected === i ? styles.active : ''}`}
              onClick={() => { setSelected(i); setOpen(false); }}
            >
              <Icon />
            </button>
          ))}
        </div>
      )}

      <button
        className={styles.trigger}
        onClick={() => setOpen(prev => !prev)}
      >
        <SelectedIcon />
      </button>
    </div>
  );
};