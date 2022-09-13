import axiosClient, { axiosClientForUpdate } from "./axiosClient";

const locationAPI = {
  getLocationShowing: (name) => {
    return axiosClientForUpdate.get("locations");
  },

  getLocationDetail: (id) => {
    return axiosClientForUpdate.get(`locations/${id}`);
  },

  updateLocation: (data) => {
    return axiosClientForUpdate.put(`locations/${data.id}`, data);
  },

  updateLocationImage: (data) => {
    // console.log(data);
    return axiosClientForUpdate.post(
      `locations/upload-images/${data.get("id")}`,
      data
    );
  },

  deleteLocation: (id) => {
    return axiosClientForUpdate.delete(`locations/${id}`);
  },

  addLocation: (data) => {
    return axiosClientForUpdate.post(`locations`, data);
  },
};

export default locationAPI;
