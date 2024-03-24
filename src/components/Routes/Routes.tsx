import React from "react";
import { Route, Routes as ReactRouterDomRoutes } from "react-router-dom";
import { useAppSelector } from "../../store";
import { CartPage } from "../../pages/CartPage/CartPage";
import { MainPage } from "../../pages/MainPage/MainPage";
import { SignInPage } from "../../pages/SignInPage/SignInPage";
import { SignUpPage } from "../../pages/SignUpPage/SignUpPage";
import { RoutePath } from "../../types";
import { Spin } from "antd";
import { useAuth } from "../../hooks/useAuth";
import { Layout } from "../Layout";

export const Routes = () => {
  useAuth();
  const userStatus = useAppSelector((store) => store.user.status);

  switch (userStatus) {
    case "success": {
      return (
        <Layout>
          <ReactRouterDomRoutes>
            <Route path={RoutePath.Cart} element={<CartPage />} />
            <Route path="*" element={<MainPage />} />
          </ReactRouterDomRoutes>
        </Layout>
      );
    }

    case "guest": {
      return (
        <Layout>
          <ReactRouterDomRoutes>
            <Route path={RoutePath.SingUp} element={<SignUpPage />} />
            <Route path="*" element={<SignInPage />} />
          </ReactRouterDomRoutes>
        </Layout>
      );
    }

    default: {
      return <Spin size="large" fullscreen />;
    }
  }
};
