import { CardDetail } from "@/components/CardDetail";
import Link from "next/link";
import { Card } from "@/types/card";
import { notFound } from "next/navigation";

async function getCardById(id: string): Promise<Card | null> {
  const res = await fetch(`https://api.magicthegathering.io/v1/cards/${id}`, {
    cache: "no-cache",
  });
  const data: Card = await res.json();
  if (!data) notFound();
  const card = data.card;

  return card;
}

export default async function CardDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const card = await getCardById(id);

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
