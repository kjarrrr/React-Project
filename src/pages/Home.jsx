import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../config/firebase";
import { VideoHome } from "../components/VideoHome";

export function Home() {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const videosRef = ref(db, 'videos');

        // Escuchamos la base de datos
        const unsubscribe = onValue(videosRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                // Convertimos el objeto de Firebase en una lista y la invertimos (más nuevo primero)
                const list = Object.values(data).reverse();
                setVideos(list);
            }
        });

        return () => unsubscribe();
    }, []);
    return (
        <main className="flex justify-center items-center h-screen">
            <div className="videoFeed"> {/* El contenedor con el snap-type */}
                {HomeStamp.map((vid) => (
                    <VideoHome key={vid.id} video={vid} />
                ))}
            </div>
        </main>
    );
}