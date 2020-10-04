import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Layout, Menu } from "antd";
import { HomeOutlined, UserOutlined, GoldOutlined } from "@ant-design/icons";
import "./MenuSider.scss";

function MenuSider(props) {
  const { menuCollapsed, location } = props;
  const { Sider } = Layout;

  return (
    <Sider className="admin-sider" collapsed={menuCollapsed}>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={[location.pathname]}
      >
        <Menu.Item key="/admin">
          <Link to={"/admin"}>
            <HomeOutlined />
            <span className="nav-text">Home</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="/admin/users">
          <Link to={"/admin/users"}>
            <UserOutlined />
            <span className="nac-text">usuarios</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="/admin/resources">
          <Link to={"/admin/resources"}>
            <GoldOutlined />
            <span className="nac-text">Recursos</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="/admin/spaces">
          <Link to={"/admin/spaces"}>
            <GoldOutlined />
            <span className="nac-text">Espacios</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="/admin/reporte">
          <Link to={"/admin/reporte"}>
            <GoldOutlined />
            <span className="nac-text">Reporte</span>
          </Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

export default withRouter(MenuSider);
