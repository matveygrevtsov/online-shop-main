import { createAsyncThunk } from "@reduxjs/toolkit";
import { firebaseAuth } from "../../../firebase";
import { userStoreActions } from "..";

const { setLoading, logout } = userStoreActions;

export const logOutAsyncThunk = createAsyncThunk<void, void>(
  "user/logOut",
  async function (_, thunkAPI) {
    thunkAPI.dispatch(setLoading());

    return firebaseAuth.signOut().finally(() => {
      thunkAPI.dispatch(logout());
    });
  }
);
