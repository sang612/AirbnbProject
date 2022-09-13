import axiosClient, { axiosClientForUpdate } from "./axiosClient";

const roomAPI = {
  getRooms: () => {
    return axiosClient.get(`rooms`);
  },
  getRoomByLocationId: (locationId) => {
    return axiosClient.get(`rooms?locationId=${locationId}`);
  },

  getRoomDetail: (roomId) => {
    return axiosClient.get(`rooms/${roomId}`);
  },

  bookingRoom: (info) => {
    return axiosClient.post(`rooms/booking`, info);
  },

  createReview: (data) => {
    return axiosClient.post(`reviews?roomId=${data.roomId}`, data.content);
  },

  updateRoom: (data) => {
    return axiosClientForUpdate.put(`rooms/${data.id}`, data);
  },

  updateRoomImage: (data) => {
    return axiosClientForUpdate.post(`rooms/upload-image/${data.get("id")}`, data.room);
  },

  createRoom: (data) => {
    return axiosClientForUpdate.post(`rooms`, data);
  },

  deleteRoom: (id) => {
    return axiosClientForUpdate.delete(`rooms/${id}`);
  },
};

export default roomAPI;
