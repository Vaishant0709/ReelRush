"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Home, User, Upload, LogOut } from "lucide-react";
import { useNotification } from "./Notifications";

export default function Header() {
  const { data: session } = useSession();
  const { showNotification } = useNotification();
  console.log(session);

  const handleSignOut = async () => {
    try {
      await signOut();
      showNotification("Signed out successfully", "success");
    } catch {
      showNotification("Failed to sign out", "error");
    }
  };

  return (
    <div className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-md border-b border-purple-900/20 shadow-lg">
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-16 px-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-bold transition-all hover:opacity-80"
            prefetch={true}
            onClick={() =>
              showNotification("Welcome to ReelRush", "info")
            }
          >
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-1.5 rounded-md">
              <Home className="w-4 h-4 text-white" />
            </div>
            <span className="bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">Reel</span>
            <span className="text-white">Rush</span>
          </Link>

          <div className="relative group">
            <button 
              className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-white transition-colors border border-purple-800/30"
              aria-label="User menu"
            >
              <User className="w-5 h-5" />
            </button>
            
            <div className="absolute right-0 mt-2 w-64 origin-top-right rounded-xl bg-slate-800 shadow-xl border border-purple-800/40 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              {session ? (
                <div className="py-2">
                  <div className="px-4 py-3 border-b border-slate-700">
                    <p className="text-sm text-slate-400">Signed in as</p>
                    <p className="text-sm font-medium text-white truncate">
                      {session.user?.email}
                    </p>
                  </div>
                  
                  <Link
                    href="/upload"
                    className="flex items-center gap-2 px-4 py-2.5 text-white hover:bg-slate-700 w-full text-left"
                    onClick={() =>
                      showNotification("Welcome to Upload Dashboard", "info")
                    }
                  >
                    <Upload className="w-4 h-4" />
                    <span>Upload Video</span>
                  </Link>
                  
                  <button
                    onClick={handleSignOut}
                    className="flex items-center gap-2 px-4 py-2.5 text-red-400 hover:bg-slate-700 w-full text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="flex items-center gap-2 px-4 py-3 text-white hover:bg-slate-700 rounded-xl w-full"
                  onClick={() =>
                    showNotification("Please sign in to continue", "info")
                  }
                >
                  <span>Login to Your Account</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
