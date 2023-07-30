import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './styles/main.scss';
import { StrictMode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
// import { worker } from './mocks/browser.ts';

const queryClient = new QueryClient();

// msw 실행
// if (window.location.hostname === 'localhost')
//   worker.start({
//     onUnhandledRequest: 'bypass',
//   });

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
);
