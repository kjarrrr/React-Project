import { VideoFollowing } from "../components/VideoFollowing"
import { FollowingStamp } from "../hooks/ApiFollowing"


export function Following({showPopUp}) {

    return (
        <>
        
           <div className="followingContainer">
                           {FollowingStamp.map((video) => (
                               <VideoFollowing showPopUp={showPopUp} key={video.id} video={video} />
                           ))}
                       </div>
           
        </>
    )
}