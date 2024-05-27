import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { addTodo } from '../../features/todo/todoSlice';

const AddTodo = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');

  const onClick = () => {
    const payload = {
      title,
      completed: false,
      userId: 1,
    };

    dispatch(addTodo(payload));
    setTitle('');
  };

  return (
    <>
      <input
        type="text"
        className="form-control"
        placeholder="Enter new todo here..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button className="btn btn-primary btn-sm mt-3" onClick={onClick}>
        Add New
      </button>
    </>
  );
};

export default AddTodo;
