import {axiosClient} from './api';

export async function getOnePost(post_id){
    try {
        const response = await axiosClient.get(`/post/${post_id}`);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}