import axios from "axios";
export default axios.create({
  baseURL: "http://localhost:3000/"
  // baseURL: "https://david-app-backend.herokuapp.com/"
});

// export const axiosMod = axios.create({
//   baseURL: "http://localhost:3000/"
// //baseURL: "https://david-app-backend.herokuapp.com/"
// })