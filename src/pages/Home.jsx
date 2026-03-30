import { VideoHome } from "../components/VideoHome";
import { HomeStamp } from "../hooks/ApiHome";


export function Home() {

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