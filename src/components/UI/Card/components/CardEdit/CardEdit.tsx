import { ArrowIcon, ExitIcon } from "@/components/icons";

import styles from "./CardEdit.module.css";
import { useEffect, useRef, useState, type FC } from "react";
import { useTextLayout } from "@/hooks";
import { CardTypeSelector } from "../CardTypeSelector/CardTypeSelector";
import type { CardTypes, ICardType } from "@/types";
import { useNotesStore } from "@/store";

export const CardEdit: FC<{
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
  item: ICardType;
}> = ({ setEdit, item }) => {
  const updateText = useNotesStore((s) => s.updateText);
  const updateType = useNotesStore((s) => s.updateType);

  const [text, setText] = useState(item.text);
  const [pendingType, setPendingType] = useState<CardTypes>(item.type);

  const saveChanges = () => {
    updateText(item.id, text);
    updateType(item.id, pendingType);
    setEdit(false);
  };

  const renderEditor = () => {
    switch (pendingType) {
      case "image_top":
        return (
          <EditBigImage value={text} setText={setText} image={item.image} type="inputBottom" />
        );

      case "image_bottom":
        return <EditBigImage value={text} setText={setText} image={item.image} type="inputTop" />;

      case "image_left":
        return (
          <EditDefault
            key={pendingType}
            value={text}
            setText={setText}
            image={item.image}
            type="image"
          />
        );
      case "default":
      default:
        return (
          <EditDefault
            key={pendingType}
            value={text}
            setText={setText}
            type="text"
          />
        );
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <button className={styles.closeButton} onClick={() => setEdit(false)}>
          <ExitIcon />
        </button>

        <div className={styles.cardHeaderLast}>
          <CardTypeSelector
            itemId={item.id}
            onSelect={setPendingType}
            selected={pendingType}
          />

          <button
            className={`${styles.backButton} ${text.length > 0 ? styles.active : ""}`}
            onClick={saveChanges}
          >
            <ArrowIcon />
          </button>
        </div>
      </div>
      {renderEditor()}
    </div>
  );
};

const EditBigImage: FC<{
  value: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  type?: "inputBottom" | "inputTop";
  image?: string
}> = ({ value, setText, type = "inputTop", image }) => {
  return (
    <div
      className={`${styles.bigImageContainer} ${type === "inputBottom" ? styles.bottom : ""}`}
    >
      <input
        type="text"
        className={styles.bigImageInput}
        value={value}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your idea!"
      />
      <button className={`${styles.bigImage} ${!image ? styles.placeholder: ''}`}>
        <img src={image ? image: '/card-image.jpg'} alt="add image" />
      </button>

    </div>
  );
};

const EditDefault: FC<{
  value: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  type?: "image" | "text";
  image?: string
}> = ({ value, setText, type = "text", image }) => {
  const { ref, lineCount } = useTextLayout();
  const initialized = useRef(false);

  const createImageWrapper = () => {
    const wrapper = document.createElement("div");
    wrapper.className = styles.imageWrapper || "imageWrapper";
    wrapper.contentEditable = "false";
    wrapper.dataset.protected = "true";

    const img = document.createElement("img");
    img.src = image ? image: '/add-image.svg';
    img.alt = "add image";
    img.className = `${styles.inlineImage || "inlineImage"} ${!image ? styles.placeholder: ''}`

    wrapper.appendChild(img);
    return wrapper;
  };

  useEffect(() => {
    const el = ref.current;
    if (!el || initialized.current) return;

    initialized.current = true;
    el.innerHTML = value || "";

    if (type === "image") {
      el.prepend(createImageWrapper());
    } else {
      el.querySelector("[data-protected]")?.remove(); // ←
    }

    el.dataset.empty = el.innerText.trim() === "" ? "true" : "false";
  }, []);

  const handleInput = () => {
    const el = ref.current;
    if (!el) return;

    if (type === "image" && !el.querySelector("[data-protected]")) {
      el.prepend(createImageWrapper());
    }

    if (
      type === "image" &&
      el.lastChild === el.querySelector("[data-protected]")
    ) {
      const br = document.createElement("br");
      el.appendChild(br);
      const range = document.createRange();
      const sel = window.getSelection();
      range.setStartAfter(br);
      range.collapse(true);
      sel?.removeAllRanges();
      sel?.addRange(range);
    }

    const text = el.innerText.trim();
    el.dataset.empty = text === "" ? "true" : "false";
    setText(text);
  };

  const to2Lines = type === "image" ? lineCount / 2 > 2 : lineCount > 2;



  return (
    <>
    <div
      ref={ref}
      className={`${styles.textarea} ${styles[type]} ${to2Lines ? styles.big : ""}`}
      contentEditable
      suppressContentEditableWarning
      onInput={handleInput}
      data-placeholder="Write your idea!"
    />
    {lineCount}
    </>
  );
};
