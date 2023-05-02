import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  LoginPage, 
  BurgerConstructorPage, 
  ForgotPasswordPage,
  RegisterPage,
  ResetPasswordPage,
  ProfilePage,
  IngredientPage,
  NotFound
} from '../../pages';
import ProtectedRouteElement from '../ProtectedRouteElement/ProtectedRouteElement';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BurgerConstructorPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/profile" element={<ProtectedRouteElement element={<ProfilePage />} />} />
        <Route path="/ingredients/:id" element={<IngredientPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
