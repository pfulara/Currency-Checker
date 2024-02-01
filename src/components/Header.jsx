import Link from 'next/link';

export default function Header() {
  return (
    <header className='h-24 p-4 flex align-center justify-between border-b border-solid border-white'>
      <Link href='/'>
        <h1 className='text-center font-bold text-lg'>
          <span className='block text-3xl font-black uppercase'>Currency</span>Checker
        </h1>
      </Link>
      <nav className='w-40 flex justify-between items-center'>
        <Link href='/gold'>Gold Price</Link>
        <Link href='/currencies'>Currencies</Link>
      </nav>
    </header>
  );
}
