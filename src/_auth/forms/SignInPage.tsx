import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { SignInValidation } from '@/lib/validation';

import { useToast } from '@/components/ui/use-toast';
import Loader from '@/components/shared/Loader';
import { Link, useNavigate } from 'react-router-dom';

import { useCreateUserAccount, useSignInAccount } from '@/lib/react-query/queriesAndMutation';

import { useUserContext } from '@/context/AuthContext';

const SignInPage = () => {
        const { toast } = useToast();
        const navigate = useNavigate();
        const { checkAuthUser, isLoading: isUserLoading } = useUserContext();

        const { mutateAsync: signInAccount, isPending: isSigningInUser } = useSignInAccount();
        // 1. Define form
        const form = useForm<z.infer<typeof SignInValidation>>({
                resolver: zodResolver(SignInValidation),
                defaultValues: {
                        email: '',
                        password: '',
                },
        });

        // 2. Define a submit handler
        async function onSubmit(values: z.infer<typeof SignInValidation>) {
                // Create user

                const session = await signInAccount({
                        email: values.email,
                        password: values.password,
                });

                if (!session) {
                        return toast({
                                title: 'Sign in failed. Please try again.',
                        });
                }

                const isLoggedIn = await checkAuthUser();
                if (isLoggedIn) {
                        form.reset();
                        navigate('/');
                } else {
                        toast({ title: 'Sign in failed. Please try again.' });
                        return;
                }
        }
        return (
                <Form {...form}>
                        <div className="sm:w-420 flex-center flex-col">
                                <img src="/assets/images/logo.png" alt="Logo" className="w-48" />
                                <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">Log in to your account</h2>
                                <p className="text-light-3 small-medium md:base-regular mt-2">
                                        Welcome back! Please enter your information
                                </p>
                                <form
                                        onSubmit={form.handleSubmit(onSubmit)}
                                        className="space-y-4 flex flex-col gap-4 w-full mt-8"
                                >
                                        <FormField
                                                control={form.control}
                                                name="email"
                                                render={({ field }) => (
                                                        <FormItem>
                                                                <FormLabel>Email</FormLabel>
                                                                <FormControl>
                                                                        <Input
                                                                                type="email"
                                                                                placeholder="Email"
                                                                                className="shad-input"
                                                                                {...field}
                                                                        />
                                                                </FormControl>

                                                                <FormMessage className="text-red" />
                                                        </FormItem>
                                                )}
                                        />
                                        <FormField
                                                control={form.control}
                                                name="password"
                                                render={({ field }) => (
                                                        <FormItem>
                                                                <FormLabel>Password</FormLabel>
                                                                <FormControl>
                                                                        <Input
                                                                                type="password"
                                                                                placeholder="Password"
                                                                                className="shad-input"
                                                                                {...field}
                                                                        />
                                                                </FormControl>

                                                                <FormMessage className="text-red" />
                                                        </FormItem>
                                                )}
                                        />

                                        <Button type="submit" className=" shad-button_primary">
                                                {isSigningInUser || isUserLoading ? (
                                                        <div className="flex-center gap-2">
                                                                <Loader />
                                                                Loading...
                                                        </div>
                                                ) : (
                                                        'Sign In'
                                                )}
                                        </Button>
                                        <p className="text-small-regular text-light-2 text-center mt-2">
                                                Don't have an account?{' '}
                                                <Link to="/sign-up" className="text-primary-500 hover:text-primary-600">
                                                        Sign Up
                                                </Link>
                                        </p>
                                </form>
                        </div>
                </Form>
        );
};

export default SignInPage;
