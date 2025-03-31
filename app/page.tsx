"use client"
import { apiClient } from "@/lib/api-clients";
import { IVideo } from "@/models/Video";
import Image from "next/image";
import { useEffect,useState } from "react";

export default function Home() {
  

  const [videos,setVideos] = useState<IVideo[]>([])

  useEffect(()=>{
    const fetchVideos=async () =>{
      try {
        const data=await apiClient.getVideo()
        setVideos(data)
      } catch (error) {
        console.log(`ERROR :: FETCHING VIDEOS :: ${error}`);
        
      }

    }
    fetchVideos()
  },[])
  
  return (
    <div>
      <h1>ReelRush</h1>
    </div>

  );
}
