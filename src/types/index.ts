export interface ICardType {
  id: number;
  text: string;
  blocks: string;
  image?: string;
  type: CardTypes;
}

export type CardTypes = "default" | "image_left" | "image_top" | "image_bottom";
