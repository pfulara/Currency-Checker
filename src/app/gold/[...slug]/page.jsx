import SelectCurrency from './_components/SelectCurrency';
import DatepickerEndDate from './_components/DatepickerEndDate';
import DatepickerStartDate from './_components/DatepickerStartDate';
import Chart from './_components/Chart';

export async function getPLNPrices() {
  const res = await fetch(`https://api.frankfurter.app/2023-01-01..2023-01-31?from=PLN&to=USD`);

  return res.json();
}

export async function getCurrencies() {
  const res = await fetch(`https://api.frankfurter.app/currencies`);

  return res.json();
}

export default async function page({ params }) {
  const { slug } = params;

  const dateRe = '[0-9]{4}-[0-9]{2}-[0-9]{2}';
  const currencyRe = '[A-Za-z]+';

  const currency = `${slug[0]}`.match(currencyRe) ? `${slug[0]}` : 'USD';
  const endDate = `${slug[2]}`.match(dateRe)
    ? `${slug[2]}`
    : `${moment(new Date()).subtract(1, 'day').format('YYYY-MM-DD')}`;
  const startDate = `${slug[1]}`.match(dateRe)
    ? `${slug[1]}`
    : `${moment(endDate).subtract(31, 'days').format('YYYY-MM-DD')}`;

  const currencies = await getCurrencies();

  const plnPrice = await getPLNPrices();

  return (
    <div className='w-full'>
      <div className='grid grid-cols-3 gap-x-4'>
        <SelectCurrency currencies={currencies} currency={currency} startDate={startDate} endDate={endDate} />
        <DatepickerStartDate currency={currency} startDate={startDate} endDate={endDate} />
        <DatepickerEndDate currency={currency} startDate={startDate} endDate={endDate} />
      </div>
      <div className='flex h-80 w-full'>
        <Chart data={[]} />
      </div>
    </div>
  );
}
