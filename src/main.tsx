import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import App from '@/App';
import '@/index.css';
import { WagmiConfig } from 'wagmi';
import { client } from '@/wallet';
import { Buffer } from 'buffer';
import process from 'process';

import { GlobalProvider } from '@/store/context';
import { StyledEngineProvider, ThemeProvider } from '@mui/material';
import { theme } from './MUI';

globalThis.global = window;
globalThis.Buffer = Buffer;
globalThis.process = process;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <WagmiConfig client={client}>
      <QueryClientProvider client={queryClient}>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <GlobalProvider>
              <App />
            </GlobalProvider>
          </ThemeProvider>
        </StyledEngineProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </WagmiConfig>
  </React.StrictMode>
);
