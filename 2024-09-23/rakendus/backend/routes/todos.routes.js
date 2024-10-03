const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const todosController = require("../controllers/todos.controller");

router.get("/", todosController.read);

router.post(
    "/",
    [
        check("title").notEmpty().withMessage("Title is required"),
        check("priority").isInt({ min: 1, max: 5 }).withMessage("Priority must be an integer between 1 and 5"),
        check("status").notEmpty().withMessage("Status is required"),
        check("category").notEmpty().withMessage("Category is required"),
    ],
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    todosController.create
);

router.put(
    "/:id", 
    [
        check("title").optional().notEmpty().withMessage("Title cannot be empty"),
        check("priority").optional().isInt({ min: 1, max: 5 }).withMessage("Priority must be an integer between 1 and 5"),
        check("status").optional().notEmpty().withMessage("Status cannot be empty"),
        check("category").optional().notEmpty().withMessage("Category cannot be empty"),
    ],
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    todosController.update
);

router.delete("/:id", todosController.delete);

module.exports = router;