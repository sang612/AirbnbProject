import { configureStore } from "@reduxjs/toolkit";
import location from "./slices/location";
import room from "./slices/room";
import review from "./slices/review";
import auth from "./slices/auth";
import user from "./slices/user";
import ticket from "./slices/ticket";

export const store = configureStore({
  reducer: {
    location,
    room,
    review,
    auth,
    user,
    ticket,
  },
});
