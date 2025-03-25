import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import Filter from "@/components/Filter";
import { Card } from "@/app/types/card";

const mockResponse = (body: { cards: Card[] }) => {
  return {
    ok: true,
    status: 200,
    json: () => Promise.resolve(body),
  };
};

global.fetch = jest.fn() as jest.Mock;

describe("Filter component", () => {
  let setFilteredCards: jest.Mock;

  beforeEach(() => {
    setFilteredCards = jest.fn();
    (global.fetch as jest.Mock).mockClear();
  });

  it("should render the input field", () => {
    render(<Filter setFilteredCards={setFilteredCards} />);
    const input = screen.getByRole("input");
    expect(input).toBeInTheDocument();
  });

  it("should display 'No results' when no cards are returned", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce(
      mockResponse({ cards: [] })
    );

    render(<Filter setFilteredCards={setFilteredCards} />);

    const input = screen.getByRole("input");
    const form = screen.getByRole("form");

    await act(async () => {
      fireEvent.change(input, { target: { value: "nada" } });
      fireEvent.submit(form);
    });

    expect(global.fetch).toHaveBeenCalledWith(
      "/api/cards?name=nada",
      expect.objectContaining({ method: "GET" })
    );

    const errorMessage = screen.getByText("No results");
    expect(errorMessage).toBeInTheDocument();

    expect(setFilteredCards).not.toHaveBeenCalled();
  });

  it("should call setFilteredCards with data when cards are found", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce(
      mockResponse({
        cards: [
          {
            id: "1",
            name: "Card 1",
            type: "Creature",
            rarity: "Rare",
            setName: "Set 1",
            text: "Test card description.",
          },
        ],
      })
    );

    render(<Filter setFilteredCards={setFilteredCards} />);

    const input = screen.getByPlaceholderText("Search by name");
    const form = screen.getByRole("form");

    await act(async () => {
      fireEvent.change(input, { target: { value: "card 1" } });
      fireEvent.submit(form);
    });

    expect(global.fetch).toHaveBeenCalledWith(
      "/api/cards?name=card 1",
      expect.objectContaining({ method: "GET" })
    );

    expect(setFilteredCards).toHaveBeenCalledWith([
      {
        id: "1",
        name: "Card 1",
        type: "Creature",
        rarity: "Rare",
        setName: "Set 1",
        text: "Test card description.",
      },
    ]);
  });
});
