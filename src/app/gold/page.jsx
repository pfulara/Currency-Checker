import moment from 'moment';
import { redirect } from 'next/navigation';

export default function page() {
  var endDate = moment(new Date()).format('YYYY-MM-DD');
  var startDate = moment(startDate).subtract(30, 'days').format('YYYY-MM-DD');
  redirect(`/gold/USD/${startDate}/${endDate}`);
}
