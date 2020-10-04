import React, { useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Layout } from "antd";
import useAuth from "../hooks/useAuth";
import SignIn from "../components/SignIn";
import MenuTop from "../components/menuTop";
import MenuSider from "../components/basic/MenuSider";

import "./LayoutBasic.scss";

export default function LayoutBasic(props) {
  const { routes } = props;
  const [menuCollapsed, setMenuCollapsed] = useState(false);
  const { Header, Content, Footer } = Layout;

  const { user, isLoading } = useAuth();

  //si el usuario no esta logeadocy ya termino de cargar nos llevara a /login
  if (!user && !isLoading) {
    return (
      <>
        <Route path="/login" component={SignIn} />
        <Redirect to="/login" />
      </>
    );
  }

  if (user && !isLoading) {
    if (user["role"] !== "basic") {
      return (
        <>
          <Route path="/login" component={SignIn} />
          <Redirect to="/login" />
        </>
      );
    } else {
      return (
        <Layout>
          <MenuSider menuCollapsed={menuCollapsed} />
          <Layout
            className="layout-basic"
            style={{ marginLeft: menuCollapsed ? "80px" : "200px" }}
          >
            <Header className="layout-basic__header">
              <MenuTop
                menuCollapsed={menuCollapsed}
                setMenuCollapsed={setMenuCollapsed}
              />
            </Header>
            <Content className="layout-basic__content">
              <LoadRoutes routes={routes} />
            </Content>
            <Footer className="layout-basic__footer">
              Sirius Grupo de Investigacion
            </Footer>
          </Layout>
        </Layout>
      );
    }
  }

  return null;
}

function LoadRoutes({ routes }) {
  return (
    <Switch>
      {routes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          exact={route.exact}
          component={route.component}
        />
      ))}
    </Switch>
  );
}
