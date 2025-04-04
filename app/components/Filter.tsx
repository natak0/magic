"use client";

import { useState, FormEvent, SetStateAction, Dispatch, FC } from "react";
import { Card } from "@/types/card";

type FilterProps = {
  setFilteredCards: Dispatch<SetStateAction<Card[]>>;
};

const Filter: FC<FilterProps> = ({ setFilteredCards }) => {
  const [error, setError] = useState<boolean>(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(false);

    try {
      const formData = new FormData(event.currentTarget);
      const name = formData.get("name") as string;
      const response = await fetch(`/api/cards?name=${name}`, {
        method: "GET",
      });
      const data = await response.json();
      const cards = data.cards;
      if (cards.cards.length > 0) setFilteredCards(cards.cards);
      else setError(true);
    } catch (error) {
      setError(true);
      console.error(error);
    }
  }

  return (
    <>
      <form
        onSubmit={onSubmit}
        className="w-full max-w-screen-md mx-auto p-4"
        role="form"
      >
        <input
          type="text"
          name="name"
          role="input"
          placeholder="Search by name"
          className="w-full px-4 py-2 border border-gray-300 text-gray-900 dark:text-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </form>
      {error && <span>No results</span>}
    </>
  );
};
export default Filter;
