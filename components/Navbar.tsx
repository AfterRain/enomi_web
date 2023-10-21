"use client"

import Image from 'next/image';
import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0/client';
import { NAV_LINKS } from "@/constants";
import SignInButton from './SignInButton';
import Button from "./Button";
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const { user } = useUser();
  const router = useRouter();

  return (
    <nav className="flexBetween max-container padding-container relative z-30 py-5">
      <Link href="/">
        <Image src="/hilink-logo.svg" alt="logo" width={74} height={29} />
      </Link>

      <ul className="hidden h-full gap-12 lg:flex">
        {NAV_LINKS.map((link) => (
          <Link href={link.href} key={link.key} className="regular-16 text-gray-50 flexCenter cursor-pointer pb-1.5 transition-all hover:font-bold">
            {link.label}
          </Link>
        ))}
      </ul>

      <div className="lg:flexCenter hidden">
        {user ? (
          <SignInButton 
            
          />
        ) : (
          <Button 
            type="button"
            title="Sign in"
            variant="btn_dark_green"
            onClick={() => router.push('/api/auth/login')}
          />
        )}
      </div>
      
      <Image 
        src="menu.svg"
        alt="menu"
        width={32}
        height={32}
        className="inline-block cursor-pointer lg:hidden"
      />
    </nav>
  );
}

export default Navbar;
