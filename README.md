# Blog News

This project is a modern news aggregation platform built with Next.js. It fetches, consolidates, and displays the latest news from various sources, including NewsAPI, NewsData.io, Pavuk.ai, and GNews.io, providing a clean, searchable, and responsive interface for users.

## Features

- **Multi-Source Aggregation**: Fetches articles from four different news APIs concurrently.
- **Unified Data Model**: Normalizes data from various sources into a consistent format for seamless display.
- **Dynamic Search**: Allows users to search for news articles across all aggregated sources.
- **Client-Side Fetching**: The news list updates dynamically on the client-side based on search and pagination, leveraging a dedicated API route.
- **Pagination**: Easy navigation through a large number of news articles.
- **Responsive Design**: A clean and modern UI built with Tailwind CSS and Shadcn/ui that works across all devices.
- **Loading States**: Skeletons are shown while news data is being fetched to improve user experience.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) 15 (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI**: [React](https://react.dev/) 19
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) 4, [Shadcn/ui](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

## How It Works

The application's core logic for news aggregation resides in the `lib/news` directory.

1.  **Source Adapters (`lib/news/source.ts`)**: Each external news API has a corresponding adapter that defines how to build the request URL, extract the list of articles from the response, and normalize each article into a standard `NewsItem` format.

2.  **News Service (`lib/news/service.ts`)**: The `getNews` function orchestrates the aggregation process. It sends parallel requests to all configured news sources.

3.  **Data Processing**: After fetching, the results are:
    - Merged into a single list.
    - Filtered by the search query (`q`) if provided.
    - Deduplicated based on the article URL to avoid showing the same story multiple times.
    - Sorted by publication date in descending order.

4.  **API Route (`app/api/news/route.ts`)**: This route exposes the `getNews` service, allowing the frontend to fetch news data dynamically with parameters for search query, pagination, and source filtering.

## Getting Started

Follow these instructions to get a local copy of the project up and running.

### Prerequisites

- Node.js (v20 or newer)
- npm, yarn, pnpm, or bun

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/janfdev/blog-news.git
    ```

2.  Navigate to the project directory:
    ```bash
    cd blog-news
    ```

3.  Install the dependencies:
    ```bash
    npm install
    ```

### Environment Variables

To fetch news, you need to provide API keys for the different news services.

1.  Create a `.env` file in the root of the project by copying the example file:
    ```bash
    cp .env.example .env
    ```

2.  Open `.env` and add your API keys. You can get them from the respective websites:
    - [newsapi.org](https://newsapi.org)
    - [newsdata.io](https://newsdata.io)
    - [pavuk.ai](https://pavuk.ai)
    - [gnews.io](https://gnews.io)

    ```env
    # .env
    API_KEY1=YOUR_NEWSAPI_ORG_KEY
    API_KEY2=YOUR_NEWSDATA_IO_KEY
    API_KEY3=YOUR_PAVUK_AI_KEY
    API_KEY4=YOUR_GNEWS_IO_KEY
    ```

### Running the Development Server

Start the development server with Turbopack for the best performance:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.