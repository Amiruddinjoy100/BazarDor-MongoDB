
import "server-only";

import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { db } from "@/lib/mongodb";

const googleConfigured = Boolean(
  process.env.GOOGLE_CLIENT_ID &&
  process.env.GOOGLE_CLIENT_SECRET
);

const githubConfigured = Boolean(
  process.env.GITHUB_CLIENT_ID &&
  process.env.GITHUB_CLIENT_SECRET
);

export const auth = betterAuth({
  baseURL:
    process.env.BETTER_AUTH_URL ||
    "http://localhost:3000",

  secret: process.env.BETTER_AUTH_SECRET,

  database: mongodbAdapter(db),

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
    autoSignIn: false,
  },

  // Allow linking social accounts with different emails
  account: {
    accountLinking: {
      enabled: true,
      allowDifferentEmails: true,
    },
  },

  socialProviders: {
    ...(googleConfigured && {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      },
    }),

    ...(githubConfigured && {
      github: {
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
      },
    }),
  },
});
