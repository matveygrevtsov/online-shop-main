import AntdLayout, { Content, Footer } from "antd/es/layout/layout";
import React, { FC, PropsWithChildren } from "react";
import { Header } from "../Header";

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <AntdLayout
      style={{
        minHeight: "100vh",
      }}
    >
      <Header />

      <Content
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "32px",
        }}
      >
        {children}
      </Content>

      <Footer style={{ textAlign: "center" }}>
        ONLINE-SHOP ©{new Date().getFullYear()}
      </Footer>
    </AntdLayout>
  );
};
