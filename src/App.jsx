import React from "react";
import { Layout, Menu } from "antd";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import "./App.css";
import HomeScreen from "./screen/home";

const client = new ApolloClient({
  uri: "https://graphql-pokemon.now.sh/"
});

function App() {
  return (
    <ApolloProvider client={client}>
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
    </ApolloProvider>
  );
}

export default App;
