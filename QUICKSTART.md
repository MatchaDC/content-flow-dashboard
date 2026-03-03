# 🚀 Content Flow - Quick Start Guide

## Your Dashboard is Ready to Deploy!

You have everything you need. Just 3 simple steps:

---

## Step 1: GitHub (2 minutes)
1. Go to https://github.com/new
2. Name it: `content-flow-dashboard`
3. Make it **PUBLIC**
4. Click "Create repository"

---

## Step 2: Upload Files (5 minutes)
1. Go to your new GitHub repo
2. Click **"Add file"** → **"Upload files"**
3. **Download all the files** from the outputs folder you received
4. **Drag & drop them** into GitHub
5. Click **"Commit changes"**

### Files to upload:
```
package.json
vite.config.js
tailwind.config.js
postcss.config.js
vercel.json
index.html
README.md
DEPLOYMENT_CHECKLIST.md
src/ (entire folder)
.gitignore
```

---

## Step 3: Deploy to Vercel (3 minutes)
1. Go to https://vercel.com/dashboard
2. Click **"Add New..."** → **"Project"**
3. Select your `content-flow-dashboard` repo
4. Click **"Import"**
5. In **Environment Variables**, paste these (copy the whole block):

```
VITE_FIREBASE_API_KEY=AIzaSyDsgwP6x__AHayWBBBgxS8iUsfTY0l8mLo
VITE_FIREBASE_AUTH_DOMAIN=social-workflow-6c28a.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=https://social-workflow-6c28a-default-rtdb.europe-west1.firebasedatabase.app
VITE_FIREBASE_PROJECT_ID=social-workflow-6c28a
VITE_FIREBASE_STORAGE_BUCKET=social-workflow-6c28a.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=826478539837
VITE_FIREBASE_APP_ID=1:826478539837:web:7ed951684f4a66948d2654
```

6. Click **"Deploy"**
7. **Wait 2-3 minutes**

---

## ✅ Done!

You'll get a URL like: `https://content-flow-dashboard.vercel.app`

**Copy this URL and share with your team!** 

Everyone can now:
- ✨ Create and manage posts in real-time
- 📅 Schedule across multiple platforms
- 🔄 See changes instantly (no refresh needed!)
- 👥 Collaborate as a team

---

## Optional: Add to Your Carrd Website

In your Carrd editor:
1. Add a **Button** or **Embed** block
2. Link to your Vercel URL
3. Publish

---

## Need Help?

- **GitHub Issue**: Check you made the repo PUBLIC
- **Vercel Issue**: Check environment variables are entered correctly
- **Firebase Issue**: Check credentials in Vercel match your Firebase project

---

## 🎉 You're all set!

Your real-time social media dashboard is ready to transform how your team manages content.
