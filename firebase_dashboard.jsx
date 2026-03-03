import React, { useState, useEffect } from 'react';
import { Calendar, Plus, Trash2, CheckCircle2, Clock, Send, TrendingUp, LogOut } from 'lucide-react';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js';
import { getDatabase, ref, push, remove, update, onValue } from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js';

export default function FirebaseDashboard() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: '', platforms: [], date: '', content: '' });
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [teamMember, setTeamMember] = useState('');

  const platforms = ['Instagram', 'Twitter', 'LinkedIn', 'Facebook', 'TikTok'];

  // Firebase Configuration - USER WILL FILL THIS IN
  const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'YOUR_API_KEY',
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'YOUR_PROJECT.firebaseapp.com',
    databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || 'https://YOUR_PROJECT.firebaseio.com',
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'YOUR_PROJECT_ID',
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'YOUR_PROJECT.appspot.com',
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || 'YOUR_SENDER_ID',
    appId: import.meta.env.VITE_FIREBASE_APP_ID || 'YOUR_APP_ID'
  };

  useEffect(() => {
    try {
      const app = initializeApp(firebaseConfig);
      const auth = getAuth(app);
      const database = getDatabase(app);

      // Sign in anonymously
      signInAnonymously(auth)
        .then(() => {
          onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
              setUser(currentUser);
              setTeamMember(`User-${currentUser.uid.slice(0, 6)}`);
              
              // Listen to posts in real-time
              const postsRef = ref(database, 'posts');
              onValue(postsRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                  const postsList = Object.entries(data).map(([key, value]) => ({
                    id: key,
                    ...value
                  }));
                  setPosts(postsList.sort((a, b) => new Date(b.date) - new Date(a.date)));
                }
                setLoading(false);
              });
            }
          });
        })
        .catch((err) => {
          setError(`Firebase connection error: ${err.message}`);
          setLoading(false);
        });
    } catch (err) {
      setError(`Firebase setup error: ${err.message}`);
      setLoading(false);
    }
  }, []);

  const addPost = async () => {
    if (!newPost.title || selectedPlatforms.length === 0 || !newPost.date || !user) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const app = initializeApp(firebaseConfig);
      const database = getDatabase(app);
      const postsRef = ref(database, 'posts');

      await push(postsRef, {
        title: newPost.title,
        platforms: selectedPlatforms,
        date: newPost.date,
        status: 'draft',
        content: newPost.content,
        createdBy: teamMember,
        createdAt: new Date().toISOString(),
      });

      setNewPost({ title: '', platforms: [], date: '', content: '' });
      setSelectedPlatforms([]);
    } catch (err) {
      alert(`Error adding post: ${err.message}`);
    }
  };

  const deletePost = async (id) => {
    try {
      const app = initializeApp(firebaseConfig);
      const database = getDatabase(app);
      await remove(ref(database, `posts/${id}`));
    } catch (err) {
      alert(`Error deleting post: ${err.message}`);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const app = initializeApp(firebaseConfig);
      const database = getDatabase(app);
      await update(ref(database, `posts/${id}`), { status });
    } catch (err) {
      alert(`Error updating post: ${err.message}`);
    }
  };

  const togglePlatform = (platform) => {
    setSelectedPlatforms(prev =>
      prev.includes(platform) ? prev.filter(p => p !== platform) : [...prev, platform]
    );
  };

  const stats = {
    total: posts.length,
    scheduled: posts.filter(p => p.status === 'scheduled').length,
    draft: posts.filter(p => p.status === 'draft').length,
  };

  const upcomingPosts = posts
    .filter(p => p.status === 'scheduled')
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 3);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-purple-500 border-opacity-50"></div>
          <p className="text-purple-300 mt-4 font-mono">Connecting to Firebase...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8 flex items-center justify-center">
        <div className="bg-red-900 bg-opacity-30 border border-red-500 rounded-lg p-6 max-w-md">
          <h2 className="text-red-300 font-bold mb-2">Firebase Connection Error</h2>
          <p className="text-red-200 text-sm mb-4">{error}</p>
          <p className="text-red-200 text-xs">Make sure your Firebase credentials are correctly configured.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Space+Mono:wght@400;700&display=swap');

        * {
          font-family: 'Space Mono', monospace;
        }

        .serif-display {
          font-family: 'Instrument Serif', serif;
        }

        .gradient-text {
          background: linear-gradient(135deg, #a78bfa 0%, #60a5fa 50%, #34d399 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .card-glow {
          box-shadow: 0 0 20px rgba(167, 139, 250, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }

        .platform-badge {
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .platform-badge:hover {
          transform: scale(1.05);
        }

        .input-field {
          background: rgba(15, 23, 42, 0.5);
          border: 1px solid rgba(167, 139, 250, 0.3);
          transition: all 0.3s ease;
        }

        .input-field:focus {
          border-color: #a78bfa;
          box-shadow: 0 0 15px rgba(167, 139, 250, 0.4);
        }
      `}</style>

      <div className="max-w-6xl mx-auto">
        {/* Header with Team Member Info */}
        <div className="mb-12 flex justify-between items-end">
          <div>
            <h1 className="serif-display text-5xl font-bold text-white mb-2">Content Flow</h1>
            <p className="text-purple-300 text-lg">Real-time collaborative social media workflow</p>
          </div>
          <div className="text-right">
            <p className="text-purple-300 text-sm font-mono">Connected as:</p>
            <p className="text-cyan-300 font-mono font-bold">{teamMember}</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4 mb-12">
          {[
            { label: 'Total Posts', value: stats.total, icon: TrendingUp, color: 'from-blue-500 to-cyan-500' },
            { label: 'Scheduled', value: stats.scheduled, icon: Calendar, color: 'from-purple-500 to-pink-500' },
            { label: 'Drafts', value: stats.draft, icon: Clock, color: 'from-amber-500 to-orange-500' },
          ].map((stat, i) => (
            <div key={i} className={`bg-gradient-to-br ${stat.color} p-0.5 rounded-lg card-glow`}>
              <div className="bg-slate-900 rounded-lg p-6 h-full">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-300 text-sm font-mono mb-1">{stat.label}</p>
                    <p className="text-4xl font-bold gradient-text">{stat.value}</p>
                  </div>
                  <stat.icon size={32} className="text-purple-400 opacity-50" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-8">
          {/* New Post Form */}
          <div className="col-span-1 card-glow bg-gradient-to-b from-slate-800 to-slate-900 rounded-lg p-6 border border-purple-500 border-opacity-30">
            <h2 className="serif-display text-2xl font-bold text-white mb-6">New Post</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-purple-300 text-sm mb-2 font-mono">Title</label>
                <input
                  type="text"
                  value={newPost.title}
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  className="input-field w-full px-4 py-2 rounded-lg text-white placeholder-gray-500 focus:outline-none"
                  placeholder="Post title"
                />
              </div>

              <div>
                <label className="block text-purple-300 text-sm mb-2 font-mono">Platforms</label>
                <div className="grid grid-cols-2 gap-2">
                  {platforms.map(platform => (
                    <button
                      key={platform}
                      onClick={() => togglePlatform(platform)}
                      className={`platform-badge px-3 py-2 rounded-lg text-xs font-mono transition-all ${
                        selectedPlatforms.includes(platform)
                          ? 'bg-purple-600 text-white border border-purple-400'
                          : 'bg-slate-700 text-gray-400 border border-slate-600'
                      }`}
                    >
                      {platform}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-purple-300 text-sm mb-2 font-mono">Publish Date</label>
                <input
                  type="date"
                  value={newPost.date}
                  onChange={(e) => setNewPost({ ...newPost, date: e.target.value })}
                  className="input-field w-full px-4 py-2 rounded-lg text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-purple-300 text-sm mb-2 font-mono">Content Preview</label>
                <textarea
                  value={newPost.content}
                  onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                  className="input-field w-full px-4 py-2 rounded-lg text-white placeholder-gray-500 focus:outline-none resize-none h-24"
                  placeholder="What's your post about?"
                />
              </div>

              <button
                onClick={addPost}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-mono py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-all transform hover:scale-105"
              >
                <Plus size={18} /> Add Post
              </button>
            </div>
          </div>

          {/* Upcoming Posts & Posts List */}
          <div className="col-span-2 space-y-8">
            {/* Upcoming */}
            {upcomingPosts.length > 0 && (
              <div className="card-glow bg-gradient-to-b from-slate-800 to-slate-900 rounded-lg p-6 border border-cyan-500 border-opacity-20">
                <h3 className="serif-display text-xl font-bold text-cyan-300 mb-4">📅 Upcoming</h3>
                <div className="space-y-3">
                  {upcomingPosts.map(post => (
                    <div key={post.id} className="bg-slate-700 bg-opacity-40 rounded-lg p-4 border-l-2 border-cyan-400">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="text-white font-mono font-bold">{post.title}</h4>
                          <p className="text-gray-400 text-xs mt-1">by {post.createdBy}</p>
                        </div>
                        <span className="text-cyan-300 text-sm font-mono">{new Date(post.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        {post.platforms.map(p => (
                          <span key={p} className="text-xs bg-cyan-900 bg-opacity-40 text-cyan-300 px-2 py-1 rounded border border-cyan-700 border-opacity-50">
                            {p}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* All Posts */}
            <div className="card-glow bg-gradient-to-b from-slate-800 to-slate-900 rounded-lg p-6 border border-purple-500 border-opacity-30">
              <h3 className="serif-display text-xl font-bold text-white mb-4">Content Calendar</h3>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {posts.length === 0 ? (
                  <p className="text-gray-400 text-center py-8 font-mono">No posts yet. Create one to get started!</p>
                ) : (
                  posts.map(post => (
                    <div
                      key={post.id}
                      className={`rounded-lg p-4 border transition-all ${
                        post.status === 'scheduled'
                          ? 'bg-gradient-to-r from-green-900 to-green-800 border-green-500 border-opacity-40'
                          : 'bg-slate-700 bg-opacity-40 border-slate-600'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="text-white font-mono font-bold">{post.title}</h4>
                          <p className="text-gray-300 text-sm mt-1">{post.content}</p>
                          <p className="text-gray-400 text-xs mt-2">Added by {post.createdBy}</p>
                        </div>
                        <button
                          onClick={() => deletePost(post.id)}
                          className="ml-4 text-gray-400 hover:text-red-400 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex gap-2 flex-wrap">
                          {post.platforms.map(p => (
                            <span key={p} className="text-xs bg-slate-700 bg-opacity-60 text-purple-300 px-2 py-1 rounded font-mono border border-purple-500 border-opacity-30">
                              {p}
                            </span>
                          ))}
                        </div>
                        <span className="text-gray-400 text-sm font-mono">{new Date(post.date).toLocaleDateString()}</span>
                      </div>

                      {post.status === 'draft' && (
                        <div className="mt-3 flex gap-2">
                          <button
                            onClick={() => updateStatus(post.id, 'scheduled')}
                            className="text-xs bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white px-3 py-1 rounded flex items-center gap-1 transition-all"
                          >
                            <Send size={14} /> Schedule
                          </button>
                          <button
                            onClick={() => updateStatus(post.id, 'published')}
                            className="text-xs bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white px-3 py-1 rounded flex items-center gap-1 transition-all"
                          >
                            <CheckCircle2 size={14} /> Publish
                          </button>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}