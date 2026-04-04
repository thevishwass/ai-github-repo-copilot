const express = require("express")
const router = express.Router()

const createEmbedding = require("../services/embeddingService")
const { Pinecone } = require("@pinecone-database/pinecone")
const OpenAI = require("openai")

// OpenRouter client
const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY
})

// Pinecone client
const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY
})

const indexName = "repo-ai"

// helper: extract repo name
function extractRepoId(repoUrl) {
  const parts = repoUrl.split("/")
  return parts[parts.length - 1]
}

router.post("/", async (req, res) => {

  console.log("CHAT ROUTE HIT")

  try {

    const { question, repoUrl } = req.body

    if (!question || !repoUrl) {
      return res.status(400).json({
        error: "Question and repoUrl are required"
      })
    }

    const repoId = extractRepoId(repoUrl)

    console.log("User question:", question)
    console.log("Searching repo:", repoId)

    // create embedding for question
    const questionVector = await createEmbedding(question)

    const index = pinecone.index(indexName)

    // search pinecone
    const queryResponse = await index.query({
      vector: questionVector,
      topK: 10,
      includeMetadata: true,
      filter: {
        repo_id: repoId
      }
    })

    const matches = queryResponse.matches || []

    console.log("Matches returned:", matches.length)

    if (matches.length === 0) {
      return res.json({
        answer: "No relevant code found in this repository.",
        sources: []
      })
    }

    // extract metadata
    const results = matches.map(m => m.metadata)

    console.log("Top retrieved files:")
    results.forEach(r => console.log(r.file))

    // limit context size (very important)
    const context = results
      .slice(0, 5)
      .map(r => `File: ${r.file}\n${r.text}`)
      .join("\n\n")

    // call LLM
    const completion = await client.chat.completions.create({
      model: "openrouter/auto",
      temperature: 0.2,
      messages: [
        {
          role: "system",
          content: `
You are a senior software engineer analyzing a GitHub repository.

Rules:
- Use ONLY the provided repository code
- Never invent files
- If information is missing say "Not found in the repository context"
`
        },
        {
          role: "user",
          content: `
You are analyzing a GitHub repository.


Repository code context:

${context}

Question:
${question}


Use * to bold an important word.
`
        }
      ]
    })

    const answer = completion.choices[0].message.content

    return res.json({
      answer,
      sources: results.map(r => r.file)
    })

  } catch (err) {

    console.error("Chat error:", err)

    return res.status(500).json({
      error: "AI failed"
    })

  }

})

module.exports = router