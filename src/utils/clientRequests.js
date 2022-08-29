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