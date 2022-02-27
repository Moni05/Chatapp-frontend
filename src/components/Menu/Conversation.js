import { useContext } from "react";
import { Box, Typography, makeStyles } from "@material-ui/core";
import { AuthContext } from "../../context/AuthProvider";
import { UserContext } from "../../context/UserProvider";

import { setConversation } from "../../context/apiCalls";

const useStyles = makeStyles({
    component: {
        height: 40,
        display: 'flex',
        padding: '13px 0',
        cursor: 'pointer'
    },
    displayPicture: {
        width: 50,
        height: 50,
        objectFit: 'cover',
        borderRadius: '50%',
        padding: '0 14px'
    },
    container: {
        display: 'flex'
    },
    timestamp: {
        fontSize: 12,
        marginLeft: 'auto',
        color: '#00000099',
        marginRight: 20
    },
    text: {
        display: 'block',
        color: 'rgba(0, 0, 0, 0.6)',
        fontSize: 14
    }
})

const Conversation = ({ user }) => {

    const classes = useStyles();

    const url = user.imageUrl;

    const { setPerson } = useContext(UserContext);

    const { account }  = useContext(AuthContext);

    const getUser = async () => {
        setPerson(user);
        await setConversation({ senderId: account.googleId, receiverId: user.googleId });
    }

    return(
        <Box className={classes.component} onClick={() => getUser()}>
            <Box>
                <img src={url} alt="display-profile" className={classes.displayPicture} />
            </Box>
            <Box  style={{width: '100%'}}>
                <Box className={classes.container}>
                    <Typography>
                        {user.name}
                    </Typography>
                </Box>
            </Box>
        </Box>
    )
}

export default Conversation;