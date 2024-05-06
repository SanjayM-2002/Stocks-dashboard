import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchStockInsights } from '../redux/features/stock/currentStockSlice';
import { Oval } from 'react-loader-spinner';
import { Chart } from 'react-google-charts';

const options = {
  legend: 'none',
  bar: { groupWidth: '100%' },
  candlestick: {
    fallingColor: { strokeWidth: 0, fill: '#a52714' },
    risingColor: { strokeWidth: 0, fill: '#0f9d58' },
  },
};

const StockInsights = () => {
  const { ticker } = useParams();
  const dispatch = useDispatch();
  const insights = useSelector((state) => state.currentStock.insights);
  const status = useSelector((state) => state.currentStock.status);
  const stockName = useSelector((state) => state.stockName.stockName);
  console.log(insights);
  console.log('stock name is: ', stockName);

  useEffect(() => {
    dispatch(fetchStockInsights(ticker));
  }, [dispatch, ticker]);

  return (
    <>
      <div className='container mx-auto'>
        <h1 className='text-2xl font-bold my-4'>Stock Insights</h1>
        {status === 'loading' && (
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
        )}
        {status === 'succeeded' && (
          <div>
            <h2 className='text-xl font-bold my-2'>
              Insights for {ticker}: {stockName}
            </h2>

            <Chart
              chartType='CandlestickChart'
              width='100%'
              height='400px'
              data={prepareChartData(insights)}
              options={options}
            />
          </div>
        )}
        {status === 'failed' && (
          <div className='flex justify-center align-middle p-2 text-red-500'>
            Error in fetching data
          </div>
        )}
      </div>
    </>
  );
};

const prepareChartData = (insights) => {
  const timeKeys = Object.keys(insights['Time Series (5min)']);
  return [
    ['Date/Time', '', '', '', ''],
    ...timeKeys.map((time) => {
      const values = insights['Time Series (5min)'][time];
      return [
        time,
        parseFloat(values['1. open']),
        parseFloat(values['2. high']),
        parseFloat(values['3. low']),
        parseFloat(values['4. close']),
      ];
    }),
  ];
};

export default StockInsights;
