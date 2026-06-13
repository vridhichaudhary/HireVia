"use client";
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

const AuthSuccessHandler = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const token = searchParams.get('token');
        if (token) {
            localStorage.setItem('token', token);
            // Redirect to home and refresh to load user context
            window.location.href = '/';
        } else {
            router.push('/');
        }
    }, [searchParams, router]);

    return (
        <div className="min-h-screen bg-[#0A0E17] flex items-center justify-center text-white">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#8B5CF6] mx-auto mb-4"></div>
                <h2 className="text-xl font-semibold">Authenticating...</h2>
                <p className="text-gray-400">Completing your login, please wait.</p>
            </div>
        </div>
    );
};

export default function AuthSuccessPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <AuthSuccessHandler />
        </Suspense>
    );
}
