import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../config/firebase";
import { VideoHome } from "../components/VideoHome";

export function Home() {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const videosRef = ref(db, 'videos');
        const unsubscribe = onValue(videosRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                // Convertimos a array y FILTRAMOS los que no tengan URL
                const validVideos = Object.values(data)
                    .filter(vid => vid && vid.url && vid.url.trim() !== "")
                    .reverse();

                setVideos(validVideos);
            } else {
                setVideos([]);
            }
        });
        return () => unsubscribe();
    }, []);
    return (
        <main className="flex justify-center items-center h-screen">
            <div className="videoFeed"> {/* El contenedor con el snap-type */}
                {videos.map((vid) => (
                    <VideoHome key={vid.id} video={vid} />
                ))}
            </div>
        </main>
    );
}