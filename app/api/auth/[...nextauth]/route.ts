import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "@/app/firebase";

import { FirestoreAdapter } from '@next-auth/firebase-adapter'
import { cert } from 'firebase-admin/app'


export const authOptions = {
    providers: [

        GoogleProvider({
            clientId: process.env.GOOGLE_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            authorization: {
              params: {
                  prompt: "select_account"
              }
            }
        }),
        
        CredentialsProvider({
            name: 'Credentials',
            credentials: {},
            async authorize(credentials): Promise<any> {
              return await signInWithEmailAndPassword(auth, (credentials as any).email || '', (credentials as any).password || '')
                .then(userCredential => {
                  if (userCredential.user) {
                    return userCredential.user;
                  }
                  return null;
                })
                .catch(error => (console.log(error)));
            }
        })
    ],

    adapter: FirestoreAdapter({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
      })
    }),

    

    /*
    callbacks: {
      async signIn({ user, account, profile }: { 
        user: User; 
        account: Account | null; // <-- This change allows for a null account
        profile?: Profile | undefined; 
      }): Promise<boolean> {
          console.log('A user is signing in:', user);
          console.log('Account :', account);
          return true; // return false to stop the sign-in process
      },
      async redirect({ url, baseUrl }: { url: string; baseUrl: string; }): Promise<string> {
        console.log('Redirecting:', url);
        console.log('baseUrl:', baseUrl);
        
        return baseUrl; // return desired URL string
      },
      async session({ session, user }: { session: any; user: User; }): Promise<any> {
        console.log('User session:', session);
        return session; // return modified/unaltered session
      } ,
      async jwt({ token, user, account, profile, isNewUser }: { 
        token: any; 
        user: User | null; 
        account: Account | null; 
        profile?: Profile; 
        isNewUser?: boolean; 
      }): Promise<any> {
          console.log('JWT token:', token);
          console.log('JWT user:', user);
          console.log('JWT account:', account);
          console.log('JWT profile:', profile);
          console.log('JWT isNewUser:', isNewUser);
          return token; // return modified/unaltered token
      }
    },
    */

    pages: {
        signIn: '/signin'
    }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST};