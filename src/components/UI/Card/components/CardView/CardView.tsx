import { useTextLayout } from "@/hooks";
import type { ICardType } from "@/types";
import { parseBlocks } from "@/utils";
import { MoreIcon } from "@/components/icons";

import styles from "./CardView.module.css";
import type { FC } from "react";

export const CardView: FC<{
  item: ICardType;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ item, setEdit }) => {

  switch (item.type) {
    case "image_top":
      return <BigImageView item={item} setEdit={setEdit} type="top" />;

    case "image_bottom":
      return <BigImageView item={item} setEdit={setEdit} type="bottom" />;

    case "image_left":
      return <DefaultView item={item} setEdit={setEdit} />;

    case "default":
    default:
      return <DefaultView item={item} setEdit={setEdit} />;
  }
};


const DefaultView: FC<{
  item: ICardType;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ item, setEdit }) => {
  const { ref, lineCount, lastLineFillPercent } = useTextLayout();

  const blocksValue = parseBlocks(item.blocks);
  const isNotification = item.blocks.startsWith("+");
  const counterVisible = blocksValue > 0;

  const blocks = item.blocks.slice(0, 4);

  const toNewLinePercent =
    blocks.length === 1 ? 0.93 : (100 - blocks.length * 4.5) / 100;

  return (
    <div
      className={`${styles.card} 
        ${item.image ? styles.card__image : ""} 
        ${lineCount > 2 ? styles.card__image_multi : ""} 
        ${lineCount >= 2 || lastLineFillPercent >= toNewLinePercent ? styles.card_multiline : ""} 
        ${lastLineFillPercent >= toNewLinePercent && counterVisible ? styles.card_multiline_last_line_filled : ""}`}
    >
      {item.image && (
        <div className={styles.image__block}>
          <img src={item.image} alt="image" />
        </div>
      )}

      <p className={styles.card__text} ref={ref}>
        {item.text}
      </p>

      {counterVisible && (
        <div
          className={`${styles.card__counter} ${isNotification ? styles.active : ""}`}
        >
          {blocks}
        </div>
      )}

      <button
        className={styles.card__more_button}
        onClick={() => setEdit(true)}
      >
        <MoreIcon />
      </button>
    </div>
  );
};

const BigImageView: FC<{
  item: ICardType;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
  type: 'top' | 'bottom'
}> = ({ item, setEdit, type }) => {
  const { ref, lineCount, lastLineFillPercent } = useTextLayout();

  const blocksValue = parseBlocks(item.blocks);
  const isNotification = item.blocks.startsWith("+");
  const counterVisible = blocksValue > 0;

  const blocks = item.blocks.slice(0, 4);

  const toNewLinePercent =
    blocks.length === 1 ? 0.93 : (100 - blocks.length * 4.5) / 100;

  return (
    <div
      className={`
        ${styles.bigImage} 
        ${styles[type]} 
        ${type === 'top' && (lineCount >= 2 || lastLineFillPercent >= toNewLinePercent) ? styles.card_multiline : ""} 
        ${type === 'top' && (lastLineFillPercent >= toNewLinePercent && counterVisible) ? styles.card_multiline_last_line_filled : ""}
      `}
    >
      <button
        className={styles.card__more_button}
        onClick={() => setEdit(true)}
      >
        <MoreIcon />
      </button>
      <div className={styles.imageContainer}>
        <img src='/placeholder-image.jpg' />
      </div>
      {counterVisible && (
        <div
          className={`${styles.card__counter} ${isNotification ? styles.active : ""}`}
        >
          {blocks}
        </div>
      )}
      <div className={styles.cardContent}>
        <p className={styles.card__text} ref={ref}>
          {item.text}
        </p>
      </div>
    </div>
  )
}
