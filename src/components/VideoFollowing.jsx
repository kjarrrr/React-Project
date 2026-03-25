export function VideoFollowing({ video, showPopUp }) {
    return (

        <div className="w-50 h-70 group">
            <video
                src={video.url}
                className="w-50 h-70 object-cover rounded-lg my-20"
                loop
                muted
                onMouseEnter={(e) => e.target.play()}
                onMouseLeave={(e) => {
                    e.target.pause();
                    e.target.currentTime = 0;
                }}
                
            />


            <div className="flex flex-col">
                
                <p className="relative bottom-49 text-center text-white text-xl font-bold">{video.user} </p>
                
                <div>
                    <button onClick={showPopUp} className="relative bottom-45 left-7 cursor-pointer bg-rose-500 p-2 px-12 text-white font-medium text-lg rounded-sm">Follow</button>
                </div>
            </div>
        </div>
    )
}