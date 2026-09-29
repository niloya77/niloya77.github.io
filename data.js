// Sitedeki tüm içerik burada. Sadece bu dosyayı düzenlemen yeterli.
// Metinler { en: "...", de: "..." } şeklinde iki dilli; tek dil yazarsan her iki dilde de o görünür.
window.SITE = {
  name: "Nil Sıla Ulucan",
  initials: "NSU",
  github: "niloya77",
  email: "nilslauluan@gmail.com",
  cv: "#", // örn: "cv.pdf"
  location: "Frankfurt am Main, Germany",

  roles: {
    en: ["Computer Engineering Student at TU Darmstadt"],
    de: ["Computer Engineering @ TU Darmstadt"],
  },
  tagline: {
    en: "I build high-performance systems and clean interfaces.",
    de: "Ich entwickle performante Systeme und klare Oberflächen.",
  },
  about: {
    en: "Hi! I'm a Computer Engineering student at TU Darmstadt. I'm interested in hardware and AI. I love understanding how computers work down to the circuit level, and I'm just as excited about building intelligent systems that learn from data.",
    de: "Hi! Ich studiere Computer Engineering an der TU Darmstadt und interessiere mich für Hardware und KI. Ich liebe es zu verstehen, wie Computer bis auf die Schaltungsebene funktionieren – und genauso begeistert es mich, intelligente Systeme zu bauen, die aus Daten lernen.",
  },
  stats: [
    { value: 5, suffix: "+", label: { en: "Projects", de: "Projekte" } },
    { value: 3, suffix: "", label: { en: "Years coding", de: "Jahre Coding" } },
    { value: 8, suffix: "", label: { en: "Technologies", de: "Technologien" } },
  ],

  // Boş bırakırsan ([]) bu bölüm sitede gizlenir.
  experience: [
    {
      period: { en: "2025 — Present", de: "2025 — heute" },
      title: { en: "Position Title", de: "Positionsbezeichnung" },
      place: "Company / Institute",
      detail: {
        en: "What you worked on, in one or two sentences.",
        de: "Woran du gearbeitet hast, in ein bis zwei Sätzen.",
      },
    },
  ],

  education: [
    {
      period: { en: "2022 — Present", de: "2022 — heute" },
      title: "B.Sc. Computer Engineering",
      place: "TU Darmstadt",
      detail: {
        en: "Relevant courses: Data Structures, Operating Systems, Parallel Programming, Compiler Construction.",
        de: "Relevante Kurse: Datenstrukturen, Betriebssysteme, Parallele Programmierung, Compilerbau.",
      },
    },
    {
      period: "2018 — 2019",
      title: { en: "High School", de: "Schule" },
      place: "Besiktas Ugur Private High School",
      detail: {
        en: "Math-Science track, graduated with 95/100 GPA.",
        de: "Mathematisch-naturwissenschaftlicher Zweig, Abschluss mit 95/100 Punkten.",
      },
    },
  ],

  // category: filtrelerde kullanılır → "ai", "web", "systems"
  // role: projede senin yaptığın kısım (boşsa detay ekranında gösterilmez)
  projects: [
    {
      title: "AI Code Research Tracker",
      category: ["ai"],
      desc: {
        en: "A VS Code extension for a research study that detects AI-generated code pastes and tracks how developers accept AI-written code.",
        de: "Eine VS-Code-Erweiterung für eine Forschungsstudie, die eingefügten KI-Code erkennt und verfolgt, wie Entwickler:innen KI-generierten Code übernehmen.",
      },
      details: {
        en: "Built for a research study on how developers interact with AI coding assistants. The extension runs in the background, detects when larger blocks of code are inserted at once, and tracks whether those blocks are kept, edited or deleted over time.\n\nThe collected events are synced to a Supabase database and analyzed with Python scripts.",
        de: "Entwickelt für eine Forschungsstudie darüber, wie Entwickler:innen mit KI-Coding-Assistenten arbeiten. Die Erweiterung läuft im Hintergrund, erkennt, wenn größere Codeblöcke auf einmal eingefügt werden, und verfolgt, ob diese Blöcke behalten, bearbeitet oder gelöscht werden.\n\nDie gesammelten Events werden in einer Supabase-Datenbank gespeichert und mit Python-Skripten ausgewertet.",
      },
      role: "",
      tags: ["TypeScript", "VS Code API", "Supabase", "Python"],
      links: [{ label: "Code", url: "https://github.com/niloya77/ai-code-research-tracker" }],
      color: "#7c5cff",
    },
    {
      title: "Prompt Injection Mitigation",
      category: ["ai"],
      desc: {
        en: "Team project on AI system security: fine-tuning FLAN-T5 models with LoRA to resist prompt injection attacks.",
        de: "Teamprojekt zur Sicherheit von KI-Systemen: Fine-Tuning von FLAN-T5-Modellen mit LoRA gegen Prompt-Injection-Angriffe.",
      },
      details: {
        en: "Part of a team project on the security of AI systems. We prepared datasets of benign and malicious prompts and fine-tuned FLAN-T5 models (Large and XL) with LoRA adapters to make them more robust against prompt injection.\n\nThe model variants were compared by attack success rate and further metrics such as entropy and MSE.",
        de: "Teil eines Teamprojekts zur Sicherheit von KI-Systemen. Wir haben Datensätze mit harmlosen und bösartigen Prompts erstellt und FLAN-T5-Modelle (Large und XL) mit LoRA-Adaptern feinabgestimmt, um sie robuster gegen Prompt Injection zu machen.\n\nDie Modellvarianten wurden anhand der Angriffserfolgsrate und weiterer Metriken wie Entropie und MSE verglichen.",
      },
      role: "",
      tags: ["Python", "LLMs", "LoRA", "Jupyter"],
      links: [{ label: "Code", url: "https://github.com/ki-system-sicherheit/prompt-mitigation-llm" }],
      color: "#a17bff",
    },
    {
      title: "Phone to 3D",
      category: ["ai"],
      desc: {
        en: "Computer vision project that turns ordinary phone photos into 3D models.",
        de: "Computer-Vision-Projekt, das gewöhnliche Handyfotos in 3D-Modelle verwandelt.",
      },
      details: {
        en: "Takes a set of photos from a regular smartphone and reconstructs a 3D model of the scene.\n\nCOLMAP estimates the camera poses and a sparse point cloud (Structure from Motion), OpenMVS densifies it and reconstructs a textured mesh (Multi-View Stereo), and Open3D is used for processing and visualization.",
        de: "Aus einer Reihe gewöhnlicher Smartphone-Fotos wird ein 3D-Modell der Szene rekonstruiert.\n\nCOLMAP schätzt die Kamerapositionen und eine dünne Punktwolke (Structure from Motion), OpenMVS verdichtet sie und rekonstruiert ein texturiertes Mesh (Multi-View Stereo), und Open3D wird für Verarbeitung und Visualisierung genutzt.",
      },
      role: "",
      tags: ["Python", "COLMAP", "OpenMVS", "Open3D"],
      links: [{ label: "Code", url: "https://github.com/Tbt-code/Phone-to-3D-Project" }],
      color: "#b39dff",
    },
    {
      title: "SMP Web App",
      category: ["web"],
      desc: {
        en: "Full-stack event management platform built as a team, with QR code attendance and PDF diplomas.",
        de: "Full-Stack-Plattform für Eventmanagement, im Team entwickelt – mit QR-Code-Anwesenheit und PDF-Urkunden.",
      },
      details: {
        en: "A web platform for organizing events together with student assistants. Organizers manage events, participants and announcements; assistants check people in by scanning QR codes, set their availability and see their sessions; participants receive PDF diplomas.\n\nFrontend in React + TypeScript, backend in Express + Prisma on PostgreSQL, with JWT authentication and email notifications.",
        de: "Eine Webplattform, um Events gemeinsam mit studentischen Hilfskräften zu organisieren. Veranstalter:innen verwalten Events, Teilnehmende und Ankündigungen; HiWis checken Personen per QR-Code ein, tragen ihre Verfügbarkeit ein und sehen ihre Schichten; Teilnehmende erhalten PDF-Urkunden.\n\nFrontend mit React + TypeScript, Backend mit Express + Prisma auf PostgreSQL, mit JWT-Authentifizierung und E-Mail-Benachrichtigungen.",
      },
      role: "",
      tags: ["React", "TypeScript", "Express", "Prisma", "PostgreSQL"],
      links: [
        { label: "Frontend", url: "https://github.com/smp-team-2025/smp-frontend" },
        { label: "Backend", url: "https://github.com/smp-team-2025/smp-backend" },
      ],
      color: "#8f6cf5",
    },
    {
      title: "MAVL Compiler",
      category: ["systems"],
      desc: {
        en: "Compiler for the Matrix And Vector Language, built for the compiler construction course.",
        de: "Compiler für die Matrix And Vector Language, entwickelt im Kurs Compilerbau.",
      },
      details: {
        en: "Course project for Introduction to Compiler Construction at TU Darmstadt. Implemented parts of a compiler for MAVL, a small language for matrix and vector computations.\n\nThe scanner and the recursive-descent parser turn source code into an abstract syntax tree, with clear error messages for invalid programs.",
        de: "Kursprojekt für Einführung in den Compilerbau an der TU Darmstadt. Umsetzung von Teilen eines Compilers für MAVL, eine kleine Sprache für Matrix- und Vektorberechnungen.\n\nScanner und rekursiv absteigender Parser wandeln Quellcode in einen abstrakten Syntaxbaum um, mit klaren Fehlermeldungen für ungültige Programme.",
      },
      role: "",
      tags: ["Java", "Compilers"],
      links: [{ label: "Code", url: "https://github.com/Stevenyami/eicb-p1" }],
      color: "#c6a8ff",
    },
  ],

  skills: [
    "C++", "Python", "JavaScript", "TypeScript", "React", "Node.js",
    "Git", "Linux", "OpenMP", "CMake", "SQL", "Docker",
  ],

  socials: [
    { label: "GitHub", url: "https://github.com/niloya77" },
    { label: "LinkedIn", url: "#" },
  ],
};
