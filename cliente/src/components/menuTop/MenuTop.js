import React, { useState, useEffect } from "react";
import { Button, Avatar, Tooltip } from "antd";
import { Link } from "react-router-dom";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PoweroffOutlined,
} from "@ant-design/icons";
import { getAccessTokenApi } from "../../api/auth";
import { getUserApi, getAvatarApi } from "../../api/user";
import SiriusLogo from "../../assets/img/png/sirius.png";
import NoAvatar from "../../assets/img/png/no-avatar.png";
import { logout } from "../../api/auth";
import jwt_decode from "jwt-decode";

//import Logo from '../../../assets/img/png/logo-white.png';

import "./MenuTop.scss";

export default function MenuTop(props) {
  const { menuCollapsed, setMenuCollapsed } = props;
  const [user, setUser] = useState("perfil");
  const [avatar, setAvatar] = useState(null);

  const accessToken = getAccessTokenApi();

  //decodificar el access token para obtener datos de usuario activo en la sesion
  useEffect(() => {
    var token_decoded = jwt_decode(accessToken);
    getUserApi(accessToken, token_decoded["id"]).then((response) => {
      if (response) {
        setUser(response["user"]);
      }
    });
  }, [accessToken]);

  //obtener avatar si existe
  useEffect(() => {
    if (user.avatar) {
      getAvatarApi(user.avatar).then((response) => {
        setAvatar(response);
      });
    } else {
      setAvatar(null);
    }
  }, [user]);

  const logoutUser = () => {
    logout();
    window.location.reload();
  };

  return (
    <div className="menu-top">
      <div className="menu-top__left">
        <Link to={"/"}>
          <img
            className="menu-top__left-logo"
            src={SiriusLogo}
            alt="sirius grupo de investigacion"
          />
        </Link>

        <Button type="link" onClick={() => setMenuCollapsed(!menuCollapsed)}>
          {menuCollapsed ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
        </Button>
      </div>
      <div className="menu-top__right">
        <Link
          to={{ pathname: `/${user["role"]}/profile`, state: { user: user } }}
        >
          <Tooltip title={user["name"] ? user["name"] : "Perfil"}>
            <Button
              className="menu-top-right__button"
              //type="primary"
              icon={
                <Avatar
                  className="menu-top-right__button-avatar"
                  src={avatar ? avatar : NoAvatar}
                />
              }
            ></Button>
          </Tooltip>
        </Link>
        <Button type="link" onClick={logoutUser}>
          <PoweroffOutlined />
        </Button>
      </div>
    </div>
  );
}
