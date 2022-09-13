import axiosClient from "./axiosClient";

const authAPI = {
  register: (userData) => {
    return axiosClient.post(`auth/register`, userData);
  },

  login: (userData) => {
    return axiosClient.post(`auth/login`, userData);
  },

 
};

export default authAPI;
