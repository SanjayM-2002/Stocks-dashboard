import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchStockListData } from '../redux/features/stock/stockListSlice';
import { Oval } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import { selectStock } from '../redux/features/stock/stockNameSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const stocksList = useSelector((state) => state.stockList.stocksList);
  const status = useSelector((state) => state.stockList.status);
  const navigate = useNavigate();
  console.log(stocksList);

  const onClickStock = (stk) => {
    dispatch(selectStock(stk));
    navigate(`/stock/${stk.symbol}`);
  };

  useEffect(() => {
    dispatch(fetchStockListData());
  }, [dispatch]);

  return (
    <div className='container mx-auto bg-slate-200 py-4 px-4'>
      <h1 className='text-2xl font-bold my-4'>Stock Dashboard</h1>
      {status === 'loading' && (
        <>
          <div className='flex justify-center align-middle p-2'>
            <Oval
              visible={true}
              height='80'
              width='80'
              color='#4fa94d'
              ariaLabel='oval-loading'
              wrapperStyle={{}}
              wrapperClass=''
            />
          </div>
        </>
      )}
      {status === 'succeeded' && (
        <>
          <table className='table-auto'>
            <thead>
              <tr>
                <th className='border border-red-600 px-4 py-2'>Stock Name</th>
                <th className='border border-red-600 px-4 py-2'>Ticker</th>
                <th className='border border-red-600 px-4 py-2'>
                  Last sale (USD)
                </th>
                <th className='border border-red-600 px-4 py-2'>Action</th>
              </tr>
            </thead>
            <tbody>
              {stocksList.map((stock) => (
                <tr key={stock.symbol}>
                  <td className='border border-red-600 px-4 py-2'>
                    {stock.name}
                  </td>
                  <td className='border border-red-600 px-4 py-2'>
                    {stock.symbol}
                  </td>
                  <td className='border border-red-600 px-4 py-2'>
                    {stock.lastsale}
                  </td>

                  <td className='border border-red-600 px-4 py-2'>
                    <button
                      className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                      onClick={() => onClickStock(stock)}
                    >
                      Click Here
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
      {status === 'failed' && (
        <>
          <div className='flex justify-center align-middle p-2 text-red-500'>
            Error in fetching data
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
