const { Pinecone } = require("@pinecone-database/pinecone")

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY
})

const indexName = "repo-ai"

async function getIndex() {
  return pinecone.index(indexName)
}

module.exports = getIndex