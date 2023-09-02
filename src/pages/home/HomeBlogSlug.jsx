import { useParams } from "@tanstack/react-router";

const HomeBlogSlug = () => {
  const { slug } = useParams();
  return <>Blog Slug {slug}</>;
};

export default HomeBlogSlug;
