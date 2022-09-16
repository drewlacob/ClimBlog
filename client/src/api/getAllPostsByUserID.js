import { axiosClient } from './api';

export async function getAllPostsByUserID(user_id) {
  try {
    const response = await axiosClient.get(`/getAllPostsByUserID/${user_id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
