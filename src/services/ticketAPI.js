import axiosClient from "./axiosClient";

const ticketAPI = {
  getTicketByUserId: (userId) => {
    return axiosClient.get(`tickets/by-user?userId=${userId}`);
  },

  getTicketList: () => {
    return axiosClient.get(`tickets`);
  },

  getTicketById: (Id) => {
    return axiosClient.get(`tickets/${Id}`);
  },

  updateTicket: (data) => {
    return axiosClient.put(`tickets/${data.id}`, data);
  },

  deleteTicket: (id) => {
    return axiosClient.delete(`tickets/${id}`);
  },

  createTicket: (data) => {
    return axiosClient.post(`tickets`, data);
  },
  
};

export default ticketAPI;
