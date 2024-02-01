export default function CurrencySelect({ currencies, value, onChange }) {
  return (
    <select
      value={value}
      onChange={onChange}
      className='text-black w-full py-2 pl-3 h-10 border border-white border-solid'
    >
      {Object.keys(currencies).map((key) => (
        <option key={key} value={key}>
          {key}
        </option>
      ))}
    </select>
  );
}
