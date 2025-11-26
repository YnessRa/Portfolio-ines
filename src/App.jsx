import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Github,
  Linkedin,
  Mail,
  FileDown,
  Globe,
  Sun,
  Moon,
  Filter,
  MapPin,
  Phone,
  BookOpen,
} from "lucide-react";

const PROFILE = {
  name: "Ines Rabeh",
  title: "Cloud & Cybersecurity M2 Student",
  location: "Lille, France",
  email: "",
  phone: "+33 7 81 44 42 74",
  headline:
    "Je conçois des architectures sécurisées, j'automatise l'infrastructure et je transforme des systèmes complexes en solutions fiables.",
  social: {
    github: "https://github.com/YnessRa",
    linkedin: "https://linkedin.com/in/ines-rabeh-6061441b1",
    portfolio: "#",
    cv: "/CV_Stage_Rabeh_Ines.pdf",
  },
};

const SKILLS = [
  { name: "Python", cat: "Programming" },
  { name: "C", cat: "Programming" },
  { name: "C++", cat: "Programming" },
  { name: "Java", cat: "Programming" },
  { name: "Bash", cat: "Programming" },
  { name: "Powershell", cat: "Programming" },
  { name: "YAML", cat: "Programming" },
  { name: "Linux", cat: "OS" },
  { name: "Ubuntu Server", cat: "OS" },
  { name: "Kali", cat: "OS" },
  { name: "Windows Server", cat: "OS" },
  { name: "Docker", cat: "Infra" },
  { name: "Kubernetes", cat: "Infra" },
  { name: "Ansible", cat: "Infra" },
  { name: "Terraform", cat: "Infra" },
  { name: "GIT CI/CD", cat: "Infra" },
  { name: "VMware", cat: "Infra" },
  { name: "VirtualBox", cat: "Infra" },
  { name: "Routing & Switching (Cisco)", cat: "Network" },
  { name: "Load Balancing", cat: "Network" },
  { name: "SDN", cat: "Network" },
  { name: "TCP/IP", cat: "Network" },
  { name: "DHCP/DNS", cat: "Network" },
  { name: "Squid / SOCKS5", cat: "Network" },
  { name: "OpenSSL", cat: "Security" },
  { name: "ACL", cat: "Security" },
  { name: "Wireshark", cat: "Security" },
  { name: "Suricata (IDS/IPS)", cat: "Security" },
  { name: "Reverse SSH", cat: "Security" },
  { name: "Cryptography", cat: "Security" },
  { name: "Oracle SQL", cat: "Data" },
  { name: "MongoDB", cat: "Data" },
  { name: "Prometheus", cat: "Observability" },
  { name: "Grafana", cat: "Observability" },
  { name: "Node Exporter", cat: "Observability" },
];

const CERTS = [
  { name: "Scrum Fundamentals Certified ,Formation Agile - Scrum", org: "Orange DevCenter" },
  { name: "CCNAv7: Introduction to Networks", org: "Cisco" },
];

