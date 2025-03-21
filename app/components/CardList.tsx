import { Card } from "@/types/card";
import CardItem from "./CardItem";

interface CardsListProps {
  cards: Card[];
}

export default function CardsList({ cards }: CardsListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      {cards.map((card) => (
        <CardItem key={card.id} card={card} />
      ))}
    </div>
  );
}
