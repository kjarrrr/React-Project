import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../config/firebase";
import { VideoExplore } from "../components/VideoExplore";
import { VideoHome } from "../components/VideoHome";
export function Explore() {
    const [videos, setVideos] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState(null);

    useEffect(() => {
        const videosRef = ref(db, 'videos');
        const unsubscribe = onValue(videosRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const validVideos = Object.values(data)
                    .filter(vid => vid && vid.url && vid.url.trim() !== "")
                    .reverse();
                setVideos(validVideos);
            }
        });
        return () => unsubscribe();
    }, []);

    if (selectedVideo) {
        return (
            <div className="relative top-8 h-screen w-100 rounded-full">
                <button
                    onClick={() => setSelectedVideo(null)}
                    className="absolute top-10 left-5 z-50 bg-white/20 hover:bg-white/40 text-white px-4 py-2 rounded-full transition"
                >
                    ✕ Cerrar
                </button>

                <VideoHome video={selectedVideo} />
            </div>
        );
    }

    return (
        <main className="flex justify-center items-center">
            <div className="exploreContainer grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {videos.map((video) => (
                    <VideoExplore
                        key={video.id}
                        video={video}
                        onSelect={(vid) => setSelectedVideo(vid)} 
                    />
                ))}
            </div>
        </main>
    );
}