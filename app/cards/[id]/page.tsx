import { CardDetail } from "@/components/CardDetail";
import Link from "next/link";
import { Card } from "@/types/card";

async function getCardById(id: string): Promise<Card | null> {
  try {
    const res = await fetch(`https://api.magicthegathering.io/v1/cards/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      return null;
    }
    const data = await res.json();
    return data.card || null;
  } catch (error) {
    console.error("Error fetching card:", error);
    return null;
  }
}

export default async function CardDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const card = await getCardById(params.id);

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {!card && (
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Card not found
          </h1>
        )}
        <Link
          href="/"
          className="text-gray-900 hover:text-blue-700 mb-6 inline-block"
        >
          Back to Cards
        </Link>
        {card && <CardDetail card={card} />}
      </div>
    </main>
  );
}
