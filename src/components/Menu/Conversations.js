import { useState, useEffect, useContext, useRef } from 'react';
import { Box, makeStyles, Divider } from '@material-ui/core';

import { AuthContext } from "../../context/AuthProvider"
import { getUser } from "../../context/apiCalls";

import Conversation from './Conversation';


const useStyles = makeStyles({
    component: {
        overflow: 'overlay',
        height: '81vh'
    },
    divider: {
        margin: '0 0 0 67px',
        backgroundColor: '#F2F2F2'
    }
})

const Conversations = ({ text }) =>{

    const classes = useStyles();
    const [users, setUsers] = useState([]);

    const { account, setActiveUsers, socket } = useContext(AuthContext);

    useEffect(() => {

        const fetchData = async () => {
            let data = await getUser();
            console.log(data);
            let fiteredData = data.filter(user => user.name.toLowerCase().includes(text.toLowerCase()));
            setUsers(fiteredData);
        }
        fetchData();
    }, [text]);

    useEffect(() => {
        socket.current.emit('addUser', account.googleId);
        socket.current.on("getUsers", users => {
            setActiveUsers(users);
        })
    }, [account])


    return(

        <Box className={classes.component}>
        {
            users && users.map((user, index) => (
                user.googleId !== account.googleId && 
                    <>
                        <Conversation user={user} />
                        {
                            users.length !== (index + 1)  && <Divider className={classes.divider} />
                        }
                    </>
            ))
        }
    </Box>
    )
}

export default Conversations;