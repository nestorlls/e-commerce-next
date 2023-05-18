import { useSession, signIn, signOut } from 'next-auth/react';
import Image from 'next/image';
import googleicon from '../public/icons8-google.svg';
import Nav from '@/components/Nav';

export default function Layout({ children }) {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className='bg-cyan-600 w-screen h-screen flex items-center'>
        <div className='text-center w-full flex justify-center'>
          <button
            className='bg-white p-2 rounded-lg px-4 flex gap-2'
            onClick={() => signIn('google')}
          >
            <Image src={googleicon} alt='google icon' width={24} height={24} />
            Login with Google
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='bg-cyan-700 min-h-screen flex'>
      <Nav />
      <div className='bg-white flex-grow mt-2 mr-2 mb-2 rounded-lg p-4'>
        {children}
      </div>
    </div>
  );
}
