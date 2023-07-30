import { Navigate, Route, BrowserRouter, Routes } from 'react-router-dom';
import PublishList from './PublishList';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import HomePage from '../pages/HomePage';
import RecruitDetailPage from '../pages/RecruitDetailPage';
import RecruitAddPage from '../pages/RecruitAddPage';
import RecruitEditPage from '../pages/RecruitEditPage';

const PublishRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublishList />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/recruit-add" element={<RecruitAddPage />} />
        <Route path="/recruit-detail" element={<RecruitDetailPage />} />
        <Route path="/recruit-edit" element={<RecruitEditPage />} />
        <Route path="/" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default PublishRouter;
