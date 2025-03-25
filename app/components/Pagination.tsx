"use client";
import React, { Dispatch, SetStateAction, FC } from "react";
import { Card } from "@/types/card";

type PaginationProps = {
  header: string;
  setFilteredCards: Dispatch<SetStateAction<Card[]>>;
  setNewLinks: Dispatch<SetStateAction<string>>;
};

interface Link {
  url: string;
  rel: string;
}

const Pagination: FC<PaginationProps> = ({
  header,
  setFilteredCards,
  setNewLinks,
}) => {
  const parseHeader = (linkHeaderStr: string): Link[] => {
    if (!linkHeaderStr) return [];

    return linkHeaderStr.split(",").map((link) => {
      const [url, rel] = link.split(";");

      return {
        rel: rel.trim().replace(/rel="(.+)"/, "$1"),
        url: url.trim().replace(/[<>]/g, ""),
      };
    });
  };

  const getUrlByRel = (rel: string, links: Link[]) => {
    const item = links.find((link) => link.rel === rel);
    return item ? item.url : null;
  };

  const parsedLinks = parseHeader(header);

  async function onButtonClick(url: string) {
    const updatedUrl = url.replace(
      "https://api.magicthegathering.io/v1",
      "/api"
    );
    try {
      const response = await fetch(updatedUrl, {
        method: "GET",
      });
      const data = await response.json();
      setNewLinks(data.linkHeader);
      setFilteredCards(data.cards.cards);
    } catch (error) {
      console.error(error);
    }
  }

  const prevLink =
    getUrlByRel("prev", parsedLinks) || getUrlByRel("last", parsedLinks);
  const nextLink =
    getUrlByRel("next", parsedLinks) || getUrlByRel("first", parsedLinks);

  return (
    parsedLinks &&
    prevLink &&
    nextLink && (
      <div className="flex justify-end space-x-2">
        <button
          className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
          onClick={() => onButtonClick(prevLink)}
        >
          Prev
        </button>
        <button
          className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
          onClick={() => onButtonClick(nextLink)}
        >
          Next
        </button>
      </div>
    )
  );
};

export default Pagination;
