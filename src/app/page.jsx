import Calculator from './Calculator';
import Link from 'next/link';

export async function getGoldPrice() {
  const res = await fetch('http://api.nbp.pl/api/cenyzlota?format=json');

  return res.json();
}

export async function getPLNPrice(amount) {
  const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=PLN&to=USD`);

  return res.json();
}

export async function getCurrencies() {
  const res = await fetch(`https://api.frankfurter.app/currencies`);

  return res.json();
}

export default async function Home() {
  const goldPrice = await getGoldPrice();

  const plnPrice = await getPLNPrice(goldPrice[0].cena);

  const currencies = await getCurrencies();

  return (
    <div className='text-center'>
      <h2 className='text-4xl font-bold mb-16'>Welcome on Currency Checker</h2>
      <p className='text-xl mb-12'>
        You can check here actual and historical{' '}
        <Link className='font-bold' href='/currencies'>
          currencies
        </Link>{' '}
        and{' '}
        <Link className='font-bold' href='/gold'>
          gold
        </Link>{' '}
        prices
      </p>
      <p className='text-2xl py-8 px-12 border-white border-solid border-2 rounded-xl m-auto w-fit'>
        Current price for 1g gold: <span className='font-bold'>{plnPrice.rates.USD.toFixed(2)} USD</span>
      </p>
      <Calculator currencies={currencies} />
    </div>
  );
}
