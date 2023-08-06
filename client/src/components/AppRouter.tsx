import LoginPage from '@/pages/auth/LoginPage';
import RegisterPage from '@/pages/auth/RegisterPage';
import HomePage from '@/pages/home/HomePage';
import MyPagePage from '@/pages/users/MyPagePage';
import RecruitAddPage from '@/pages/recruits/RecruitAddPage';
import RecruitDetailPage from '@/pages/recruits/RecruitDetailPage';
import RecruitEditPage from '@/pages/recruits/RecruitEditPage';

import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import PrivateRoute from '@/utils/PrivateRoute';

const PublishRouter = () => {
  return (
    <Router>
      <Routes>
        {/* 인증 */}
        <Route element={<PrivateRoute authentication="LOGOUT" />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        {/* 홈 */}
        <Route path="/home" element={<HomePage />} />

        {/* 마이페이지 */}
        <Route path="/my-page" element={<MyPagePage />} />

        {/* 채용 */}
        <Route path="/recruit-add" element={<RecruitAddPage />} />
        <Route path="/recruit-detail/:id" element={<RecruitDetailPage />} />
        <Route path="/recruit-edit" element={<RecruitEditPage />} />

        {/* 404 */}
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </Router>
  );
};

export default PublishRouter;
