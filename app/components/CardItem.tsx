import { Card } from "@/types/card";

interface CardProps {
  card: Card;
}

export default function CardItem({ card }: CardProps) {
  const imageUrl = encodeURIComponent(card.imageUrl || "");
  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center text-center">
      {card.imageUrl && (
        <img src={card.imageUrl} alt={card.name} className="w-full h-auto" />
      )}
      <h2 className="text-lg font-bold mt-2">{card.name}</h2>
    </div>
  );
}
