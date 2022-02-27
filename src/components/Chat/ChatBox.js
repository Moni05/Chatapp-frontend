import { useContext, useState, useEffect } from 'react';
import { Box } from '@material-ui/core';

import { UserContext } from '../../context/UserProvider';
import { AuthContext } from '../../context/AuthProvider';

import ChatHeader from './ChatHeader';
import Messages from './Messages';

import { getConversation } from '../../context/apiCalls';


const ChatBox = () => {
    const { person, setPerson } = useContext(UserContext);
    const { account } = useContext(AuthContext);

    const [conversation, setConversation] = useState({});
    
    useEffect(() => {
        const getConversationDetails = async () => {
            let data = await getConversation({ sender: account.googleId, receiver: person.googleId });
            setConversation(data);
        }
        getConversationDetails();
    }, [person.googleId]);

    return (
        <Box style={{height: '75%'}}>
            <ChatHeader person={person} />
            <Messages person={person} conversation={conversation} />
        </Box>
    )
}

export default ChatBox;