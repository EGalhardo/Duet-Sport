import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import MobileNavbar from './MobileNavbar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 w-full lg:ml-[250px] flex flex-col pb-16 lg:pb-0 bg-white">
          {children}
        </main>
      </div>
      <MobileNavbar />
    </div>
  );
}
