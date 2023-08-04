import { Navigate, Outlet } from 'react-router-dom';

// 추후 유저 타입 별 페이지 접근권한 부여
type UserRole = 'admin' | 'developer' | 'employer';

interface PrivateRouteProps {
  authentication: 'LOGIN' | 'LOGOUT' | UserRole;
}

export default function PrivateRoute({ authentication }: PrivateRouteProps): React.ReactElement {
  const isAuthenticated = !!window.sessionStorage.getItem('token');

  switch (authentication) {
    case 'LOGOUT': // 로그인 하지 않은 상태
      return isAuthenticated ? <Navigate to="/" /> : <Outlet />;
    case 'LOGIN': // 로그인 한 상태
      return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
    default:
      return <Outlet />;
  }
}
