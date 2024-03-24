import { createAsyncThunk } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "../../../firebase";
import { UserAuthCredentials } from "../../../types";
import { AuthorizedUserData, userStoreActions } from "..";

const { setLoading, setUserData } = userStoreActions;

export const signUpAsyncThunk = createAsyncThunk<void, UserAuthCredentials>(
  "user/signUp",
  async function ({ email, password }, thunkAPI) {
    thunkAPI.dispatch(setLoading());

    try {
      await createUserWithEmailAndPassword(firebaseAuth, email, password);

      const userData: AuthorizedUserData = {
        idsOfProductsInCart: [],
      };

      thunkAPI.dispatch(setUserData(userData));
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
