import { HelloMutate } from '@/components/HelloMutate';
import { HelloWorld } from '@/components/HelloWorld';
import { Users } from '@/components/Users';
import Link from 'next/link';
import { RedisExample } from '@/components/RedisExample';
import { IoredisExample } from '@/components/IoredisExample';
import { RedisUpstash } from '@/components/RedisUpstash';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <HelloWorld />
      <HelloMutate />
      {/* <Users /> */}
      <Link href="/users">Users</Link>
      <RedisExample />
      <IoredisExample />
      <RedisUpstash />
    </div>
  );
}
