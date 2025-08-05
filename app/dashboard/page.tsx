'use client';
import React from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

import DashboardHeader from './_components/DashboardHeader';
import UserStoryList from './_components/UserStoryList';

function Dashboard() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  // Redirect to sign-in if not authenticated
  React.useEffect(() => {
    if (isLoaded && !user) {
      router.push('/sign-in');
    }
  }, [isLoaded, user, router]);

  // Show loading while checking authentication
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[#cad3ff] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    );
  }

  // Don't render if user is not authenticated
  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#cad3ff]">
      <DashboardHeader />
      <div className="p-6 md:p-10 lg:p-16">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
              Welcome back, {user.firstName || 'Storyteller'}! 👋
            </h1>
            <p className="text-lg text-primary/80">
              Ready to create some magical stories today?
            </p>
          </div>
          <UserStoryList />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
