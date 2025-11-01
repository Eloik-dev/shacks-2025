import type { Route } from "./+types/home";
import Minigames from "~/containers/minigames/clicker/Minigames";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Capchat" },
    { name: "description", content: "Veuillez compléter le capchat" },
  ];
}

export default function Capchat() {
  return <Minigames />;
}
