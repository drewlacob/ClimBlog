import {axiosClient} from './api';

export async function createAccount(email, password) {
    try {
        const response = await axiosClient.post('/createAccount', {
            email, password
        })
        return response.data;
    } catch (error) {
        console.log(error)
    }
}