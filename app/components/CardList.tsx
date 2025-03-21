import { Card } from "@/types/card";
import CardItem from "./CardItem";

interface CardsListProps {
  cards: Card[];
}

export default function CardsList({ cards }: CardsListProps) {
  return (
    <div className="grid grid-cols md:grid-cols-2 lg:grid-cols-3 gap-4 md:p-10">
      {cards.map((card) => (
        <CardItem key={card.id} card={card} />
      ))}
    </div>
  );
}
