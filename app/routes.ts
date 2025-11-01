import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
	index("routes/home/home.tsx"),
	route("capchat", "routes/capchat/capchat.tsx"),
	route("tictacto", "routes/tictacto.tsx"),
] satisfies RouteConfig;
