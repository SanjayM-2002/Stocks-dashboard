import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchStockInsights = createAsyncThunk(
  'currentStock/fetchInsights',
  async (ticker) => {
    const url = `https://alpha-vantage.p.rapidapi.com/query?interval=5min&function=TIME_SERIES_INTRADAY&symbol=${ticker}&datatype=json&output_size=compact`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '121a717964mshf344de340e7b062p158042jsna9f8ad2d1761',
        'X-RapidAPI-Host': 'alpha-vantage.p.rapidapi.com',
      },
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error('Failed to fetch stock insights');
      }
      const data = await response.json();

      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

const currentStockSlice = createSlice({
  name: 'currentStock',
  initialState: {
    insights: {},
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStockInsights.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchStockInsights.fulfilled, (state, action) => {
        state.status = 'succeeded';

        state.insights = action.payload;
      })
      .addCase(fetchStockInsights.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default currentStockSlice.reducer;
