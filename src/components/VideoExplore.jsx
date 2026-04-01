// Agregamos 'onSelect' aquí en los argumentos
export function VideoExplore({ video, onSelect }) {
    const baseUrl = import.meta.env.BASE_URL;

    const finalSrc = video.url?.includes("firebasestorage")
        ? video.url
        : `${baseUrl}${video.url}`;

    return (
        <div
            className="rounded-full w-48 h-64 group cursor-pointer"
            onClick={() => onSelect(video)}
        >
            <video
                src={finalSrc}
                className="w-full h-full object-cover rounded-xl"
                loop
                muted
                onMouseEnter={(e) => e.target.play()}
                onMouseLeave={(e) => {
                    e.target.pause();
                    e.target.currentTime = 0;
                }}
            />
        </div>
    );
}