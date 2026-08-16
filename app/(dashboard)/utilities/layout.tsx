import React from 'react'

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className="mx-auto w-full max-w-6xl p-4 md:p-6 flex flex-col gap-4">
      {children}
    </div>
  );
}

