import axios from "axios";
//import { apiURL } from "../config";

const api = axios.create({
    baseURL: 'http://localhost:3000' //CHANGE TO USE .ENV
})
//axios requests

//TODO: REFACTOR THIS INTO SERVICES FOLDER WITH ONE API SERVICE
//PER FILE... ex: createAccount.js in services or api folder
//createAccount
export async function createAccount(email, password) {
    try {
        const response = await api.post('/createAccount', {
            email, password
        })
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

//login
export async function login(email, password) {
    try {
        const response = await api.post('/login', {
            email, 
            password
        })
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

//update user
export async function getUserProfile(userID) {
    try {
        const response = await api.post('/getUserProfile', {
            user_id: userID
        })
        return response.data;
    } catch (error) {
        console.log(error)
    }
}
//update user
export async function updateUserProfile(userID, firstName, lastName, password) {
    try {
        console.log('in client req with ' + firstName + lastName + password)
        const response = await api.post('/updateUserProfile', {
            user_id: userID,
            first_name: firstName,
            last_name: lastName,
            password: password
        })
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

//create post
export async function createPost(title, date, first_name, description, grade, rating, user_id, imageURL) {
    try {
        // console.log('in client req with ' + title + 'image of ' + image)
        const response = await api.post('/createPost', {
            title, date, first_name, description, grade, rating, user_id, imageURL
        })
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

//get all posts
export async function getAllPosts(myPostsOnly){
    try {
        const response = await api.get('/getAllPosts');
        return response.data;
    } catch (error) {
        console.log(error)
    }
}
// /api/choice/:id', choice_controller.get_choice);
// When I go to .../api/choice/?id=1
export async function getAllPostsByUserID(user_id){
    try {
        const response = await api.get(`/getAllPostsByUserID/${user_id}`, {
            user_id
        });
        return response.data;
    } catch (error) {
        console.log(error)
    }
}