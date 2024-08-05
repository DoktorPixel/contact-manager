import axios from "axios";

const API_KEY = "VlP9cwH6cc7Kg2LsNPXpAvF6QNmgZn";

const apiClient = axios.create({
  baseURL: "https://live.devnimble.com/api/v1",
  // "https://cors-anywhere.herokuapp.com/https://live.devnimble.com/api/v1",
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
});

export default apiClient;
