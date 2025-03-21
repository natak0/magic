"use client";

import React, { useState, FormEvent } from "react";

export default function Filter() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(event.currentTarget);
      const name = formData.get("name") as string;
      const response = await fetch(`/api/cards?name=${name}`, {
        method: "GET",
      });

      const data = await response.json();
      console.log("data", data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="w-full max-w-screen-md mx-auto p-4">
      <input
        type="text"
        name="name"
        placeholder="Search by name"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </form>
  );
}
