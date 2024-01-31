import Link from 'next/link';

export default function Header() {
  return (
    <header className='h-16 p-4 flex align-center justify-between'>
      <Link href='/'>
        <h1>Currency Checker</h1>
      </Link>
      <nav className='w-40 flex justify-between align-center'>
        <Link href='/gold'>Gold Price</Link>
        <Link href='/currencies'>Currencies</Link>
      </nav>
    </header>
  );
}
