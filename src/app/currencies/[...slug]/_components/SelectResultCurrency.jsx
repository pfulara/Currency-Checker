'use client';

import { useRouter } from 'next/navigation';

export default function SelectResultCurrency({ currencies, baseCurrency, resultCurrency, startDate, endDate }) {
  const router = useRouter();

  const handleChangeBase = (e) => {
    router.push(`/currencies/${baseCurrency}/${e.target.value}/${startDate}/${endDate}`);
  };

  delete currencies[baseCurrency];
  return (
    <div className='currency-select'>
      <label htmlFor='result-currency'>Base Currency</label>
      <select id='result-currency' value={resultCurrency} className='text-black' onChange={handleChangeBase}>
        {currencies &&
          Object.keys(currencies).map((key) => (
            <option key={currencies[key]} value={key}>
              {`${currencies[key]} (${key})`}
            </option>
          ))}
      </select>
    </div>
  );
}
