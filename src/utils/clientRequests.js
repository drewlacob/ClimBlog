import axios from "axios";
//import { apiURL } from "../config";

const api = axios.create({
    baseURL: 'http://localhost:3000' //CHANGE TO USE .ENV
})
//axios requests

//createAccount
export async function createAccount(email, password) {
    try {
        const response = await api.post('/createAccount', {
            email, password
        })
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

//login
export async function login(email, password) {
    try {
        const response = await api.post('/login', {
            email, 
            password
        })
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

//update user
export async function getUserProfile(userID) {
    try {
        const response = await api.post('/getUserProfile', {
            user_id: userID
        })
        return response.data;
    } catch (error) {
        console.log(error)
    }
}
//update user
export async function updateUserProfile(userID, firstName, lastName, password) {
    try {
        console.log('in client req with ' + firstName + lastName + password)
        const response = await api.post('/updateUserProfile', {
            user_id: userID,
            first_name: firstName,
            last_name: lastName,
            password: password
        })
        return response.data;
    } catch (error) {
        console.log(error)
    }
}