import Axios from "axios";

export const API = Axios.create({ baseURL: "http://192.168.1.2:8000" });
