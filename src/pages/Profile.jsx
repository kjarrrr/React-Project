import { update, getDatabase, ref, remove } from "firebase/database";
import { UseAuth } from "../config/useAuth";
import { useEffect, useRef, useState } from "react"
import { auth } from "../config/firebase";
import { deleteUser } from "firebase/auth";
import { useNavigate } from "react-router";
import { signOut } from 'firebase/auth';
import { FaRegTrashAlt } from "react-icons/fa";



export function Profile() {


    const { userData, loading } = UseAuth();
    const [nuevoNombre, setNuevoNombre] = useState("");
    const [nombreVisible, setNombreVisible] = useState("");
    const [nuevaDescripcion, setNuevaDescripcion] = useState("");
    const [descripcionVisible, setDescripcionVisible] = useState("");

    const navigate = useNavigate()

    const PopUpperDupper = useRef(null);
    const PopDelete = useRef(null);

    function Logout() {
        signOut(auth);
        navigate("/");
    }

    function DeleteUser() {
        const user = auth.currentUser;
        const db = getDatabase();
        if (user) {

            const confirmar = window.confirm("¿Estás seguro?");

            if (confirmar) {
                const userRef = ref(db, `users/${user.uid}`);


                remove(userRef)
                    .then(() => {
                        deleteUser(user)
                            .then(() => {
                                alert("Cuenta eliminada con éxito.");
                                Logout()
                            })
                            .catch((error) => {
                                console.error("Error al borrar el usuario:", error);
                                if (error.code === "auth/requires-recent-login") {
                                    alert("Por seguridad, debes haber iniciado sesión recientemente para borrar tu cuenta. Por favor, sal y vuelve a entrar.");
                                    Logout()
                                }
                            });
                    })
                    .catch((error) => {
                        console.error("Error al borrar los datos de la DB:", error);
                    });
            }
        }
    };

    useEffect(() => {
        if (userData?.usercreate) {
            setNuevoNombre(userData.usercreate);
            setNombreVisible(userData.usercreate);
            setNuevaDescripcion(userData.description);
            setDescripcionVisible(userData.description);

        }
    }, [userData]);

    const Updater = (e) => {
        e.preventDefault();
        const user = auth.currentUser;

        const db = getDatabase();
        const userRef = ref(db, `users/${user.uid}`);

        update(userRef, {
            usercreate: nuevoNombre,
            description: nuevaDescripcion,
        })
            .then(() => {
                console.log("Nombre actualizado con éxito");
                setNombreVisible(nuevoNombre);
                setDescripcionVisible(nuevaDescripcion);
                closeEditPopUp();
            })
            .catch((error) => {
                console.error("Error al actualizar:", error);
            });
    };

    const showEditPopUp = () => { PopUpperDupper.current.showModal(); }
    const closeEditPopUp = () => { PopUpperDupper.current.close() };

    const showDeletePopUp = () => { PopDelete.current.showModal(); }
    const closeDeletePopUp = () => { PopDelete.current.close() };




    return (
        <>
            <dialog className="editDialog" ref={PopUpperDupper} >
                <header>
                    <div className=" absolute mx-5 my-5 right-1">
                        <button onClick={() => closeEditPopUp()} className="p-2 rounded-4xl cursor-pointer">
                            <svg fill="currentColor" color="inherit" font-size="22" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em"><path d="M38.7 12.12a1 1 0 0 0 0-1.41l-1.4-1.42a1 1 0 0 0-1.42 0L24 21.17 12.12 9.3a1 1 0 0 0-1.41 0l-1.42 1.42a1 1 0 0 0 0 1.41L21.17 24 9.3 35.88a1 1 0 0 0 0 1.41l1.42 1.42a1 1 0 0 0 1.41 0L24 26.83 35.88 38.7a1 1 0 0 0 1.41 0l1.42-1.42a1 1 0 0 0 0-1.41L26.83 24 38.7 12.12Z"></path></svg>
                        </button>
                    </div>

                    <div className="flex justify-start text-2xl font-medium p-5 my-2 ">
                        <h2 className="pfpEdit">Editar perfil</h2>
                    </div>
                </header>

                <form onSubmit={Updater}>

                    <main className="flex flex-col gap-12">
                        <div className="px-5 py-3">
                            <h2 className="flex flex-start" >Foto de perfil</h2>
                            <div className="flex justify-center align-center">
                                <img src={userData?.imageUrl} className="w-20 h-20 rounded-full" alt="" />
                            </div>
                        </div>

                        <div className="px-5">
                            <h2>Nombre</h2>
                            <div className="flex justify-center align-center">
                                <input
                                    className="updateInput"
                                    type="text"
                                    value={nuevoNombre}
                                    onChange={(e) => setNuevoNombre(e.target.value)} />
                            </div>
                        </div>

                        <div className="flex flex-col px-5">
                            <h2 >Descripción corta</h2>
                            <div className="flex justify-center align-center">
                                <textarea
                                    className="updateInput"
                                    type="textarea"
                                    value={nuevaDescripcion}
                                    onChange={(e) => setNuevaDescripcion(e.target.value)} />
                            </div>
                        </div>


                        <div className="footEditPopUp">
                            <div className="flex justify-end items-end">
                                <div>
                                    <button className="rounded-xs bg-rose-500 text-white mx-5 my-4 px-9 py-2 cursor-pointer hover:bg-rose-600" type="submit" >Guardar</button>
                                </div>
                            </div>
                        </div>
                    </main>


                </form>
            </dialog >

            <dialog className="deleteDialog" ref={PopDelete}>
                <header>
                    <div className="absolute mx-5 w-5 h-5 my-2 right-1">
                        <button onClick={() => closeDeletePopUp()} className="p-2 rounded-4xl cursor-pointer">
                            <svg fill="currentColor" color="inherit" font-size="22" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em"><path d="M38.7 12.12a1 1 0 0 0 0-1.41l-1.4-1.42a1 1 0 0 0-1.42 0L24 21.17 12.12 9.3a1 1 0 0 0-1.41 0l-1.42 1.42a1 1 0 0 0 0 1.41L21.17 24 9.3 35.88a1 1 0 0 0 0 1.41l1.42 1.42a1 1 0 0 0 1.41 0L24 26.83 35.88 38.7a1 1 0 0 0 1.41 0l1.42-1.42a1 1 0 0 0 0-1.41L26.83 24 38.7 12.12Z"></path></svg>
                        </button>

                    </div>

                    <div className="flex justify-center items-center text-center h-70 ">
                        <div className="flex flex-col gap-5">
                            Eliminar cuenta
                            <p onClick={() => DeleteUser()} className="text-rose-500 hover:underline cursor-pointer">Eliminar</p>
                        </div>
                    </div>
                </header>
            </dialog>

            <div className="profileContainer">
                <div className="flex gap-8 flex-col pt-8">

                    <div className="flex flex-row gap-8">
                        <img src={userData?.imageUrl || auth.currentUser?.photoURL || "https://i.pinimg.com/236x/13/74/20/137420f5b9c39bc911e472f5d20f053e.jpg"}
                            className="w-20 h-20 rounded-full"
                            alt="Foto de perfil">

                        </img>

                        <div className="flex flex-col">
                            <div>
                                <h2> {loading ? "..." : (nombreVisible || userData?.usercreate || auth.currentUser?.displayName || "Usuario")} </h2>
                        </div>

                        <div className="flex gap-5 py-5">
                            <button onClick={() => showEditPopUp()} className="profileChange">Editar perfil</button>
                            <main className="flex gap-5">
                                <button className="font-medium">Promocionar publicación</button>
                                <button onClick={showDeletePopUp} className="text-xl">
                                    <FaRegTrashAlt />
                                </button>
                                <button className="text-xl">
                                    <svg fill="currentColor" color="inherit" font-size="inherit" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em"><path d="M21.68 3.18a2 2 0 0 1 2.14.32l21.5 19a2 2 0 0 1-.02 3.02l-21.5 18.5a2 2 0 0 1-3.3-1.52v-9.97c-5.68.28-11.95 1.75-16.09 5.88A2 2 0 0 1 1 37c0-11.68 7.7-21.05 19.5-21.94V5a2 2 0 0 1 1.18-1.82ZM24.5 30.5v7.64l16.46-14.16L24.5 9.44V17a2 2 0 0 1-2.05 2c-8.4-.21-15.62 5.34-17.09 13.66 4.47-2.7 9.8-3.87 14.98-4.13.68-.03 1.22-.04 1.6-.04 1.19 0 2.56.26 2.56 2.01Z"></path></svg>
                                </button>
                            </main>
                        </div>
                        <div>
                            <p> {loading ? "..." : (descripcionVisible || userData?.description)}</p>
                        </div>
                    </div>
                </div>



            </div>
        </div >
            <div>

            </div>

        </>
    )

}