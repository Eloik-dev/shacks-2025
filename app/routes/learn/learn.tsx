import "./style.css";

export function meta(_: any) {
  return [
    { title: "Apprendre — Sécurité informatique" },
    {
      name: "description",
      content:
        "Une page pédagogique en français sur les CAPTCHA, les menaces liées à l'IA et une nouvelle approche ludique de la cybersécurité.",
    },
  ];
}

export default function Learn() {
  return (
    <main className="learn-container">
      <header>
        <h1 className="title">CAPTCHA et IA — Réinventer la sécurité</h1>
        <p className="lead">
          Comment et pourquoi notre solution est née
        </p>
      </header>

      <section className="card">
        <h2>Problématique</h2>
        <p>
          Les CAPTCHA traditionnels (texte, images, cases à cocher) ne suffisent
          plus. Les IA modernes savent lire du texte déformé, des images,
          reconnaître des objets et simuler des comportements humains. Résultat
          : les bots contournent facilement ces barrières, menaçant la sécurité
          des plateformes (faux comptes, spams, fraudes…).
        </p>
      </section>

      <section className="card">
        <h2>Solution</h2>
        <p>
          Transformer le CAPTCHA en mini-jeux divertissants. Ils sont amusant et
          rapide pour l’utilisateur, tout en étant quasi impossible à résoudre
          pour une IA.
        </p>
      </section>

      <section className="card">
        <h2>Avantages</h2>
        <ul>
          <li>
            Sécurité renforcée : chaque jeu est unique et
            difficile à automatiser.
          </li>
          <li>
            Expérience positive : l’utilisateur s’amuse au lieu
            de subir un test.
          </li>
          <li>
            Innovation durable : une approche évolutive et
            adaptée aux menaces à venir.
          </li>
        </ul>
      </section>

      <section className="card highlight">
        <h2>Notre but</h2>
        <p>
          Rendre la cybersécurité plus humaine, plus efficace et un peu plus
          fun.
        </p>
      </section>

      <footer className="actions">
        <a href="/" className="cta">
          Retour à l'accueil
        </a>
      </footer>
    </main>
  );
}
