const express = require("express");
const router = express.Router();
const todosController = require("../controllers/todos.controller");

router.get("/", todosController.read);
router.post("/", todosController.create);
router.put("/:id", todosController.update);
router.delete("/:id", todosController.delete);

module.exports = router;