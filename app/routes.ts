import { type RouteConfig, index, route, prefix } from "@react-router/dev/routes";

export default [
  index("./routes/index.tsx"),
  route("contact", "./routes/contact.tsx"),

  ...prefix("blog", [
    index(       "./routes/blog-index.tsx", { id: "blog-index" }),
    route("*",   "./routes/markdown.tsx", { id: "blog-show"  }),
  ]),

  ...prefix("qms", [
    index(       "./routes/markdown.tsx", { id: "qms-index" }),
    route("*",   "./routes/markdown.tsx", { id: "qms-show"  }),
  ]),

  ...prefix("tools", [
    index("./routes/tools/index.tsx"),
  ]),

  ...prefix("resources", [
    index(       "./routes/markdown.tsx", { id: "resources-index" }),
    route("*",   "./routes/markdown.tsx", { id: "resources-show"  }),
  ]),

] satisfies RouteConfig;
