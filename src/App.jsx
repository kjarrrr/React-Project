import { Routes, Route, useNavigate } from 'react-router';
import { Home } from "./pages/Home"
import { Explore } from "./pages/Explore"
import { Following } from "./pages/Following"
import { Profile } from "./pages/Profile"
import { Menu } from "./components/Sidebarrier"
import './styles/global.css'
import './styles/links.css'
import './styles/hovers.css'
import './styles/sidebarstyles.css'
import './styles/popupstyles.css'
import './styles/editpopup.css'
import './styles/profile.css'
import './styles/videostyles.css'
import { useEffect, useRef, useState } from "react"
import { Login } from "./pages/Login"
import { Registration } from "./pages/Register"
import { UseDarkMode } from "./hooks/useDarkmode"
import { CreateUsername } from "./components/Username-popup"
import { Following2 } from "./pages/Following2"
import { ProfileFamous } from "./pages/ProfileFamous"




function App() {

  const [popster, setPopster] = useState("login-container")
  const [userpage, setUserpage] = useState(false);
  const [getBack, setGetBack] = useState(false)
  const [register, setRegister] = useState("logButtons");
  const [login, setLogin] = useState("logButtons");

  const { toggleDarkMode } = UseDarkMode();




  const PopUpper = useRef(null);

  const showPopUp = () => {
    PopUpper.current.showModal();

  }

  const closePopUp = () => {
    PopUpper.current.close()
    setPopster("login-container");
    setGetBack(false);
    setRegister("logButtons");
    setLogin("logButtons");
    setUserpage(true)
  };


  const navigate = useNavigate()

  useEffect(() => {
    navigate("/", { replace: true });
  }, []);


  return (
    <>

      <dialog className="logDialog" ref={PopUpper}>
        {
          userpage === "username" ? (

            <div>
              <CreateUsername closePopUp={closePopUp} />
            </div>

          ) :

            (popster === "register-container" ? (

              <div className="register-container">
                {
                  getBack && (
                    <header onClick={() => setGetBack(false)} className="absolute top-5 right-93 cursor-pointer">
                      <div onClick={() => setRegister("logButtons")}>
                        <svg class="css-62ep4r-5e6d46e3--StyledChevronLeftOffset e1wy93i61" width="1em" font-size="22" data-e2e="" height="1em" viewBox="0 0 48 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M4.58579 22.5858L20.8787 6.29289C21.2692 5.90237 21.9024 5.90237 22.2929 6.29289L23.7071 7.70711C24.0976 8.09763 24.0976 8.7308 23.7071 9.12132L8.82843 24L23.7071 38.8787C24.0976 39.2692 24.0976 39.9024 23.7071 40.2929L22.2929 41.7071C21.9024 42.0976 21.2692 42.0976 20.8787 41.7071L4.58579 25.4142C3.80474 24.6332 3.80474 23.3668 4.58579 22.5858Z"></path></svg>
                      </div>
                    </header>
                  )
                }


                <header onClick={closePopUp} className="absolute mx-5 my-5 right-1">
                  <button className="p-2 rounded-4xl cursor-pointer">
                    <svg fill="currentColor" color="inherit" font-size="22" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em"><path d="M38.7 12.12a1 1 0 0 0 0-1.41l-1.4-1.42a1 1 0 0 0-1.42 0L24 21.17 12.12 9.3a1 1 0 0 0-1.41 0l-1.42 1.42a1 1 0 0 0 0 1.41L21.17 24 9.3 35.88a1 1 0 0 0 0 1.41l1.42 1.42a1 1 0 0 0 1.41 0L24 26.83 35.88 38.7a1 1 0 0 0 1.41 0l1.42-1.42a1 1 0 0 0 0-1.41L26.83 24 38.7 12.12Z"></path></svg>
                  </button>
                </header>

                <div className="all-popup2">
                  <header>
                    <h1>Registrate en <br />
                      TikTok</h1>
                  </header>
                  <div className="logButtons">
                    <Registration
                      setGetBack={setGetBack}
                      register={register}
                      setRegister={setRegister}
                      setUserpage={setUserpage}
                    />

                  </div>
                </div>
                <footer >
                  <div className="foot1">
                    Al continuar, confirmas que estas de acuerdo con los
                    <span className="text-black transition: 0.1s ease;">Términos <br />
                      del servicio</span> de Tiktok y que has leído la
                    <span className="text-black transition: 0.1s ease;"> Política de privacidad de <br />
                      Tiktok</span>
                  </div>

                  <div className="foot2">
                    <h1>Ya tienes una cuenta? <span className=" text-rose-500 cursor-pointer transition: 0.1s ease;"
                      onClick={() => {
                        setPopster("login-container")
                        setRegister("logButtons")
                        setLogin("logButtons")
                        setGetBack(false)

                      }}
                    >Iniciar Sesion</span></h1>
                  </div>

                </footer>

              </div>
            )
              : (
                <div className="login-container">

                  {
                    getBack && (
                      <header onClick={() => setGetBack(false)} className="absolute top-5 right-93 cursor-pointer">
                        <div onClick={() => setLogin("logButtons")}>
                          <svg class="css-62ep4r-5e6d46e3--StyledChevronLeftOffset e1wy93i61" width="1em" font-size="22" data-e2e="" height="1em" viewBox="0 0 48 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M4.58579 22.5858L20.8787 6.29289C21.2692 5.90237 21.9024 5.90237 22.2929 6.29289L23.7071 7.70711C24.0976 8.09763 24.0976 8.7308 23.7071 9.12132L8.82843 24L23.7071 38.8787C24.0976 39.2692 24.0976 39.9024 23.7071 40.2929L22.2929 41.7071C21.9024 42.0976 21.2692 42.0976 20.8787 41.7071L4.58579 25.4142C3.80474 24.6332 3.80474 23.3668 4.58579 22.5858Z"></path></svg>
                        </div>
                      </header>
                    )
                  }

                  <header onClick={() => closePopUp()} className="absolute mx-5 my-5 right-1">
                    <button className="p-2 rounded-4xl cursor-pointer">
                      <svg fill="currentColor" color="inherit" font-size="22" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em"><path d="M38.7 12.12a1 1 0 0 0 0-1.41l-1.4-1.42a1 1 0 0 0-1.42 0L24 21.17 12.12 9.3a1 1 0 0 0-1.41 0l-1.42 1.42a1 1 0 0 0 0 1.41L21.17 24 9.3 35.88a1 1 0 0 0 0 1.41l1.42 1.42a1 1 0 0 0 1.41 0L24 26.83 35.88 38.7a1 1 0 0 0 1.41 0l1.42-1.42a1 1 0 0 0 0-1.41L26.83 24 38.7 12.12Z"></path></svg>
                    </button>
                  </header>

                  <div className="all-popup2">
                    <header>
                      <h1>Inicia sesión en <br />
                        TikTok</h1>
                    </header>

                    <div className="logButtons">
                      <Login closePopUp={closePopUp} setGetBack={setGetBack} login={login} setLogin={setLogin} />
                    </div>
                  </div>
                  <footer >
                    <div className="foot1">
                      Al continuar, confirmas que estas de acuerdo con los
                      <span className="text-black transition: 0.1s ease;">Términos <br />
                        del servicio</span> de Tiktok y que has leído la
                      <span className="text-black transition: 0.1s ease;"> Política de privacidad de  <br />
                        Tiktok</span>
                    </div>

                    <div className="foot2">
                      <h1>¿No tienes cuenta? <span className=" text-rose-500 cursor-pointer transition: 0.1s ease;"
                        onClick={() => {
                          setPopster("register-container")
                          setRegister("logButtons")
                          setLogin("logButtons")
                          setGetBack(false)
                        }}
                      > Registrarse</span>
                      </h1>
                    </div>

                  </footer>

                </div >
              )
            )
        }

      </dialog >

      <div>
        <div className="TheSideBar">
          <Menu closePopUp={closePopUp} toggleDarkMode={toggleDarkMode} showPopUp={showPopUp} />
        </div>

        <div className="flex justify-center">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Explore" element={<Explore />} />
            <Route path="/Following" element={<Following showPopUp={showPopUp} />} />
            <Route path="/Following2" element={<Following2/>} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/ProfileFamous/:username" element={<ProfileFamous />} />
          </Routes>
        </div>
      </div>
    </>
  )
}


export default App
