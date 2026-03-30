import { useEffect, useRef, useState } from "react";

export function VideoHome({ video }) {
    const videoRef = useRef(null);
    const baseUrl = import.meta.env.BASE_URL;

    // --- ESTADOS LOCALES ---
    // Iniciamos con los likes que vengan del objeto video (o 0)
    const [likes, setLikes] = useState(video.likes || 0);
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        videoRef.current.play();
                    } else {
                        videoRef.current.pause();
                        videoRef.current.currentTime = 0;
                    }
                });
            },
            { threshold: 0.6 }
        );

        if (videoRef.current) observer.observe(videoRef.current);
        return () => { if (videoRef.current) observer.unobserve(videoRef.current); };
    }, []);

    // --- FUNCIÓN DE LIKE (SIN ASYNC) ---
    const toggleLike = () => {
        if (isLiked) {
            setLikes(likes - 1); // Quitar like
        } else {
            setLikes(likes + 1); // Dar like
        }
        setIsLiked(!isLiked); // Cambiar el estado visual
    };

    return (
        <section className="videoSection">
            <video
                ref={videoRef}
                className="videoPlayer"
                loop
                onClick={(e) => e.target.paused ? e.target.play() : e.target.pause()}
                src={`${baseUrl}${video.url}`}
            />

            <div className="videoOverlay-info">
                <h3 className="font-bold text-lg">@{video.user}</h3>
                <p className="text-sm my-2">{video.description}</p>
                <div className="flex items-center gap-2 text-xs opacity-80 italic">
                    <span className="text-lg">🎵</span>
                    <p>{video.song}</p>
                </div>
            </div>

            <div className="videoOverlay-actions">
                <div className="flex flex-col items-center gap-4">
                    
                    {/* CONTENEDOR DE LIKE */}
                    <div className="flex flex-col items-center">
                        <button 
                            onClick={toggleLike}
                            className={`actionBtn transition-all ${isLiked ? 'text-red-500 scale-110' : 'text-white'}`}
                        >
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                            </svg>
                        </button>
                        <span className="text-xs font-bold shadow-sm">{likes}</span>
                    </div>

                    <button className="actionBtn hover:bg-blue-500">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="currentColor" width="24" height="24"><path fill-rule="evenodd" d="M2 21.5c0-10.22 9.88-18 22-18s22 7.78 22 18c0 5.63-3.19 10.74-7.32 14.8a43.6 43.6 0 0 1-14.14 9.1A1.5 1.5 0 0 1 22.5 44v-5.04C11.13 38.4 2 31.34 2 21.5M14 25a3 3 0 1 0 0-6 3 3 0 0 0 0 6m10 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6m13-3a3 3 0 1 1-6 0 3 3 0 0 1 6 0" clip-rule="evenodd"></path></svg>
                    </button>
                </div>
            </div>
        </section>
    );
}