import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userAPI from "../services/userAPI";

const initialState = {
  user: [],
  isLoading: false,
  error: "",
  userList: [],
};

export const updateUser = createAsyncThunk("user/update", async (userData) => {
  try {
    const data = await userAPI.update(userData);
    alert("Cập nhật thành công!");

    return data.data;
  } catch (error) {
    throw error;
  }
});

export const getCurrentUser = createAsyncThunk(
  "user/getCurrentUser",
  async () => {
    try {
      const data = await userAPI.getCurrentUser();
      return data.data;
    } catch (error) {
      throw error;
    }
  }
);

export const updateAvatar = createAsyncThunk(
  "user/updateAvatar",
  async (image) => {
    try {
      const data = await userAPI.updateAvatar(image);
      alert("Cập nhật avatar thành công!");

      return data.data;
    } catch (error) {
      throw error;
    }
  }
);

export const getUserList = createAsyncThunk(
  "user/getUserList",
  async (keyword) => {
    try {
      const data = await userAPI.getUserList();
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

export const getUserDetail = createAsyncThunk(
  "user/getUserDetail",
  async (id) => {
    try {
      const data = await userAPI.getUserDetail(id);
      return data.data;
    } catch (error) {
      throw error;
    }
  }
);

export const updateAdmin = createAsyncThunk(
  "user/updateAdmin",
  async (updateData) => {
    try {
      const data = await userAPI.updateAdmin(updateData);
      alert("Cập nhật người dùng thành công!");

      return data.data;
    } catch (error) {
      throw error;
    }
  }
);

export const createAdmin = createAsyncThunk(
  "user/createAdmin",
  async (updateData) => {
    try {
      const data = await userAPI.createAdmin(updateData);
      alert("Tạo người dùng thành công!");

      return data.data;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (id) => {
    try {
      const data = await userAPI.deleteUser(id);
      alert("Xóa người dùng thành công!");

      return data.data;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteAndThenGetUser = (params) => async (dispatch) => {
  await dispatch(deleteUser(params));
  return await dispatch(getUserList());
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // --- Xử lý trong reducer với case pending / fulfilled / rejected ---
    builder
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, { error }) => {
        state.isLoading = false;
        state.error = error;
      })

      .addCase(getCurrentUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(getCurrentUser.rejected, (state, { error }) => {
        state.isLoading = false;
        state.error = error;
      })

      .addCase(updateAvatar.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAvatar.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(updateAvatar.rejected, (state, { error }) => {
        state.isLoading = false;
        state.error = error;
      })

      .addCase(getUserList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userList = action.payload;
      })
      .addCase(getUserList.rejected, (state, { error }) => {
        state.isLoading = false;
        state.error = error;
      })

      .addCase(getUserDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(getUserDetail.rejected, (state, { error }) => {
        state.isLoading = false;
        state.error = error;
      });
  },
});

export default userSlice.reducer;
