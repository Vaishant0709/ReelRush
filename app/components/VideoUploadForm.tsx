"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";
import { Loader2, FileVideo, Type, AlignLeft } from "lucide-react";
import { useNotification } from "./Notifications";
import { apiClient } from "@/lib/api-clients";
import FileUpload from "./FileUpload";

interface VideoFormData {
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
}

export default function VideoUploadForm() {
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { showNotification } = useNotification();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<VideoFormData>({
    defaultValues: {
      title: "",
      description: "",
      videoUrl: "",
      thumbnailUrl: "",
    },
  });

  const handleUploadSuccess = (response: IKUploadResponse) => {
    setValue("videoUrl", response.filePath);
    setValue("thumbnailUrl", response.thumbnailUrl || response.filePath);
    showNotification("Video uploaded successfully!", "success");
  };

  const handleUploadProgress = (progress: number) => {
    setUploadProgress(progress);
  };

  const onSubmit = async (data: VideoFormData) => {
    if (!data.videoUrl) {
      showNotification("Please upload a video first", "error");
      return;
    }

    setLoading(true);
    try {
      await apiClient.createVideo(data);
      showNotification("Video published successfully!", "success");

      // Reset form after successful submission
      setValue("title", "");
      setValue("description", "");
      setValue("videoUrl", "");
      setValue("thumbnailUrl", "");
      setUploadProgress(0);
    } catch (error) {
      showNotification(
        error instanceof Error ? error.message : "Failed to publish video",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-white font-medium">
          <Type className="w-4 h-4 text-purple-400" />
          Title
        </label>
        <input
          type="text"
          className={`w-full px-4 py-3 bg-slate-900/50 border ${
            errors.title ? "border-red-500" : "border-purple-800/50"
          } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white`}
          placeholder="Give your reel a catchy title"
          {...register("title", { required: "Title is required" })}
        />
        {errors.title && (
          <span className="text-red-400 text-sm">
            {errors.title.message}
          </span>
        )}
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2 text-white font-medium">
          <AlignLeft className="w-4 h-4 text-purple-400" />
          Description
        </label>
        <textarea
          className={`w-full px-4 py-3 bg-slate-900/50 border ${
            errors.description ? "border-red-500" : "border-purple-800/50"
          } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white h-28 resize-none`}
          placeholder="Tell viewers about your reel"
          {...register("description", { required: "Description is required" })}
        />
        {errors.description && (
          <span className="text-red-400 text-sm">
            {errors.description.message}
          </span>
        )}
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2 text-white font-medium">
          <FileVideo className="w-4 h-4 text-purple-400" />
          Upload Video
        </label>
        <div className="border border-dashed border-purple-800/70 rounded-lg p-6 bg-slate-900/30">
          <FileUpload
            fileType="video"
            onSuccess={handleUploadSuccess}
            onProgress={handleUploadProgress}
          />
          {uploadProgress > 0 && (
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-purple-400">Uploading...</span>
                <span className="text-white">{uploadProgress}%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <button
        type="submit"
        className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
          loading || !uploadProgress
            ? "bg-slate-700 text-slate-400 cursor-not-allowed"
            : "bg-gradient-to-r from-purple-500 to-pink-600 text-white hover:opacity-90"
        }`}
        disabled={loading || !uploadProgress}
      >
        {loading ? (
          <div className="flex items-center justify-center gap-2">
            <Loader2 className="w-5 h-5 animate-spin" />
            Publishing Video...
          </div>
        ) : (
          "Publish Video"
        )}
      </button>
    </form>
  );
}
