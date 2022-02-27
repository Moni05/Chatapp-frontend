import { createContext, useState, useEffect, useRef } from 'react';
import { io } from "socket.io-client";


export const AuthContext = createContext(null);
const ENDPOINT = process.env.REACT_APP_URL;



const AuthProvider = ({children}) => {

    const socket = useRef();

    const [ account, setAccount ] = useState();
    const [showloginButton, setShowloginButton] = useState(true);
    const [showlogoutButton, setShowlogoutButton] = useState(false);
    
    const [activeUsers, setActiveUsers] = useState([]);
    const [newMessageFlag, setNewMessageFlag] = useState(false);


    useEffect(() => {
        socket.current = io(ENDPOINT);
    }, [])



    return(
        <AuthContext.Provider value={{
            account, 
            setAccount,
            socket, 
            showloginButton,
            setShowloginButton,
            showlogoutButton,
            setShowlogoutButton,
            activeUsers,
            setActiveUsers,
            newMessageFlag,
            setNewMessageFlag
        }}>
            {children}
        </AuthContext.Provider>
    )


}

export default AuthProvider;