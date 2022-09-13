import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authAPI from "../services/authAPI";

const initialState = {
  user: [],
  isLoading: false,
  error: "",
};

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData) => {
    try {
      const data = await authAPI.register(userData);
      alert("Đăng ký thành công!");
      return data.data;
    } catch (error) {
      throw error;
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      const data = await authAPI.login(userData);
      alert("Đăng nhập thành công!");
     
      localStorage.setItem("user", JSON.stringify(data.data.user));
      localStorage.setItem("token", JSON.stringify(data.data.token));
      window.location.href = "/";
      return data.data;
    } catch (error) {
      //  error.response?.data.message;
      // console.log(rejectWithValue(error.response?.data.message));
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response?.data.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // --- Xử lý trong reducer với case pending / fulfilled / rejected ---
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, { error }) => {
        state.isLoading = false;
        state.error = error;
      })

      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.error = action.payload;
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
