import LayoutHeader from '@/components/layouts/LayoutHeader';
import { ReactNode } from 'react';

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
