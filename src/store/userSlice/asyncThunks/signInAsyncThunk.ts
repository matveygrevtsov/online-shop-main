import { createAsyncThunk } from "@reduxjs/toolkit";
import { signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "../../../firebase";
import { UserAuthCredentials } from "../../../types";
import { AuthorizedUserData, userStoreActions } from "..";

const { setLoading, setUserData } = userStoreActions;

export const signInAsyncThunk = createAsyncThunk<void, UserAuthCredentials>(
  "user/signIn",
  async function ({ email, password }, thunkAPI) {
    thunkAPI.dispatch(setLoading());

    try {
      await signInWithEmailAndPassword(firebaseAuth, email, password);

      const userData: AuthorizedUserData = {
        idsOfProductsInCart: [],
      };

      thunkAPI.dispatch(setUserData(userData));
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
