'use client';

import { useRouter } from 'next/navigation';

export default function SelectBaseCurrency({ currencies, baseCurrency, resultCurrency, startDate, endDate }) {
  const router = useRouter();

  const handleChangeBase = (e) => {
    router.push(`/currencies/${e.target.value}/${resultCurrency}/${startDate}/${endDate}`);
  };

  delete currencies[resultCurrency];
  return (
    <div className='currency-select'>
      <label htmlFor='base-currency'>Base Currency</label>
      <select id='base-currency' value={baseCurrency} className='text-black' onChange={handleChangeBase}>
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
