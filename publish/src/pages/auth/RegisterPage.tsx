import RegisterModal from '@/components/auth/RegisterModal';
import { useState } from 'react';

const LoginPage = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleHide = (isConfirm: boolean) => {
    // isConfirm: 확인/취소 클릭 여부
    console.log('isConfirm', isConfirm);
    setIsOpen(false);
  };

  return <RegisterModal isOpen={isOpen} onClose={handleHide} />;
};

export default LoginPage;
