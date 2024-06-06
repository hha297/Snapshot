import { Routes, Route } from 'react-router-dom';
import './global.css';
import SignInPage from './_auth/forms/SignInPage';
import {
        AllUsers,
        CreatePost,
        EditPost,
        Explore,
        Home,
        PostDetails,
        Profile,
        Saved,
        UpdateProfile,
} from './_root/pages';
import SignUpPage from './_auth/forms/SignUpPage';
import AuthLayout from './_auth/AuthLayout';
import RootLayout from './_root/RootLayout';

import { Toaster } from './components/ui/toaster';
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
                                        <Route path="/explore" element={<Explore />} />
                                        <Route path="/saved" element={<Saved />} />
                                        <Route path="/all-users" element={<AllUsers />} />
                                        <Route path="/create-post" element={<CreatePost />} />
                                        <Route path="/update-post/:id" element={<EditPost />} />
                                        <Route path="/posts/:id" element={<PostDetails />} />
                                        <Route path="/profile/:id/*" element={<Profile />} />
                                        <Route path="/update-profile/:id" element={<UpdateProfile />} />
                                </Route>
                        </Routes>
                        <Toaster />
                </main>
        );
};

export default App;
