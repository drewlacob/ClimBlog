import { axiosClient } from "./api";

export async function createAccount(email, password, username) {
  try {
    const response = await axiosClient.post("/createAccount", {
      email,
      password,
      username,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
