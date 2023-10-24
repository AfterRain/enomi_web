'use client'
// Update the import paths for the components
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';  // Corrected the import path here
import { useState } from 'react';
import { auth } from '../firebase';

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordAgain, setPasswordAgain] = useState('');
  
  // Using Next.js router to navigate on successful sign up
  const router = useRouter();

  const signup = async () => {
    if (password !== passwordAgain) {
      alert("Passwords don't match!");
      return;
    }
    
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push('/');  // Navigate to dashboard on successful sign up
    } catch (error) {
      alert(error);  // Displaying error to the user
    }
  };


  return (
    <section className='flex min-h-full overflow-hidden pt-16 sm:py-28'>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign Up
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Password Again
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="passwordAgain"
                  name="passwordAgain"
                  type="password"
                  autoComplete="current-password"
                  onChange={(e) => setPasswordAgain(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              
              <div className="mt-10 text-center text-sm text-gray-400">
                <button
                    type="button"  // Prevents the form from being submitted
                    disabled={(!email || !password || !passwordAgain) || (password !== passwordAgain)}
                    onClick={signup}
                    className="disabled:opacity-40 flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                    Sign Up
                </button>
                </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default SignUpPage;
