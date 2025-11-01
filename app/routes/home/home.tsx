import "./style.css";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "CaptGame — Hack" },
    {
      name: "description",
      content: "Présentation du hack Capchat — un captcha innovant.",
    },
  ];
}

export default function Home() {
  const ouvrirCapchat = () => {
    // TODO: implémenter l'ouverture du Capchat ici
  };

  const team = [
    {
      name: "Éloik Rousseau",
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
      <header>
        <h1
          className="title glitch"
          data-text="01010101010101010101010101010101010101010101010101010101010101010"
        >
          01010101010101010101010101010101010101010101010101010101010101010
        </h1>
      </header>
      <section className="hero">
        <h1 className="title">CaptGame — le captcha réinventé</h1>

        <p className="lead">
          Voici notre 'Hack' un Capchat innovant, très sécurisé contre les IA,
          offrant une expérience utilisateur unique.
        </p>

        <div className="actions">
          <button className="cta" onClick={ouvrirCapchat}>
            Accéder au site
          </button>
          <a
            className="github"
            href="https://github.com/Eloik-dev/shacks-2025"
            target="_blank"
            rel="noopener noreferrer"
          >
            Voir le GitHub
          </a>
        </div>
      </section>

      <section className="team">
        <h1 className="title">Les cabaniers</h1>
        <div className="team-grid">
          {team.map((m) => (
            <article key={m.name} className="member-card">
              <div className="member-info">
                <h3 className="member-name glitch" data-text={m.name}>{m.name}</h3>
                <p className="member-role">{m.role}</p>
                <p className="member-bio">{m.bio}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <footer>
        <h1
          className="title glitch"
          data-text="01010101010101010101010101010101010101010101010101010101010101010"
        >
          01010101010101010101010101010101010101010101010101010101010101010
        </h1>
      </footer>
    </main>
  );
}
