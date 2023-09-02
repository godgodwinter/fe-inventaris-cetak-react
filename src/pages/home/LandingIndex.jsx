import { Link, Outlet } from "@tanstack/react-router";
function LandingIndex() {
  return (
    <>
      <div>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/blog">Blog</Link>
        <Link to="/blog/ini_slug">Blog Slug</Link>
        <Link to="/tes">404</Link>
      </div>
      <hr />
      <Outlet />
    </>
  );
}
export default LandingIndex;
