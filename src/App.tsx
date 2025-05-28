import { Routes, Route } from 'react-router-dom';

import Home from './pages/home.tsx';
import Login from './pages/authentication/login.tsx';
import Register from './pages/authentication/register.tsx';
import ForgotPassword from './pages/authentication/forgotPassword.tsx';
import VerifyEmail from './pages/authentication/verifyEmail.tsx';
import Profile from './pages/profile.tsx';
import Builder from './pages/builder/builder.tsx';

import ViewUser from './pages/viewUser.tsx';

import CreateCar from './pages/builder/cars/createCar.tsx';
import EditCar from './pages/builder/cars/editCar.tsx';
import ViewCar from './pages/builder/cars/viewCar.tsx';

import CreateBuildList from './pages/builder/buildlists/createBuildList.tsx';
import EditBuildList from './pages/builder/buildlists/editBuildList.tsx';
import ViewBuildList from './pages/builder/buildlists/viewBuildList.tsx';

import CreatePart from './pages/builder/parts/createPart.tsx';
import EditPart from './pages/builder/parts/editPart.tsx';
import ViewPart from './pages/builder/parts/viewPart.tsx';

import About from './pages/about.tsx';
import PrivacyPolicy from './pages/privacyPolicy.tsx';
import ContactUs from './pages/contactUs.tsx';

import Header from './components/header.tsx';
import Footer from './components/footer.tsx';
import ProtectedRoute from './components/protectedRoute'; // Import ProtectedRoute

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
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/verifyEmail" element={<VerifyEmail />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
          <Route path="/contactUs" element={<ContactUs />} />
          <Route path="/user/:username" element={<ViewUser />} />
          {/* Builder Routes */}
          <Route path="/builder/car/:carId" element={<ViewCar />} />
          <Route path="/builder/part/:partId" element={<ViewPart />} />
          <Route
            path="/builder/build-list/:buildListId"
            element={<ViewBuildList />}
          />
          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/builder" element={<Builder />} />
            <Route path="/builder/car/create" element={<CreateCar />} />

            <Route path="/builder/car/:carId/edit" element={<EditCar />} />
            <Route
              path="/builder/build-list/create"
              element={<CreateBuildList />}
            />
            <Route
              path="/builder/build-list/:buildListId/edit"
              element={<EditBuildList />}
            />
            <Route path="/builder/part/create" element={<CreatePart />} />

            <Route path="/builder/part/:partId/edit" element={<EditPart />} />
          </Route>
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
