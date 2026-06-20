import axios from "axios";


// create todo

const createTodo = (data) => {
  return axios.post("/todo/create", data);
};

// get all todo

const getAllTodo = (id) => {
  return axios.get(`/todo/getAll/${id}`);
};

// Update Todo

const updateTodo = (id, data) => {
  return axios.patch(`/todo/update/${id}`, data);
};

// Delete Todo
const deleteTodo = (id) => {
  return axios.delete(`/todo/delete/${id}`);
};

const todoServices = { createTodo, getAllTodo, updateTodo, deleteTodo };
export default todoServices;
