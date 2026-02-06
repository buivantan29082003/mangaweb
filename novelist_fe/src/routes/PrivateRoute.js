import { useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"


const PrivateRoute=({roleRequirement})=>{ 
    const [isChecked,setIsChecked]=useState(false);
    const [user,setUser]=useState(null)
    const navigate=useNavigate()
    if(!isChecked){
        return <p>Checking your apperance</p>
    }
    if(isChecked && (user==null || user.role!=roleRequirement)){
        navigate("/login")
    }
    return <> 
        <Outlet/>
    </>
}

export default PrivateRoute