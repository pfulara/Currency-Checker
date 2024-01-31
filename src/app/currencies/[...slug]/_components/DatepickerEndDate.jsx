'use client';

import moment from 'moment';
import { useRouter } from 'next/navigation';

import 'react-datepicker/dist/react-datepicker.css';

export default function DatepickerEndDate({ baseCurrency, resultCurrency, startDate, endDate }) {
  const router = useRouter();

  const handleDateChange = (e) => {
    router.push(`/currencies/${baseCurrency}/${resultCurrency}/${startDate}/${e.target.value}`);
  };

  const today = moment(new Date()).add(-1, 'day').format('YYYY-MM-DD');

  return (
    <div className='datepicker text-black'>
      <label htmlFor='end-date' className='text-white'>
        End Date
      </label>
      <input id='stendart-date' min={startDate} max={today} type='date' value={endDate} onChange={handleDateChange} />
    </div>
  );
}
