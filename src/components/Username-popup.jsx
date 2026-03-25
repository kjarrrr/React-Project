import { useNavigate } from "react-router-dom";
import { auth, db } from "../config/firebase";
import { ref, set } from "firebase/database";
import { useState } from "react";



export function CreateUsername({ closePopUp }) {

    const navigate = useNavigate();
    const [username, setUsername] = useState("")
    const [description] = useState("")


    function SaveData(e) {
        e.preventDefault();
        const user = auth.currentUser;

        const defaultImg = "https://i.pinimg.com/236x/13/74/20/137420f5b9c39bc911e472f5d20f053e.jpg"

        set(ref(db, 'users/' + user.uid), {
            usercreate: username,
            email: user.email,
            description: description,
            imageUrl: defaultImg,
            createdAt: Date.now()
        })


            .then(() => {
                closePopUp();
                navigate("/Profile");
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <>
            <div className="login-container">
                <header>
                    <div>

                    </div>
                </header>



                <header onClick={() => closePopUp()} className="absolute mx-5 my-5 right-1">
                    <button className="p-2 rounded-4xl cursor-pointer">
                        <svg fill="currentColor" color="inherit" font-size="22" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em"><path d="M38.7 12.12a1 1 0 0 0 0-1.41l-1.4-1.42a1 1 0 0 0-1.42 0L24 21.17 12.12 9.3a1 1 0 0 0-1.41 0l-1.42 1.42a1 1 0 0 0 0 1.41L21.17 24 9.3 35.88a1 1 0 0 0 0 1.41l1.42 1.42a1 1 0 0 0 1.41 0L24 26.83 35.88 38.7a1 1 0 0 0 1.41 0l1.42-1.42a1 1 0 0 0 0-1.41L26.83 24 38.7 12.12Z"></path></svg>
                    </button>
                </header>

                <div className="all-popup2">
                    <header>
                        <h1>Asigna tu nombre</h1>
                    </header>

                    <div className="userContainer">
                        <form onSubmit={SaveData}>
                            <input type="text" value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Usuario" />

                            <div className="flex justify-center">
                                <button type="submit" className="my-6">Registrarse</button>
                            </div>
                        </form>
                    </div>


                </div>

            </div>


        </>
    )
}