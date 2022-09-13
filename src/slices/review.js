import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import reviewAPI from "../services/reviewAPI";

const initialState = {
  reviews: [],
  isLoading: false,
  error: null,
};

export const getReviewByRoomId = createAsyncThunk(
  "locations/getReviewByRoomId",
  async (roomId) => {
    try {
      const data = await reviewAPI.getReviewByRoomId(roomId);
      return data.data;
    } catch (error) {
      throw error;
    }
  }
);

export const updateReview = createAsyncThunk(
  "locations/updateReview",
  async (dataUpdate) => {
    try {
      const data = await reviewAPI.updateReview(dataUpdate);
      alert("Cập nhật đánh giá thành công");
      return data.data;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteReview = createAsyncThunk(
  "locations/deleteReview",
  async (id) => {
    try {
      const data = await reviewAPI.deleteReview(id);
      alert("Xóa đánh giá thành công");
      return data.data;
    } catch (error) {
      throw error;
    }
  }
);

const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // --- Xử lý trong reducer với case pending / fulfilled / rejected ---
    builder

      .addCase(getReviewByRoomId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getReviewByRoomId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = action.payload;
      })
      .addCase(getReviewByRoomId.rejected, (state, { error }) => {
        state.isLoading = false;
        state.error = error;
      });
  },
});

export default reviewSlice.reducer;
