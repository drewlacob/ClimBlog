import {axiosClient} from './api';

export async function deletePost(post_id){
    try {
        const response = await axiosClient.delete(`/post/${post_id}`);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}