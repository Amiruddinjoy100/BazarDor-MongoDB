# 🛒 বাজার দর — BazarDor

**বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের দাম এক নজরে।** A Bengali-first marketplace price tracker that shows current prices, daily increases and decreases, and comparisons across local markets. Created as an original Next.js implementation of **Programming Hero, Batch 14, Assignment 07**, using the assets supplied in the assignment ZIP.

## ✨ Features

1. **Responsive homepage:** hero, primary CTA scrolling to `#সব-পণ্য`, and product cards on desktop, tablet and mobile.
2. **Infinite price ticker:** emoji, Bengali product name, price and daily ▲/▼ percentage.
3. **Price movers:** six largest risers and six largest fallers, calculated from API data.
4. **Category pages:** category links and active state, valid slug handling, **Bengali-safe numerical sorting** (default / low-high / high-low).
5. **Protected product details:** secure server-side Better Auth session check, price summary (min / max / average), historical values, and market-by-market comparison.
6. **Better Auth + MongoDB:** email/password, Google and GitHub social login; sign out; session-aware navbar.
7. **User profile:** view profile and update the name through `authClient.updateUser`.
8. **Feedback & resilience:** success/error toasts, loading skeletons, Bengali currency/date formatting, responsive empty states and custom 404s.

## 🛠 Tech stack

| Component | Technology |
| --- | --- |
| Frontend / routing | Next.js 16 App Router, React 19, JavaScript (JSX) |
| Styling | Tailwind CSS 4 + custom responsive CSS |
| Icons | Lucide React, supplied design assets |
| Authentication | Better Auth (email/password + Google + GitHub) |
| Persistence | **MongoDB** via `@better-auth/mongo-adapter` — no PostgreSQL/Prisma |
| Notifications | `react-hot-toast` |
| Hosting | Vercel (recommended) |
| Market prices | Programming Hero BazarDor REST API |

## 🚀 Local setup

Requirements: **Node.js 20.9 or newer** (Node 22 recommended), npm, and a **MongoDB Atlas** cluster or local MongoDB database. An Atlas free-tier cluster is enough for trying this project.

```bash
npm install
cp .env.example .env.local
# Edit .env.local with your real values
npm run dev
```

On Windows, use `copy .env.example .env.local` in Command Prompt or `Copy-Item .env.example .env.local` in PowerShell. Visit `http://localhost:3000`.

### Environment variables

| Name | Required? | Example / purpose |
| --- | --- | --- |
| `MONGODB_URI` | **Yes** | MongoDB Atlas connection string, with a database user that has read/write permission |
| `MONGODB_DB` | Optional | `bazardor` (database name, used for Better Auth's collections) |
| `BETTER_AUTH_SECRET` | **Yes** | High-entropy key, at least 32 random characters |
| `BETTER_AUTH_URL` | **Yes** | `http://localhost:3000` locally; deployed HTTPS origin on Vercel |
| `BAZARDOR_API_URL` | Recommended | `https://api.abcz.workers.dev/api/bazardor` |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | For Google login | From Google Cloud Console |
| `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` | For GitHub login | From GitHub Developer Settings → OAuth Apps |

Generate the secret on your machine:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))"
```

Never commit `.env.local` or paste real keys into public GitHub. The `.gitignore` already excludes secrets. Without `MONGODB_URI`, the application uses local MongoDB for development; you must start a local MongoDB service, or specify an Atlas URI. Without OAuth client credentials, email/password sign-in works but social login cannot be completed.

### MongoDB setup (Atlas)

1. Create a cluster at [MongoDB Atlas](https://www.mongodb.com/atlas), then create a database user.
2. In **Network Access**, allow the IP addresses that need database access. For serverless Vercel, follow MongoDB's recommended configuration; restrict access as appropriate for production.
3. Copy the **Drivers** connection string, insert your database username/password (URL-encode special characters in the password), and put it in `MONGODB_URI`.
4. Register your first user on `/signup`. **Better Auth creates the `user`, `account`, `session` and related collections automatically**. You do not need Prisma, Drizzle, SQL tables, or database migrations.
5. Sign in on `/signin`, visit a product detail page, and use `/profile/update` to edit the stored name.

### Google and GitHub OAuth

Create OAuth applications and configure these exact local callbacks:

- Google: `http://localhost:3000/api/auth/callback/google`
- GitHub: `http://localhost:3000/api/auth/callback/github`

