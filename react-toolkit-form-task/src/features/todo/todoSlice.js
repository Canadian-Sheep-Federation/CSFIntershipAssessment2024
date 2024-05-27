import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import todoService from './todoService';

const initialState = {
  todos: [],
};

export const addTodo = createAsyncThunk(
  'todo/addTodo',
  async (todo, thunkAPI) => {
    try {
      return await todoService.addTodo(todo);
    } catch (error) {
      // return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

export const fetchTodos = createAsyncThunk(
  'todo/fetchTodos',
  async (_, thunkAPI) => {
    try {
      return await todoService.fetchTodos();
    } catch (error) {
      // return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

export const completeTodo = createAsyncThunk(
  'todo/completeTodo',
  async (id, thunkAPI) => {
    try {
      return await todoService.completeTodo(id);
    } catch (error) {
      // return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

export const deleteTodo = createAsyncThunk(
  'todo/deleteTodo',
  async (id, thunkAPI) => {
    try {
      return await todoService.deleteTodo(id);
    } catch (error) {
      // return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(addTodo.fulfilled, (state, action) => {
        state.todos = [action.payload, ...state.todos];
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.todos = action.payload;
      })
      .addCase(completeTodo.fulfilled, (state, action) => {
        state.todos = state.todos.map((todo) =>
          todo.id === action.payload.id ? action.payload : todo
        );
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      });
  },
});

export default todoSlice.reducer;
