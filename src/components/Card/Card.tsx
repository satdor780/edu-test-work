import type { FC } from "react";
import { useTextLayout } from "../../hooks";
import type { ICardType } from "../../types";
import { MoreIcon } from "../icons";
import styles from "./Card.module.css";
import { parseBlocks } from "../../utils";

export const Card: FC<{
  item: ICardType
}> = ({item}) => {

  const { ref, lineCount, lastLineFillPercent } = useTextLayout();

  const blocksValue = parseBlocks(item.blocks);
  const isNotification = item.blocks.startsWith("+");
  const counterVisible = blocksValue > 0;

  const blocks = item.blocks.slice(0, 4)

  const toNewLinePercent = blocks.length === 1 ? 0.93 :(100 - (blocks.length * 4.5)) / 100

  return (
    <div className={`${styles.card} 
      ${item.image ? styles.card__image: ''} 
      ${lineCount > 2 ? styles.card__image_multi: ''} 
      ${lineCount >= 2 || lastLineFillPercent >= toNewLinePercent ? styles.card_multiline : ''} 
      ${lastLineFillPercent >= toNewLinePercent && counterVisible ? styles.card_multiline_last_line_filled : ''}`}
    >
      
      {item.image && (
        <div className={styles.image__block}>
          <img src={item.image} alt="image" />
        </div>
      )}
      
      <p className={styles.card__text} ref={ref}>{item.text}</p>

      {counterVisible && (
        <div className={`${styles.card__counter} ${isNotification ? styles.active : ""}`}>{blocks}</div>
      )}
      
      <button className={styles.card__more_button}><MoreIcon /></button>
    </div>
  )
}