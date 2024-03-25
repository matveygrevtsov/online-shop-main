import Title from "antd/es/typography/Title";
import React, { Suspense, lazy } from "react";

// @ts-ignore
const RemoteCart = lazy(() => import("cart/Cart"));

export const CartPage = () => {
  return (
    <>
      <Title>Корзина</Title>

      <Suspense>
        <RemoteCart />
      </Suspense>
    </>
  );
};
