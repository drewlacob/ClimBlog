import { axiosClient } from './api';

export async function updateUserProfile(userID, firstName, lastName, password) {
  try {
    const response = await axiosClient.post('/updateUserProfile', {
      user_id: userID,
      first_name: firstName,
      last_name: lastName,
      password: password,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
