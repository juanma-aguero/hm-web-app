import React from "react";
import { Layout, theme } from "antd";
import MainMenu from "./MainMenu";
import Image from "next/image";
import appLogo from "../../public/images/hiremancer_logo_01.png";

const { Header, Content, Footer } = Layout;

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
          backgroundColor: colorBgContainer,
        }}
      >
        <div
          style={{
            height: 50,
            margin: 16,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Image src={appLogo} alt="Picture of the author" width={50} />
        </div>

        <MainMenu />
      </Header>

      <Content className="site-layout" style={{ padding: "0 70px" }}>
        <div
          style={{
            padding: 24,
            background: "#f5f5f5",
          }}
        >
          {children}
        </div>
      </Content>

      <Footer style={{ textAlign: "center" }}>Hiremancer 2023</Footer>
    </Layout>
  );
}
