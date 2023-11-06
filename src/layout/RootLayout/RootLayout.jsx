import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router-dom';
import FooterBar from '../FooterBar';
import HeaderBar from '../HeaderBar';

const queryClient = new QueryClient();

function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <HeaderBar />
      <main>
        <div>
          <Outlet />
        </div>
      </main>
      <FooterBar />
      <Toaster />
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  );
}

export default RootLayout;
