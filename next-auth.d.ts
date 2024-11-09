   // Create a file named `next-auth.d.ts` in your project
   import 'next-auth/react';

   declare module 'next-auth/react' {
     interface Session {
       address?: string;
     }
   }