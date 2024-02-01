'use client';
import { useEffect, useState } from 'react';

import CurrencyInput from '@/components/CurrencyInput';
import CurrencySelect from '@/components/CurrencySelect';

export default function Calculator({ currencies }) {
  const [amount, setAmount] = useState(1);
  const [result, setResult] = useState(0);
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [resultCurrency, setResultCurrency] = useState('PLN');

  useEffect(() => {
    if (baseCurrency === resultCurrency) {
      setResult(amount);
      return;
    }
    if (amount) {
      fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${baseCurrency}&to=${resultCurrency}`)
        .then((res) => res.json())
        .then((data) => {
          setResult(data.rates[resultCurrency].toFixed(2));
        });
    }
  }, [amount, baseCurrency, resultCurrency]);

  const handleChangeAmount = (e) => {
    if (e.target.value && e.target.value < 1) {
      setAmount(1);
    } else {
      setAmount(e.target.value);
    }
  };

  const handleChangeBaseCurrency = (e) => {
    setBaseCurrency(e.target.value);
  };

  const handleChangeResultCurrency = (e) => {
    setResultCurrency(e.target.value);
  };

  return (
    <div className='mt-12 flex justify-center'>
      <div className='max-w-2xl grid xs: grid-cols-1 md:grid-cols-5 gap-x-1'>
        <div>
          <CurrencyInput value={amount} onChange={handleChangeAmount} />
        </div>
        <div>
          <CurrencySelect currencies={currencies} value={baseCurrency} onChange={handleChangeBaseCurrency} />
        </div>
        <div className='flex justify-center items-center text-3xl font-black -mt-2'> = </div>
        <div className='flex justify-center items-center text-2xl font-bold'>{result}</div>
        <div>
          <CurrencySelect currencies={currencies} value={resultCurrency} onChange={handleChangeResultCurrency} />
        </div>
      </div>
    </div>
  );
}
