const express = require("express")
const router = express.Router()
const axios = require("axios")

const cloneRepo = require("../services/cloneRepo")
const scanFiles = require("../services/scanFiles")
const readFiles = require("../services/readFiles")
const chunkCode = require("../services/chunkCode")

const createEmbedding = require("../services/embeddingService")

const { Pinecone } = require("@pinecone-database/pinecone")

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY
})

const indexName = "repo-ai"



// extract repo name
function extractRepoId(repoUrl) {
  const parts = repoUrl.split("/")
  return parts[parts.length - 1]
}



// -------- GitHub Repo Info --------
async function getGithubInfo(repoUrl) {

  const parts = repoUrl.replace("https://github.com/", "").split("/")
  const owner = parts[0]
  const repo = parts[1]

  const res = await axios.get(
    `https://api.github.com/repos/${owner}/${repo}`
  )

  return {
    stars: res.data.stargazers_count,
    forks: res.data.forks_count,
    watchers: res.data.watchers_count,
    // language: res.data.language
  }
}



// -------- GitHub Language Breakdown --------
async function getRepoLanguages(repoUrl) {

  const parts = repoUrl.replace("https://github.com/", "").split("/")
  const owner = parts[0]
  const repo = parts[1]

  const res = await axios.get(
    `https://api.github.com/repos/${owner}/${repo}/languages`
  )

  const languages = res.data

  const total = Object.values(languages).reduce((a, b) => a + b, 0)

  const breakdown = Object.entries(languages).map(([lang, bytes]) => ({
    language: lang,
    percent: ((bytes / total) * 100).toFixed(1)
  }))

  return breakdown
}



// -------- ANALYZE ROUTE --------
router.post("/analyze", async (req, res) => {

  try {

    const { repoUrl } = req.body

    if (!repoUrl) {
      return res.status(400).json({
        error: "Repository URL is required"
      })
    }

    const repoId = extractRepoId(repoUrl)

    console.log("Analyzing repo:", repoUrl)
    console.log("Repo ID:", repoId)



    const repoPath = await cloneRepo(repoUrl)

    console.log("Repo cloned at:", repoPath)



    const files = scanFiles(repoPath)

    console.log("Files found:", files.length)



    const docs = readFiles(files)



    let chunks = []

    docs.forEach(doc => {

      const pieces = chunkCode(doc.content)

      pieces.forEach(piece => {

        const path = require("path")

const relativePath = path.relative(repoPath, doc.path)

chunks.push({
  file: relativePath,
  content: piece
})

      })

    })



    console.log("Chunks created:", chunks.length)



    const index = pinecone.index(indexName)

    console.log("Generating embeddings and uploading to Pinecone...")



    let vectors = []

    for (let i = 0; i < chunks.length; i++) {

      const chunk = chunks[i]

      try {

        const embeddingText = `
File: ${chunk.file}

${chunk.content}
`

        const embedding = await createEmbedding(embeddingText)

        if (!embedding || embedding.length === 0) {
          console.log("Skipping empty embedding")
          continue
        }

        vectors.push({
          id: `${repoId}-${i}`,
          values: embedding,
          metadata: {
            repo_id: repoId,
            file: chunk.file,
            text: chunk.content
          }
        })

        console.log("Embedding size:", embedding.length)

      } catch (err) {

        console.error("Embedding failed:", err)

      }

    }



    console.log("Vectors prepared:", vectors.length)

    if (vectors.length === 0) {
      throw new Error("No vectors generated")
    }



    await index.upsert({
      records: vectors
    })



    console.log("Vectors uploaded to Pinecone:", vectors.length)



    // -------- Fetch GitHub Info --------
    const githubInfo = await getGithubInfo(repoUrl)

    const languages = await getRepoLanguages(repoUrl)



    res.json({
      message: "Repository analyzed successfully",
      repo: repoId,
      files: files.length,
      documents: docs.length,
      chunks: chunks.length,
      githubInfo,
      languages
    })



  } catch (err) {

    console.error("Analyze error:", err)

    res.status(500).json({
      error: "Failed to analyze repository"
    })

  }

})



module.exports = router