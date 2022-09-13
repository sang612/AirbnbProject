import { userfromLocal } from "../utils/settings/config";
import axiosClient, { axiosClientForUpdate } from "./axiosClient";

const userAPI = {
  update: (userData) => {
    return axiosClientForUpdate.put(`users/${userfromLocal._id}`, userData);
  },

  getCurrentUser: () => {
    return axiosClient.get(`users/${userfromLocal._id}`);
  },

  updateAvatar: (image) => {
    return axiosClient.post(`users/upload-avatar`, image);
  },

  getUserList: () => {
    return axiosClient.get(`users`);
  },

  getUserDetail: (id) => {
    return axiosClient.get(`users/${id}`);
  },

  updateAdmin: (userData) => {
    return axiosClientForUpdate.put(`users/${userData.id}`, userData);
  },

  createAdmin: (userData) => {
    return axiosClientForUpdate.post(`users`, userData);
  },

  deleteUser: (id) => {
    return axiosClientForUpdate.delete(`users/${id}`);
  },
};

export default userAPI;
