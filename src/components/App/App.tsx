import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  LoginPage, 
  BurgerConstructorPage, 
  ForgotPasswordPage,
  RegisterPage,
  ResetPasswordPage,
  ProfilePage,
  IngredientPage,
  OrdersPage,
  FeedPage,
  FeedInformationPage,
  OrderInformationPage,
  NotFound
} from '../../pages';
import ProtectedRouteElement from '../ProtectedRouteElement/ProtectedRouteElement';
import ProfileEdit from '../ProfileEdit/ProfileEdit';
import AppHeader from '../AppHeader/AppHeader';

function App() {
  return (
    <BrowserRouter>
      <AppHeader />
      <Routes>
        <Route 
          path="/" 
          element={<BurgerConstructorPage />}
        >
          <Route path="ingredients/:id" element={<IngredientPage />} />
        </Route>
        <Route 
          path="/login"
          element={<ProtectedRouteElement onlyUnAuth element={<LoginPage />} />}
        />
        <Route 
          path="/register"
          element={<ProtectedRouteElement onlyUnAuth element={<RegisterPage />} />} 
        />
        <Route 
          path="/forgot-password"
          element={<ProtectedRouteElement onlyUnAuth element={<ForgotPasswordPage />} />} 
        />
        <Route 
          path="/reset-password"
          element={<ProtectedRouteElement onlyUnAuth element={<ResetPasswordPage />} />} 
        />
        <Route 
          path="/profile"
          element={<ProtectedRouteElement element={<ProfilePage />} />}
        >
          <Route index element={<ProfileEdit />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="orders/:id" element={<OrderInformationPage />} />
        </Route>
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/feed/:id" element={<FeedInformationPage />} />
        <Route 
          path="*" 
          element={<NotFound />} 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
