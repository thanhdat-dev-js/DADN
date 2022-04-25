import Axios from "axios";

export const API = Axios.create({ baseURL: "http://192.168.111.242:8000" });
