import { axiosClient } from "./api";

export async function createPost(title, date, username, description, grade, rating, user_id, imageURL) {
  try {
    const response = await axiosClient.post("/createPost", {
      title,
      date,
      username,
      description,
      grade,
      rating,
      user_id,
      imageURL,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
