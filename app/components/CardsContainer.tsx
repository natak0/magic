"use client";
import { useState } from "react";
import CardList from "@/components/CardList";
import { Card } from "../types/card";
import Filter from "./Filter";
import Pagination from "./Pagination";

export default function CardsContainer({
  initialCards,
  links,
}: {
  initialCards: Card[];
  links: string;
}) {
  const [filteredCards, setFilteredCards] = useState<Card[]>(initialCards);
  const [newLinks, setNewLinks] = useState<string>(links);

  return (
    <div className="flex gap-4 items-center flex-col">
      <Filter setFilteredCards={setFilteredCards} />
      <Pagination
        header={newLinks}
        setFilteredCards={setFilteredCards}
        setNewLinks={setNewLinks}
      />
      <CardList cards={filteredCards} />
    </div>
  );
}
