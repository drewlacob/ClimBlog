import {axiosClient} from './api';

export async function getUserProfile(userID) {
    try {
        const response = await axiosClient.post('/getUserProfile', {
            user_id: userID
        })
        return response.data;
    } catch (error) {
        console.log(error)
    }
}