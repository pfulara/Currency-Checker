'use client';

import { useRouter } from 'next/navigation';

export default function SelectCurrency({ currencies, currency, startDate, endDate }) {
  const router = useRouter();

  const handleChangeBase = (e) => {
    router.push(`/gold/${e.target.value}/${startDate}/${endDate}`);
  };

  return (
    <div className='currency-select'>
      <label htmlFor='base-currency'>Currency</label>
      <select id='base-currency' value={currency} className='text-black' onChange={handleChangeBase}>
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
