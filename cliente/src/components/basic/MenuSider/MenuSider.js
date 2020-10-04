import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Layout, Menu } from "antd";
import { HomeOutlined, GoldOutlined } from "@ant-design/icons";
import "./MenuSider.scss";

function MenuSider(props) {
  const { menuCollapsed, location } = props;
  const { Sider } = Layout;

  return (
    <Sider className="basic-sider" collapsed={menuCollapsed}>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={[location.pathname]}
      >
        <Menu.Item key="/">
          <Link to={"/"}>
            <HomeOutlined />
            <span className="nav-text">Home</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="/basic/resources">
          <Link to={"/basic/resources"}>
            <GoldOutlined />
            <span className="nac-text">Recursos</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="/basic/spaces">
          <Link to={"/basic/spaces"}>
            <GoldOutlined />
            <span className="nac-text">Espacios</span>
          </Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

export default withRouter(MenuSider);
