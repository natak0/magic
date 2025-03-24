import { Suspense } from "react";
import CardsContainer from "./components/CardsContainer";

export default async function Home() {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL || ""}/api/cards`
  );
  const list = await data.json();

  return (
    <div>
      <main className="min-h-screen bg-gray-50 py-16">
        <h1 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          Magic: The Gathering Cards
        </h1>
        <Suspense fallback={<Loading />}>
          <div className="flex gap-4 items-center flex-col">
            <CardsContainer
              initialCards={list.cards.cards}
              links={list.linkHeader}
            />
          </div>
        </Suspense>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4 inline-block"
          href="https://magicthegathering.io/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Made with magicthegathering api
        </a>
      </footer>
    </div>
  );
}

function Loading() {
  return <h2>Loading...</h2>;
}
