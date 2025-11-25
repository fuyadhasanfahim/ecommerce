'use client';

import { useForm } from 'react-hook-form';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '../ui/card';
import { Form } from '../ui/form';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { Loader } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from '@/lib/auth-client';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const signinSchema = z.object({
    email: z.email().nonempty('Email is required.'),
    password: z.string().nonempty('Password is required.'),
});

export default function SigninForm() {
    const form = useForm({
        resolver: zodResolver(signinSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const isLoading = form.formState.isLoading || form.formState.isSubmitting;

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const onSubmit = async (data: z.infer<typeof signinSchema>) => {
        try {
            setShowPassword(false);

            const res = await signIn.email(data);

            if (res.data?.user) {
                toast.success('Signed in successfully.');
                form.reset();
                router.push('/dashboard');
            } else {
                toast.error(res.error?.message || 'Failed to sign in.');
            }
        } catch (error) {
            toast.error((error as Error).message || 'Something went wrong.');
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl">
                    Sign in to your account
                </CardTitle>
                <CardDescription>
                    Enter your email below to sign in to your account
                </CardDescription>
            </CardHeader>

            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="space-y-6">
                            <div className="grid gap-3">
                                <Label>
                                    Email{' '}
                                    <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    type="email"
                                    placeholder="Enter your email"
                                    required
                                    {...form.register('email')}
                                />
                                {form.formState.errors.email && (
                                    <span className="text-xs text-destructive font-serif">
                                        {form.formState.errors.email.message}
                                    </span>
                                )}
                            </div>
                            <div className="grid gap-3">
                                <Label>
                                    Password{' '}
                                    <span className="text-destructive">*</span>
                                </Label>
                                <div className="relative">
                                    <Input
                                        type={
                                            showPassword ? 'text' : 'password'
                                        }
                                        placeholder="Enter your password"
                                        required
                                        {...form.register('password')}
                                    />
                                    <Button
                                        type="button"
                                        variant={'link'}
                                        onClick={handleShowPassword}
                                        className="font-serif absolute right-0 hover:cursor-pointer"
                                    >
                                        {showPassword ? 'Hide' : 'Show'}
                                    </Button>
                                </div>
                                {form.formState.errors.password && (
                                    <span className="text-xs text-destructive font-serif">
                                        {form.formState.errors.password.message}
                                    </span>
                                )}
                            </div>

                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full"
                            >
                                {isLoading ? (
                                    <Loader className="animate-spin" />
                                ) : (
                                    'Sign In'
                                )}
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>

            <CardFooter>
                <div className="text-center w-full">
                    <span className="text-sm">
                        Forget Password?{' '}
                        <Link
                            href={'/forget-password'}
                            className="hover:underline font-medium font-serif"
                        >
                            Click Here
                        </Link>
                    </span>
                </div>
            </CardFooter>
        </Card>
    );
}
