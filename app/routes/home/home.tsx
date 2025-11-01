import { Welcome } from "~/welcome/welcome";
import type { Route } from "../+types/home";
import styles from './style.css';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return <Welcome />;
}
