import { VideoExplore } from "../components/VideoExplore";
import { ExploreStamp } from "../hooks/ApiExplore";


export function Explore() {



    return (
        <>
            <main className="min-h-full">
                <div className="exploreContainer">
                    {ExploreStamp.map((video) => (
                        <VideoExplore key={video.id} video={video} />
                    ))}
                </div>
            </main>
        </>
    )
}
