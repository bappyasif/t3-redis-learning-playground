import { HelloMutate } from '@/components/HelloMutate';
import { HelloWorld } from '@/components/HelloWorld';
import { Users } from '@/components/Users';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <HelloWorld />
      <HelloMutate />
      {/* <Users /> */}
      <Link href="/users">Users</Link>
    </div>
  );
}
