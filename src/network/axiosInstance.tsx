import axios from "axios"

const baseURL = process.env.REACT_APP_BOOK_BASE_URL
let token = localStorage.token;
if (!token) token = localStorage.token = Math.random().toString(36).substr(-8);

const instance = axios.create({
  baseURL,
  headers: {
    "Content-type": "application/json",
    "Authorization": token,
  }
})

export default instance
