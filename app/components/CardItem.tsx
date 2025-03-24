"use client";
import { Card } from "@/types/card";
import Link from "next/link";

interface CardProps {
  card: Card;
}

export default function CardItem({ card }: CardProps) {
  return (
    <div className="flex flex-col items-start gap-6 sm:p-7 md:flex-row md:gap-8 rounded-2xl bg-white p-4">
      <div className="flex flex-col text-left">
        <span className="text-xl sm:text-2xl font-medium line-clamp-1 text-gray-900 dark:text-gray-600">
          {card.name}
        </span>
        <span className="font-medium line-clamp-1 text-gray-900 dark:text-gray-600">
          {card.type}
        </span>
        <span className="flex gap-2 font-medium text-gray-600 dark:text-gray-400 line-clamp-1">
          {card.rarity}
        </span>
        <br></br>
        <Link
          href={`/cards/${card.id}`}
          className="text-gray-900 hover:text-blue-700 mb-6 inline-block"
        >
          More...
        </Link>
      </div>
    </div>
  );
}
