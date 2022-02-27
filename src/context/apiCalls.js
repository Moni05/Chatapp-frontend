import axios from "axios";

const API_URL = process.env.REACT_APP_URL;

export const loginUser = async (data) => {

    try{

        return await axios.post(`${API_URL}auth/login`, data)

    } catch(err){
        console.log("Error while registering an user", err);
    }
}

export const getUser = async () => {

    try{

        let res = await axios.get(`${API_URL}users`);
        return res.data;
        
    } catch(err){
        console.log("Error while registering an user", err);
    }
}

export const setConversation = async (data) => {
    try {
        await axios.post(`${API_URL}conversation/new`, data);
    } catch (error) {
        console.log('Error while calling setConversation API ', error);
    }
}

export const getConversation = async (users) => {
    try {
        let response = await axios.post(`${API_URL}conversation/get`, users);
        return response.data;
    } catch (error) {
        console.log('Error while calling getConversation API ', error);
    }
}

export const newMessages = async (data) => {
    try {
        return await axios.post(`${API_URL}message/add`, data);
    } catch (error) {
        console.log('Error while calling newConversations API ', error);
    }
}


export const getMessages = async (id) => {
    try {
        let response = await axios.get(`${API_URL}message/${id}`);
        return response.data
    } catch (error) {
        console.log('Error while calling getMessages API ', error);
    }
}