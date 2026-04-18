import type { ICardType } from "@/types";
import { useState, type FC } from "react";
import { CardEdit, CardView } from "./components";

import styles from "./Card.module.css";

export const Card: FC<{ item: ICardType }> = ({ item }) => {
  const [edit, setEdit] = useState(false);

  return (
    <div className={styles.wraps}>
      {edit ? (
        <CardEdit key="edit" setEdit={setEdit} value={item.text} />
      ) : (
        <CardView key="view" item={item} setEdit={setEdit} />
      )}
    </div>
  );
};
