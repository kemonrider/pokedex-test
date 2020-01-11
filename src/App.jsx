import React from "react";
import { Layout, Menu } from "antd";
import "./App.css";
import HomeScreen from "./screen/home";

function App() {
  return (
    <Layout>
      <Layout.Header style={{ position: "sticky", top: 0, zIndex: 10 }}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["home"]}
          style={{ lineHeight: "64px" }}
        >
          <Menu.Item key="home">Home</Menu.Item>
          {/* <Menu.Item key="about">About</Menu.Item> */}
        </Menu>
      </Layout.Header>
      <Layout.Content style={{ padding: "50px" }}>
        <HomeScreen />
      </Layout.Content>
      <Layout.Footer style={{ textAlign: "center" }}>
        Pokedex Sample
      </Layout.Footer>
    </Layout>
  );
}

export default App;
