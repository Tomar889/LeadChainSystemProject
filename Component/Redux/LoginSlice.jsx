
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://66e6a63417055714e58a24f6.mockapi.io/crud';

const initialState = {
  items: [],
  status: 'idle',
  error: null,
};

// Thunks
export const fetchItems = createAsyncThunk('items/fetchItems', () => {
  return axios.get(API_URL)
    .then(response => response.data)
    .catch(error => {
      throw new Error(error.message);
    });
});

export const addItem = createAsyncThunk('items/addItem', (newItem) => {
  return axios.post(API_URL, newItem)
    .then(response => response.data)
    .catch(error => {
      throw new Error(error.message);
    });
});

export const updateItem = createAsyncThunk('items/updateItem', (updatedItem) => {
  return axios.put(`${API_URL}/${updatedItem.id}`, updatedItem)
    .then(response => response.data)
    .catch(error => {
      throw new Error(error.message);
    });
});

export const deleteItem = createAsyncThunk('items/deleteItem', (id) => {
  return axios.delete(`${API_URL}/${id}`)
    .then(() => id)
    .catch(error => {
      throw new Error(error.message);
    });
});

// Slice
const LoginSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addItem.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateItem.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      });
  },
});

export default LoginSlice.reducer;
