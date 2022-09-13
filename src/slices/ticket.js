import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ticketAPI from "../services/ticketAPI";

const initialState = {
  ticketList: [],
  ticketDetail: {},
};

export const getTicketByUserId = createAsyncThunk(
  "ticket/getTicketByUserId",
  async (userId) => {
    try {
      const data = await ticketAPI.getTicketByUserId(userId);
      return data.data;
    } catch (error) {
      throw error;
    }
  }
);

export const getTicketList = createAsyncThunk(
  "ticket/getTicketList",
  async (keyword) => {
    try {
      const data = await ticketAPI.getTicketList();
      if (keyword) {
        let resultbyName = data.data.filter((t) =>
          t.userId?.name?.toLowerCase().includes(keyword.toLowerCase())
        );

        let resultbyHotelName = data.data.filter((t) =>
          t.roomId?.name?.toLowerCase().includes(keyword.toLowerCase())
        );
        let result = resultbyName.concat(resultbyHotelName);
        console.log(result);
        return result;
      }
      return data.data;
    } catch (error) {
      throw error;
    }
  }
);



export const getTicketById = createAsyncThunk(
  "ticket/getTicketById",
  async (id) => {
    try {
      const data = await ticketAPI.getTicketById(id);
      return data.data;
    } catch (error) {
      throw error;
    }
  }
);

export const updateTicket = createAsyncThunk(
  "ticket/updateTicket",
  async (dataUpdate) => {
    try {
      const data = await ticketAPI.updateTicket(dataUpdate);
      alert("Cập nhật thông tin vé thành công!");
      return data.data;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteTicket = createAsyncThunk(
  "ticket/deleteTicket",
  async (id) => {
    try {
      const data = await ticketAPI.deleteTicket(id);
      alert("Xóa vé thành công!");
      return data.data;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteAndThenGetTickets = (params) => async (dispatch) => {
  await dispatch(deleteTicket(params));
  return await dispatch(getTicketList());
};

export const createTicket = createAsyncThunk(
  "ticket/createTicket",
  async (dataCreate) => {
    try {
      const data = await ticketAPI.createTicket(dataCreate);
      alert("Tạo vé thành công!");
      return data.data;
    } catch (error) {
      throw error;
    }
  }
);

const ticketSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // --- Xử lý trong reducer với case pending / fulfilled / rejected ---
    builder
      .addCase(getTicketByUserId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTicketByUserId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ticketList = action.payload;
      })
      .addCase(getTicketByUserId.rejected, (state, { error }) => {
        state.isLoading = false;
        state.error = error;
      })

      .addCase(getTicketList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTicketList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ticketList = action.payload;
      })
      .addCase(getTicketList.rejected, (state, { error }) => {
        state.isLoading = false;
        state.error = error;
      })

      .addCase(getTicketById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTicketById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ticketDetail = action.payload;
      })
      .addCase(getTicketById.rejected, (state, { error }) => {
        state.isLoading = false;
        state.error = error;
      });
  },
});

export default ticketSlice.reducer;
