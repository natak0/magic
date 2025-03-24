"use client";
import React, { Dispatch, SetStateAction, FC } from "react";
import { Card } from "../types/card";

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
  const parseHeader = (str: string): Link[] => {
    const regex = /<([^>]+)>; rel="([^"]+)"/g;
    const links: Link[] = [];

    let match;
    while ((match = regex.exec(str)) !== null) {
      links.push({ url: match[1], rel: match[2] });
    }

    return links;
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
      <div className="flex justify-end items-center space-x-4 py-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          onClick={() => onButtonClick(prevLink)}
        >
          Prev
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          onClick={() => onButtonClick(nextLink)}
        >
          Next
        </button>
        )
      </div>
    )
  );
};

export default Pagination;
