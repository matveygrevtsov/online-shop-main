import React from "react";
import { SignInForm } from "./components/SignInForm/";
import { UserAuthCredentials } from "../../types";
import { useAppDispatch } from "../../store";
import { signInAsyncThunk } from "../../store/userSlice/asyncThunks/signInAsyncThunk";

export const SignInPage = () => {
  const dispatch = useAppDispatch();

  const handleSubmit = (userAuthCredentials: UserAuthCredentials) => {
    dispatch(signInAsyncThunk(userAuthCredentials));
  };

  return <SignInForm onSubmit={handleSubmit} />;
};
