import axios from "axios";

const instance = axios.create({
  baseURL: "https://burger-builder-77540.firebaseio.com/"
});

export default instance;
