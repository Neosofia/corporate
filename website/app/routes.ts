import { type RouteConfig, index, route, prefix } from "@react-router/dev/routes";

export default [
  index("./routes/index.tsx"),

  ...prefix("blog", [
    index(       "./routes/blog/index.tsx"),
    route(":id", "./routes/blog/show.tsx"),
  ]),
  
  ...prefix("qms", [
    index(       "./routes/qms/index.tsx"),
    route(":id", "./routes/qms/show.tsx"),
    route("procedures/:id",   "./routes/qms/show.tsx", { id: "procedures" }),
  ]),

  ...prefix("resources", [
    route("*",   "./routes/resources/index.tsx"),
  ]),

] satisfies RouteConfig;
