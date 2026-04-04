let vectors = []

function storeVector(vector, metadata) {

  vectors.push({
    vector,
    metadata
  })

}

function cosineSimilarity(a, b) {

  let dot = 0
  let normA = 0
  let normB = 0

  for (let i = 0; i < a.length; i++) {

    dot += a[i] * b[i]
    normA += a[i] * a[i]
    normB += b[i] * b[i]

  }

  return dot / (Math.sqrt(normA) * Math.sqrt(normB))

}

function searchVectors(queryVector, topK = 5) {

  const scores = vectors.map(v => ({
    score: cosineSimilarity(queryVector, v.vector),
    metadata: v.metadata
  }))

  scores.sort((a,b) => b.score - a.score)

  return scores.slice(0, topK)

}

module.exports = {
  storeVector,
  searchVectors
}