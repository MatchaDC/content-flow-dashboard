# Content Flow - Social Media Dashboard

A real-time collaborative social media posting workflow dashboard powered by Firebase and React.

## Features

- ✨ Real-time collaboration with your team
- 📅 Content calendar and scheduling
- 🎯 Multi-platform support (Instagram, Twitter, LinkedIn, Facebook, TikTok)
- 🔄 Live updates across all team members
- 📊 Dashboard stats and upcoming posts overview

## Tech Stack

- **Frontend**: React 18 + Tailwind CSS
- **Backend**: Firebase Realtime Database
- **Hosting**: Vercel
- **Build Tool**: Vite

## Deployment Instructions

### Prerequisites
- GitHub account
- Vercel account (connected to GitHub)
- Firebase project with credentials

### Step 1: Push to GitHub

```bash
# Clone your GitHub repo
git clone https://github.com/YOUR_USERNAME/content-flow-dashboard.git
cd content-flow-dashboard

# Copy all files from this package into the cloned directory
# Then run:
git add .
git commit -m "Initial commit: Content Flow dashboard"
git push origin main
```

### Step 2: Deploy to Vercel

1. Go to https://vercel.com/dashboard
2. Click **"Add New..."** → **"Project"**
3. Select your `content-flow-dashboard` repository
4. Click **"Import"**
5. In **"Environment Variables"**, add these (they're already in your `.env` file):
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_DATABASE_URL`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`

6. Click **"Deploy"**
7. Wait 2-3 minutes for deployment to complete
8. You'll get a URL like `https://content-flow-dashboard.vercel.app`

### Step 3: Share with Your Team

Copy your Vercel URL and share it with your team. Everyone can access the dashboard and collaborate in real-time!

### Optional: Add to Your Carrd Website

1. In Carrd, add a new section
2. Use an "Embed" or "Button" block
3. Link to your Vercel dashboard URL
4. Or embed as an iframe if Carrd supports it

## Firebase Setup

Your Firebase Realtime Database is already configured with:
- Automatic authentication (anonymous sign-in)
- Real-time data synchronization
- Team collaboration enabled

**Note**: Currently in test mode. For production, configure proper security rules in Firebase Console.

## Local Development

```bash
npm install
npm run dev
```

Then open http://localhost:3000

## Environment Variables

The following environment variables are required:

```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_DATABASE_URL=your_database_url
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## Support

For issues or questions, check:
- Firebase Console for database errors
- Vercel Dashboard for deployment logs
- Browser console for error messages

## License

MIT
