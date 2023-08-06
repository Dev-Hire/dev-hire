import ModalProvider from '@/components/common/ModalProvider';
import AppRouter from '@/components/AppRouter';

function App() {
  return (
    <>
      <ModalProvider>
        {/* Router */}
        <AppRouter />
      </ModalProvider>

      {/* 모달 */}
      {/* <ModalController /> */}
    </>
  );
}

export default App;
