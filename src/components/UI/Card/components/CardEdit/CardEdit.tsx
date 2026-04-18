import { ArrowIcon, ExitIcon } from "@/components/icons";

import styles from "./CardEdit.module.css";
import { useEffect, useState, type FC } from "react";
import { useTextLayout } from "@/hooks";
import { CardTypeSelector } from "../CardTypeSelector/CardTypeSelector";

export const CardEdit: FC<{
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
  value: string
}> = ({ setEdit, value }) => {
  const saveChanges = () => {
    setEdit(false);
  };

  const [text, setText] = useState(value)

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <button className={styles.closeButton} onClick={() => setEdit(false)}>
          <ExitIcon />
        </button>

        <div className={styles.cardHeaderLast}>
          <CardTypeSelector />

          <button className={`${styles.backButton} ${text.length > 0 ? styles.active: ''}`} onClick={saveChanges}>
            <ArrowIcon />
          </button>
        </div>

       
      </div>
      <EditDefault setText={setText} value={value} type='image' />
      {/* <EditBigImage setText={setText} value={value} type="inputBottom" /> */}
    </div>
  );
};


const EditBigImage: FC<{
  value: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  type?: 'inputBottom' | 'inputTop'
}> = ({ value, setText, type = 'inputTop' }) => {
  return (
    <div className={`${styles.bigImageContainer} ${type === 'inputBottom' ? styles.bottom: ''}`}>
      <input type="text" className={styles.bigImageInput} value={value} onChange={(e) => setText(e.target.value)} placeholder="Write your idea!"/>
      <button className={styles.bigImage}>
        <img src="/add-image.svg" alt='add image' />
      </button>
    </div>
  )
}


const EditDefault: FC<{
  value: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  type?: 'image' | 'text'
}> = ({ value, setText, type = 'text' }) => {
  const { ref, lineCount } = useTextLayout();

  // useEffect(() => {
  //   if (ref.current) ref.current.innerHTML = value;
  // }, [ref, value]);

  // const handleInput = () => {
  //   const el = ref.current;
  //   if (!el) return;

  //   if (el.innerHTML === "<br>") el.innerHTML = "";
  //   setText(el.innerText);
  // };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const existingWrapper = el.querySelector('.imageWrapper'); // ищем по реальному классу

    el.innerHTML = value || '';

    if (type === 'image') {
      if (existingWrapper) {
        el.prepend(existingWrapper);
      } else {
        const wrapper = document.createElement('div');
        wrapper.className = styles.imageWrapper || 'imageWrapper'; // защита

        const img = document.createElement('img');
        img.src = "/add-image.svg";
        img.alt = "add image";
        img.className = styles.inlineImage || 'inlineImage';

        wrapper.appendChild(img);
        el.prepend(wrapper);
      }
    }
  }, [ref, value, type]);

  const handleInput = () => {
    const el = ref.current;
    if (!el) return;
    if (el.innerHTML === "<br>") el.innerHTML = "";
    setText(el.innerText.trim());
  };

  return (
    <>
    
    <div
      ref={ref}
      className={`${styles.textarea} ${lineCount >= 2 ? styles.big : ""}`}
      contentEditable
      suppressContentEditableWarning
      onInput={handleInput}
      data-placeholder="Write your idea!"
    />
    </>
  );
};
