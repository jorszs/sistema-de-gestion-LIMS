import React from "react";

import { Image, Layout } from "antd";
import Logo from "../assets/img/png/sirius-logo.png";
import { ACCESS_TOKEN } from "../utils/constants";
import jwtDecode from "jwt-decode";

import "./home.scss";

const { Content } = Layout;

export default function Home() {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  const accessTokenDecoded = jwtDecode(accessToken);

  return (
    <Layout className="home">
      <Content className="home-content">
        <Image src={Logo} />
        <div className="home-content-info">
          <h2>
            Hola {accessTokenDecoded.name}, Bienvenido al sistema de Gestion
            SIRIUS
          </h2>
          <h3>Aqui podras gestionar tus reservas en espacios y recursos</h3>
        </div>
      </Content>
      {/* <h1>Estamos en Home</h1> */}
    </Layout>
  );
}
