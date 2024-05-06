import { configureStore } from '@reduxjs/toolkit';
import stockListSliceReducer from '../features/stock/stockListSlice';
import currentStockReducer from '../features/stock/currentStockSlice';
import stockNameReducer from '../features/stock/stockNameSlice';

const store = configureStore({
  reducer: {
    stockList: stockListSliceReducer,
    currentStock: currentStockReducer,
    stockName: stockNameReducer,
  },
});

export default store;
