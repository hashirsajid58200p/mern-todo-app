const Todo = require("../models/todo.model");

const createTodoController = async (req, res) => {
  try {
    const { title, description } = req.body;
    const createdBy = req.body.id; // injected by authMiddleware from verified JWT
    if (!title || !description) {
      return res.status(400).send({
        success: false,
        message: "Please provide title and description",
      });
    }
    const todo = new Todo({ title, description, createdBy });
    const saved = await todo.save();
    return res.status(201).send({
      success: true,
      message: "Task created successfully",
      todo: saved,
    });
  } catch (error) {
    console.error("createTodo error:", error);
    return res.status(500).send({
      success: false,
      message: "Server error while creating task",
    });
  }
};

// Get Todo
const getTodoController = async (req, res) => {
  try {
    // get user id
    const { userId } = req.params;
    // validate
    if (!userId) {
      return res.status(400).send({
        success: false,
        message: "no user found with this id",
      });
    }
    // find task
    const todos = await Todo.find({ createdBy: userId });
    if (!todos) {
      return res.status(404).send({
        success: false,
        message: "no todo found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Your to do list",
      todos,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "error in getting todo api",
      error,
    });
  }
};

// detete api

const deleteTodoController = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).send({
        success: false,
        message: "no todo found with id",
      });
    }
    // find id
    const todo = await Todo.findByIdAndDelete(id);
    if (!todo) {
      return res.status(404).send({
        success: false,
        message: "no task found",
      });
    }
    res.status(200).send({
      success: true,
      message: "task deleted successfully",
      todo,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      error,
      message: "error in deteting todo api",
    });
  }
};

// Update todo

const updateTodoController = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).send({
        success: false,
        message: "please provide todo id",
      });
    }
    const { title, description, isCompleted } = req.body;
    const createdBy = req.body.id; // injected by authMiddleware from verified JWT
    //update
    const todo = await Todo.findByIdAndUpdate(
      id,
      { $set: { title, description, isCompleted, createdBy } },
      { returnOriginal: false },
    );
    res.status(200).send({
      success: true,
      message: "your task has been updated",
      todo,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "error in update todo api",
      error,
    });
  }
};

module.exports = {
  createTodoController,
  getTodoController,
  deleteTodoController,
  updateTodoController,
};
