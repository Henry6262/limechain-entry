import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { getCsrfToken, Session } from "next-auth/react";
import { SiweMessage } from "siwe";
import { NextApiRequest, NextApiResponse } from 'next';

export interface ExtendedSession extends Session {
  address?: string;
  user?: {
    name?: string;
    image?: string;
  };
  expires: string;
}

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
          const siwe = new SiweMessage((credentials?.message || "{}"));
          const nextAuthUrl = new URL('http://localhost:3000');

          const csrfToken = await getCsrfToken({ req: { headers: req.headers } });

          console.log(csrfToken)

          const result = await siwe.verify({
            signature: credentials?.signature || "",
            domain: nextAuthUrl.host,
            nonce: csrfToken,
          });

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
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
      async session({ session, token }) {
        const extendedSession: ExtendedSession = session as ExtendedSession;
        extendedSession.address = token.sub;
        extendedSession.user = extendedSession.user || {};
        extendedSession.user.name = token.sub;
        extendedSession.user.image = "https://www.fillmurray.com/128/128";
        extendedSession.expires = session.expires;
        return extendedSession;
      },
    },
  });
}
