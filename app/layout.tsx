import type { Metadata } from 'next'
import React from 'react';
import './globals.css'
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Provider from '@/components/Provider';


export const metadata: Metadata = {
  title: 'Welcome to Enomi',
  description: 'Innovate Your AI searching features',
}

export default function RootLayout({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any; // Ideally, you'd type this better, maybe using Session from 'next-auth'.
}) {
  return (
    <html lang="en">
      <body>
        <Provider session={session}>
          <Navbar />
            {children}
          <Footer />
        </Provider>
      </body>
    </html>
  )
}