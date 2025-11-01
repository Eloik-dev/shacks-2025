const questions = [
  {
    question: "Quelle est la seule particule connue à posséder un moment magnétique anormal supérieur à 2 ?",
    options: ["Proton", "Neutron", "Muon", "Tauon"],
    answer: "Muon",
  },
  {
    question: "Quelle plante peut survivre 2 ans sans eau grâce à une enzyme de dormance unique ?",
    options: ["Selaginella lepidophylla", "Rafflesia arnoldii", "Welwitschia mirabilis", "Ephedra sinica"],
    answer: "Selaginella lepidophylla",
  },
  {
    question: "Quel est le seul métal liquide à température ambiante autre que le mercure ?",
    options: ["Gallium", "Césium", "Sodium", "Indium"],
    answer: "Gallium",
  },
  {
    question: "Combien de dimensions spatiales la théorie des cordes de type IIB propose-t-elle ?",
    options: ["10", "11", "12", "26"],
    answer: "10",
  },
  {
    question: "Quel élément chimique fut découvert dans les cendres d’un volcan islandais ?",
    options: ["Cérium", "Hafnium", "Tellure", "Thulium"],
    answer: "Tellure",
  },
  {
    question: "Quel mathématicien a prouvé que 2 + 2 = 4 dans un cadre formel pour la première fois ?",
    options: ["Russell", "Frege", "Peano", "Whitehead"],
    answer: "Russell",
  },
  {
    question: "Quel animal possède le génome le plus long connu sur Terre ?",
    options: ["Axolotl", "Salamandre géante", "Anguille européenne", "Méduse Turritopsis"],
    answer: "Salamandre géante",
  },
  {
    question: "Quelle planète possède un jour plus long que son année ?",
    options: ["Mercure", "Vénus", "Mars", "Neptune"],
    answer: "Vénus",
  },
  {
    question: "Quelle étoile est la plus ronde jamais observée ?",
    options: ["Altair", "Vega", "Kepler 11145123", "Sirius B"],
    answer: "Kepler 11145123",
  },
  {
    question: "Combien de zéros contient le nombre googolplex exprimé en notation décimale ?",
    options: ["10¹⁰⁰", "10¹⁰⁰⁰", "10^(10¹⁰⁰)", "10^(10¹⁰⁰⁰)"],
    answer: "10^(10¹⁰⁰)",
  },
  {
    question: "Quelle molécule fut surnommée « la molécule de Dieu » par les physiciens ?",
    options: ["Boson de Higgs", "H₂O", "ADN", "ATP"],
    answer: "Boson de Higgs",
  },
  {
    question: "Quelle est la seule lune du Système solaire à posséder une atmosphère épaisse ?",
    options: ["Io", "Ganymède", "Titan", "Triton"],
    answer: "Titan",
  },
  {
    question: "Quel est le seul nombre réel égal à son cube moins son carré moins son inverse ?",
    options: ["1", "φ (phi)", "2", "e"],
    answer: "φ (phi)",
  },
  {
    question: "Quelle créature marine peut régénérer entièrement son cerveau ?",
    options: ["Axolotl", "Seiche", "Étoile de mer", "Planarie"],
    answer: "Planarie",
  },
  {
    question: "Quel physicien a introduit le concept de “l’espace des phases” ?",
    options: ["Boltzmann", "Maxwell", "Hamilton", "Schrödinger"],
    answer: "Boltzmann",
  },
  {
    question: "Quel mot français est resté inchangé depuis le proto-indo-européen ?",
    options: ["Mère", "Eau", "Feu", "Nuit"],
    answer: "Nuit",
  },
  {
    question: "Quelle constante fondamentale a la plus petite incertitude mesurée à ce jour ?",
    options: ["vitesse de la lumière", "charge de l’électron", "constante de Planck", "constante de gravitation"],
    answer: "vitesse de la lumière",
  },
  {
    question: "Quelle est la seule équation physique visible sur la tombe d’Einstein ?",
    options: ["E = mc²", "Gμν = 8πGTμν", "aucune", "équation du champ électromagnétique"],
    answer: "aucune",
  },
  {
    question: "Quel est le seul matériau capable d’arrêter la lumière visible sans la réfléchir ni l’absorber complètement ?",
    options: ["Aérogel", "Graphène dopé", "Métamatériau de cloaking", "Verre opalin"],
    answer: "Métamatériau de cloaking",
  },
  {
    question: "Quel nombre premier est formé uniquement de 1 et de 0 en base 2 et possède plus d’un million de chiffres ?",
    options: ["Mersenne prime", "Fermat prime", "Cullen prime", "Wagstaff prime"],
    answer: "Mersenne prime",
  },
  {
    question: "Quel est le seul baryon hypothétique composé exclusivement de quarks top ?",
    options: ["Tritop", "Toponium", "Top-baryon", "Toponium baryonique"],
    answer: "Tritop",
  },
  {
    question: "Dans quel espace topologique la conjecture de Poincaré a-t-elle été démontrée vraie ?",
    options: ["3-sphère", "2-tore", "4-manifold", "Espace de Hilbert compact"],
    answer: "3-sphère",
  },
  {
    question: "Quelle est la valeur numérique approximative du nombre de Graham à la puissance 1/64 mod 10 ?",
    options: ["7", "3", "1", "9"],
    answer: "7",
  },
  {
    question: "Quel acide aminé ne possède pas de carbone chiral ?",
    options: ["Glycine", "Alanine", "Sérine", "Proline"],
    answer: "Glycine",
  },
  {
    question: "Quelle est la période de précession orbitale du pulsar binaire PSR B1913+16 ?",
    options: ["4,2°/an", "2,3°/an", "1,2°/an", "0,9°/an"],
    answer: "4,2°/an",
  },
  {
    question: "Quelle est la longueur de Planck exprimée en mètres ?",
    options: ["1,616×10⁻³⁵ m", "2,718×10⁻³⁴ m", "6,626×10⁻³⁶ m", "9,109×10⁻³⁵ m"],
    answer: "1,616×10⁻³⁵ m",
  },
  {
    question: "Quelle fonction mathématique décrit la distribution des zéros de la fonction zêta de Riemann ?",
    options: ["Fonction de densité de Montgomery", "Distribution de Cauchy", "Transformée de Mellin", "Spectre de Dirichlet"],
    answer: "Fonction de densité de Montgomery",
  },
  {
    question: "Quelle est la constante de couplage gravitationnelle sans dimension ?",
    options: ["~10⁻³⁸", "~10⁻⁴⁵", "~10⁻⁶⁷", "~10⁻²⁹"],
    answer: "~10⁻³⁸",
  },
  {
    question: "Quel est le plus petit nombre de Ramsey connu pour R(3,4) ?",
    options: ["9", "10", "11", "8"],
    answer: "9",
  },
  {
    question: "Quel minéral contient naturellement de l’hélium formé par désintégration radioactive ?",
    options: ["Monazite", "Quartz", "Calcite", "Olivine"],
    answer: "Monazite",
  },
  {
    question: "Quel type de symétrie est violé par l’interaction faible mais pas par l’électromagnétique ?",
    options: ["Symétrie de parité (P)", "Symétrie de charge (C)", "Symétrie CPT", "Symétrie T"],
    answer: "Symétrie de parité (P)",
  },
  {
    question: "Quel est le temps moyen de décohérence quantique d’un électron libre dans le vide à 0 K ?",
    options: ["Infini", "10⁻²³ s", "10⁻⁵⁰ s", "Incalculable expérimentalement"],
    answer: "Infini",
  },
  {
    question: "Quelle structure cristalline possède le diamant ?",
    options: ["Cubique faces centrées", "Cubique corps centré", "Hexagonale compacte", "Cubique simple"],
    answer: "Cubique faces centrées",
  },
  {
    question: "Quel est le groupe fondamental du plan complexe privé de l’origine ?",
    options: ["ℤ", "ℝ", "ℂ*", "ℚ"],
    answer: "ℤ",
  },
  {
    question: "Quel était le nom du tout premier quasar observé ?",
    options: ["3C 273", "3C 48", "Cygnus A", "NGC 1068"],
    answer: "3C 273",
  },
  {
    question: "Quelle protéine est responsable de la bioluminescence chez les méduses Aequorea victoria ?",
    options: ["GFP (Green Fluorescent Protein)", "Luciférase", "Phototropine", "Phycoérythrine"],
    answer: "GFP (Green Fluorescent Protein)",
  },
  {
    question: "Quel est le nombre minimal de coups pour résoudre un cube de Rubik 3x3x3 selon Dieu ?",
    options: ["20", "22", "18", "24"],
    answer: "20",
  },
  {
    question: "Quelle est la seule force fondamentale qui n’a pas encore été quantifiée avec succès ?",
    options: ["Gravité", "Électromagnétisme", "Interaction forte", "Interaction faible"],
    answer: "Gravité",
  },
  {
    question: "Quel est le nom du premier trou noir photographié par l’EHT ?",
    options: ["M87*", "Sagittarius A*", "Cygnus X-1", "TON 618"],
    answer: "M87*",
  },
  {
    question: "Quelle est la formule de la métrique de Schwarzschild pour un corps non chargé et non en rotation ?",
    options: [
      "ds² = (1 - 2GM/rc²)c²dt² - (1 - 2GM/rc²)⁻¹dr² - r²dΩ²",
      "ds² = c²dt² - dr² - r²dΩ²",
      "ds² = (1 - GM/rc²)c²dt² - dr² - r²dΩ²",
      "ds² = e^(−2GM/rc²)dt² - dr² - r²dΩ²"
    ],
    answer: "ds² = (1 - 2GM/rc²)c²dt² - (1 - 2GM/rc²)⁻¹dr² - r²dΩ²",
  },
  {
    question: "Quelle est la complexité algorithmique asymptotique de l'algorithme de Buchberger pour un idéal de Gröbner générique en n variables ?",
    options: ["Double exponentielle", "Exponentielle", "Factorielle", "Polynomiale"],
    answer: "Double exponentielle",
  },
  {
    question: "Combien d'automorphismes distincts possède le groupe additif des entiers modulo 105 ?",
    options: ["48", "72", "96", "120"],
    answer: "48",
  },
  {
    question: "Quel est le genre de la surface de Riemann associée à l’équation y² = x⁵ - 1 ?",
    options: ["2", "3", "4", "5"],
    answer: "2",
  },
  {
    question: "Quelle particule hypothétique médiatiserait la gravité dans une théorie quantique complète ?",
    options: ["Graviton", "Tachyon", "Dilaton", "Axion"],
    answer: "Graviton",
  },
  {
    question: "Quelle est la constante de couplage de structure fine α exprimée en valeur numérique approchée ?",
    options: ["1/137.035999", "1/136.0029", "1/138.0123", "1/134.8765"],
    answer: "1/137.035999",
  },
  {
    question: "Quel est le nombre d’ensembles infinis dénombrables non isomorphes sous l’axiome du choix ?",
    options: ["1", "Infini", "Aucun", "Dépend du modèle de ZF"],
    answer: "1",
  },
  {
    question: "Quel est le plus petit nombre de Burnside non trivial pour un groupe de période finie infini ?",
    options: ["B(2,5)", "B(2,6)", "B(2,7)", "B(2,8)"],
    answer: "B(2,5)",
  },
  {
    question: "Dans l’expérience du chat de Schrödinger, quelle opération mathématique décrit l’effondrement d’onde ?",
    options: ["Projection", "Commutation", "Rotation unitaire", "Transformée de Fourier"],
    answer: "Projection",
  },
  {
    question: "Quelle est la dimension fractale du flocon de Koch ?",
    options: ["≈1.2619", "≈1.5", "≈1.4142", "≈1.732"],
    answer: "≈1.2619",
  },
  {
    question: "Combien de zéros non triviaux de ζ(s) sont connus numériquement à ce jour (2025) ?",
    options: ["Plus de 10^13", "Environ 10^6", "Environ 10^9", "Moins de 10^3"],
    answer: "Plus de 10^13",
  },
  {
    question: "Quel est le nom du principe stipulant qu’aucune information ne peut être détruite dans un trou noir ?",
    options: ["Principe d’unitarité", "Principe de correspondance", "Principe d’équivalence", "Principe holographique"],
    answer: "Principe d’unitarité",
  },
  {
    question: "Quelle est la dérivée fonctionnelle de l’action de Hilbert-Einstein par rapport au tenseur métrique ?",
    options: ["Tenseur d’Einstein", "Tenseur de Ricci", "Tenseur de Riemann", "Tenseur de Weyl"],
    answer: "Tenseur d’Einstein",
  },
  {
    question: "Quel est le nombre ordinal correspondant à la première classe de cardinalité inaccessible ?",
    options: ["κ₀", "ℵ₀", "ℵ₁", "ω₁"],
    answer: "κ₀",
  },
  {
    question: "Quelle propriété géométrique partagent les variétés de Calabi–Yau ?",
    options: ["Courbure de Ricci nulle", "Courbure négative constante", "Topologie plate", "Symétrie miroir"],
    answer: "Courbure de Ricci nulle",
  },
  {
    question: "Quelle est la densité moyenne de matière baryonique dans l’univers en kg/m³ ?",
    options: ["~4×10⁻²⁸", "~1×10⁻²⁶", "~9×10⁻³⁰", "~2×10⁻²⁷"],
    answer: "~4×10⁻²⁸",
  },
  {
    question: "Dans la théorie des catégories, quel est le foncteur adjoint gauche du foncteur des ensembles sous-jacents ?",
    options: ["Foncteur libre", "Foncteur fidèle", "Foncteur représentable", "Foncteur constant"],
    answer: "Foncteur libre",
  },
  {
    question: "Quel est le nom du paradoxe qui questionne l’injection infinie d’énergie dans une cavité quantique vide ?",
    options: ["Effet Casimir", "Paradoxe d’Olbers", "Paradoxe de Zénon", "Effet Unruh"],
    answer: "Effet Casimir",
  },
  {
    question: "Quel est le premier axiome du schéma de remplacement de Zermelo-Fraenkel ?",
    options: [
      "Si une fonction est définie sur un ensemble, son image est aussi un ensemble",
      "Tout ensemble possède un ensemble de parties",
      "Il existe un ensemble vide",
      "L’union d’ensembles est un ensemble"
    ],
    answer: "Si une fonction est définie sur un ensemble, son image est aussi un ensemble",
  },
  {
    question: "Quel est le nom du plus petit graphe non planaire qui contient K₅ et K₃,₃ comme mineurs ?",
    options: ["Grötzsch", "Wagner", "Petersen", "Heawood"],
    answer: "Wagner",
  },
  {
    question: "Quel est le plus petit cardinal indénombrable après ℵ₀ sous ZFC ?",
    options: ["ℵ₁", "ℵ₂", "ℵ_ω", "c (continuum)"],
    answer: "ℵ₁",
  },
  {
    question: "Si une sphère de Dyson complète absorbait 100% de la lumière solaire, quelle serait sa température d'équilibre approximative ?",
    options: ["~393 K", "~279 K", "~255 K", "~600 K"],
    answer: "~393 K",
  },
  {
    question: "Quel est le groupe fondamental du tore à deux trous ?",
    options: ["ℤ * ℤ * ℤ * ℤ", "ℤ²", "ℤ³", "ℤ * ℤ²"],
    answer: "ℤ * ℤ * ℤ * ℤ",
  },
  {
    question: "Quelle est la valeur de la constante de Planck réduite (ħ) en Joule·seconde ?",
    options: ["1.054×10⁻³⁴", "6.626×10⁻³⁴", "9.81×10⁻³¹", "3.00×10⁸"],
    answer: "1.054×10⁻³⁴",
  },
  {
    question: "Quelle est la 10ᵉ décimale correcte de π²/6 ?",
    options: ["1.6449340668", "1.6449340669", "1.6449340667", "1.6449340666"],
    answer: "1.6449340668",
  },
  {
    question: "Quel est le nom de la première étoile observée avec une planète confirmée ?",
    options: ["51 Pegasi", "Kepler-22", "HD 209458", "Tau Ceti"],
    answer: "51 Pegasi",
  },
  {
    question: "Quel est le plus petit nombre premier de Mersenne connu en 2025 ?",
    options: ["2⁸²⁵⁸⁹⁹³³³-1", "2⁷⁷⁸⁰⁷⁰³-1", "2⁵⁷⁸⁸⁵¹⁶¹-1", "2⁴³¹¹₂₆₀₈₃³-1"],
    answer: "2⁸²⁵⁸⁹⁹³³³-1",
  },
  {
    question: "Quel est le nom du paradoxe selon lequel les trous noirs peuvent s'évaporer ?",
    options: ["Rayonnement de Hawking", "Paradoxe de Pauli", "Effet Casimir", "Principe de Mach"],
    answer: "Rayonnement de Hawking",
  },
  {
    question: "Quelle molécule forme la structure en double hélice de l’ADN ?",
    options: ["Acide désoxyribonucléique", "Acide ribonucléique", "Protéine", "Lipide"],
    answer: "Acide désoxyribonucléique",
  },
  {
    question: "Quel est le nom du plus petit groupe simple non abélien ?",
    options: ["A₅", "S₄", "Z₅", "D₄"],
    answer: "A₅",
  },
  {
    question: "Combien de dimensions possède le groupe de Lie SU(5) ?",
    options: ["24", "25", "23", "20"],
    answer: "24",
  },
  {
    question: "Quelle est la valeur approchée du nombre d’Avogadro en 2025 ?",
    options: ["6.02214076×10²³", "6.022×10²⁴", "6.02×10²²", "6.023×10²³"],
    answer: "6.02214076×10²³",
  },
  {
    question: "Quel est le nom du processus par lequel une étoile à neutrons devient un trou noir ?",
    options: ["Effondrement gravitationnel", "Capture neutronique", "Effet Compton inverse", "Décroissance bêta"],
    answer: "Effondrement gravitationnel",
  },
  {
    question: "Quelle est la solution générale de l’équation différentielle y'' + y = 0 ?",
    options: ["y = A cos(x) + B sin(x)", "y = Aeˣ + Be⁻ˣ", "y = Ax + B", "y = A sinh(x) + B cosh(x)"],
    answer: "y = A cos(x) + B sin(x)",
  },
  {
    question: "Combien de paires de bases contient l’ADN humain complet approximativement ?",
    options: ["3 milliards", "30 millions", "3 millions", "300 000"],
    answer: "3 milliards",
  },
  {
    question: "Quelle théorie unifie la relativité générale et la mécanique quantique dans 11 dimensions ?",
    options: ["Théorie M", "Théorie des cordes bosoniques", "Théorie supergravitationnelle", "Loop Quantum Gravity"],
    answer: "Théorie M",
  },
  {
    question: "Quel est le nom du paradoxe du voyage dans le temps où une cause est créée par son effet ?",
    options: ["Boucle causale", "Paradoxe du grand-père", "Effet papillon", "Causalité rétrograde"],
    answer: "Boucle causale",
  },
  {
    question: "Quelle est la masse du proton en kilogrammes ?",
    options: ["1.6726×10⁻²⁷", "9.11×10⁻³¹", "1.66×10⁻²⁴", "1.007×10⁻²⁷"],
    answer: "1.6726×10⁻²⁷",
  },
  {
    question: "Quel est le nom du phénomène où la lumière est déviée par la gravité ?",
    options: ["Lentille gravitationnelle", "Diffraction", "Réfraction", "Effet Doppler"],
    answer: "Lentille gravitationnelle",
  },
  {
    question: "Quel est le seul métal liquide à température ambiante ?",
    options: ["Mercure", "Césium", "Gallium", "Sodium"],
    answer: "Mercure",
  },
  {
    question: "Quelle équation relie l’énergie, la masse et la vitesse de la lumière ?",
    options: ["E = mc²", "F = ma", "V = IR", "pV = nRT"],
    answer: "E = mc²",
  },
];

export default questions;