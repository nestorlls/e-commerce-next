import Layout from '@/components/Layout';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

export default function Home() {
  const { data: session } = useSession();

  return (
    <Layout>
      <div className='text-cyan-700 flex justify-between'>
        <h2>
          Hello,
          <b> {session?.user?.name}</b>
        </h2>
        <div className='flex bg-gray-500 gap-1 text-white rounded-lg overflow-hidden'>
          <Image
            src={session?.user?.image}
            alt={session?.user?.name}
            width={24}
            height={24}
            className='w-8 h-8'
          />
          <span className='py-1 px-2'>{session?.user?.name}</span>
        </div>
      </div>
    </Layout>
  );
}
