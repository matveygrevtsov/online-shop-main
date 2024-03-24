import React from "react";
import { SignUpForm } from "./components/SignUpForm/";
import { useAppDispatch } from "../../store";
import { UserAuthCredentials } from "../../types";
import { userStoreActions } from "../../store/userSlice";
import { signUpAsyncThunk } from "../../store/userSlice/asyncThunks/signUpAsyncThunk";
import { useNotification } from "../../hooks/useNotification";

const { setLoading, setUserData, logout } = userStoreActions;

export const SignUpPage = () => {
  const dispatch = useAppDispatch();
  const notification = useNotification();

  const handleSubmit = (userAuthCredentials: UserAuthCredentials) => {
    dispatch(setLoading());

    dispatch(signUpAsyncThunk(userAuthCredentials))
      .unwrap()
      .then(
        () => {
          dispatch(
            setUserData({
              idsOfProductsInCart: [],
            })
          );
        },
        (error: any) => {
          notification.error({
            message: "Не удалось зарегистрироваться",
            description: JSON.stringify(error),
          });
          dispatch(logout());
        }
      );
  };

  return <SignUpForm onSubmit={handleSubmit} />;
};
