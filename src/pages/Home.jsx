import { VideoHome } from "../components/VideoHome";
import { HomeStamp } from "../hooks/ApiHome";


export function Home() {

    return (
        <main className="flex justify-center items-center h-screen">
            <div className="videoFeed">
                {HomeStamp.map((video) => (
                    <VideoHome key={video.id} video={video} />
                ))}
            </div>
        </main>
    );
}