import Navbar from '@/components/nav/Navbar';
import React from 'react'

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className="min-h-full flex flex-col w-full mx-auto max-w-6xl p-4 md:p-6">
      <Navbar />
      {children}
    </div>
  );
}