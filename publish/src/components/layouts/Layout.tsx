import React, { ReactNode } from 'react';
import LayoutHeader from './LayoutHeader';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <LayoutHeader />

      <div className="container">
        <div className="content">{children}</div>
      </div>
    </>
  );
};

export default Layout;
