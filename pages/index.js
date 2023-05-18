import { useSession, signIn, signOut } from 'next-auth/react';
import Image from 'next/image';
import googleicon from '../public/icons8-google.svg';

export default function Home() {
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
    <>
      <div>Logged with name {session?.user.email} </div>
    </>
  );
}
