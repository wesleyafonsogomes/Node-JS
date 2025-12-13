const express = require("express")
const router = express.Router();
const path = require("path");
const basePath = path.join(__dirname, "../templates")

router.get("/", (req,res) => {
    res.sendFile(`${basePath}/home.html`)
});

router.get("/acervo", (req,res) => {
    res.sendFile(`${basePath}/acervo.html`)
});

module.exports = router;