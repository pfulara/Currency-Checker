'use client';

import moment from 'moment';
import { useRouter } from 'next/navigation';

import 'react-datepicker/dist/react-datepicker.css';

export default function DatepickerStartDate({ currency, startDate, endDate }) {
  const router = useRouter();

  const handleDateChange = (e) => {
    router.push(`/gold/${currency}/${e.target.value}/${endDate}`);
  };

  const minDate = moment(new Date()).add(-365, 'days').format('YYYY-MM-DD');
  const maxDate = moment(endDate).add(-1, 'day').format('YYYY-MM-DD');

  return (
    <div className='datepicker text-black'>
      <label htmlFor='start-date' className='text-white'>
        Start Date
      </label>
      <input id='start-date' min={minDate} max={maxDate} type='date' value={startDate} onChange={handleDateChange} />
    </div>
  );
}
