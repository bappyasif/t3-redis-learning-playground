import { HelloMutate } from '@/components/HelloMutate';
import { HelloWorld } from '@/components/HelloWorld';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <HelloWorld />
      <HelloMutate />
    </div>
  );
}
