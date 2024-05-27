import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import AddTodo from '../components/todo/AddTodo';
import TodoList from '../components/todo/TodoList';
import { fetchTodos } from '../features/todo/todoSlice';

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  return (
    <div className="w-75">
      <AddTodo />
      <TodoList />
    </div>
  );
};

export default Home;
