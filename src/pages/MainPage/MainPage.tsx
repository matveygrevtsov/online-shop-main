import React from "react";

import { ProductsList } from "./components";

import { MOCK_PRODUCTIONS } from "../../constants";
import Title from "antd/es/typography/Title";

export const MainPage = () => (
  <>
    <Title>Каталог</Title>

    <ProductsList products={MOCK_PRODUCTIONS} />
  </>
);
