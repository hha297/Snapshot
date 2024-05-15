import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { SignUpValidation } from '@/lib/validation';
import { Divide } from 'lucide-react';
import Loader from '@/components/shared/Loader';
import { Link } from 'react-router-dom';

const SignUpPage = () => {
        const isLoading = false;
        // 1. Define your form
        const form = useForm<z.infer<typeof SignUpValidation>>({
                resolver: zodResolver(SignUpValidation),
                defaultValues: {
                        name: '',
                        username: '',
                        email: '',
                        password: '',
                },
        });

        // 2. Define a submit handler
        function onSubmit(values: z.infer<typeof SignUpValidation>) {
                // This will be type-safe and validated
                console.log(values);
        }
        return (
                <Form {...form}>
                        <div className="sm:w-420 flex-center flex-col">
                                <img src="/assets/images/logo.png" alt="Logo" className="w-48" />
                                <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">Create new account</h2>
                                <p className="text-light-3 small-medium md:base-regular mt-2">
                                        To use Snapshot, please enter your information to sign you up.
                                </p>
                                <form
                                        onSubmit={form.handleSubmit(onSubmit)}
                                        className="space-y-4 flex flex-col gap-4 w-full mt-8"
                                >
                                        <FormField
                                                control={form.control}
                                                name="name"
                                                render={({ field }) => (
                                                        <FormItem>
                                                                <FormLabel>Full Name</FormLabel>
                                                                <FormControl>
                                                                        <Input
                                                                                type="text"
                                                                                placeholder="Full Name"
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
                                                name="username"
                                                render={({ field }) => (
                                                        <FormItem>
                                                                <FormLabel>Username</FormLabel>
                                                                <FormControl>
                                                                        <Input
                                                                                type="text"
                                                                                placeholder="Username"
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
                                                {isLoading ? (
                                                        <div className="flex-center gap-2">
                                                                <Loader />
                                                                Loading...
                                                        </div>
                                                ) : (
                                                        'Sign Up'
                                                )}
                                        </Button>
                                        <p className="text-small-regular text-light-2 text-center mt-2">
                                                Already have an account?{' '}
                                                <Link to="/sign-in" className="text-primary-500 hover:text-primary-600">
                                                        Sign In
                                                </Link>
                                        </p>
                                </form>
                        </div>
                </Form>
        );
};

export default SignUpPage;
