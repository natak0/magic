## About Magic

A web application to render a list of cards from [the Magic the Gathering API](https://api.magicthegathering.io/v1/cards).
The application (Next.js, React, Typescript) consists of 2 views. A list of cards and a detailed page for the selected card.

The list of cards has a pagination and a search input to search cards by name by using the API’s query parameter (?name=).

## Run the app locally

```bash
npm i
export NEXT_PUBLIC_SITE_URL=http://localhost:3000
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Test

React Testing Library unit tests:

```bash
npm run test
```

## Styling

Tailwind
