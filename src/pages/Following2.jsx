import { VideoFollowing2 } from "../components/VideoFollowing2"
import { FollowingStamp } from "../hooks/ApiFollowing"


export function Following2({showPopUp}) {

    return (
        <>
           <div className="followingContainer">
                           {FollowingStamp.map((video) => (
                               <VideoFollowing2 showPopUp={showPopUp} key={video.id} video={video} />
                           ))}
                       </div>
           
        </>
    )
}