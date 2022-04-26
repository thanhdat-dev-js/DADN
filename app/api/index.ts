import Axios from "axios";

export const API = Axios.create({ baseURL: "http://172.20.10.18:8000" });
