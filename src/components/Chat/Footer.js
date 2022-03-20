import { useState, useContext } from 'react';
import { EmojiEmotions, AttachFile, Mic } from '@material-ui/icons';
import { Box, makeStyles, InputBase } from '@material-ui/core';
import Picker from "emoji-picker-react";
import { AuthContext } from '../../context/AuthProvider';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    footer: {
        height: '55px',
        background: '#ededed',
        // position: 'absolute',
        width: '100%',
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        padding: '0 15px',
        '&  >*': {
            margin: 5,
            color: '#919191'
        }
    },
    search: {
        borderRadius: 18,
        backgroundColor: '#FFFFFF',
        width: 'calc(94% - 100px)'
    },
    alert: {
        color: '#ff0000',
        textTransform: 'uppercase',
        fontSize: '16px'
    },
    inputRoot: {
        width: '100%'
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: 25,
        fontSize: 14,
        height: 20,
        width: '100%'
    },
    clipIcon: {
        transform: 'rotate(40deg)'
    }
}));


const Footer = ({ sendText, value, setValue, pickerVisible, onEmojiClick, setPickerVisible, person }) => {
    const classes = useStyles();

    const { activeUsers } = useContext(AuthContext);
    
    return (
        <Box className={classes.footer}>
            {activeUsers?.find(user => user.userId === person.googleId) ? 
            <>
            {pickerVisible && (<Picker 
                  pickerStyle={{ position: "absolute", bottom: "60px" }}
                  onEmojiClick={onEmojiClick} />)}

                  <EmojiEmotions
                  style={{ opacity: 0.5, cursor:"pointer"}} 
                  onClick={()=>setPickerVisible(!pickerVisible)} 
            />
            {/* <EmojiEmotions /> */}
            <AttachFile className={classes.clipIcon} />

            <Box className={classes.search}> 
                <InputBase
                    placeholder="Type a message"
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyPress={(e) => sendText(e)}
                    value={value}
                />
            </Box>
            <Mic />
        </> : <p className={classes.alert}>Cannot send message to offline user</p>}
        </Box>
    )
}

export default Footer;