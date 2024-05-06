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
  const stockDetails = useSelector((state) => state.stockName.stockDetails);
  // console.log(insights);
  // console.log('stock name is: ', stockDetails.name);

  useEffect(() => {
    dispatch(fetchStockInsights(ticker));
  }, [dispatch, ticker]);

  return (
    <>
      <div className='container mx-auto bg-slate-200 px-4 py-4'>
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
              Stock Name: {stockDetails.name}
            </h2>

            <h3 className='font-bold my-2 text-lg'>
              Symbol: {stockDetails.symbol}
            </h3>

            <h3 className='font-bold my-2 text-lg'>
              Last sale: {stockDetails.lastsale} USD
            </h3>

            <h3 className='font-bold my-2 text-lg'>
              Market cap: {stockDetails.marketCap} USD
            </h3>

            <h3 className='font-bold my-2 text-lg'>
              Net Change: {stockDetails.netchange} USD
            </h3>

            <h3 className='font-bold my-2 text-lg'>
              Percent Change: {stockDetails.pctchange}
            </h3>

            <div className='p-8 justify-center align-middle'>
              <Chart
                chartType='CandlestickChart'
                width='100%'
                height='400px'
                data={prepareChartData(insights)}
                options={options}
              />
            </div>
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
