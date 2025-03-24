export interface Card {
  id: string;
  name: string;
  imageUrl?: string;
  type: string;
  rarity: string;
  text: string;
  setName: string;
}

export interface CardsListProps {
  cards: Card[];
}
