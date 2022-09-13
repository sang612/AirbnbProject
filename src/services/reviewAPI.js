import axiosClient, { axiosClientForUpdate } from "./axiosClient";

const reviewAPI = {
  getReviewByRoomId: (roomId) => {
    return axiosClient.get(`reviews/byRoom?roomId=${roomId}`);
  },

  updateReview: (data) => {
    return axiosClientForUpdate.put(`reviews/${data.id}`, data.content);
  },

  deleteReview: (id) => {
    return axiosClientForUpdate.delete(`reviews/${id}`);
  },

  getReviewList: () => {
    return axiosClient.get(`reviews/byRoom`);
  },
};

export default reviewAPI;
