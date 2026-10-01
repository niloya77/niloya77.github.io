// Sitedeki tüm içerik burada. Sadece bu dosyayı düzenlemen yeterli.
// Metinler { en: "...", de: "..." } şeklinde iki dilli; tek dil yazarsan her iki dilde de o görünür.
window.SITE = {
  name: "Nil Sıla Ulucan",
  initials: "NSU",
  github: "niloya77",
  email: "nilslauluan@gmail.com",
  cv: "#", // örn: "cv.pdf"
  location: "Frankfurt am Main, Germany",

  // Hero'daki yeşil noktalı durum satırı. Boş bırakırsan ("") gizlenir.
  status: {
    en: "Open to working student roles & internships",
    de: "Offen für Werkstudentenstellen & Praktika",
  },
  // Hakkımda bölümünde görünür.
  languages: [
    { name: { en: "Turkish", de: "Türkisch" }, level: { en: "native", de: "Muttersprache" } },
    { name: { en: "German", de: "Deutsch" }, level: "C1" },
    { name: { en: "English", de: "Englisch" }, level: "C1" },
    { name: { en: "Spanish", de: "Spanisch" }, level: "B1" },
  ],

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
      period: "10/2025 — 03/2026",
      title: { en: "Lab Course: Prompt Injection Mitigation in LLMs", de: "Praktikum: Mitigation von Prompt Injection in LLMs" },
      place: "System Security Lab · TU Darmstadt",
      detail: {
        en: "Developed an approach that separates CONTROL and DATA inputs to prevent prompt injection. Fine-tuned an open-source LLM with LoRA (PEFT), built a small dataset of normal and adversarial examples, and evaluated robustness and model quality.",
        de: "Entwicklung eines Ansatzes zur Trennung von CONTROL- und DATA-Eingaben gegen Prompt Injection. Fine-Tuning eines Open-Source-LLMs mit LoRA (PEFT), Erstellung eines Datensatzes mit normalen und adversarialen Beispielen sowie Evaluation von Robustheit und Modellqualität.",
      },
    },
    {
      period: "10/2025 — 03/2026",
      title: { en: "Bachelor Team Project", de: "Bachelorpraktikum" },
      place: "TU Darmstadt",
      detail: {
        en: "Built a web application for managing and organizing the public lecture series “Saturday Morning Physics (SMP)” with HTML, CSS, JavaScript/TypeScript and Python.",
        de: "Entwicklung einer Webapplikation für die Verwaltung und Organisation der Öffentlichkeitsveranstaltung „Saturday Morning Physics (SMP)“ mit HTML, CSS, JavaScript/TypeScript und Python.",
      },
    },
    {
      period: "04/2025 — 09/2025",
      title: { en: "Tutor, Computer Organization", de: "Tutorin, Rechnerorganisation" },
      place: "TU Darmstadt",
      detail: {
        en: "Led exercise sessions, graded assignments and held oral tests. Helped students with computer architecture, assembly language and low-level CPU programming.",
        de: "Leitung von Übungsstunden, Korrektur von Übungsblättern und Durchführung von Testaten. Unterstützung bei Fragen zu Rechnerarchitektur, Assemblersprache und CPU-naher Programmierung.",
      },
    },
    {
      period: "10/2024 — 03/2025",
      title: { en: "Teaching Internship, Compiler Construction", de: "Praktikum in der Lehre, Einführung in den Compilerbau" },
      place: "TU Darmstadt",
      detail: {
        en: "Created and graded exercise sheets, held oral tests and led exercise sessions. Taught the fundamentals of lexers, parsers and code generation.",
        de: "Erstellung und Korrektur von Übungsblättern, Durchführung von Testaten und Leitung von Übungsstunden. Vermittlung von Grundlagen zu Lexern, Parsern und Code-Generierung.",
      },
    },
    {
      period: "06/2024 — 10/2025",
      title: { en: "Student Assistant, Reactive Flows and Measurement Technology", de: "Studentische Hilfskraft, Reaktive Strömungen und Messtechnik" },
      place: "TU Darmstadt",
      detail: {
        en: "Processed payments, invoices and domestic and international business trips. Built Excel sheets to track budgets, income and expenses of the institute's projects.",
        de: "Bearbeitung von unbaren Auszahlungen, Rechnungen sowie In- und Auslandsdienstreisen. Erstellung von Excel-Tabellen zur Berechnung von Budgets, Einnahmen und Ausgaben der Institutsprojekte.",
      },
    },
    {
      period: "05/2024 — 10/2025",
      title: { en: "Student Assistant, Student Services", de: "Studentische Hilfskraft, Studierendenservice" },
      place: "TU Darmstadt",
      detail: {
        en: "Processed de-registration and application requests, prepared documents such as diplomas and enrollment certificates, and answered student questions on the hotline.",
        de: "Durchführung von Exmatrikulations- und Bewerbungsanträgen, Vorbereitung von Unterlagen wie Diplom und Studienbescheinigung sowie Beantwortung von Fragen über die Hotline.",
      },
    },
    {
      period: "10/2020 — 02/2021",
      title: { en: "Student Advisor", de: "Beraterin für Studienangelegenheiten" },
      place: "Bahçeşehir University · Istanbul",
      detail: "",
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
      period: "01/2022 — 03/2022",
      title: { en: "German Language Course", de: "Sprachkurs Deutsch" },
      place: "TU Clausthal",
      detail: "",
    },
    {
      period: "2019 — 2021",
      title: "B.Sc. Software Engineering",
      place: "Bahçeşehir University · Istanbul",
      detail: "",
    },
    {
      period: "2015 — 2019",
      title: { en: "High School", de: "Schule" },
      place: "Beşiktaş Uğur Private High School",
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
      title: "German Electricity Market Pipeline",
      category: ["data"],
      desc: {
        en: "Data pipeline exploring when electricity in Germany is cheapest and greenest, and how wind and solar affect the price.",
        de: "Datenpipeline, die untersucht, wann Strom in Deutschland am günstigsten und grünsten ist und wie Wind und Solar den Preis beeinflussen.",
      },
      details: {
        en: "Ingests electricity market data from SMARD and weather data from Open-Meteo with Python and stores it as Parquet.\n\nThe data is transformed with dbt on DuckDB in bronze, silver and gold layers and orchestrated with Dagster. A dashboard is in progress.",
        de: "Lädt Strommarktdaten von SMARD und Wetterdaten von Open-Meteo mit Python und speichert sie als Parquet.\n\nDie Daten werden mit dbt auf DuckDB in Bronze-, Silver- und Gold-Schichten transformiert und mit Dagster orchestriert. Ein Dashboard ist in Arbeit.",
      },
      role: "",
      tags: ["Python", "dbt", "DuckDB", "Dagster", "Parquet"],
      links: [{ label: "Code", url: "https://github.com/niloya77/dataengineer" }],
      color: "#6a4cf0",
    },
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
    "C++", "Python", "Java", "JavaScript", "TypeScript", "React", "Node.js",
    "Git", "Linux", "OpenMP", "CMake", "SQL", "Docker",
  ],

  socials: [
    { label: "GitHub", url: "https://github.com/niloya77" },
    { label: "LinkedIn", url: "#" },
  ],
};
