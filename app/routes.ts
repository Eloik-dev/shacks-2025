import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
	index("routes/home/home.tsx"),
	route("capchat", "routes/capchat/capchat.tsx"),
	// Catch-all 404 route (should be last)
	route("*", "routes/404/notfound.tsx"),
] satisfies RouteConfig;
