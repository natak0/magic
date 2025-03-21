"use client";
import { Card } from "@/types/card";
import { redirect } from "next/navigation";

interface CardProps {
  card: Card;
}

export default function CardItem({ card }: CardProps) {
  return (
    <div
      className="flex flex-col items-center gap-6 p-7 md:flex-row md:gap-8 rounded-2xl bg-white"
      onClick={() => redirect(`/cards/${card.id}`)}
    >
      {/*  {card.imageUrl ? (
        <img src={card.imageUrl} alt={card.name} />
      ) : (
        <div className="w-[223px] h-[310px] bg-gray-300 rounded-xl"></div>
      )} */}
      <div className="flex flex-col items-start">
        <span className="text-2xl font-medium">{card.name}</span>
        <span className="font-medium">{card.type}</span>
        <span className="flex gap-2 font-medium text-gray-600 dark:text-gray-400">
          {card.rarity}
        </span>
      </div>
    </div>
  );
}
