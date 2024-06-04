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
    try {
      const options = {
        method: 'GET',
        url: 'https://real-time-finance-data.p.rapidapi.com/market-trends',
        params: {
          trend_type: 'GAINERS',
          country: 'us',
          language: 'en',
        },
        headers: {
          'X-RapidAPI-Key':
            '5588c83eabmsh39794394fd331e5p11e2ebjsn51b547398eee',
          'X-RapidAPI-Host': 'real-time-finance-data.p.rapidapi.com',
        },
      };
      const apiResponse = await axios.request(options);
      return apiResponse?.data?.trends;
    } catch (error) {
      console.error('Error fetching market trends:', error);
      //return the statuc data if api fails
      return response?.data?.trends;
    }
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
