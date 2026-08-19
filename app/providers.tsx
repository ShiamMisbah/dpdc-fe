"use client"

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { useState } from 'react'

type Props = {
  children: React.ReactNode;
};

const Providers = ({ children }: Props) => {
    const [queryClient] = useState(
      () =>
        new QueryClient({
          defaultOptions: {
            queries: {
              staleTime: 60 * 1000,
              refetchOnWindowFocus: false,
            },
          },
        }),
    );
  return (
    <QueryClientProvider client={queryClient}>
        {children}
    </QueryClientProvider>
  )
};

export default Providers