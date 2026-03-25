import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase"; 
import { ref, onValue } from "firebase/database"; 
import { useState, useEffect } from "react";

export function UseAuth() {
  const [userMan, setUserMan] = useState(null);
  const [userData, setUserData] = useState(null);
  const [descriptionData, setDescriptionData ] = useState(null)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUserMan(currentUser);
  

      if (currentUser) {
    
        const userRef = ref(db, 'users/' + currentUser.uid);
        onValue(userRef, (snapshot) => {
          setUserData(snapshot.val()); 
          setDescriptionData(snapshot.val());
          setLoading(false);
        });
      } else {
        setUserData(null);
        setDescriptionData(null)
        setLoading(false);

      }
    });

    return unsubscribe;
  }, []);

  return { userMan, userData, loading, descriptionData }; 
}