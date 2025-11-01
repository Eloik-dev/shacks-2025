import Capcha from "~/containers/capcha/Capcha";
import type { Route } from "./+types/capchat";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Capchat" },
    { name: "description", content: "Veuillez compléter le capchat" },
  ];
}

export default function Capchat() {
  return <Capcha />;
}