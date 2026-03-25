

export function VideoExplore({ video }) {
    return (

        <div className=" w-48 h-64 group">
            <video
                src={video.url}
                className=" w-full h-full object-cover rounded-xl my-20"

                loop
                muted
                onMouseEnter={(e) => e.target.play()}
                onMouseLeave={(e) => {
                    e.target.pause();
                    e.target.currentTime = 0;
                }}
            />


            <div className="relative inset-x-0 bottom-60 text-white p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                @{video.user}
            </div>
        </div>
    )
}