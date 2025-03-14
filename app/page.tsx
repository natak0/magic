import CardList from "@/components/CardList";
import { Suspense } from "react";

export default async function Home() {
  const page = 1;
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL || ""}/api/cards?page=${page}`,
  );
  const list = await data.json();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1>Magic: The Gathering Cards</h1>
        <Suspense fallback={<Loading />}>
          <div className="flex gap-4 items-center flex-col sm:flex-row">
            <CardList cards={list.cards} />
          </div>
        </Suspense>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
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
