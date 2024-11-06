import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getCsrfToken } from "next-auth/react";
import { SiweMessage } from "siwe";
import { NextApiRequest, NextApiResponse } from 'next';

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  const providers = [
    CredentialsProvider({
      name: "Ethereum",
      credentials: {
        message: { label: "Message", type: "text", placeholder: "0x0" },
        signature: { label: "Signature", type: "text", placeholder: "0x0" },
      },
      async authorize(credentials) {
        try {
          console.log("Received message:", credentials?.message);

          const siwe = new SiweMessage((credentials?.message || "{}"));
          const nextAuthUrl = new URL('http://localhost:3000');

          console.log("Verifying SIWE message:", siwe);

          const result = await siwe.verify({
            signature: credentials?.signature || "",
            domain: nextAuthUrl.host,
            nonce: await getCsrfToken({ req }),
          });

          console.log("Verification result:", result);

          if (result.success) {
            return { id: siwe.address };
          }
          return null;
        } catch (e) {
          console.error("Error during SIWE verification:", e);
          return null;
        }
      },
    }),
  ];

  const isDefaultSigninPage = req.method === "GET" && req.query.nextauth!.includes("signin");

  if (isDefaultSigninPage) {
    providers.pop();
  }

  return await NextAuth(req, res, {
    providers,
    session: { strategy: "jwt" },
    secret:'somereallysecretsecret',
    callbacks: {
      async session({ session, token }) {
        session.address = token.sub;
        session.user!.name = token.sub;
        session.user!.image = "https://www.fillmurray.com/128/128";
        return session;
      },
    },
  });
}
