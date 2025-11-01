import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
	index("routes/home.tsx"),
	route("capchat", "routes/capchat.tsx"),
] satisfies RouteConfig;
