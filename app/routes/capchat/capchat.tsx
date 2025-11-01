import Minigames from "~/containers/minigames/clicker/minigames";
import './style.css';
import type { Route } from "./+types/capchat";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Capchat" },
    { name: "description", content: "Veuillez compléter le capchat" },
  ];
}

export default function Capchat() {
  return <Minigames />;
}
