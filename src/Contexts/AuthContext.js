import React, { useContext, useState, useEffect } from 'react'
import { auth } from '../firebaseConfig'

const AuthContext = React.createContext();

export function useAuth()
{
    return useContext(AuthContext);
}

export default function AuthProvider( { children }) {
  
    const [ currentUser, setCurrentUser ] = useState()
    const [ loading, setLoading ] = useState();

    //register function
    function signUp(email, password)
    {
        return auth.createUserWithEmailAndPassword(email, password);
    }

    //login function
    function login(email, password)
    {
        return auth.signInWithEmailAndPassword(email, password);
    }

    //logout function
    function logout()
    {
        return auth.logout();
    }

    //*******************UPDATE FUNCTIONS*******************\\

    //update email
    function updateEmail(email)
    {
        return currentUser.updateEmail(email);

    }
    
    //update password
    function updatePassword(password)
    {
        return currentUser.updatePassword(password);
    }

    


    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe;
    }, [])

    //values to access throughout app

    const value = {
        currentUser,
        login,
        logout,
        updateEmail,
        updatePassword,
        signUp
    }

    return(
        <AuthContext.Provider value ={value}>
            { !loading && children }
        </AuthContext.Provider>
    )
}
