import { useState } from "react";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { ref as dbRef, push, set } from "firebase/database";
import { db, storage } from "../config/firebase";
import { UseAuth } from "../config/useAuth";

export function Upload() {
    const [file, setFile] = useState(null);
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);

    const { userData } = UseAuth();

    const handleUpload = (e) => {
        e.preventDefault();
        if (!file) return alert("Por favor, selecciona un video");

        if (!userData && !auth.currentUser) {
            return alert("Debes estar logueado para subir videos");
        }

        setLoading(true);

        const fileName = `${Date.now()}-${file.name}`;
        const fileLocation = storageRef(storage, `videos/${fileName}`);

        uploadBytes(fileLocation, file)
            .then((snapshot) => {
                return getDownloadURL(snapshot.ref);
            })
            .then((url) => {
                const videosListRef = dbRef(db, 'videos');
                const newVideoRef = push(videosListRef);

                const finalUserName = userData?.usercreate || auth.currentUser?.displayName || "Usuario Anónimo";

                return set(newVideoRef, {
                    id: newVideoRef.key,
                    url: url,
                    user: finalUserName,
                    description: description,
                    song: "Sonido Original",
                    likes: 0
                });
            })
            .then(() => {
                alert("¡Video publicado con éxito!");
                setFile(null);
                setDescription("");
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error en la subida:", error);
                setLoading(false);
            });
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-6">
            <h2 className="text-2xl font-bold mb-6">Subir nuevo video</h2>

            <form onSubmit={handleUpload} className="w-full max-w-md bg-gray-900 p-8 rounded-2xl shadow-xl">
                <label className="block mb-4">
                    <span className="text-gray-400 text-sm">Selecciona el archivo .mp4</span>
                    <input
                        type="file"
                        accept="video/*"
                        onChange={(e) => setFile(e.target.files[0])}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 mt-2"
                    />
                </label>

                <textarea
                    placeholder="Escribe una descripción..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full bg-gray-800 p-3 rounded-lg mb-4 outline-none focus:ring-2 focus:ring-blue-500"
                    rows="3"
                />

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3 rounded-lg font-bold transition ${loading ? 'bg-gray-600' : 'bg-blue-600 hover:bg-blue-700'}`}
                >
                    {loading ? "Subiendo..." : "Publicar Video"}
                </button>
            </form>
        </div>
    );
}