import React from "react";
import { SignUpForm } from "./components/SignUpForm/";
import { useAppDispatch } from "../../store";
import { UserAuthCredentials } from "../../types";
import { signUpAsyncThunk } from "../../store/userSlice/asyncThunks/signUpAsyncThunk";
import Title from "antd/es/typography/Title";

export const SignUpPage = () => {
  const dispatch = useAppDispatch();

  const handleSubmit = (userAuthCredentials: UserAuthCredentials) => {
    dispatch(signUpAsyncThunk(userAuthCredentials));
  };

  return (
    <>
      <Title>Зарегистрироваться</Title>

      <SignUpForm onSubmit={handleSubmit} />
    </>
  );
};
