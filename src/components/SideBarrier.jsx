import { UseAuth } from "../config/useAuth";
import { SideBar } from "./Sidebar";
import { SideBar2 } from "./Sidebar2"
import { TopRight } from "./Top-Right-Bar";
import { TopRight2 } from "./Top-Right-Bar2";

export function Menu({ showPopUp, toggleDarkMode }) {

  const { userMan, loading } = UseAuth();

  if (loading) {
    return <div>Please wait</div>
  }


  return (

    <div className="sidebar">

      {!userMan && (
        <>
          <TopRight showPopUp={showPopUp} />
          <SideBar toggleDarkMode={toggleDarkMode} showPopUp={showPopUp} />
          
        </>
      )}

      {userMan && (
        <>
          <TopRight2 showPopUp={showPopUp} />
          <SideBar2 toggleDarkMode={toggleDarkMode} showPopUp={showPopUp} />
        
        </>
      )}

    </div>

  )

}