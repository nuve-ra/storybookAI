import { SignIn } from '@clerk/nextjs';
import Image from 'next/image';

export default function Page() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <div>
        <Image
          alt="login"
          className="w-full"
          height={1000}
          src="/girl.jpg"
          width={700}
        />
      </div>
      <div className="flex justify-center items-center h-screen order-first md:order-last">
        <SignIn />
      </div>
    </div>
  );
}
