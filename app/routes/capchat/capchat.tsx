import type { Route } from "./+types/capchat";
import Capcha from "~/containers/capcha/Capcha";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "CaptGame - Démo" },
    { name: "description", content: "Veuillez compléter le capchat" },
  ];
}

export default function Capchat() {
  return <Capcha />;
}