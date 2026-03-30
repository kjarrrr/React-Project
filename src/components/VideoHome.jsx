import { useEffect, useRef, useState } from "react";
import { ref, update, increment, onValue, push } from "firebase/database";
import { db } from "../config/firebase";

export function VideoHome({ video }) {
    const videoRef = useRef(null);
    const baseUrl = import.meta.env.BASE_URL;

    const [likes, setLikes] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const [comments, setComments] = useState([]);
    const [showComments, setShowComments] = useState(false);

    // --- 1. LÓGICA DE LA URL (Soluciona el 404) ---
    // Si la URL ya es de Firebase, se usa directa. Si no, se le pega el baseUrl.
    const finalSrc = video.url?.includes("firebasestorage") 
        ? video.url 
        : `${baseUrl}${video.url}`;

    // --- 2. FIREBASE SYNC ---
    useEffect(() => {
        const videoDataRef = ref(db, `videos/${video.id}`);
        const unsubscribe = onValue(videoDataRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setLikes(data.likes || 0);
                if (data.comments) {
                    setComments(Object.values(data.comments).map(c => c.text));
                }
            }
        });
        return () => unsubscribe();
    }, [video.id]);

    // --- 3. INTERSECTION OBSERVER (Soluciona el error de 'pause') ---
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    // Verificamos que videoRef.current NO sea null antes de actuar
                    if (videoRef.current) {
                        if (entry.isIntersecting) {
                            videoRef.current.play().catch(() => {});
                        } else {
                            videoRef.current.pause();
                            videoRef.current.currentTime = 0;
                        }
                    }
                });
            },
            { threshold: 0.6 }
        );

        if (videoRef.current) observer.observe(videoRef.current);
        return () => {
            if (videoRef.current) observer.unobserve(videoRef.current);
        };
    }, []);

    const handleLike = () => {
        const videoRoute = ref(db, `videos/${video.id}`);
        const willLike = !isLiked;
        update(videoRoute, { likes: increment(willLike ? 1 : -1) })
            .then(() => setIsLiked(willLike));
    };

    const handleAddComment = (e) => {
        e.preventDefault();
        const text = e.target.commentInput.value;
        if (!text.trim()) return;
        push(ref(db, `videos/${video.id}/comments`), { text, timestamp: Date.now() })
            .then(() => e.target.reset());
    };

    return (
        <section className="videoSection relative h-screen w-full bg-black flex items-center justify-center">
            <video
                ref={videoRef}
                className="h-full w-full object-cover"
                loop
                muted
                playsInline
                src={finalSrc} /* Usamos la URL filtrada */
                onClick={(e) => e.target.paused ? e.target.play() : e.target.pause()}
            />

            {/* Overlay Actions */}
            <div className="absolute bottom-10 right-4 flex flex-col gap-6 z-10">
                <button onClick={handleLike} className={`p-3 rounded-full bg-black/40 ${isLiked ? 'text-red-500' : 'text-white'}`}>
                    ❤️ <span className="block text-xs text-white">{likes}</span>
                </button>
                <button onClick={() => setShowComments(!showComments)} className="p-3 rounded-full bg-black/40 text-white">
                    💬 <span className="block text-xs">{comments.length}</span>
                </button>
            </div>

            {/* Panel de Comentarios */}
            {showComments && (
                <div className="absolute bottom-0 w-full h-1/2 bg-gray-900/95 text-white p-4 z-20 rounded-t-xl overflow-hidden flex flex-col">
                    <div className="flex justify-between mb-2">
                        <span className="font-bold">Comentarios</span>
                        <button onClick={() => setShowComments(false)}>✕</button>
                    </div>
                    <div className="flex-1 overflow-y-auto space-y-2 mb-2">
                        {comments.map((c, i) => (
                            <p key={i} className="text-sm bg-white/5 p-2 rounded">{c}</p>
                        ))}
                    </div>
                    <form onSubmit={handleAddComment} className="flex gap-2">
                        <input name="commentInput" className="flex-1 bg-white/10 p-2 rounded outline-none" placeholder="Añadir..." />
                        <button className="bg-blue-600 px-3 rounded">Ok</button>
                    </form>
                </div>
            )}
        </section>
    );
}