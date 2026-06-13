# DocIntel - AI Document Intelligence Platform

DocIntel is a full-stack, production-ready document intelligence platform. It allows users to upload any PDF or document and ask questions in natural language. An autonomous agent reasons about the question, optimizes its search, and returns precise answers strictly grounded in the uploaded files.

![DocIntel](https://github.com/user-attachments/assets/placeholder)

**Backend API Repository:** [https://github.com/janaka99/ai-intelligent-document-platform-client](https://github.com/janaka99/ai-intelligent-document-platform) | **Live Demo:** [https://docintel-nine.vercel.app](https://docintel-nine.vercel.app)

## ✨ Core Capabilities

- **Agentic Workflow:** Powered by LangGraph, a multi-step agent loop decides when to refine a query, when to search, and when it has enough context to answer.
- **Query Optimization:** Ambiguous questions are rewritten into precise search queries before touching the vector database.
- **Semantic Vector Search:** Uses OpenAI embeddings and MongoDB Atlas vector search to find conceptually similar content.
- **Memory Management:** Efficient conversation history compression ensures long conversations don't balloon token costs.
- **Streaming via SSE:** Server-Sent Events stream every token, including live agent tool calls, providing real-time visibility into the agent's thought process.
- **Rich Markdown Output:** Responses render as beautiful tables, code blocks, bullet lists, and clickable links.

## 🏗️ Architecture Stack

### Frontend (This Repository)

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS + shadcn/ui
- **Features:** Server/Client components, Server-Sent Events (SSE) parsing, dynamic `react-markdown` rendering.

### Backend (API Service)

- **Framework:** FastAPI (Async Python API)
- **Orchestration:** LangGraph (Agent state machine)
- **Database:** MongoDB Atlas (Vector + Document Store)
- **LLM / Embeddings:** OpenAI (`gpt-4o`, `text-embedding-3-small`)

---

## 🚀 Getting Started

Follow these steps to run the client application locally.

### 1. Prerequisites

- Node.js (v18+ recommended)
- npm, yarn, pnpm, or bun
- The DocIntel FastAPI backend running locally (typically on port 8000).

### 2. Installation

Clone this repository and install dependencies:

```bash
git clone https://github.com/yourusername/ai-document-intelligence-platform-client.git
cd ai-document-intelligence-platform-client

npm install
# or yarn install / pnpm install
```

### 3. Environment Variables

Create a `.env` file in the root directory based on the configuration you need:

```env
# URL for the FastAPI backend (default local development URL)
NEXT_PUBLIC_API_URL="http://localhost:8000"

# Optional: Links for the landing page
NEXT_PUBLIC_GITHUB_URL="https://github.com/yourusername/ai-document-intelligence-platform"
NEXT_PUBLIC_DOCS_URL="https://docs.yourplatform.com"
```

### 4. Running the Development Server

Start the Next.js development server:

```bash
npm run dev
# or yarn dev / pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to view the application.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](#) if you want to contribute.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
