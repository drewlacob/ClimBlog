import axios from "axios";
import { apiURL } from "../config";

const api = axios.create({
    baseURL: 'http://localhost:3000'
})
//axios requests

//createAccount
module.exports.createAccount = async (email, password) => {
    try {
        const response = api.post('/createAccount', {
            email, password
        })
        return response;
    } catch (error) {
        console.log(error)
    }

}

//login