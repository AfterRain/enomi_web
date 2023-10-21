import type { Metadata } from 'next'
import React from 'react';
import './globals.css'
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { UserProvider } from '@auth0/nextjs-auth0/client';


export const metadata: Metadata = {
  title: 'Welcome to Enomi',
  description: 'Innovate Your AI searching features',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          <Navbar />
            {children}
          <Footer />
        </UserProvider>
      </body>
    </html>
  )
}