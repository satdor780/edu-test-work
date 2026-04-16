import { Card } from "@/components/UI";
import type { ICardType } from "@/types";
import { useState } from "react";

const DEFAULT_TEXT =
  "Drinking water isn't just about quenching your thirst. It plays a crucial role in overall health.";
const DEFAULT_BLOCKS = "1";

export const Notes = () => {
  const [text, setText] = useState(DEFAULT_TEXT);
  const [blocks, setBlocks] = useState(DEFAULT_BLOCKS);

  const item: ICardType = { text, blocks };
  const itemWithImage: ICardType = { text, blocks, image: "/card-image.png" };

  return (
    <div
      style={{
        padding: 32,
        display: "flex",
        flexDirection: "column",
        gap: 24,
        maxWidth: 480,
      }}
    >
      <Card item={item} />
      <Card item={itemWithImage} />

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <label style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <span style={{ fontSize: 12, color: "#888" }}>Текст карточки</span>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={3}
            style={{
              padding: "8px 10px",
              borderRadius: 8,
              border: "1px solid #ddd",
              resize: "vertical",
              fontFamily: "inherit",
              fontSize: 14,
            }}
          />
        </label>

        <label style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <span style={{ fontSize: 12, color: "#888" }}>
            Индикатор блоков&nbsp;
            <span style={{ color: "#bbb" }}>
              (0 — скрыт · 1–9999 — обычный · +1…+999 — оповещение)
            </span>
          </span>
          <input
            value={blocks}
            onChange={(e) => setBlocks(e.target.value)}
            placeholder="0 / 42 / +15"
            style={{
              padding: "8px 10px",
              borderRadius: 8,
              border: "1px solid #ddd",
              fontFamily: "inherit",
              fontSize: 14,
            }}
          />
        </label>
      </div>
    </div>
  );
};
