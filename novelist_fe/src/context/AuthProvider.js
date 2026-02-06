import { createContext, useState } from "react"

export const authContext=createContext()

const AuthProvider=({children})=>{ 
    const [auth,setAuth]=useState({
        status:0,
        user:null
    }) 
    return <authContext.Provider value={{auth,setAuth}}>
        {children}
    </authContext.Provider>
}

export default AuthProvider