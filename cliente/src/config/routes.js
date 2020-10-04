//Layout
import LayoutAdmin from "../layouts/layoutAdmin";
import LayoutBasic from "../layouts/layoutBasic";

//principal page
import Signin from "../components/SignIn"; //"../pages/Admin/SignIn";

//Profile page
import Profile from "../pages/Profile";

//Admin pages
import AdminHome from "../pages/Admin";
import AdminUsers from "../pages/Admin/users";
import AdminResources from "../pages/Admin/resources";
import AdminSpaces from "../pages/Admin/spaces";
import AdminPdf from "../pages/Admin/report";

//pages
import Home from "../pages/Home";
import Contact from "../pages/Basic/Contact";
//import Resources from "../pages/Basic/Resources/Resources";

//others
import Error404 from "../pages/Error404";

const routes = [
  {
    path: "/login",
    exact: true,
    component: Signin,
  },
  {
    path: "/admin",
    exact: false,
    component: LayoutAdmin,
    routes: [
      {
        path: "/admin",
        exact: true,
        component: AdminHome,
      },
      {
        path: "/admin/users",
        exact: true,
        component: AdminUsers,
      },
      {
        path: "/admin/resources",
        component: AdminResources,
        exact: true,
      },
      {
        path: "/admin/spaces",
        component: AdminSpaces,
        exact: true,
      },
      {
        path: "/admin/profile",
        component: Profile,
        exact: true,
      },
      {
        path: "/admin/reporte",
        component: AdminPdf,
        exact: true,
      },
      {
        component: Error404,
      },
    ],
  },
  {
    path: "/basic",
    exact: false,
    component: LayoutBasic,
    routes: [
      {
        path: "/basic",
        component: Home,
        exact: true,
      },
      {
        path: "/basic/contact",
        component: Contact,
        exact: true,
      },
      {
        path: "/basic/resources", //prestamo
        component: AdminResources,
        exact: true,
      },
      {
        path: "/basic/spaces", //prestamo
        component: AdminSpaces,
        exact: true,
      },
      {
        path: "/basic/profile",
        component: Profile,
        exact: true,
      },
      {
        component: Error404,
      },
    ],
  },
  {
    //path principla o home (por ahora redireccionaremos a login)
    // si queremos despues hacemos una pagina de bienvenida
    path: "/",
    exact: false,
    component: Signin,
    routes: [
      {
        component: Error404,
      },
    ],
  },
];

export default routes;