const PROJECTS = [
  {
    title: "Secure Messaging PoC (Bash + RSA/EC + AES)",
    year: 2025,
    category: ["Security", "Crypto"],
    summary:
      "Messagerie CLI chiffrée de bout en bout avec échange de clés hybride RSA/EC, payloads AES et signatures pour la confiance.",
    highlights: [
      "Gestion des clés & cross-signatures",
      "Chiffrement hybride (EC/RSA + AES)",
      "Préparation échange via QR code",
    ],
    tech: ["Bash", "OpenSSL", "AES", "RSA", "EC"],
    links: { repo: "", demo: "" },
  },
  {
    title: "Kernel Char Device + Concurrency Lab",
    year: 2025,
    category: ["Systems"],
    summary:
      "Module noyau Linux exposant un périphérique de caractère avec buffer circulaire, contrôles sysfs, I/O bloquantes et synchronisation.",
    highlights: ["Sysfs controls", "Lectures bloquantes", "Concurrence testée"],
    tech: ["C", "Linux", "QEMU"],
    links: { repo: "", demo: "" },
  },
  {
    title: "Enterprise Network Admin (egress-only + proxy)",
    year: 2025,
    category: ["Networking", "Security"],
    summary:
      "Architecture egress-only avec proxy Squid (ACL strictes, SSL ports), iptables en DROP par défaut et fallback SSH tunnel/reverse SSH.",
    highlights: ["Whitelisting strict", "Contrôle de traversée proxy", "Runbooks opérationnels"],
    tech: ["Squid", "iptables", "SSH", "ncat", "corkscrew"],
    links: { repo: "", demo: "" },
  },
  {
    title: "Suricata IDS → IPS avec NFQUEUE",
    year: 2025,
    category: ["Security", "Networking"],
    summary:
      "Règles custom pour détecter SSH-over-HTTP/proxytunnel/chisel; passage de l'IDS à l'IPS inline via NFQUEUE.",
    highlights: ["Signatures custom", "Blocage inline", "Playbooks"],
    tech: ["Suricata", "NFQUEUE", "Linux"],
    links: { repo: "", demo: "" },
  },
  {
    title: "Cloud Infra – Nginx + Docker + Ansible/Terraform + Grafana",
    year: 2025,
    category: ["Cloud/DevOps"],
    summary:
      "Stack web automatisée (Nginx en conteneurs), durcissement firewall/SSH avec Ansible, IaC avec Terraform, Prometheus/Grafana pour les métriques.",
    highlights: ["IaC de bout en bout", "Observabilité", "Load balancing"],
    tech: ["Docker", "Ansible", "Terraform", "Prometheus", "Grafana"],
    links: { repo: "", demo: "" },
  },
  {
    title: "Projet compilateur – JSON Analyzer → Codegen",
    year: 2025,
    category: ["Systems"],
    summary:
      "Evolution d'un analyseur JSON vers un mini compilateur avec parsing et génération de code.",
    highlights: ["Parsing", "Codegen", "CLI tooling"],
    tech: ["Python", "Compilers"],
    links: { repo: "", demo: "" },
  },
  {
    title: "PFE – Orchestration réseau IP/MPLS",
    year: 2023,
    category: ["Networking", "Automation"],
    summary:
      "Orchestrateur Django pour automatiser la configuration d'équipements réseau IP/MPLS ainsi que les services (BGP, OSPF, EIGRP, eBGP, VPN) via une plateforme web.",
    highlights: ["Templates Jinja2", "Intégration Ansible", "Orchestration IP/MPLS"],
    tech: ["Django", "Python", "Jinja2", "Ansible"],
    links: { repo: "", demo: "" },
  },
];

const EDUCATION = [
  {
    school: "Université de Lille",
    program: "Master (M2) – Cloud & Cybersecurity",
    period: "2024 – 2025",
  },
  {
    school: "Institut d'informatique d'Auvergne (ISIMA), Clerment-Ferrand",
    program: "Licence – Informatique",
    period: "2023 – 2024",
  },
  {
    school: "Université Tunis El Manar",
    program: "Licence – Ingénierie des réseaux et systèmes",
    period: "2019 – 2022",
  },
];

const LANGS = [
  { name: "Français", level: "B2" },
  { name: "Anglais", level: "B2" },
];

const Badge = ({ children }) => (
  <span className="inline-block rounded-full border px-2 py-0.5 text-xs">
    {children}
  </span>
);

const Section = ({ id, title, children }) => (
  <section id={id} className="scroll-mt-24 mb-10">
    <h2 className="text-2xl font-semibold mb-4 text-zinc-900 dark:text-zinc-100">
      {title}
    </h2>
    <div className="space-y-3">{children}</div>
  </section>
);

const Card = ({ children }) => (
  <div className="rounded-2xl border p-4 shadow-sm bg-white/90 dark:bg-zinc-900/80">
    {children}
  </div>
);


