import React from "react";
import { Layout, Tabs } from "antd";
import { Redirect, Route } from "react-router-dom";
import LayoutAdmin from "../../layouts/layoutAdmin";
import LayoutBasic from "../../layouts/layoutBasic";
import jwtDecode from "jwt-decode";
import Logo from "../../assets/img/png/sirius.png";
import RegisterForm from "../admin/RegisterForm";
import LoginForm from "../admin/LoginForm";
import { getAccessTokenApi } from "../../api/auth";

import "./SignIn.scss";

export default function SignIn() {
  const { Content } = Layout;
  const { TabPane } = Tabs;

  const token = getAccessTokenApi();
  if (token) {
    const userDecode = jwtDecode(token);

    if (userDecode["role"] === "admin") {
      return (
        <>
          <Route path="/admin" component={LayoutAdmin} />
          <Redirect to="/admin" />;
        </>
      );
    } else if (userDecode["role"] === "basic") {
      return (
        <>
          <Route path="/basic" component={LayoutBasic} />
          <Redirect to="/basic" />;
        </>
      );
    }
  }

  return (
    <Layout className="sign-in">
      <Content className="sign-in__content">
        {/* <h1 className="sign-in__content-logo">
          <img width="30%" height="30%" src={Logo} alt="jorx" />
        </h1> */}
        <div className="sign-in__content-tabs">
          <Tabs type="card">
            <TabPane tab={<span>Entrar</span>} key="1">
              <LoginForm />
            </TabPane>
            <TabPane tab={<span>Nuevo Usuario</span>} key="2">
              <RegisterForm />
            </TabPane>
          </Tabs>
        </div>
      </Content>
    </Layout>
  );
}
