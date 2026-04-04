const { pipeline } = require("@xenova/transformers")

let embedder

async function getEmbedder() {

  if (!embedder) {

    console.log("Loading embedding model...")

    embedder = await pipeline(
      "feature-extraction",
      "Xenova/all-MiniLM-L6-v2"
    )

    console.log("Embedding model loaded")

  }

  return embedder

}

async function createEmbedding(text) {

  const model = await getEmbedder()

  const output = await model(text, {
    pooling: "mean",
    normalize: true
  })

  // Transformers.js can return different formats depending on version

  if (output?.data) {
    return Array.from(output.data)
  }

  if (output instanceof Float32Array) {
    return Array.from(output)
  }

  if (Array.isArray(output)) {
    return output
  }

  throw new Error("Embedding generation failed")

}

module.exports = createEmbedding