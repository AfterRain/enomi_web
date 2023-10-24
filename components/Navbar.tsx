"use client"

import { useSession, signIn } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

import { NAV_LINKS } from "@/constants";
import Button from "./Button";
import SignInButton from './SignInButton';

type ClientSafeProvider = {
  name: string;
  id: string;
  //... other properties
};

type ProviderList = Record<string, ClientSafeProvider>;

const Navbar = () => {
  const { data: session,status } = useSession();

  const renderAuthButton = () => {
    if (status === "loading") return null; // Or a loading spinner/icon if desired
    if (status === "authenticated") {
      return (
        <SignInButton 
          type="button"
          title={`Sign in`}
          variant="btn_dark_green"
        />
      );
    }
    if (status === "unauthenticated") {
      return (
        <Button 
          type="button"
          title="Sign in"
          variant="btn_dark_green"
          onClick={() => signIn()}
        />
      );
    }
  }

  //const [providers, setProviders] = useState<ProviderList | null>(null);

  /*
  useEffect(() => {
    const setUpProviders = async () => {
      try {
        const response = await getProviders();
        if (response) {
          setProviders(response);
        } else {
          console.error("Received null from getProviders");
        }
      } catch (error) {
        console.error("Error fetching providers:", error);
      }
    };
    setUpProviders();
  }, []);
  */

  //console.log('Providers:', providers);
  
  return (
    <nav className="flexBetween max-container padding-container relative z-30 py-5">
      <Link href="/">
        {/*<Image src="/logo/enomi_nav_3.png" alt="logo" width={74} height={29} />*/}
        <Image src="/logo/enomi_nav_3.png" alt="logo" width={100} height={100} />
      </Link>

      <ul className="hidden h-full gap-12 lg:flex">
        {NAV_LINKS.map((link) => (
          <Link href={link.href} key={link.key} className="regular-16 text-gray-50 flexCenter cursor-pointer pb-1.5 transition-all hover:font-bold">
            {link.label}
          </Link>
        ))}
      </ul>

          
      <div className="lg:flexCenter hidden">
        {renderAuthButton()}
      </div>
        
      {/* 
      <div className="lg:flexCenter hidden">
        {session?.user ? (
          <Image src={session.user.image ?? "/default-avatar.png"} width={37} height={37} className="rounded-full" alt="profile" />
        ) : (
          providers && Object.values(providers).map(provider => (
            <Button
              key={provider.id}
              type="button"
              title={`Sign in`}
              onClick={() => signIn(provider.id)}
              variant="btn_dark_green"
            />
          ))
        )}
      </div>
      */}
      
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
