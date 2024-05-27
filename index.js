import http from "http"
import fs from "fs"
import path from "path"

const server = http.createServer((req, res) => {
	let filePath = "." + req.url
	if (filePath === "./") {
		filePath = "./index.html"
	}

	const extname = path.extname(filePath)
	let contentType = "text/html"

	switch (extname) {
		case ".js":
			contentType = "text/javascript"
			break
		case ".css":
			contentType = "text/css"
			break
		// Add more cases for other file types if necessary

		default:
			contentType = "text/html"
			break
	}

	fs.readFile(filePath, (err, content) => {
		if (err) {
			if (err.code === "ENOENT") {
				res.writeHead(404)
				res.end("404 Not Found")
			} else {
				res.writeHead(500)
				res.end("500 Internal Server Error")
			}
		} else {
			res.writeHead(200, { "Content-Type": contentType })
			res.end(content, "utf-8")
		}
	})
})

const FE_PORT = process.env.FE_PORT || 5500
server.listen(FE_PORT, () => {
	console.log(`Frontend Server running at http://localhost:${FE_PORT}/`)
})
