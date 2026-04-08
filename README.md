<div align="center">

<br/>

```
 ██████╗ ██╗████████╗██╗  ██╗██╗   ██╗██████╗      ██████╗ ██████╗ ██████╗ ██╗██╗      ██████╗ ████████╗
██╔════╝ ██║╚══██╔══╝██║  ██║██║   ██║██╔══██╗    ██╔════╝██╔═══██╗██╔══██╗██║██║     ██╔═══██╗╚══██╔══╝
██║  ███╗██║   ██║   ███████║██║   ██║██████╔╝    ██║     ██║   ██║██████╔╝██║██║     ██║   ██║   ██║   
██║   ██║██║   ██║   ██╔══██║██║   ██║██╔══██╗    ██║     ██║   ██║██╔═══╝ ██║██║     ██║   ██║   ██║   
╚██████╔╝██║   ██║   ██║  ██║╚██████╔╝██████╔╝    ╚██████╗╚██████╔╝██║     ██║███████╗╚██████╔╝   ██║   
 ╚═════╝ ╚═╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝ ╚═════╝      ╚═════╝ ╚═════╝╚═╝     ╚═╝╚══════╝ ╚═════╝   ╚═╝   
```

### *Ask anything about any codebase in plain English.*

<br/>

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Pinecone](https://img.shields.io/badge/Pinecone-000000?style=for-the-badge&logo=pinecone&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

<br/>

> An AI-powered developer tool that analyzes any GitHub repository and lets you **ask natural language questions about the codebase** - powered by RAG, vector search, and LLM reasoning.

<br/>
<div align="center">

<br/>

[![Launch App](https://img.shields.io/badge/🚀%20LAUNCH%20APP%20↗-ai--github--repo--copilot.vercel.app-white?style=for-the-badge&labelColor=ffffff&color=ffffff&logoColor=000000)](https://ai-github-repo-copilot.vercel.app/)

<br/>

</div>

<br/>

</div>
</div>

---

## What Is This?

**AI GitHub Repo Copilot** clones any public GitHub repository, processes its source code into vector embeddings, stores them in a vector database, and uses **Retrieval-Augmented Generation (RAG)** to answer your questions about the project - with source attribution for every response.

> No more reading through hundreds of files manually. Just ask.

---

## Features

| Feature | Description |
|---|---|
| **Any Public Repo** | Paste any GitHub URL and start exploring |
| **AI Codebase Q&A** | Ask natural language questions about architecture, logic, and flow |
| **Source Attribution** | Every answer links back to the exact file it came from |
| **Repo Metadata** | Stars, forks, language breakdown, watchers |
| **Code Preview** | Interactive inline preview for referenced files |
| **Auth System** | JWT-based signup / login with protected routes |
| **Responsive UI** | Works on all screen sizes |

---

## Example Questions

```
> How does authentication work?
> Explain the routing logic.
> Where is the database connection implemented?
> Which files handle API requests?
> How does the resume parser work?
> Explain the overall project architecture.
```

---

## System Architecture

```
+---------------------------------------------------------------------+
|                       AI GitHub Repo Copilot                        |
+---------------------------------------------------------------------+

  User Input: GitHub URL
        |
        v
+------------------+
| Repository Clone |  <- git clone via GitHub API
+--------+---------+
         |
         v
+------------------+
|  File Scanner    |  <- filters .js .ts .py .md .json etc.
+--------+---------+
         |
         v
+------------------+
|  Code Chunker    |  <- splits files into ~500-800 token chunks
+--------+---------+
         |
         v
+------------------------------+
|  Embedding Generation        |  <- Xenova/all-MiniLM-L6-v2
|  (384-dim vectors per chunk) |
+--------+---------------------+
         |
         v
+------------------+
| Pinecone Vector  |  <- stores embeddings + metadata
|    Database      |
+--------+---------+
         |
    [ User asks a question ]
         |
         v
+------------------+
| Semantic Search  |  <- query -> embedding -> top-k vector match
+--------+---------+
         |
         v
+------------------+
|  LLM (DeepSeek)  |  <- context + question -> answer
|  via OpenRouter  |
+--------+---------+
         |
         v
   AI Response + Sources
```

---

## Tech Stack

### Frontend
```
React (Vite)         - UI framework
TailwindCSS          - Styling
React Router         - Client-side routing
React Markdown       - Rendering AI responses
```

### Backend
```
Node.js              - Runtime
Express.js           - REST API server
```

### AI & Embeddings
```
DeepSeek LLM         - Language model (via OpenRouter)
all-MiniLM-L6-v2     - Sentence embedding model (Xenova)
384 dimensions       - Embedding vector size
```

### Data & Storage
```
Pinecone             - Vector database for semantic search
MongoDB Atlas        - User authentication storage
```

### External APIs
```
GitHub REST API      - Repo metadata, stars, forks, languages
OpenRouter           - LLM API gateway
```

---

## Core Pipeline (Deep Dive)

### Step 1 - Repository Ingestion

```
POST /api/analyze
Body: { "repoUrl": "https://github.com/user/project" }
```

The backend clones the repository locally using `git clone`.

---

### Step 2 - File Scanning

Only relevant files are extracted:

```
Included extensions:   .js  .ts  .jsx  .tsx  .py  .java  .md  .json  .html  .css
Ignored directories:   node_modules/  .git/  dist/  build/
```

---

### Step 3 - Code Parsing

Each file is structured into a document object:

```json
{
  "path": "src/auth/login.js",
  "content": "function loginUser(req, res) { ... }"
}
```

---

### Step 4 - Chunking

Large files are split into smaller chunks for LLM compatibility:

```
Chunk size: ~500-800 tokens
Strategy:   Sliding window with overlap
```

```json
{
  "file": "backend/routes/auth.js",
  "chunk": 2,
  "text": "router.post('/login', async (req, res) => { ... })"
}
```

---

### Step 5 - Embedding Generation

Each chunk is converted to a 384-dimensional vector:

```
Model: Xenova/all-MiniLM-L6-v2
Output: Float32 array [0.021, -0.143, 0.087, ..., 0.034]
        └── 384 values representing semantic meaning
```

---

### Step 6 - Vector Storage (Pinecone)

```json
{
  "id": "repo-132-chunk-7",
  "values": [ /* 384 floats */ ],
  "metadata": {
    "repo_id": "ResumeAnalyzer",
    "file": "backend/parser/resumeParser.js",
    "text": "function parseResume(filePath) { ... }"
  }
}
```

---

### Step 7 - RAG Query Flow

```
User question  ->  Embed question  ->  Pinecone similarity search
      ->  Retrieve top-k chunks  ->  Build LLM prompt  ->  DeepSeek generates answer
```

**Prompt structure:**

```
You are a codebase assistant. Use the following code snippets to answer the question.

[CODE CONTEXT]
File: backend/parser/resumeParser.js
---
function parseResume(filePath) {
  const raw = pdfReader.extract(filePath);
  return { skills, education, experience };
}

[QUESTION]
How does resume parsing work?

[ANSWER]
```

---

## GitHub API Integration

Metadata fetched per repository:

```json
{
  "name": "ResumeAnalyzer",
  "stars": 142,
  "forks": 38,
  "watchers": 12,
  "primary_language": "JavaScript",
  "languages": {
    "JavaScript": "72%",
    "CSS":        "18%",
    "HTML":       "10%"
  }
}
```

---

## Authentication

```
Strategy:  JWT (JSON Web Tokens)
Storage:   MongoDB Atlas
Routes:    POST /auth/signup  |  POST /auth/login
Guards:    Protected middleware on all analysis routes
```

---

## Project Structure

```
AI_GitHub_Repo_ChatBot/
|
+-- frontend/
|   +-- components/          # Reusable UI components
|   +-- pages/               # Route-level page components
|   +-- api/                 # Axios API client
|
+-- backend/
|   +-- routes/              # Express route handlers
|   |   +-- auth.js          # Login / Signup
|   |   +-- analyze.js       # Repo ingestion + Q&A
|   +-- services/
|   |   +-- cloner.js        # Git clone logic
|   |   +-- scanner.js       # File traversal
|   |   +-- chunker.js       # Text chunking
|   |   +-- embedder.js      # Vector embedding
|   |   +-- pinecone.js      # Vector DB operations
|   |   +-- llm.js           # OpenRouter LLM calls
|   +-- config/
|       +-- db.js            # MongoDB connection
|
+-- .env                     # Environment variables (not committed)
+-- .gitignore
+-- README.md
```

---

## Local Setup

### 1. Clone the repo

```bash
git clone https://github.com/thevishwass/ai-github-repo-copilot.git
cd ai-github-repo-copilot
```

### 2. Install dependencies

```bash
# Frontend
cd frontend && npm install

# Backend
cd ../backend && npm install
```

### 3. Configure environment variables

Create a `.env` file inside `backend/`:

```env
OPENROUTER_API_KEY=your_openrouter_key
PINECONE_API_KEY=your_pinecone_key
PINECONE_INDEX=your_index_name
MONGODB_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret
PORT=5000
```

### 4. Start the servers

```bash
# Backend (from /backend)
npm run dev

# Frontend (from /frontend)
npm run dev
```

### Local
```
Frontend  ->  http://localhost:5173
Backend   ->  http://localhost:5000
```

### Production
```
Frontend: https://ai-github-repo-copilot.vercel.app
Backend : https://ai-github-repo-copilot.onrender.com
```

---

## Roadmap

```
[ ] Repository architecture auto-summary on load
[ ] Code visualization dependency graphs
[ ] Contributor activity insights
[ ] Multi-repository chat context
[ ] VS Code / IDE plugin integration
[ ] Support for private repositories (OAuth)
[ ] Chat history persistence
```

---

## Author

<div align="center">

**Vishwas Singh**

*Engineering Student · Software Developer*

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/thevishwass/)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/vishwassingh15/)

<br/>

*Built with curiosity, caffeine, and vectors.*

</div>

---

<div align="center">
<sub>© 2026 Vishwas Singh · MIT License</sub>
</div>
