# 🛒 বাজার দর | BazarDor

### Daily Essential Goods Price Tracker for Bangladesh

**বাজার দর — নিত্যপ্রয়োজনীয় পণ্যের দাম এক নজরে।**

BazarDor is a modern, responsive, Bengali-first grocery price tracking web application built with **Next.js, Tailwind CSS, MongoDB, and Better Auth**.

The application allows users to explore essential grocery products, monitor price increases and decreases, browse products by category, compare prices across different markets, and securely access detailed product information.

It also provides authentication through **Email/Password, Google, and GitHub**, along with profile management and account linking.

This project was developed as part of **Programming Hero — Batch 14, Assignment 07**.

---

## 🌐 Live Website & Repository

**Live Website:** [Visit BazarDor](https://bazar-dor-mongo-db.vercel.app)

**GitHub Repository:** [BazarDor-MongoDB](https://github.com/Amiruddinjoy100/BazarDor-MongoDB)

**Developer:** [Amiruddinjoy100](https://github.com/Amiruddinjoy100)

---

## ✨ Key Features

### 1. 🏠 Responsive Homepage

- Modern, Bengali-first user interface.
- Attractive hero section with heading, subtitle, and CTA button.
- Smooth navigation to the All Products section.
- Responsive layout for mobile, tablet, and desktop.
- Product information presented through reusable cards.

### 2. 📈 Daily Price Increase and Decrease

- Displays the top 6 products with the highest price increases.
- Displays the top 6 products with the highest price decreases.
- Percentage changes shown with visual indicators.
- Clearly distinguishes rising, falling, and unchanged prices.
- Price information is retrieved from the product API.

### 3. 📢 Infinite Price Ticker

- Continuous scrolling ticker displaying essential product prices.
- Shows product emoji, Bengali name, unit, price, and percentage change.
- Provides quick visibility into market price movements.

### 4. 🛍️ Product Browsing

- Fetches product information from an external REST API.
- Displays product emoji, name, unit, and price.
- Bengali number and currency formatting.
- Responsive product cards.
- Clickable cards for navigating to product details.

### 5. 📂 Category-Based Product Filtering

Users can browse products by category, including:

- 🍚 চাল (Rice)
- 🫘 ডাল (Lentils)
- 🛢️ তেল (Oil)
- 🥬 সবজি (Vegetables)
- 🐟 মাছ (Fish)
- 🍗 মাংস (Meat)
- 🥛 ডিম-দুধ (Eggs & Milk)
- 🌶️ মসলা (Spices)

Category pages include dynamic routing, active navigation highlighting, loading states, and empty-state handling.

### 6. 🔃 Product Price Sorting

Products can be sorted using three options:

- Default sorting
- Price: Low to High
- Price: High to Low

Sorting supports Bengali numerals and uses numerical values rather than alphabetical string comparison.

### 7. 📊 Detailed Product Information

Each product has a dedicated details page.

The page includes:

- Product name and category
- Product description and unit
- Current price
- Minimum price
- Maximum price
- Average price
- Price comparison across markets
- Historical price information where available

Product details are protected and require user authentication.

### 8. 🔐 Secure User Authentication

Authentication is implemented using **Better Auth with MongoDB**.

Supported methods:

- Email and Password Registration
- Email and Password Login
- Google OAuth Login
- GitHub OAuth Login
- Sign Out
- Session Persistence
- Protected Routes

Authentication information is stored in MongoDB.

### 9. 🔗 Social Account Linking

BazarDor supports linking social accounts to an existing user account.

Features include:

- Link a Google account to an existing account.
- Authenticate using multiple supported methods.
- Associate linked credentials with the same user ID.
- Maintain the existing user profile after successful linking.

### 10. 👤 User Profile Management

Authenticated users can:

- View their profile information.
- View their name and email.
- Update their display name.
- Access protected account features.
- Sign out securely.

User information is updated through Better Auth.

### 11. 🔔 Notifications and Loading States

- Authentication success and error notifications.
- Form validation feedback.
- Toast notifications using React Hot Toast.
- Skeleton loading animations.
- Friendly error and empty-state messages.

### 12. 📱 Fully Responsive Design

- Mobile-friendly navigation.
- Responsive hero section.
- Adaptive product grids.
- Flexible layouts across screen sizes.
- Consistent Bengali typography and UI styling.

---

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| Next.js 16 | Full-stack React framework |
| React 19 | Component-based user interface |
| JavaScript / JSX | Application development |
| Next.js App Router | Routing and page navigation |
| Tailwind CSS 4 | Styling and responsive design |
| MongoDB Atlas | Cloud database |
| Better Auth | Authentication and sessions |
| Better Auth MongoDB Adapter | Database integration |
| Google OAuth 2.0 | Google authentication |
| GitHub OAuth | GitHub authentication |
| Lucide React | Icons |
| React Hot Toast | Notifications |
| REST API | Product and market data |
| Vercel | Deployment and hosting |
| Git & GitHub | Version control |

---

## 📁 Project Structure

```text
BazarDor-MongoDB/
│
├── app/
│   ├── page.jsx
│   ├── layout.jsx
│   ├── loading.jsx
│   ├── not-found.jsx
│   │
│   ├── category/
│   │   └── [slug]/
│   │
│   ├── product/
│   │   └── [slug]/
│   │
│   ├── signin/
│   ├── signup/
│   │
│   ├── profile/
│   │   ├── page.jsx
│   │   └── update/
│   │
│   └── api/
│       └── auth/
│           └── [...all]/
│
├── components/
│   └── Reusable UI Components
│
├── lib/
│   ├── api.js
│   ├── auth.js
│   ├── auth-client.js
│   ├── mongodb.js
│   └── format.js
│
├── public/
│   └── Static Assets
│
├── tests/
│   └── Formatting and Sorting Tests
│
├── design/
│   └── Design References
│
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── next.config.mjs
└── README.md
```

---

## 🚀 Installation and Local Setup

Follow these steps to run the project locally.

### Prerequisites

Make sure the following are available:

- Node.js 20.9 or higher
- npm
- Git
- MongoDB Atlas account or a local MongoDB server
- Google and GitHub OAuth credentials for social login

### Step 1: Clone the Repository

```bash
git clone https://github.com/Amiruddinjoy100/BazarDor-MongoDB.git
```

### Step 2: Navigate to the Project

```bash
cd BazarDor-MongoDB
```

### Step 3: Install Dependencies

```bash
npm install
```

### Step 4: Create Environment Variables

Create a `.env.local` file in the project root.

You can copy the `.env.example` file.

On Windows PowerShell:

```powershell
Copy-Item .env.example .env.local
```

Update `.env.local` with your credentials:

```dotenv
# Product API
BAZARDOR_API_URL=https://api.abcz.workers.dev/api/bazardor

# MongoDB
MONGODB_URI=YOUR_MONGODB_CONNECTION_STRING
MONGODB_DB=bazardor

# Better Auth
BETTER_AUTH_SECRET=YOUR_SECURE_RANDOM_SECRET
BETTER_AUTH_URL=http://localhost:3000

# Google OAuth
GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET

# GitHub OAuth
GITHUB_CLIENT_ID=YOUR_GITHUB_CLIENT_ID
GITHUB_CLIENT_SECRET=YOUR_GITHUB_CLIENT_SECRET
```

Replace all placeholder values with your actual configuration.

**Important:** Never upload `.env.local` to GitHub or expose database passwords and OAuth client secrets publicly.

### Step 5: Start the Development Server

```bash
npm run dev
```

Open your browser and visit:

http://localhost:3000

---

## 🗄️ MongoDB Database Configuration

This project uses MongoDB for storing authentication-related information.

### MongoDB Setup

1. Create a MongoDB Atlas project and cluster.
2. Create a database user with appropriate permissions.
3. Configure network access.
4. Copy the MongoDB connection string.
5. Add the connection string to `MONGODB_URI`.
6. Set `MONGODB_DB=bazardor`.
7. Start the application.

Better Auth automatically manages the required authentication collections, including users, accounts, and sessions.

**Database:** `bazardor`

**Database Adapter:** `@better-auth/mongo-adapter`

No PostgreSQL, Prisma, or SQL database is required.

---

## 🔑 Google & GitHub Authentication Setup

### Google OAuth

1. Open [Google Cloud Console](https://console.cloud.google.com/).
2. Create or select a Google Cloud project.
3. Configure Google Auth Platform.
4. Create an OAuth Client ID using the Web Application type.
5. Add the authorized JavaScript origins and redirect URIs.
6. Copy the Client ID and Client Secret into `.env.local`.

**Local Redirect URI:**

```text
http://localhost:3000/api/auth/callback/google
```

**Production Redirect URI:**

```text
https://bazar-dor-mongo-db.vercel.app/api/auth/callback/google
```

Configure the matching origins for local and production environments.

### GitHub OAuth

1. Open [GitHub Developer Settings](https://github.com/settings/developers).
2. Navigate to OAuth Apps.
3. Create a new OAuth application.
4. Configure the application homepage and redirect URIs.
5. Generate a Client Secret.
6. Add the GitHub Client ID and Secret to `.env.local`.

**Local Redirect URI:**

```text
http://localhost:3000/api/auth/callback/github
```

**Production Redirect URI:**

```text
https://bazar-dor-mongo-db.vercel.app/api/auth/callback/github
```

GitHub Login uses Better Auth to authenticate users and manage their sessions.

---

## 📡 Product API

BazarDor retrieves grocery product data from an external REST API.

**API Base URL:**

```text
https://api.abcz.workers.dev/api/bazardor
```

### Available Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/products` | Retrieve all products |
| GET | `/products?category=chal` | Filter products by category |
| GET | `/products/1` | Retrieve a single product |
| GET | `/categories` | Retrieve available categories |
| GET | `/categories/chal` | Retrieve a specific category |

The application uses API response data to display grocery prices, categories, price changes, and market comparisons.

Product information depends on the availability and accuracy of the external API.

---

## 🛡️ Protected Routes

Some routes require an authenticated user.

| Route | Access |
|---|---|
| `/` | Public |
| `/category/[slug]` | Public |
| `/signin` | Public |
| `/signup` | Public |
| `/product/[slug]` | Login Required |
| `/profile` | Login Required |
| `/profile/update` | Login Required |

Unauthenticated users attempting to access protected pages are redirected to the sign-in page.

Session management is handled by Better Auth.

---

## 🧪 Testing

The project includes automated tests for formatting and sorting utilities.

Run tests using:

```bash
npm test
```

To check the production build locally:

```bash
npm run build
```

To start the production server after building:

```bash
npm run start
```

### Manual Testing

The application can also be tested by checking:

- Product cards and category navigation.
- Price sorting with Bengali numbers.
- Product details and protected-route redirects.
- Email/Password registration and login.
- Google and GitHub OAuth.
- Session persistence after page refresh.
- Profile name updates.
- Responsive layout across multiple screen sizes.
- Invalid routes and error handling.

---

## ☁️ Deployment

The application is deployed on **Vercel**.

### Deployment Steps

1. Push the project to GitHub.
2. Sign in to [Vercel](https://vercel.com/).
3. Import the GitHub repository.
4. Choose Next.js as the framework.
5. Configure the required environment variables.
6. Set `BETTER_AUTH_URL` to the production domain.
7. Configure production callbacks in Google and GitHub OAuth settings.
8. Deploy or redeploy the application.

### Required Vercel Environment Variables

```text
MONGODB_URI
MONGODB_DB
BETTER_AUTH_SECRET
BETTER_AUTH_URL
BAZARDOR_API_URL
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET
GITHUB_CLIENT_ID
GITHUB_CLIENT_SECRET
```

**Production URL:**

https://bazar-dor-mongo-db.vercel.app

Vercel connects to the GitHub repository and can automatically deploy new changes pushed to the configured production branch.

---

## 🎯 Assignment Requirements Covered

| Requirement | Implementation |
|---|---|
| Responsive Navbar | ✅ Implemented |
| Hero Section | ✅ Implemented |
| Infinite Price Ticker | ✅ Implemented |
| Top Price Risers | ✅ Implemented |
| Top Price Fallers | ✅ Implemented |
| All Products Section | ✅ Implemented |
| Dynamic Product Details | ✅ Implemented |
| Category Filtering | ✅ Implemented |
| Price Sorting | ✅ Implemented |
| Email/Password Authentication | ✅ Implemented |
| Google Authentication | ✅ Implemented |
| GitHub Authentication | ✅ Implemented |
| MongoDB Integration | ✅ Implemented |
| Protected Routes | ✅ Implemented |
| Profile Update | ✅ Implemented |
| Loading Skeletons | ✅ Implemented |
| Toast Notifications | ✅ Implemented |
| Custom 404 Page | ✅ Implemented |
| Responsive Design | ✅ Implemented |
| Meaningful Git Commits | ✅ 8+ Commits |
| GitHub Repository | ✅ Available |
| Vercel Deployment | ✅ Deployed |

---

## 🌟 Future Improvements

Potential enhancements include:

- Product search functionality.
- Product watchlists and favorites.
- Price history charts.
- User-defined price alerts.
- Market comparison filters.
- Additional districts and locations.
- Improved accessibility and UI personalization.
- Advanced market price analytics.

---

## 📌 Important Notes

- Grocery prices are obtained from an external API.
- Prices may vary across markets and change over time.
- API availability may affect the displayed information.
- Product prices are informational and should not be treated as guaranteed live market quotations.
- MongoDB credentials and authentication secrets must be kept private.
- Social login requires correctly configured OAuth applications and callback URLs.

---

## 👨‍💻 Developer

**Developed by Amir Uddin Joy**

GitHub: [@Amiruddinjoy100](https://github.com/Amiruddinjoy100)

Project: [BazarDor-MongoDB](https://github.com/Amiruddinjoy100/BazarDor-MongoDB)

Live Website: [BazarDor](https://bazar-dor-mongo-db.vercel.app)

---

## 📚 Acknowledgements

- Programming Hero — Batch 14, Assignment 07
- Next.js and React
- MongoDB Atlas
- Better Auth
- Tailwind CSS
- Google and GitHub OAuth
- Vercel

Developed for educational and learning purposes.

---

### 🛒 BazarDor — Know the Price, Shop Smarter.

**বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।**

⭐ If you find this project useful, consider starring the GitHub repository.
