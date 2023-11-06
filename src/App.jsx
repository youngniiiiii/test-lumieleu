import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async';
import { RouterProvider } from 'react-router-dom';
import Spinner from './components/Spinner';
import router from './routes';
import { Suspense } from 'react';

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <div className="App">
            <Suspense
              fallback={<Spinner size={200} message="페이지 로딩 중..." />}
            >
              <RouterProvider router={router}>
              </RouterProvider>
            </Suspense>
          </div>
          <Toaster />
          <ReactQueryDevtools initialIsOpen />
        </QueryClientProvider>
      </HelmetProvider>
    </>
  );
}

export default App;
