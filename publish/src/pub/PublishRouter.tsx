import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';
import PublishList from './PublishList';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import HomePage from '../pages/HomePage';

const PublishRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PublishList />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default PublishRouter;
