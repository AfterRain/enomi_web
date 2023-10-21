import Link from 'next/link';
import Image from 'next/image';
import { useUser } from '@auth0/nextjs-auth0/client';
import { Menu, Transition } from '@headlessui/react';
import clsx from 'clsx';
import {
    ArrowRightOnRectangleIcon,
    Cog8ToothIcon
} from '@heroicons/react/24/solid';
import Button from './Button';

const SignInButton = () => {
  const { user } = useUser();

  return (
    <>
      {user ? (
        <Menu as="div" className="relative">
          <Menu.Button>
            <Image src={user.picture ?? "/default-avatar.png"} width={37} height={37} className="rounded-full" alt="profile" />
          </Menu.Button>

          <Transition
            enter="transition duration-150 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-150 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Menu.Items className="bg-react dark:text-react absolute right-0 mt-1 flex w-96 origin-top-right flex-col rounded-xl py-6 text-white shadow-lg focus:outline-none dark:bg-white">
              <div className="mb-4 flex gap-4 px-6 text-sm">
                <div className="relative h-10 w-10">
                     <Image src={user.picture ?? "/default-avatar.png"} width={37} height={37} className="rounded-full" alt="profile" />
                </div>
                <div>
                  <p className="font-medium text-stone-600">
                    {user.name || 'User name'}
                  </p>
                  <p className="text-stone-400">{user.name}</p>
                </div>
              </div>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href="/profile"
                    className={clsx(
                        active && 'bg-stone-700/50 dark:bg-stone-200',
                        'inline-flex items-center gap-6 px-[34px] py-2 text-sm text-stone-400 dark:text-stone-500'
                    )}
                    >
                    <Cog8ToothIcon className="h-5 w-5 text-stone-400" />
                    <span>Manage Account</span>
                  </Link>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <button
                    className={clsx(
                      active && 'bg-stone-700/50 dark:bg-stone-200',
                      'inline-flex items-center gap-6 px-[34px] py-2 text-sm text-stone-400 dark:text-stone-500'
                    )}
                    onClick={() => window.location.href = '/api/auth/logout'}
                  >
                    <ArrowRightOnRectangleIcon className="h-5 w-5 text-stone-400" />
                    <span>Sign Out</span>
                  </button>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      ) : (
        <Button 
            type="button"
            title="Sign in"
            variant="btn_dark_green"
            onClick={() => window.location.href = '/api/auth/login'}
        />
      )}
    </>
  );
}

export default SignInButton;
