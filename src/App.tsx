import { Routes, Route } from 'react-router-dom';

import Home from './pages/home.tsx';
import Login from './pages/authentication/login.tsx';
import Register from './pages/authentication/register.tsx';
import ForgotPassword from './pages/authentication/forgotPassword.tsx';
import ForgotPasswordConfirm from './pages/authentication/forgotPasswordConfirm.tsx';
import VerifyEmail from './pages/authentication/verifyEmail.tsx';
import VerifyEmailConfirm from './pages/authentication/verifyEmailConfirm.tsx';
import Profile from './pages/profile.tsx';
import Builder from './pages/builder/builder.tsx';

import ViewUser from './pages/viewUser.tsx';

import MyBuildLists from './pages/builder/myBuildsLists.tsx';

import About from './pages/about.tsx';
import PrivacyPolicy from './pages/privacyPolicy.tsx';
import ContactUs from './pages/contactUs.tsx';

import Header from './components/layout/globalHeader/header.tsx';
import Footer from './components/layout/globalFooter/footer.tsx';
import ProtectedRoute from './components/routes/protectedRoute';
import EmailVerifiedRoute from './components/routes/emailVerifiedRoute.tsx';
import GuestRoute from './components/routes/guestRoute';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto p-4">
        <Routes>
          {/* Public Routes */}
          <Route
            path="*"
            element={<div className="text-center">Page Not Found</div>}
          />
          <Route path="/" element={<Home />} />
          {/* Guest Routes (redirect if logged in) */}
          <Route element={<GuestRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Route>
          <Route path="/about" element={<About />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/user/:userId" element={<ViewUser />} />{' '}
          <Route
            path="/verify-email/confirm"
            element={<VerifyEmailConfirm />}
          />
          <Route
            path="/forgot-password/confirm"
            element={<ForgotPasswordConfirm />}
          />
          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route element={<EmailVerifiedRoute />}>
              <Route path="/builder/my-buildlists" element={<MyBuildLists />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/builder" element={<Builder />} />
            </Route>
          </Route>
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
