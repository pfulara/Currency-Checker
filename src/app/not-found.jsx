import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='text-center'>
      <h2 className='text-4xl font-bold mb-6'>404</h2>
      <p className='text-2xl'>Page not found</p>
      <p className='text-2xl'>
        Get back to{' '}
        <Link className='font-bold' href='/'>
          Homepage
        </Link>
      </p>
    </div>
  );
}
