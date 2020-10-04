import React from "react";

import Logo from "../../assets/img/png/sirius-logo.png";
import { Image } from "antd";
import { ACCESS_TOKEN } from "../../utils/constants";
import jwtDecode from "jwt-decode";

import "./admin.scss";
export default function Admin() {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  const accessTokenDecoded = jwtDecode(accessToken);
  return (
    <div>
      <div className="admin">
        <div>
          <Image src={Logo} />
        </div>
        <div className="admin-info">
          <h2>
            Hola {accessTokenDecoded.name}, Bienvenido al sistema de Gestion
            SIRIUS
          </h2>
          <h3>Aqui podras gestionar reservas, usuarios.</h3>
          <h3>Administrar recursos y espacios</h3>
        </div>
      </div>
    </div>
  );
}
