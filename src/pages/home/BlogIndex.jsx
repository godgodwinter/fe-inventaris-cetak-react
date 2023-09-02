import { Outlet } from "@tanstack/react-router";
// !component
const HomeBlogIndex = () => {
  return (
    <>
      Blog
      <div>
        <Outlet />
      </div>
    </>
  );
};
export default HomeBlogIndex;
