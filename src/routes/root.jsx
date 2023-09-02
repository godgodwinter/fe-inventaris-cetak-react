import {
  Outlet,
  Link,
  RouterProvider,
  Router,
  Route,
  RootRoute,
  useParams,
  Navigate,
} from "@tanstack/react-router";

// !Pages
import HomeIndex from "../pages/home/HomeIndex";
import HomeAbout from "../pages/home/HomeAbout";
import NotFound from "../pages/home/404";
import Login from "../pages/home/Login";
import LandingIndex from "../pages/home/LandingIndex";
import HomeBlogIndex from "../pages/home/BlogIndex";
import HomeBlogSlug from "../pages/home/HomeBlogSlug";
import CetakNotaBarangMasuk from "../pages/cetak/nota/CetakNotaBarangMasuk";

const Root = () => {
  return (
    <>
      <Outlet />
    </>
  );
};
const rootRoute = new RootRoute({
  component: Root,
});

// !auth
// Fungsi untuk memeriksa apakah pengguna telah terautentikasi
const isAuthenticated = () => {
  // return true;
  // Gantikan ini dengan logika pemeriksaan autentikasi sesuai dengan backend Anda
  const token = localStorage.getItem("token");
  return token !== null;
};

// !router

const landingRoute = new Route({
  //! template landing
  getParentRoute: () => rootRoute,
  // path: "/",
  id: "layoutLanding",
  component: LandingIndex,
  Navigate,
});

// Create an index route
const indexRoute = new Route({
  getParentRoute: () => landingRoute,
  path: "/",
  component: HomeIndex,
});

// * contoh middleware auth
const aboutRoute = new Route({
  getParentRoute: () => landingRoute,
  path: "/about",
  // component: HomeAbout,
  component: () => {
    if (!isAuthenticated()) {
      return <Login />;
    }
    return <HomeAbout />;
  },
});
const blogRoute = new Route({
  getParentRoute: () => landingRoute,
  path: "blog",
  component: HomeBlogIndex,
});
const postRoute = new Route({
  getParentRoute: () => blogRoute,
  path: "$slug",
  component: HomeBlogSlug,
});
const notFoundRoute = new Route({
  getParentRoute: () => landingRoute,
  path: "*",
  component: NotFound,
});

// !cetak nota

const templatDuaRoot = () => {
  return (
    <>
      <div>Ini Template root 2</div>
      <hr />
      <div>
        <Outlet />
      </div>
    </>
  );
};
const templatDuaRoute = new RootRoute({
  getParentRoute: () => rootRoute,
  component: templatDuaRoot,
  id: "cetakLayout",
});

const cetakNotaBarangMasukRoute = new Route({
  getParentRoute: () => templatDuaRoute,
  path: "cetak/nota/barangmasuk/$kode_trans",
  component: CetakNotaBarangMasuk,
});

// Create the route tree using your routes
export const routeTree = rootRoute.addChildren([
  landingRoute.addChildren([
    indexRoute,
    aboutRoute,
    blogRoute.addChildren([postRoute]),
    notFoundRoute,
  ]),

  // authenticatedRoute,
  // authenticatedRoute.addChildren([aboutRoute]),
  templatDuaRoute.addChildren([cetakNotaBarangMasukRoute]),
]);

export default routeTree;
