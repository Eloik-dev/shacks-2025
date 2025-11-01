import Minigames from "~/containers/minigames/clicker/minigames";
import type { Route } from "./+types/home";
import styles from './style.css';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Capchat" },
    { name: "description", content: "Veuillez compléter le capchat" },
  ];
}

export default function Capchat() {
  return <Minigames />;
}
