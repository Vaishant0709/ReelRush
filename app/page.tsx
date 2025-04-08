"use client";

import React, { useEffect, useState } from "react";
import VideoFeed from "./components/VideoFeed";
import { IVideo } from "@/models/Video";
import { apiClient } from "@/lib/api-clients";
import { useSession } from "next-auth/react";
import Link from "next/link";
export default function Home() {
  const [videos, setVideos] = useState<IVideo[]>([]);
  const { data: session } = useSession();
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await apiClient.getVideos();
        setVideos(data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []);

  return (
    session ? (
      <main className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 text-white">
        <div className="container mx-auto px-4 py-8">
          {/* <div className="flex items-center gap-3 mb-10">
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-2 rounded-lg shadow-lg">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                className="w-6 h-6 text-white">
                <path d="M4 2.69127C4 1.93067 4.81547 1.44851 5.48192 1.81506L22.4069 11.1238C23.0977 11.5037 23.0977 12.4963 22.4069 12.8762L5.48192 22.1849C4.81546 22.5515 4 22.0693 4 21.3087V2.69127Z" />
              </svg>
            </div>
            
          </div> */}

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-purple-900/30">
            <VideoFeed videos={videos} />
          </div>
        </div>
      </main>
    ) : (
      <main className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 text-white flex items-center justify-center px-4 py-12">
    <div className="text-center">
      <div className="flex items-center justify-center gap-3 mb-6">
        <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-2 rounded-lg shadow-lg">
          
        </div>
        <h1 className="text-3xl font-bold">
          Please{" "}
          <span className="bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
            Log In
          </span>{" "}
          to Continue
        </h1>
      </div>
      <p className="text-slate-300 mb-6">
        You need to log in to access this page and view your reels.
      </p>
      <Link
        href="/login"
        className="inline-block py-3 px-6 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-medium rounded-lg transition-all duration-200 hover:opacity-90"
      >
        Log In
      </Link>
    </div>
  </main>
    )
  );
}
