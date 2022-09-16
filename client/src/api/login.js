import { axiosClient } from './api';

export async function login(email, password) {
  try {
    const response = await axiosClient.post('/login', {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
