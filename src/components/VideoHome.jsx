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

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        videoRef.current.play().catch(error => {
                            console.log("Autoplay bloqueado hasta que el usuario interactúe.");
                        });
                    } else {
                        videoRef.current.pause();
                        videoRef.current.currentTime = 0;
                    }
                });
            },
            { threshold: 0.6 }
        );

        if (videoRef.current) {
            observer.observe(videoRef.current);
        }

        return () => {
            if (videoRef.current) observer.unobserve(videoRef.current);
        };
    }, []);

    const handleLike = () => {
        const videoRoute = ref(db, `videos/${video.id}`);
        const willLike = !isLiked;

        update(videoRoute, {
            likes: increment(willLike ? 1 : -1)
        }).then(() => {
            setIsLiked(willLike);
        });
    };

    const handleAddComment = (e) => {
        e.preventDefault();
        const text = e.target.commentInput.value;
        if (!text.trim()) return;

        const commentsRef = ref(db, `videos/${video.id}/comments`);
        push(commentsRef, {
            text: text,
            timestamp: Date.now()
        }).then(() => {
            e.target.reset();
        });
    };

    return (
        <section className="videoSection relative h-screen w-full bg-black">
            <video
                ref={videoRef}
                className="videoPlayer" // o la clase que estés usando
                loop
                muted
                playsInline
                src={video.url.startsWith('http') ? video.url : `${baseUrl}${video.url}`}

                onClick={(e) => e.target.paused ? e.target.play() : e.target.pause()}
            />

            <div className="videoOverlay-actions">
                <div className="flex flex-col items-center gap-4">
                    <button onClick={handleLike}
                        className={`actionBtn ${isLiked ? 'text-red-500' : 'text-white'}`}>
                        ❤️ <span className="block text-xs">{likes}</span>
                    </button>

                    <button onClick={() => setShowComments(!showComments)} className="actionBtn">
                        💬 <span className="block text-xs">{comments.length}</span>
                    </button>
                </div>
            </div>

            {showComments && (
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-black/80 text-white p-4 rounded-t-2xl z-20 flex flex-col">
                    <div className="flex justify-between mb-4">
                        <h4 className="font-bold">Comentarios</h4>
                        <button className="p-3 bg-blue-600 rounded-full" onClick={() => setShowComments(false)}>✕</button>
                    </div>

                    <div className="flex-1 overflow-y-auto mb-4 space-y-2">
                        {comments.map((c, index) => (
                            <p key={index} className="text-sm bg-white/10 p-2 rounded">{c}</p>
                        ))}
                    </div>

                    <form onSubmit={handleAddComment} className="flex gap-2">
                        <input
                            name="commentInput"
                            type="text"
                            placeholder="Añadir comentario..."
                            className="flex-1 bg-gray-800 p-2 rounded text-sm outline-none"
                        />
                        <button type="submit" className="bg-blue-500 px-4 rounded text-sm">Post</button>
                    </form>
                </div>
            )}
        </section>
    );
}