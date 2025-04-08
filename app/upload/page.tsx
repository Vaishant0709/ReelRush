"use client";

import VideoUploadForm from "../components/VideoUploadForm";

export default function VideoUploadPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8 flex items-center gap-3">
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-2 rounded-lg shadow-lg">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                className="w-6 h-6 text-white">
                <path d="M9.97 5.97a.75.75 0 011.06 0l3.25 3.25a.75.75 0 010 1.06l-3.25 3.25a.75.75 0 01-1.06-1.06l1.97-1.97H4.75a.75.75 0 010-1.5h7.19L9.97 7.03a.75.75 0 010-1.06z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold">
              Upload New <span className="bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">Reel</span>
            </h1>
          </div>
          
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 shadow-xl border border-purple-900/30">
            <VideoUploadForm />
          </div>
        </div>
      </div>
    </div>
  );
}
