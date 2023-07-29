import React, { useState } from 'react';
import LoginModal from '../components/auth/LoginModal';

const LoginPage = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleHide = (isConfirm: boolean) => {
    // isConfirm: 확인/취소 클릭 여부
    console.log('isConfirm', isConfirm);
    setIsOpen(false);
  };

  return <LoginModal isOpen={isOpen} hide={handleHide} />;
};

export default LoginPage;
