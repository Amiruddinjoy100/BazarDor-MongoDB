# 🛒 বাজার দর (BazarDor)

**A simple way to explore everyday grocery prices in Bangladesh.**

BazarDor is a Bengali-first grocery price tracker built to make market information easier to find and compare. Instead of checking products one by one, visitors can browse common essentials, see which prices have gone up or down, and compare prices reported across different markets.

I built this project with Next.js, using an external product API for market data and MongoDB with Better Auth for user accounts. It started as a Programming Hero Batch 14, Assignment 07 project and became a practical way for me to work with full-stack development, authentication, dynamic routes, and deployment.

**[Live website](https://bazar-dor-mongo-db.vercel.app)** · **[Source code](https://github.com/Amiruddinjoy100/BazarDor-MongoDB)**

## What you can do

- **Browse grocery prices in Bangla.** Explore the full product list with Bengali names, numbers, prices, and units.
- **Spot daily price changes.** The homepage highlights up to six of the biggest price increases and decreases, along with percentage changes.
- **Follow the price ticker.** A scrolling ticker gives a quick view of product prices and their latest movements.
- **Explore by category.** Find rice, lentils, oil, vegetables, fish, meat, eggs and milk, spices, and other items provided by the API.
- **Sort products by price.** Switch between the default order, low-to-high, and high-to-low sorting. The sorting logic also handles Bengali numerals.
- **Compare markets.** Signed-in users can open a product page to see its current price, available previous prices, market-by-market ranges, and calculated minimum, maximum, and average prices.
- **Sign in your way.** Use email and password, Google, or GitHub. The app also supports linking a Google account to an existing signed-in account.
- **Manage your profile.** View account details, update your display name, and sign out.

The interface includes loading skeletons, form feedback, helpful unavailable-data states, and a custom 404 page. It is designed for desktop and smaller screens.

## Tech stack

| Area | Tools |
| --- | --- |
| Frontend | Next.js 16 (App Router), React 19, JavaScript/JSX |
| Styling | Tailwind CSS 4, custom CSS |
| Authentication | Better Auth, Google OAuth, GitHub OAuth |
| Database | MongoDB Atlas and `@better-auth/mongo-adapter` |
| UI details | Lucide React, React Hot Toast |
| Product data | BazarDor REST API |
| Hosting | Vercel |

MongoDB stores authentication records such as users, linked accounts, and sessions. Product prices are fetched from the external API rather than saved to MongoDB.

## Run it locally

You will need **Node.js 20.9+**, npm, and a MongoDB database. MongoDB Atlas is a convenient choice if you also plan to deploy on Vercel.

### 1. Clone and install

```bash
git clone https://github.com/Amiruddinjoy100/BazarDor-MongoDB.git
cd BazarDor-MongoDB
npm install
```

### 2. Set up your environment

Create a `.env.local` file at the project root. In Windows PowerShell, you can start from the example file:

```powershell
Copy-Item .env.example .env.local
```

On macOS or Linux, use `cp .env.example .env.local` instead.

```dotenv
BAZARDOR_API_URL=https://api.abcz.workers.dev/api/bazardor

MONGODB_URI=mongodb+srv://YOUR_USER:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/
MONGODB_DB=bazardor

BETTER_AUTH_SECRET=REPLACE_WITH_YOUR_OWN_RANDOM_SECRET
BETTER_AUTH_URL=http://localhost:3000

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
```


Google and GitHub credentials are needed only when you want to test those sign-in methods. Email/password authentication can work without them. Do not commit `.env.local` or real credentials to GitHub.

If your MongoDB connection string uses `mongodb+srv://`, make sure your DNS and MongoDB Atlas Network Access settings allow the connection.

### 3. Start the app

```bash
npm run dev
```

Open **http://localhost:3000** in your browser. You can create an account through `/signup` and sign in through `/signin`.

### 4. Run the tests

```bash
npm test
npm run build
```

The tests cover formatting, numeric price sorting, percentage changes, and market summaries. The build command checks whether the application can be compiled for production.

## Google and GitHub sign-in

OAuth credentials are configured outside the source code. Create a Google OAuth web client in [Google Cloud Console](https://console.cloud.google.com/) and a GitHub OAuth app in [GitHub Developer Settings](https://github.com/settings/developers).

Use these callback URLs for local development:

```text
Google: http://localhost:3000/api/auth/callback/google
GitHub: http://localhost:3000/api/auth/callback/github
```

For the deployed site, use:

```text
Google: https://bazar-dor-mongo-db.vercel.app/api/auth/callback/google
GitHub: https://bazar-dor-mongo-db.vercel.app/api/auth/callback/github
```

Google also requires the matching authorized JavaScript origin. When the Google app is in testing mode, test users must be added in Google Auth Platform. GitHub's callback settings should include the environment you are testing. Restart the local server after changing `.env.local`.

Better Auth manages sessions and account records in MongoDB. Linking a Google account is an explicit action from the signed-in profile, not an automatic merge of unrelated users.

## Main routes

| Route | Purpose | Access |
| --- | --- | --- |
| `/` | Homepage, product list, price changes | Public |
| `/category/[slug]` | Category products and sorting | Public |
| `/product/[slug]` | Product information and market comparison | Sign-in required |
| `/signin` | Login | Public |
| `/signup` | Registration | Public |
| `/profile` | Account details and Google linking | Sign-in required |
| `/profile/update` | Update display name | Sign-in required |

Product details and profile pages check the session on the server, including direct visits and page refreshes.

## Project structure

```text
app/                 Pages, layouts, dynamic routes, and auth API routes
components/          Shared UI, forms, cards, ticker, and market table
lib/                 Product API, formatting, MongoDB, and Better Auth
tests/               Formatting and sorting tests
public/              Logo and hero assets
design/              Design reference files
.env.example         Environment variable template
package.json         Dependencies and scripts
```

## Deployment

The project is hosted on [Vercel](https://vercel.com/). To deploy a copy, import the GitHub repository, select **Next.js**, and add the same environment variables in the Vercel project settings. Use the real production domain for `BETTER_AUTH_URL` instead of `localhost`, then add that domain's callback URLs in Google and GitHub. Redeploy whenever you change production environment variables.

The product feed comes from `https://api.abcz.workers.dev/api/bazardor`. If that service is unavailable, parts of the product interface may display an unavailable-data message. Prices are informational and may differ from actual prices at a particular market or time.

## What I learned

Working on BazarDor helped me practice API integration, Bengali number formatting, dynamic routing, MongoDB connections, OAuth sign-in, account linking, protected pages, and taking a Next.js project from local development to a Vercel deployment.

## Developer

**Amir Uddin Joy** · [GitHub](https://github.com/Amiruddinjoy100)

Built for learning and practical experience with full-stack web development.
