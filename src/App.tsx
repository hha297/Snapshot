import { Routes, Route } from 'react-router-dom';
import './global.css';
import SignInPage from './_auth/forms/SignInPage';
import { Home } from './_root/pages';
import SignUpPage from './_auth/forms/SignUpPage';
import AuthLayout from './_auth/AuthLayout';
import RootLayout from './_root/RootLayout';
const App = () => {
        return (
                <main className="flex h-screen">
                        <Routes>
                                {/* Public Routes */}
                                <Route element={<AuthLayout />}>
                                        <Route path="/sign-in" element={<SignInPage />} />
                                        <Route path="/sign-up" element={<SignUpPage />} />
                                </Route>

                                {/* Private Routes */}
                                <Route element={<RootLayout />}>
                                        <Route index element={<Home />} />
                                </Route>
                        </Routes>
                </main>
        );
};

export default App;
