import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import Dashboard from './components/Dashboard';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import StockInsights from './components/StockInsights';

// import './App.css'

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/stock/:ticker' element={<StockInsights />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
