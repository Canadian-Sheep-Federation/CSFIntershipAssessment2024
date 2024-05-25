const express = require("express");
const cors = require("cors");
const db = require("./database");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.post("/", async (req, res) => {
    const { postName, tag, comment, imageURL } = req.body;

    try {

        const newID = await new Promise((resolve, reject) => {
            db.run(
                `INSERT INTO posts (postName, tag, comment, imageURL) VALUES (?, ?, ?, ?)`,
                [postName, tag, comment, imageURL],
                function (e) {
                    if (e) {
                        reject(e);
                    }
                    resolve(this.lastID);
                }
            );
        });

        res.status(200).json({ message: `${newID}` })

    } catch (e) {
        res.status(400).json({ error: e.message })
    }
})

app.get("/", (req, res) => {

    const query = `SELECT * FROM posts`

    db.all(query, [], (e, rows) => {
        if (e) {
            res.status(400).json({ error: "Could not retrieve posts." });
        } else {
            res.status(200).json({ posts: rows });
        }
    });

})

app.get("/:id", (req, res) => {

    const id = req.params.id

    const query = `SELECT * FROM posts WHERE ID=?`

    try {
        db.all(query, [id], (e, row) => {
            if (e || row.length === 0) {
                res.status(400).json({error: "Post not found"})
            } else {
                res.status(200).json({ posts: row });
            }
        });
    } catch (e) {
        res.status(400).json({ error: e.message })
    }

})

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});