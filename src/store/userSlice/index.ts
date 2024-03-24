import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import z from "zod";
import { ELocalStorageKey } from "../../types";

export const AuthorizedUserDataSchema = z.object({
  idsOfProductsInCart: z.array(z.string()),
});

type AuthorizedUserData = z.infer<typeof AuthorizedUserDataSchema>;

export const UserStateSchema = z.union([
  z.object({
    status: z.union([z.literal("loading"), z.literal("guest")]),
  }),
  z.object({
    status: z.literal("success"),
    userData: AuthorizedUserDataSchema,
  }),
]);

type UserState = z.infer<typeof UserStateSchema>;

const initialState = {
  status: "loading",
} as UserState;

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout() {
      window.localStorage.clear();

      return {
        status: "guest",
      };
    },
    setUserData(_, action: PayloadAction<AuthorizedUserData>) {
      const userData = action.payload;

      window.localStorage.setItem(
        ELocalStorageKey.UserData,
        JSON.stringify(userData)
      );

      return {
        status: "success",
        userData,
      };
    },
    setLoading() {
      return {
        status: "loading",
      };
    },
  },
  extraReducers: (builder) => {},
});

export const userStoreActions = slice.actions;

export const userReducer = slice.reducer;