const fs = require("fs")

function readFiles(filePaths) {

  const documents = []

  filePaths.forEach((filePath) => {

    try {

      const content = fs.readFileSync(filePath, "utf8")

      documents.push({
        path: filePath,
        content
      })

    } catch (err) {

      console.log("Error reading file:", filePath)

    }

  })

  return documents
}

module.exports = readFiles