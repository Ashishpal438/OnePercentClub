import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {response} from './data';

// Define the initial state
const initialState = {
  products: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// Create an async thunk for fetching products
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    // const response = await axios.get('https://api.example.com/products'); // Replace with your endpoint
    // return response.data;
    return response?.data?.trends;
  },
);

// Create the products slice
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

// Export the async thunk and reducer
export default productsSlice.reducer;
