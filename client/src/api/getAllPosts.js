import {axiosClient} from './api';

export async function getAllPosts(){
    try {
        const response = await axiosClient.get('/getAllPosts');
        return response.data;
    } catch (error) {
        console.log(error)
    }
}