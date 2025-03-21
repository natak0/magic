"use client";
import { Card } from "@/types/card";

interface CardDetailProps {
  card: Card;
}

export const CardDetail = ({ card }: CardDetailProps) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-3xl mx-auto">
      <div className="flex flex-col sm:flex-row">
        {card.imageUrl && (
          <div className="w-full p-6">
            <img src={card.imageUrl} alt={card.name} />
          </div>
        )}

        <div className="w-full p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{card.name}</h1>

          {card.type && (
            <div className="text-gray-700 mb-2">
              <span className="font-semibold">Type:</span> {card.type}
            </div>
          )}

          {card.setName && (
            <div className="text-gray-700 mb-2">
              <span className="font-semibold">Set:</span> {card.setName}
            </div>
          )}

          {card.rarity && (
            <div className="text-gray-700 mb-2">
              <span className="font-semibold">Rarity:</span> {card.rarity}
            </div>
          )}

          {card.text && (
            <div className="mt-4 border-t pt-4">
              <p className="text-gray-800 whitespace-pre-line">{card.text}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
