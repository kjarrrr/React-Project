import { useParams, useNavigate } from "react-router-dom";
import { FollowingStamp } from "../hooks/ApiFollowing";

export function ProfileFamous() {
    const { username } = useParams();
    const navigate = useNavigate();
    const baseUrl = import.meta.env.BASE_URL;

    const artist = FollowingStamp.find(u => u.user === username);

    return (
        <main className="profileContainer p-10">

            <button onClick={() => navigate(-1)} className="mb-5 text-zinc-400 hover:text-white">Volver</button>

            <div className="flex flex-row gap-8 items-start">
                <img 
                    src={`${baseUrl}${artist.img}`}
                    className="w-40 h-40 rounded-full object-cover border-4 border-zinc-800" 
                />

                <div className="flex flex-col gap-4">
                    <h2 className="text-3xl font-bold">@{artist.user}</h2>
                    
                    <div className="flex gap-3">
                        <button className="bg-rose-500 text-white px-12 py-2 font-bold rounded-sm hover:bg-rose-600 transition-all">
                            Seguir
                        </button>

                        <button className="bg-zinc-800 p-2 text-white rounded-sm border border-zinc-700">
                            <svg fill="currentColor" width="20" height="20" viewBox="0 0 48 48"><path d="M21.68 3.18a2 2 0 0 1 2.14.32l21.5 19a2 2 0 0 1-.02 3.02l-21.5 18.5a2 2 0 0 1-3.3-1.52v-9.97c-5.68.28-11.95 1.75-16.09 5.88A2 2 0 0 1 1 37c0-11.68 7.7-21.05 19.5-21.94V5a2 2 0 0 1 1.18-1.82Z"></path></svg>
                        </button>
                    </div>

                    <p className=" max-w-sm text-lg">
                        {artist.description || "Cuenta oficial de TikTok."}
                    </p>

                    <div className="flex gap-6 mt-2">
                        <span><b>{artist.following}</b> Siguiendo</span>
                        <span><b>{artist.followers}</b> Seguidores</span>
                        <span><b>{artist.likes}</b> Seguidores</span>
                    </div>
                </div>
            </div>

            <div className="mt-12 border-t border-zinc-800 pt-8">
                <h3 className="text-xl font-semibold mb-4 text-zinc-500">Videos</h3>
                <div className="grid grid-cols-3 gap-2">
                    
                    <div className="bg-zinc-900 aspect-[3/4] rounded-md animate-pulse"></div>
                    <div className="bg-zinc-900 aspect-[3/4] rounded-md animate-pulse"></div>
                    <div className="bg-zinc-900 aspect-[3/4] rounded-md animate-pulse"></div>
                </div>
            </div>
        </main>
    );
}