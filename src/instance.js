import axios from "axios";

export const API_HOST =
  process.env.NODE_ENV === "production" ? "prod url here" : "localhost:8000";
export const instance = axios.create({
  baseURL: `http${
    process.env.NODE_ENV === "production" ? "s" : ""
  }://${API_HOST}`,
  withCredentials: true,

  xsrfHeaderName: "X-CSRFToken",
  xsrfCookieName: "csrftoken",
});
