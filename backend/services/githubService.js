const axios = require("axios")

const GITHUB_API = "https://api.github.com"

async function getRepoDetails(owner, repo) {

  const res = await axios.get(
    `${GITHUB_API}/repos/${owner}/${repo}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
      }
    }
  )

  return {
    name: res.data.name,
    description: res.data.description,
    stars: res.data.stargazers_count,
    forks: res.data.forks_count,
    watchers: res.data.watchers_count,
    language: res.data.language,
    owner: res.data.owner.login
  }
}


async function getRepoTree(owner, repo) {

  const res = await axios.get(
    `https://api.github.com/repos/${owner}/${repo}/git/trees/main?recursive=1`,
    {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
      }
    }
  )

  return res.data.tree
}


module.exports = { getRepoDetails, getRepoTree }