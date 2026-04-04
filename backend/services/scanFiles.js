const fs = require("fs")
const path = require("path")

const allowedExtensions = [
  ".js",
  ".ts",
  ".jsx",
  ".tsx",
  ".py",
  ".java",
  ".html",
  ".css",
  ".json",
  ".md"
]


const ignoredFolders = [
"node_modules",".git","dist","build","coverage",".next"
]

function scanFiles(dir){

 let results = []

 const list = fs.readdirSync(dir)

 list.forEach(file => {

  const filePath = path.join(dir,file)

  const stat = fs.statSync(filePath)

  if(stat.isDirectory()){

   if(ignoredFolders.includes(file)) return

   results = results.concat(scanFiles(filePath))

  } else {

   const ext = path.extname(file)

   if(allowedExtensions.includes(ext)){
    results.push(filePath)
   }

  }

 })

 return results
}

module.exports = scanFiles