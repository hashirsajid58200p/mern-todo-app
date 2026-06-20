const express = require("express");
const {
  createTodoController,
  getTodoController,
  deleteTodoController,
  updateTodoController,
} = require("../controllers/todo.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

// create todo

router.post("/create", authMiddleware, createTodoController);

// get todo

router.get("/getAll/:userId", authMiddleware, getTodoController);

// delete todo
router.delete("/delete/:id", authMiddleware, deleteTodoController);

//update todo
router.patch("/update/:id", authMiddleware, updateTodoController);

module.exports = router;
