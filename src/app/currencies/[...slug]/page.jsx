import moment from 'moment';

import SelectBaseCurrency from './_components/SelectBaseCurrency';
import SelectResultCurrency from './_components/SelectResultCurrency';
import Chart from './_components/Chart';
import DatepickerStartDate from './_components/DatepickerStartDate';
import DatepickerEndDate from './_components/DatepickerEndDate';

export async function getCurrencies() {
  const res = await fetch(`https://api.frankfurter.app/currencies`);

  return res.json();
}

export async function getPrices(baseCurrency, resultCurrency, startDate, endDate) {
  const res = await fetch(
    `https://api.frankfurter.app/${startDate}..${endDate}?from=${baseCurrency}&to=${resultCurrency}`
  );

  return res.json();
}

export default async function page({ params }) {
  const { slug } = params;

  const dateRe = '[0-9]{4}-[0-9]{2}-[0-9]{2}';
  const currencyRe = '[A-Za-z]+';

  const baseCurrency = `${slug[0]}`.match(currencyRe) ? `${slug[0]}` : 'PLN';
  const resultCurrency = `${slug[1]}`.match(currencyRe) ? `${slug[1]}` : 'USD';
  const endDate = `${slug[3]}`.match(dateRe)
    ? `${slug[3]}`
    : `${moment(new Date()).subtract(1, 'day').format('YYYY-MM-DD')}`;
  const startDate = `${slug[2]}`.match(dateRe)
    ? `${slug[2]}`
    : `${moment(endDate).subtract(31, 'days').format('YYYY-MM-DD')}`;

  const currencies = await getCurrencies();
  const prices = await getPrices(baseCurrency, resultCurrency, startDate, endDate);

  const formattedChartData = Object.keys(prices.rates || {}).map((key) => ({
    date: key,
    base: baseCurrency,
    currency: Object.keys(prices.rates[key])[0],
    value: prices.rates[key][Object.keys(prices.rates[key])[0]].toFixed(2),
  }));

  return (
    <div className='w-full'>
      <h2 className='text-center text-4xl mb-20'>Historial Currency Price Checker</h2>
      <div className='grid xs:grid-cols-1 md:grid-cols-4 gap-x-4'>
        <SelectBaseCurrency
          currencies={currencies}
          baseCurrency={baseCurrency}
          resultCurrency={resultCurrency}
          startDate={startDate}
          endDate={endDate}
        />
        <SelectResultCurrency
          currencies={currencies}
          baseCurrency={baseCurrency}
          resultCurrency={resultCurrency}
          startDate={startDate}
          endDate={endDate}
        />
        <DatepickerStartDate
          baseCurrency={baseCurrency}
          resultCurrency={resultCurrency}
          startDate={startDate}
          endDate={endDate}
        />
        <DatepickerEndDate
          baseCurrency={baseCurrency}
          resultCurrency={resultCurrency}
          startDate={startDate}
          endDate={endDate}
        />
      </div>
      <div className='flex h-80 w-full'>
        {prices.message === 'not found' ? (
          <div className='mt-16 text-center text-4xl w-full'>No data available for this date range</div>
        ) : (
          <Chart data={formattedChartData} />
        )}
      </div>
    </div>
  );
}
