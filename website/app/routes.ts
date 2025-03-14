import { type RouteConfig, index, route, prefix } from "@react-router/dev/routes";

export default [
  index("../src/components/sections/Home.jsx"),

  ...prefix("blog", [
    index(       "../src/components/sections/blog/index.tsx"),
    route(":id", "../src/components/sections/blog/show.tsx"),
  ]),
  
  ...prefix("qms", [
    index(       "../src/components/sections/qms/index.jsx"),
    route(":id", "../src/components/sections/qms/index.jsx", { id: "qms-id" } ),
  ]),

] satisfies RouteConfig;
