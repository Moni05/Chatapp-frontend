import { useState, useEffect, useContext } from 'react';
import { makeStyles, Dialog, Typography, List, ListItem, Box, withStyles } from '@material-ui/core';
import { GoogleLogin, GoogleLogout } from 'react-google-login';

import { AuthContext } from '../../context/AuthProvider';
import { loginUser } from '../../context/apiCalls';


const useStyle = makeStyles({
    component: {
        display: 'flex'
    },
    dialog: {
        padding: '56px 0 56px 56px',
    },
    qr: {
        margin: '50px 0 0 50px',
        height: 264,
        width: 264
    },
    title: {
        fontSize: 26,
        marginBottom: 25,
        color: '#525252',
        fontFamily: 'Segoe UI,Helvetica Neue,Helvetica,Lucida Grande,Arial,Ubuntu,Cantarell,Fira Sans,sans-serif',
        fontWeight: 300   
    },
    list: {
        '&  > *': {
            padding: 0,
            marginTop: 15,
            fontSize: 18,
            lineHeight: '28px',
            color: '#4a4a4a'
        }
    }
})

const style = {
    dialogPaper: {
        marginTop: '12%',
        height: '95%',
        width: '60%',
        maxWidth: '100%',
        maxHeight: '100%',
        borderRadius: 0,
        boxShadow: 'none',
        overflow: 'hidden'
    }
};

const Login = ({ classes }) => {

    const classname = useStyle();
    const clientId = '1058965020460-jlfdgeuvu4d2dgvjl293uhghnba2l0kb.apps.googleusercontent.com';

    const url = 'https://www.ginifab.com/feeds/qr_code/img/qrcode.jpg';

    const { account, setAccount,showloginButton, setShowloginButton, showlogoutButton, setShowlogoutButton } = useContext(AuthContext);

    const onLoginSuccess = async (res) => {

        console.log("Login success", res.profileObj);
        setAccount(res.profileObj);
        setShowloginButton(false);
        setShowlogoutButton(true);
        await loginUser(res.profileObj)

    };

    const onLoginFailure = (res) => {

        console.log("Login Failed", res);
        console.log(res.profileObj);

    };

    return(
        <Dialog open={true} 
            classes={{paper: classes.dialogPaper}} 
            BackdropProps={{style: {backgroundColor: 'unset'}}} 
        >
            <Box className={classname.component}>
                <Box className={classname.dialog}>
                    <Typography className={classname.title}>To use WhatsApp on your computer:</Typography>
                    <List className={classname.list}>
                        <ListItem>1. Open WhatsApp on your phone</ListItem>
                        <ListItem>2. Tap Menu Settings and select WhatsApp Web</ListItem>
                        <ListItem>3. Point your phone to this screen to capture the code</ListItem>
                    </List>
                </Box>
                <Box style={{position:'relative'}}>
                    <img src={url} alt="QR" className={classname.qr} />
                    <div style={{position: 'absolute', left: '50%', top: '50%', transform: 'translateX(0%) translateY(-25%)'}}>
                        <GoogleLogin 
                            clientId={clientId}
                            buttonText="" 
                            cookiePolicy={'single_host_origin'}
                            isSignedIn={true}
                            onSuccess={onLoginSuccess}
                            onFailure={onLoginFailure}
                        />
                        
                    </div>
                </Box>
            </Box>
        </Dialog>
    )

}

export default withStyles(style)(Login);
