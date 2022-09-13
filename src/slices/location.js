import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import locationAPI from "../services/locationAPI";

const initialState = {
  locations: [],
  isLoading: false,
  error: null,
  locationDetail: [],
};

export const getLocationShowing = createAsyncThunk(
  "locations/getLocationShowing",
  async (keyword) => {
    try {
      const data = await locationAPI.getLocationShowing();
      if (keyword) {
        let result = data.data.filter(({ name }) =>
          name?.toLowerCase().includes(keyword.toLowerCase())
        );
        return result;
      }
      return data.data;
    } catch (error) {
      throw error;
    }
  }
);

export const getLocationDetail = createAsyncThunk(
  "locations/getLocationDetail",
  async (id) => {
    try {
      const data = await locationAPI.getLocationDetail(id);

      return data.data;
    } catch (error) {
      throw error;
    }
  }
);

export const updateLocation = createAsyncThunk(
  "locations/updateLocation",
  async (dataUpdate) => {
    try {
      const data = await locationAPI.updateLocation(dataUpdate);
      alert("Cập nhật vị trí thành công");
      return data.data;
    } catch (error) {
      throw error;
    }
  }
);

export const updateLocationImage = createAsyncThunk(
  "locations/updateLocationImage",
  async (dataUpdate) => {
    try {
      const data = await locationAPI.updateLocationImage(dataUpdate);
      alert("Cập nhật ảnh vị trí thành công");
      return data.data;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteLocation = createAsyncThunk(
  "locations/deleteLocation",
  async (id) => {
    try {
      const data = await locationAPI.deleteLocation(id);
      alert("Xóa vị trí thành công");
      return data.data;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteAndThenGet = (params) => async (dispatch) => {
  await dispatch(deleteLocation(params));
  return await dispatch(getLocationShowing());
};

export const addLocation = createAsyncThunk(
  "locations/addLocation",
  async (dataAdd) => {
    try {
      const data = await locationAPI.addLocation(dataAdd);
      alert("Thêm vị trí thành công");
      return data.data;
    } catch (error) {
      throw error;
    }
  }
);

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // --- Xử lý trong reducer với case pending / fulfilled / rejected ---
    builder
      .addCase(getLocationShowing.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLocationShowing.fulfilled, (state, action) => {
        state.isLoading = false;
        state.locations = action.payload;
      })
      .addCase(getLocationShowing.rejected, (state, { error }) => {
        state.isLoading = false;
        state.error = error;
      })

      .addCase(getLocationDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLocationDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.locationDetail = action.payload;
      })
      .addCase(getLocationDetail.rejected, (state, { error }) => {
        state.isLoading = false;
        state.error = error;
      })

      .addCase(updateLocation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateLocation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.locationDetail = action.payload;
      })
      .addCase(updateLocation.rejected, (state, { error }) => {
        state.isLoading = false;
        state.error = error;
      });
  },
});

export default locationSlice.reducer;
