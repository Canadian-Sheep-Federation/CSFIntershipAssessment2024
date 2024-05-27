import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/todos';

const addTodo = async (todo) => {
  const res = await axios.post(API_URL, todo);
  return res.data;
};

const fetchTodos = async () => {
  const res = await axios.get(`${API_URL}?_limit=5`);
  return res.data;
};

const completeTodo = async (todo) => {
  const res = await axios.put(`${API_URL}/${todo.id}`, {
    ...todo,
    completed: !todo.completed,
  });
  return res.data;
};

const deleteTodo = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
};

const todoService = {
  addTodo,
  fetchTodos,
  completeTodo,
  deleteTodo,
};

export default todoService;
