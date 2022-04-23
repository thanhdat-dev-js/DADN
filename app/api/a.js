import Axios from "axios";

export const API = Axios.create({ baseURL: "http://172.20.12.39:8000" });

const request = () => {
  API.post("/users/login", {
    username: "TVP",
    password: "123",
  })
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
