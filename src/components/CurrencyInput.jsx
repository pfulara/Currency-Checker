export default function CurrencyInput({ value, onChange }) {
  return <input className='w-full py-2 pl-3 text-black' type='number' min={1} value={value} onChange={onChange} />;
}
