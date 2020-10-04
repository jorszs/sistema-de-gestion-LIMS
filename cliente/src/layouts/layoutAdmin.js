import React, { useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Layout } from "antd";
import useAuth from "../hooks/useAuth";
import MenuTop from "../components/menuTop";
import MenuSider from "../components/admin/MenuSider";
import SignIn from "../components/SignIn";

import "./LayoutAdmin.scss";

export default function LayoutAdmin(props) {
  const { routes } = props;
  const [menuCollapsed, setMenuCollapsed] = useState(false);
  const { Header, Content, Footer } = Layout;
  // eslint-disable-next-line no-unused-vars
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
    if (user["role"] !== "admin") {
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
            className="layout-admin"
            style={{ marginLeft: menuCollapsed ? "80px" : "200px" }}
          >
            <Header className="layout-admin__header">
              <MenuTop
                menuCollapsed={menuCollapsed}
                setMenuCollapsed={setMenuCollapsed}
              />
            </Header>
            <Content className="layout-admin__content">
              <LoadRoutes routes={routes} />
            </Content>
            <Footer className="layout-admin__footer">
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
  //saca routes de los props
  //const {routes} = props;
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
