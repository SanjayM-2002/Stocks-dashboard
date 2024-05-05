import { configureStore } from '@reduxjs/toolkit';
import stockListSliceReducer from '../features/stock/stockListSlice';
import currentStockReducer from '../features/stock/currentStockSlice';

const store = configureStore({
  reducer: {
    stockList: stockListSliceReducer,
    currentStock: currentStockReducer,
  },
});

export default store;
