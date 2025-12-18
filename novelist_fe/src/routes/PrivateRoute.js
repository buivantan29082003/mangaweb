import { Outlet } from "react-router-dom"


const PrivateRoute=({roleRequirement})=>{
    return <>
        <Outlet/>
    </>
}

export default PrivateRoute