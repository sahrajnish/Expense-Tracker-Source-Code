import React,{useState, useEffect} from "react";
import Navbar from "./NavBar";
import { useNavigate } from "react-router-dom";

const Layout = ({ children }) => {
    const [loginUser, setLoginUser] = useState('')

    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))
        if(user) {
            setLoginUser(user)
        }
    }, [])

    // logout handler
    const handleLogout = () => {
        localStorage.removeItem('user')
        navigate('/login')
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar username={loginUser?.user?.name || ""} onLogout={handleLogout}/>
            <main className="flex-grow px-4 py-6">{children}</main>
        </div>
    );
};


export default Layout