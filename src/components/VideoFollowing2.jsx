import { useNavigate } from "react-router";

export function VideoFollowing2({ video }) {
    const navigate = useNavigate();
    const baseUrl = import.meta.env.BASE_URL;

    return (
        <div className="w-50 h-70 group">
            <video
                src={`${baseUrl}${video.url}`}
                className="w-full h-full object-cover rounded-xl my-20"
                loop
                muted
                onMouseEnter={(e) => e.target.play()}
                onMouseLeave={(e) => {
                    e.target.pause();
                    e.target.currentTime = 0;
                }}
            />

            <div className="flex flex-col">
                <p className="relative bottom-49 text-center text-white text-xl font-bold">
                    {video.user}
                </p>

                <div>
                    <button
                        onClick={() => navigate(`/ProfileFamous/${video.user}`)}
                        className="relative bottom-45 left-2 cursor-pointer bg-rose-500 p-2 px-12 text-white font-medium text-lg rounded-sm"
                    >
                        See profile
                    </button>
                </div>
            </div>
        </div>
    );
}