function App() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const [dark, setDark] = useState(false);

  const cats = useMemo(
    () => ["All", ...Array.from(new Set(PROJECTS.flatMap((p) => p.category)))],
    []
  );

  const filtered = useMemo(() => {
    return PROJECTS.filter((p) => {
      const text = (p.title + " " + p.summary + " " + p.tech.join(" ")).toLowerCase();
      const okCat = cat === "All" || p.category.includes(cat);
      return okCat && text.includes(q.toLowerCase());
    });
  }, [q, cat]);

  return (
    <div className={dark ? "dark" : ""}>
      <div className="min-h-screen bg-gradient-to-b from-indigo-500 via-purple-500 to-indigo-700 text-zinc-900 dark:from-zinc-950 dark:to-zinc-900 dark:text-zinc-100">
        {/* NAVBAR */}
        <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
          <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
            {/* Avatar + nom */}
            <div className="flex items-center gap-3">
              {/* Mets une vraie photo dans /public/profile.jpg si tu veux */}
              <div className="w-10 h-10 rounded-full border-2 border-blue-500 overflow-hidden bg-blue-100 flex items-center justify-center text-sm font-semibold text-blue-600">
                IR
              </div>
              {
                  <img src="./photographie d'identité.jpg" alt="Ines Rabeh" className="w-10 h-10 rounded-full border-2 border-blue-500 object-cover" /> }
              <span className="font-semibold text-blue-600 text-lg">
                {PROFILE.name}
              </span>
            </div>

            {/* Menu */}
            <nav className="hidden md:flex gap-5 text-sm text-zinc-700">
              {[
                ["Home", "#top"],
                ["About", "#about"],
                ["Experience", "#experience"],
                ["Education", "#education"],
                ["Projects", "#projects"],
                ["Skills", "#skills"],
                ["Contact", "#contact"],
              ].map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  className="hover:text-blue-600 hover:underline"
                >
                  {label}
                </a>
              ))}
            </nav>

            {/* Mode sombre */}
            <button
              onClick={() => setDark((d) => !d)}
              className="ml-4 rounded-xl border px-2 py-1 text-xs text-zinc-700 hover:bg-zinc-100"
              aria-label="Toggle theme"
            >
              {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </header>

        {/* CONTENU */}
        <main id="top" className="mx-auto max-w-6xl px-4 py-14">
          {/* HERO */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center text-white mb-16"
          >
            <p className="text-sm md:text-base mb-2 opacity-90">
              Hi, I&apos;m
            </p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-4xl md:text-5xl font-extrabold mb-3"
            >
              <span className="bg-gradient-to-r from-yellow-300 to-blue-300 bg-clip-text text-transparent">
                {PROFILE.name}
              </span>
            </motion.h1>

            <p className="text-lg md:text-2xl font-medium mb-3 opacity-95">
              {PROFILE.title}
            </p>

            <p className="max-w-2xl mx-auto text-sm md:text-base opacity-90">
              Passionnée par la sécurité des systèmes, l’automatisation d’infrastructure
              (Ansible / Terraform / Kubernetes ) et la conception d’architectures réseau sécurisées
              (observabilité et monitoring).
            </p>

            {/* Boutons */}
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                href="#contact"
                className="px-6 py-3 rounded-full bg-yellow-400 text-blue-900 font-semibold shadow-lg shadow-yellow-500/40 hover:translate-y-[1px] transition-transform"
              >
                Get In Touch
              </a>
              <a
                href={PROFILE.social.cv}
                className="px-6 py-3 rounded-full border border-white/70 text-white font-semibold hover:bg-white/10"
              >
                View Resume
              </a>
            </div>
          </motion.section>

          {/* SECTION BLANCHE (ABOUT + le reste) */}
          <div className="bg-white/95 dark:bg-zinc-950/90 rounded-3xl shadow-lg px-6 md:px-10 py-10">
            {/* ABOUT */}
            <Section id="about" title="About">
              <Card>
                <div className="flex flex-col md:flex-row items-center gap-8">
                  {/* Photo */}
                  <div className="shrink-0">
                    {}
                    <div className="w-40 h-40 rounded-3xl overflow-hidden shadow-lg bg-zinc-200">
                      {<img src="./photo.jpg" /> }
                      <img
                        src="./photo.jpg"
                        alt="Ines Rabeh"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Texte */}
                  <div className="text-sm md:text-base text-zinc-700 dark:text-zinc-200">
                    <h3 className="text-xl font-semibold mb-2">
                      Hi, I&apos;m Ines 👋
                    </h3>
                    <p className="mb-3">
                      Étudiante en Master 2 Cloud & Cybersecurity, je construis des systèmes
                      sécurisés dès la conception : architectures egress-only,
                      pipelines et automatisation d&apos;infrastructure avec
                      Ansible & Terraform, le tout instrumenté avec Prometheus/Grafana.
                    </p>
                    <p className="mb-3">
                      J&apos;aime autant le côté très technique (Linux, réseaux, devops)
                      que la partie ingénierie : fiabiliser, documenter, industrialiser et
                      rendre les plateformes observables.
                    </p>
                    <p>
                      Aujourd&apos;hui, je cherche à rejoindre une équipe Cloud / Sécu / DevOps
                      où je peux contribuer à des architectures robustes tout en continuant à
                      apprendre.
                    </p>
                  </div>
                </div>
              </Card>
            </Section>

            {/* SKILLS */}
            <Section id="skills" title="Skills">
              <Card>
                <div className="flex items-center gap-3 mb-4">
                  <Filter className="w-4 h-4" />
                  <div className="flex flex-wrap gap-2 text-sm">
                    {Array.from(new Set(SKILLS.map((s) => s.cat))).map((c) => (
                      <button
                        key={c}
                        className={`rounded-full border px-3 py-1 ${
                          c === cat
                            ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-black"
                            : ""
                        }`}
                        onClick={() => setCat(c === cat ? "All" : c)}
                      >
                        {c}
                      </button>
                    ))}
                    <button
                      className={`rounded-full border px-3 py-1 ${
                        cat === "All"
                          ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-black"
                          : ""
                      }`}
                      onClick={() => setCat("All")}
                    >
                      All
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <Search className="w-4 h-4" />
                  <input
                    className="w-full rounded-xl border px-3 py-2 bg-transparent"
                    placeholder="Rechercher une compétence ou techno…"
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {SKILLS.filter(
                    (s) =>
                      (cat === "All" || s.cat === cat) &&
                      s.name.toLowerCase().includes(q.toLowerCase())
                  ).map((s, i) => (
                    <Badge key={i}>{s.name}</Badge>
                  ))}
                </div>
              </Card>
            </Section>

            {/* PROJECTS */}
            <Section id="projects" title="Projects & Case Studies">
              <div className="grid md:grid-cols-2 gap-4">
                {filtered.map((p, i) => (
                  <Card key={i}>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">{p.title}</h3>
                        <span className="text-sm text-zinc-500">{p.year}</span>
                      </div>
                      <p className="text-sm text-zinc-600 dark:text-zinc-300">
                        {p.summary}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {p.category.map((c) => (
                          <Badge key={c}>{c}</Badge>
                        ))}
                      </div>
                      <ul className="list-disc ml-5 text-sm">
                        {p.highlights.map((h) => (
                          <li key={h}>{h}</li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap gap-2">
                        {p.tech.map((t) => (
                          <Badge key={t}>{t}</Badge>
                        ))}
                      </div>
                      <div className="flex gap-3 text-sm">
                        {p.links?.repo && (
                          <a
                            className="inline-flex items-center gap-1 hover:underline"
                            href={p.links.repo}
                          >
                            <Github className="w-4 h-4" /> Repo
                          </a>
                        )}
                        {p.links?.demo && (
                          <a
                            className="inline-flex items-center gap-1 hover:underline"
                            href={p.links.demo}
                          >
                            <Globe className="w-4 h-4" /> Demo
                          </a>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </Section>

            {/* EXPERIENCE */}
            <Section id="experience" title="Experience Snapshot">
              <Card>
                <ul className="list-disc ml-5">
                  <li>
                    Gestion d'incidents et problèmes sur des services en production :
                    tri, RCA, plans de prévention.
                  </li>
                  <li>
                    Planification des UAT, cutovers et déploiements (DEV→QA→PROD),
                    maintien des runbooks et configs.
                  </li>
                  <li>
                    Conception de topologies sécurisées (egress-only, IPS inline) et
                    écriture de règles de détection.
                  </li>
                  <li>
                    Automatisation avec Ansible/Terraform, monitoring avec
                    Prometheus/Grafana.
                  </li>
                </ul>
              </Card>
            </Section>

            {/* EDUCATION + CERTS */}
            <div id="education" className="grid md:grid-cols-2 gap-4">
              <Section id="education" title="Education">
                {EDUCATION.map((e, i) => (
                  <Card key={i}>
                    <div className="flex items-center gap-3">
                      <BookOpen className="w-5 h-5" />
                      <div>
                        <div className="font-medium">{e.school}</div>
                        <div className="text-sm text-zinc-600 dark:text-zinc-300">
                          {e.program}
                        </div>
                        <div className="text-xs text-zinc-500">{e.period}</div>
                      </div>
                    </div>
                  </Card>
                ))}
              </Section>
              <Section id="certs" title="Certifications & Languages">
                <Card>
                  <div className="mb-3">
                    <div className="font-medium mb-1">Certifications</div>
                    <ul className="list-disc ml-5 text-sm">
                      {CERTS.map((c) => (
                        <li key={c.name}>
                          {c.name} – {c.org}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="font-medium mb-1">Langues</div>
                    <div className="flex gap-2 flex-wrap">
                      {LANGS.map((l) => (
                        <Badge key={l.name}>
                          {l.name} ({l.level})
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Card>
              </Section>
            </div>

            {/* CONTACT */}
            <Section id="contact" title="Contact">
              <Card>
                <p className="text-sm text-zinc-600 dark:text-zinc-300">
                  Ouverte aux stages et opportunités junior en Cloud, Cybersecurity et
                  DevOps. Pour toute opportunité :
                </p>
                <div className="mt-3 flex flex-wrap gap-3 text-sm">
                  <a
                    className="inline-flex items-center gap-2 rounded-xl border px-3 py-1.5"
                    href={`mailto:${PROFILE.email}`}
                  >
                    <Mail className="w-4 h-4" /> {PROFILE.email}
                  </a>
                  <span className="inline-flex items-center gap-2 rounded-xl border px-3 py-1.5">
                    <Phone className="w-4 h-4" /> {PROFILE.phone}
                  </span>
                  <a
                    className="inline-flex items-center gap-2 rounded-xl border px-3 py-1.5"
                    href={PROFILE.social.linkedin}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Linkedin className="w-4 h-4" /> LinkedIn
                  </a>
                </div>
              </Card>
            </Section>
          </div>

          {/* FOOTER */}
          <footer className="mt-10 py-6 text-center text-xs text-white/80">
            © {new Date().getFullYear()} {PROFILE.name}. Built with React, See you soon
          </footer>
        </main>
      </div>
    </div>
  );
}

export default App;
