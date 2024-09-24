const express = require("express");
const router = express.Router();

router.get('/ab+cd', (req, res) => {
    res.send('ab+cd')
})

router.get('/users/:userId/books/:bookId', (req, res) => {
    res.send(req.params)
})

router.get('/posts/:postID', (req, res) => {
    res.send(req.params)
})

router.get('/flights/:from-:to', (req, res) => {
    res.send(req.params)
})



module.exports = router;