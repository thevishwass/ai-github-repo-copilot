const simpleGit = require("simple-git")
const path = require("path")
const fs = require("fs")

const git = simpleGit()


async function cloneRepo(repoUrl){

 const repoName = repoUrl.split("/").pop().replace(".git","")

 const repoPath = path.join(__dirname,"../repos",repoName)

 if(!fs.existsSync(path.join(__dirname,"../repos"))){
   fs.mkdirSync(path.join(__dirname,"../repos"))
 }

 if(fs.existsSync(repoPath)){
   console.log("Repo already exists")
   return repoPath
 }

 console.log("Cloning repository...")

 await git.clone(repoUrl, repoPath, ["--depth", "1"])

 console.log("Clone complete")

 return repoPath
}

module.exports = cloneRepo