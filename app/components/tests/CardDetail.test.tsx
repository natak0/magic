import { render, screen } from "@testing-library/react";
import { CardDetail } from "@/components/CardDetail";
import { Card } from "@/types/card";
import "@testing-library/jest-dom";

describe("CardDetail", () => {
  const mockCard: Card = {
    id: "1",
    name: "Image Card",
    imageUrl: "image.jpg",
    type: "Creature",
    setName: "Set 1",
    rarity: "Rare",
    text: "Test card description.",
  };

  const mockCardWithoutImage: Card = {
    id: "2",
    name: "No Image Card",
    type: "Artifact",
    setName: "Set 2",
    rarity: "Uncommon",
    text: "Test card with no imagedescription.",
  };

  it("renders the card details correctly", () => {
    render(<CardDetail card={mockCard} />);
  });

  it("does not render image when imageUrl is not provided", () => {
    render(<CardDetail card={mockCardWithoutImage} />);
    const image = screen.queryByAltText(mockCardWithoutImage.name);
    expect(image).toBeNull();
  });

  it("renders the card text correctly with no image", () => {
    render(<CardDetail card={mockCardWithoutImage} />);
    expect(screen.getByText(mockCardWithoutImage.name)).toBeInTheDocument();
    expect(screen.getByText(mockCardWithoutImage.text)).toBeInTheDocument();
  });

  it("renders the type, set, rarity, and text fields based on the card properties", () => {
    render(<CardDetail card={mockCard} />);
    expect(screen.getByText(`${mockCard.type}`)).toBeInTheDocument();
    expect(screen.getByText(`${mockCard.setName}`)).toBeInTheDocument();
    expect(screen.getByText(`${mockCard.rarity}`)).toBeInTheDocument();
    expect(screen.getByText(mockCard.text)).toBeInTheDocument();
  });
});
