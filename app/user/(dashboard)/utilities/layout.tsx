import React from 'react'

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className="mx-auto w-full flex flex-col gap-4">
      {children}
    </div>
  );
}

