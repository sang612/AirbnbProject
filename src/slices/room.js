import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import roomAPI from "../services/roomAPI";

const initialState = {
  rooms: [],
  roomDetail: [],
  listRoomRandom: [],
  isLoading: false,
  error: null,
};

export const getRooms = createAsyncThunk("rooms/getRooms", async (keyword) => {
  try {
    const data = await roomAPI.getRooms();
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
});

export const getRoomByLocationId = createAsyncThunk(
  "rooms/getRoomByLocationId",
  async (locationId) => {
    try {
      const data = await roomAPI.getRoomByLocationId(locationId);
      return data.data;
    } catch (error) {
      throw error;
    }
  }
);

export const getRoomDetail = createAsyncThunk(
  "rooms/getRoomDetail",
  async (roomId) => {
    try {
      const data = await roomAPI.getRoomDetail(roomId);
      return data.data;
    } catch (error) {
      throw error;
    }
  }
);

export const bookingRoom = createAsyncThunk(
  "rooms/bookingRoom",
  async (info) => {
    try {
      const data = await roomAPI.bookingRoom(info);
      alert("Booking thành công!");
      return data.data;
    } catch (error) {
      throw error;
    }
  }
);

export const createReview = createAsyncThunk(
  "rooms/createReview",
  async (dataReview) => {
    try {
      const data = await roomAPI.createReview(dataReview);
      alert("Viết đánh giá thành công!");
      return data.data;
    } catch (error) {
      throw error;
    }
  }
);

export const updateRoom = createAsyncThunk(
  "rooms/updateRoom",
  async (dataUpdate) => {
    try {
      const data = await roomAPI.updateRoom(dataUpdate);
      alert("Cập nhật thành công!");
      return data.data;
    } catch (error) {
      throw error;
    }
  }
);

export const updateRoomImage = createAsyncThunk(
  "rooms/updateRoomImage",
  async (dataUpdate) => {
    try {
      const data = await roomAPI.updateRoomImage(dataUpdate);
      alert("Cập nhật ảnh phòng thành công");
      return data.data;
    } catch (error) {
      throw error;
    }
  }
);

export const createRoom = createAsyncThunk(
  "rooms/createRoom",
  async (dataCreate) => {
    try {
      const data = await roomAPI.createRoom(dataCreate);
      alert("Tạp vị trí thành công!");
      return data.data;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteRoom = createAsyncThunk("rooms/deleteRoom", async (id) => {
  try {
    const data = await roomAPI.deleteRoom(id);
    alert("Xóa vị trí thành công!");
    return data.data;
  } catch (error) {
    throw error;
  }
});

export const deleteAndThenGetRoom = (params) => async (dispatch) => {
  await dispatch(deleteRoom(params));
  return await dispatch(getRooms());
};

const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // --- Xử lý trong reducer với case pending / fulfilled / rejected ---
    builder

      .addCase(getRooms.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRooms.fulfilled, (state, action) => {
        state.isLoading = false;
        state.rooms = action.payload;
      })
      .addCase(getRooms.rejected, (state, { error }) => {
        state.isLoading = false;
        state.error = error;
      })

      .addCase(getRoomByLocationId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRoomByLocationId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.rooms = action.payload;
      })
      .addCase(getRoomByLocationId.rejected, (state, { error }) => {
        state.isLoading = false;
        state.error = error;
      })

      .addCase(getRoomDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRoomDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.roomDetail = action.payload;
      })
      .addCase(getRoomDetail.rejected, (state, { error }) => {
        state.isLoading = false;
        state.error = error;
      })

      .addCase(bookingRoom.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(bookingRoom.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(bookingRoom.rejected, (state, { error }) => {
        state.isLoading = false;
        state.error = error;
      })

      .addCase(createReview.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(createReview.rejected, (state, { error }) => {
        state.isLoading = false;
        state.error = error;
      });
  },
});

export default roomSlice.reducer;
