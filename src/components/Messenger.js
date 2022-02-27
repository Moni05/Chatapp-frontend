import React, { useContext } from "react";
import { AppBar, Toolbar, makeStyles, Box } from '@material-ui/core';
import Login from './Login/Login';
import Chat from "./Chat/Chat";

import { AuthContext } from "../context/AuthProvider";

const useStyles = makeStyles({
    component: {
        height: '100vh',
        background: '#DCDCDC'
    },
    header: {
        background: '#128C7E',
        height: 115,
        boxShadow: 'none'
    },
    loginHeader: {
        background: '#00bfa5',
        height: 200,
        boxShadow: 'none'
    }
})


const Messenger = () => {

    const classes = useStyles();

    const { account } = useContext(AuthContext);

    console.log(account);

    return(
        <Box className={classes.component}>
        <AppBar className={classes.loginHeader}>
            <Toolbar>

            </Toolbar>
        </AppBar>
        {account ? <Chat /> : <Login />}
        </Box>
    )

}

export default Messenger;