"use client";
import { useState } from "react";
import CardList from "@/components/CardList";
import { Card } from "../types/card";
import Filter from "./Filter";

export default function CardsContainer({
  initialCards,
}: {
  initialCards: Card[];
}) {
  const [filteredCards, setFilteredCards] = useState<Card[]>(initialCards);

  return (
    <div className="flex gap-4 items-center flex-col">
      <Filter setFilteredCards={setFilteredCards} />
      <CardList cards={filteredCards} />
    </div>
  );
}
