import axios from 'axios';

const API_BASE_URL = "http://localhost:8080";

//defines a function called frameToken that takes in a single argument token and returns a string in the format "Bearer [token]".
const frameToken = (token) => `Bearer ${token}`;

const frameResponse = (
    reqStatus = 0,
    reqPayLoad = "Invalid request. Please try again later."
) => {
    return {
        status: reqStatus,
        payLoad: reqPayLoad,
    };
};

export const registerApi = async (username, password, emailId, firstName, lastName, phone) => {

    let response = frameResponse();

    try {
      //sign up API from backend
        const url = `${API_BASE_URL}/user/signup`;
        //axios makes a post request to the sign up API with request body 
        const apiResponse = await axios.post(url, { username, password, emailId, firstName, lastName, phone });
        if (apiResponse.status === 200) {
            response = frameResponse(1);
        }

    }
    catch (err) {
        if (err.response) {
            response = frameResponse(0, err.response.data.message);
        }
        console.log(err);
    }
    finally {
        return response;
    }
}