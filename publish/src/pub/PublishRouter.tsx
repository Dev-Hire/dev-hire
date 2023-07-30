import LoginPage from '@/pages/auth/LoginPage';
import RegisterPage from '@/pages/auth/RegisterPage';
import AlertPage from '@/pages/common/AlertPage';
import ConfirmPage from '@/pages/common/ConfirmPage';
import LoadingPage from '@/pages/common/LoadingPage';
import ToastPage from '@/pages/common/ToastPage';
import HomePage from '@/pages/home/HomePage';
import RecruitAddPage from '@/pages/recruits/RecruitAddPage';
import RecruitDetailPage from '@/pages/recruits/RecruitDetailPage';
import RecruitEditPage from '@/pages/recruits/RecruitEditPage';
import PublishList from '@/pub/PublishList';
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';

const PublishRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PublishList />} />

        {/* 공통 */}
        <Route path="/alert" element={<AlertPage />} />
        <Route path="/confirm" element={<ConfirmPage />} />
        <Route path="/toast" element={<ToastPage />} />
        <Route path="/loading" element={<LoadingPage />} />

        {/* 인증 */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* 홈 */}
        <Route path="/home" element={<HomePage />} />

        {/* 채용 */}
        <Route path="/recruit-add" element={<RecruitAddPage />} />
        <Route path="/recruit-detail" element={<RecruitDetailPage />} />
        <Route path="/recruit-edit" element={<RecruitEditPage />} />

        {/* 404 */}
        <Route path="/" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default PublishRouter;
