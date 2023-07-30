import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './styles/main.scss';
import { QueryClient, QueryClientProvider } from 'react-query';

// import { worker } from './mocks/browser';
import { StrictMode } from 'react';

const queryClient = new QueryClient();

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