On the deployed project, replace `http://localhost:3000` with `https://YOUR-PROJECT.vercel.app`. Google may require an OAuth consent screen and test users. Configure the same deployed host in `BETTER_AUTH_URL`; don't include a trailing path like `/api/auth`.

## 📡 Assignment API

Base URL from the original assignment:

```text
https://api.abcz.workers.dev/api/bazardor
```

The assignment also supplies `https://api.api-store.workers.dev/api/bazardor`. The tracking URL shared in the prompt points toward `https://openapi.programming-hero.com/api/bazardor` but was not reachable in the environment used to prepare this handoff. Change `BAZARDOR_API_URL` if a different documented mirror is working for you. No fake product prices are inserted: when the API is unavailable, the page displays a clear error state.

| Endpoint | Purpose |
| --- | --- |
| `/products` | All market products |
| `/products?category=chal` | Category-filtered products |
| `/products/1` | Single product by numeric ID (supported by API) |
| `/categories` | Available categories |
| `/categories/chal` | Category detail (supported by API) |

App product routes are `/product/[slug]`. The app resolves slugs against the all-products list so they work independently of the API's numeric-ID endpoint.

**Expected product fields:** `id`, `slug`, `nameBn`, `image` (emoji), `category`, `categoryNameBn`, `categoryIcon`, `unit`, `today`, `yesterday`, `lastWeek`, `lastMonth`, `change` (`dir`, `pct`), and `markets` (array of `market`, `division`, `min`, `max`). Market averages in the UI are calculated as the average of each market's min/max midpoint. This is labeled in the interface.

## 🗂 Directory structure

```text
app/
  page.jsx                     Homepage
  loading.jsx                  Home skeleton
  not-found.jsx                Custom 404 page
  category/[slug]/             Dynamic category + skeleton
  product/[slug]/              Secure product detail + skeleton
  signin/ signup/              Email and social sign-in forms
  profile/                     Protected user profile
    update/                    Protected name update
  api/auth/[...all]/route.js   Better Auth API handler
components/                    Shared header, ticker, cards, forms, tables
lib/
  api.js                       Server-side market API requests
  mongodb.js                   MongoDB client reuse
  auth.js / auth-client.js     Better Auth server/client
  format.js                    Bengali numbers, pricing, change and sorting
public/                        Hero image and logo
tests/                         Numeric-sorting and formatting tests
design/                        Original supplied Figma and Penpot designs + spec
```

## ✅ Checks and deployment

```bash
npm test    # Unit tests for price sorting, Bengali number parsing, market stats
npm run build
npm run start
```

**Deploy with Vercel:** push the project to **your own GitHub repository**, import it in Vercel, configure all needed environment variables under project settings (including `BETTER_AUTH_URL` for the exact HTTPS domain), and deploy. Add deployed Google/GitHub redirect URIs to their OAuth applications. Check `/`, `/category/chal`, `/product/<valid-slug>`, `/signin`, `/signup`, `/profile`, `/profile/update` and an invalid route, including after page refresh.

**Source validation:** JSX/JS files were syntax-checked; `npm test` passes. Dependencies were not installed and `npm run build` was **not run** in the handoff environment because npm registry/DNS was unavailable. Run the build and an end-to-end authentication test using **your own MongoDB and OAuth credentials before submitting**. A real deployed URL and a repository link cannot be filled in until you publish them.

## 📬 Submission

- Live Link: *(paste your deployed Vercel URL)*
- GitHub Repository Link: *(paste your own repo URL)*

The repo includes local Git history with multiple descriptive commits. This history does not push itself to GitHub; use `git remote add origin ...` and `git push -u origin main` after creating your own repository.

---
**BazarDor** · Built for educational use. Listed market prices depend on API source and market conditions.
