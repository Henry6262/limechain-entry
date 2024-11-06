   // Create a file named `next-auth.d.ts` in your project
   import 'next-auth';

   declare module 'next-auth' {
     interface Session {
       address?: string;
     }
   }