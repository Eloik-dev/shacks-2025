import "./style.css";
import type { Route } from "./+types/home";
import { useNavigate } from "react-router";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "CaptGame - Hack" },
    {
      name: "description",
      content: "Présentation du hack Captcha — un captcha innovant.",
    },
  ];
}

export default function Home() {
  const navigate = useNavigate();

  const ouvrirCapchat = () => {
    navigate("/capchat");
  };

  const team = [
    {
      name: "Éloïk Rousseau",
      role: "Bac informatique",
      bio: "Gerer le comportement du captcha",
    },
    {
      name: "Mathis Cantin",
      role: "Bac informatique",
      bio: "Développeur de l'étape Snake",
    },
    {
      name: "Kevin Boulanger",
      role: "Bac en génie informatique",
      bio: "Développeur de l'étape Clicker",
    },
    {
      name: "Léanne Héroux",
      role: "Bac en génie informatique",
      bio: "Développeur de l'étape Tictacto",
    },
  ];

  return (
    <main className="home-container">
      <header></header>
      <section className="card">
        <h1 className="title">CaptGame — le captcha réinventé</h1>

        <p className="lead">
          Voici notre 'Hack' un Captcha innovant, très sécurisé contre les IA
          modernes, offrant une expérience utilisateur unique.
        </p>

        <div className="actions">
          <button className="cta" onClick={ouvrirCapchat}>
            Tester notre solution
          </button>

          <button
            className="cta git"
            onClick={() =>
              window.open("https://github.com/Eloik-dev/shacks-2025", "_blank")
            }
          >
            Voir le GitHub
          </button>
        </div>
      </section>

      <section className="card">
        <h1 className="title">Les cabaniers</h1>
        <div className="team-grid">
          {team.map((m) => (
            <article key={m.name} className="member-card">
              <div className="member-info">
                <h3 className="member-name glitch" data-text={m.name}>
                  {m.name}
                </h3>
                <p className="member-role">{m.role}</p>
                <p className="member-bio">{m.bio}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
