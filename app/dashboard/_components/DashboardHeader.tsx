'use client';
import { Button } from '@heroui/button';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function DashboardHeader() {
  return (
    <div className="p-7 bg-primary text-white flex justify-between items-center">
      <h2 className="font-bold text-3xl">My Stories</h2>
      <div className="flex gap-3 items-center">
        <Image alt="coin" height={50} src={'/capital.png'} width={50} />
        <span className="text-2xl">3 credits</span>
        <Link href={'/buy-credits'}>
          <Button className="bg-blue-400" color="secondary">
            Buy more credits
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default DashboardHeader;
