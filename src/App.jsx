import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Github,
  Linkedin,
  Mail,
  Globe,
  Filter,
  MapPin,
  Phone,
  BookOpen,
} from "lucide-react";

const UI = {
  fr: {
    nav: {
      home: "Accueil",
      about: "À propos",
      experience: "Expérience",
      projects: "Projets",
      skills: "Compétences",
      education: "Formation",
      contact: "Contact",
    },
    hello: "Bonjour, je suis",
    heroText:
      "Passionnée par la sécurité des systèmes, l’automatisation d’infrastructure (Ansible / Terraform / Kubernetes), la supervision et la conception d’architectures réseau sécurisées. Disponible pour un CDI, mobilité nationale.",
    contactBtn: "Me contacter",
    cvBtn: "Voir mon CV",
    aboutTitle: "À propos",
    aboutHello: "Bonjour, moi c'est Ines 👋",
    about: [
      "Ingénieure Cloud, DevOps & Sécurité, diplômée du Master Cloud Computing & Cybersécurité de l'Université de Lille. Je conçois des infrastructures sécurisées et automatisées : Ansible, Terraform, GitLab CI/CD, supervision avec Zabbix et Prometheus/Grafana.",
      "Lors de mon stage chez Worldline (équipe SysOps), j'ai automatisé le déploiement d'agents de collecte de logs et de supervision sur des environnements de pré-production et de production, et fiabilisé des scripts d'administration de clusters RHEL.",
      "J'aime autant le côté très technique (Linux, réseaux, DevOps) que la partie ingénierie : fiabiliser, documenter, industrialiser et rendre les plateformes observables.",
    ],
    availability: (
      <>
        <strong>Disponible</strong> pour un CDI en DevOps, Cloud, SRE ou SysOps,
        avec <strong>mobilité nationale</strong>.
      </>
    ),
    experienceTitle: "Expérience professionnelle",
    skillsTitle: "Compétences",
    all: "Tous",
    searchSkill: "Rechercher une compétence ou techno…",
    projectsTitle: "Projets",
    searchProject: "Rechercher un projet…",
    educationTitle: "Formation",
    certsTitle: "Certifications & Langues",
    certs: "Certifications",
    langs: "Langues",
    contactTitle: "Contact",
    contactText:
      "Disponible pour un CDI en DevOps, Cloud, SRE ou SysOps, avec mobilité nationale. Pour me contacter :",
  },
  en: {
    nav: {
      home: "Home",
      about: "About",
      experience: "Experience",
      projects: "Projects",
      skills: "Skills",
      education: "Education",
      contact: "Contact",
    },
    hello: "Hi, I'm",
    heroText:
      "Passionate about systems security, infrastructure automation (Ansible / Terraform / Kubernetes), monitoring and secure network architecture design. Open to a permanent position, willing to relocate anywhere in France.",
    contactBtn: "Get in touch",
    cvBtn: "View resume",
    aboutTitle: "About",
    aboutHello: "Hi, I'm Ines 👋",
    about: [
      "Cloud, DevOps & Security Engineer with a Master's degree in Cloud Computing & Cybersecurity from the University of Lille. I build secure, automated infrastructure: Ansible, Terraform, GitLab CI/CD, monitoring with Zabbix and Prometheus/Grafana.",
      "During my internship at Worldline (SysOps team), I automated the deployment of log collection and monitoring agents across pre-production and production environments, and made RHEL cluster administration scripts more reliable.",
      "I enjoy both the hands-on technical side (Linux, networking, DevOps) and the engineering side: making platforms reliable, documented, industrialized and observable.",
    ],
    availability: (
      <>
        <strong>Available</strong> for a full-time position in DevOps, Cloud, SRE
        or SysOps, <strong>open to relocation anywhere in France</strong>.
      </>
    ),
    experienceTitle: "Professional experience",
    skillsTitle: "Skills",
    all: "All",
    searchSkill: "Search a skill or technology…",
    projectsTitle: "Projects",
    searchProject: "Search a project…",
    educationTitle: "Education",
    certsTitle: "Certifications & Languages",
    certs: "Certifications",
    langs: "Languages",
    contactTitle: "Contact",
    contactText:
      "Available for a full-time position in DevOps, Cloud, SRE or SysOps, open to relocation anywhere in France. Get in touch:",
  },
};

const CAT = {
  Programming: { fr: "Programmation", en: "Programming" },
  OS: { fr: "Systèmes", en: "OS" },
  Infra: { fr: "Infra", en: "Infra" },
  Network: { fr: "Réseau", en: "Network" },
  Security: { fr: "Sécurité", en: "Security" },
  Data: { fr: "Données", en: "Data" },
  Observability: { fr: "Supervision", en: "Observability" },
  Crypto: { fr: "Crypto", en: "Crypto" },
  Systems: { fr: "Systèmes", en: "Systems" },
  Networking: { fr: "Réseau", en: "Networking" },
  "Cloud/DevOps": { fr: "Cloud/DevOps", en: "Cloud/DevOps" },
  Automation: { fr: "Automatisation", en: "Automation" },
};

/* =========================================================
   DONNÉES
   Les champs { fr: "...", en: "..." } sont traduits.
   ========================================================= */
const PROFILE = {
  name: "Ines Rabeh",
  title: {
    fr: "Ingénieure Cloud, DevOps & Sécurité",
    en: "Cloud, DevOps & Security Engineer",
  },
  location: {
    fr: "Lille, France · Mobilité nationale",
    en: "Lille, France · Open to relocation",
  },
  email: "inesrabehjob@gmail.com",
  phone: "+33 7 81 44 42 74",
  social: {
    github: "https://github.com/YnessRa",
    linkedin: "https://linkedin.com/in/ines-rabeh-6061441b1",
    portfolio: "https://ynessra.github.io/Portfolio-ines/",
    cv: "./CV_Ines_Rabeh.pdf",
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
  { name: "RHEL", cat: "OS" },
  { name: "Docker", cat: "Infra" },
  { name: "Kubernetes", cat: "Infra" },
  { name: "Ansible", cat: "Infra" },
  { name: "Terraform", cat: "Infra" },
  { name: "GitLab CI/CD", cat: "Infra" },
  { name: "Pacemaker", cat: "Infra" },
  { name: "VMware", cat: "Infra" },
  { name: "VirtualBox", cat: "Infra" },
  { name: "AWS base", cat: "Infra" },
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
  { name: "PostgreSQL", cat: "Data" },
  { name: "Oracle SQL", cat: "Data" },
  { name: "MongoDB", cat: "Data" },
  { name: "Prometheus", cat: "Observability" },
  { name: "Grafana", cat: "Observability" },
  { name: "Node Exporter", cat: "Observability" },
  { name: "Zabbix", cat: "Observability" },
  { name: "Elastic Agent", cat: "Observability" },
];

const CERTS = [
  { name: "Scrum Fundamentals Certified – Agile Scrum", org: "Orange DevCenter" },
  { name: "CCNAv7: Introduction to Networks", org: "Cisco" },
];

const EXPERIENCE = [
  {
    role: {
      fr: "Ingénieure SysOps (stage de fin d'études)",
      en: "SysOps Engineer (final-year internship)",
    },
    company: "Worldline",
    place: "Lille",
    period: { fr: "Mars 2026 – Sept. 2026", en: "Mar. 2026 – Sept. 2026" },
    points: {
      fr: [
        "Rôle Ansible pour Windows Server automatisant le déploiement d'Elastic Agent (collecte de logs), infra de test provisionnée avec Terraform.",
        "Adaptation d'un script Bash d'administration de clusters Pacemaker pour RHEL 8 et RHEL 9 : plus de 20 anomalies corrigées, packaging RPM, tests GitLab CI/CD.",
        "Migration de la supervision Watchdog vers Zabbix : mapping des indicateurs et déploiement automatisé des agents Zabbix avec Ansible (préprod et prod).",
      ],
      en: [
        "Ansible role for Windows Server automating Elastic Agent deployment (log collection), with test infrastructure provisioned using Terraform.",
        "Adapted a Bash script for Pacemaker cluster administration to support both RHEL 8 and RHEL 9: fixed 20+ defects, RPM packaging, GitLab CI/CD testing.",
        "Migrated monitoring from Watchdog to Zabbix: metrics mapping and automated Zabbix agent deployment with Ansible (pre-production and production).",
      ],
    },
    tags: ["Ansible", "Terraform", "GitLab CI/CD", "Zabbix", "RHEL", "Elastic"],
  },
  {
    role: {
      fr: "Ingénieure réseau / automatisation (stage)",
      en: "Network / Automation Engineer (internship)",
    },
    company: "Ooredoo",
    place: "Tunis",
    period: { fr: "Févr. 2022 – Juin 2022", en: "Feb. 2022 – June 2022" },
    points: {
      fr: [
        "Simulation du backbone IP/MPLS sous GNS3 et templates Jinja2 déployés avec Ansible.",
        "Plateforme d'orchestration Django/Python générant des configurations réseau (BGP, OSPF, EIGRP, VPN), mise en production.",
      ],
      en: [
        "Simulated the IP/MPLS backbone in GNS3, with Jinja2 templates deployed through Ansible.",
        "Built a Django/Python orchestration platform generating network configurations (BGP, OSPF, EIGRP, VPN), deployed to production.",
      ],
    },
    tags: ["Ansible", "Python", "Django", "GNS3", "BGP", "MPLS"],
  },
];

const PROJECTS = [
  {
    title: {
      fr: "PoC de messagerie sécurisée (Bash + RSA/EC + AES)",
      en: "Secure Messaging PoC (Bash + RSA/EC + AES)",
    },
    year: 2025,
    category: ["Security", "Crypto"],
    summary: {
      fr: "Messagerie CLI chiffrée de bout en bout avec échange de clés hybride RSA/EC, payloads AES et signatures pour la confiance.",
      en: "End-to-end encrypted CLI messaging with hybrid RSA/EC key exchange, AES payloads and signatures for trust.",
    },
    highlights: {
      fr: ["Gestion des clés & cross-signatures", "Chiffrement hybride (EC/RSA + AES)", "Préparation échange via QR code"],
      en: ["Key management & cross-signing", "Hybrid encryption (EC/RSA + AES)", "QR-code key exchange groundwork"],
    },
    tech: ["Bash", "OpenSSL", "AES", "RSA", "EC"],
    links: { repo: "", demo: "" },
  },
  {
    title: {
      fr: "Périphérique caractère noyau + concurrence",
      en: "Kernel Char Device + Concurrency Lab",
    },
    year: 2025,
    category: ["Systems"],
    summary: {
      fr: "Module noyau Linux exposant un périphérique de caractère avec buffer circulaire, contrôles sysfs, I/O bloquantes et synchronisation.",
      en: "Linux kernel module exposing a character device with a ring buffer, sysfs controls, blocking I/O and synchronization.",
    },
    highlights: {
      fr: ["Contrôles sysfs", "Lectures bloquantes", "Concurrence testée"],
      en: ["Sysfs controls", "Blocking reads", "Tested concurrency"],
    },
    tech: ["C", "Linux", "QEMU"],
    links: { repo: "", demo: "" },
  },
  {
    title: {
      fr: "Administration réseau d'entreprise (egress-only + proxy)",
      en: "Enterprise Network Admin (egress-only + proxy)",
    },
    year: 2025,
    category: ["Networking", "Security"],
    summary: {
      fr: "Architecture egress-only avec proxy Squid (ACL strictes, ports SSL), iptables en DROP par défaut et repli via tunnel SSH / reverse SSH.",
      en: "Egress-only architecture with a Squid proxy (strict ACLs, SSL ports), default-DROP iptables and SSH tunnel / reverse SSH fallback.",
    },
    highlights: {
      fr: ["Liste blanche stricte", "Contrôle de traversée du proxy", "Runbooks opérationnels"],
      en: ["Strict whitelisting", "Proxy traversal control", "Operational runbooks"],
    },
    tech: ["Squid", "iptables", "SSH", "ncat", "corkscrew"],
    links: { repo: "", demo: "" },
  },
  {
    title: {
      fr: "Suricata IDS → IPS avec NFQUEUE",
      en: "Suricata IDS → IPS with NFQUEUE",
    },
    year: 2025,
    category: ["Security", "Networking"],
    summary: {
      fr: "Règles personnalisées pour détecter SSH-over-HTTP / proxytunnel / chisel ; passage de l'IDS à l'IPS inline via NFQUEUE.",
      en: "Custom rules to detect SSH-over-HTTP / proxytunnel / chisel; moved from IDS to inline IPS using NFQUEUE.",
    },
    highlights: {
      fr: ["Signatures personnalisées", "Blocage inline", "Playbooks"],
      en: ["Custom signatures", "Inline blocking", "Playbooks"],
    },
    tech: ["Suricata", "NFQUEUE", "Linux"],
    links: { repo: "", demo: "" },
  },
  {
    title: {
      fr: "Infra Cloud – Nginx + Docker + Ansible/Terraform + Grafana",
      en: "Cloud Infra – Nginx + Docker + Ansible/Terraform + Grafana",
    },
    year: 2025,
    category: ["Cloud/DevOps"],
    summary: {
      fr: "Stack web automatisée (Nginx en conteneurs), durcissement firewall/SSH avec Ansible, IaC avec Terraform, Prometheus/Grafana pour les métriques.",
      en: "Automated web stack (containerized Nginx), firewall/SSH hardening with Ansible, IaC with Terraform, Prometheus/Grafana for metrics.",
    },
    highlights: {
      fr: ["IaC de bout en bout", "Observabilité", "Load balancing"],
      en: ["End-to-end IaC", "Observability", "Load balancing"],
    },
    tech: ["Docker", "Ansible", "Terraform", "Prometheus", "Grafana", "OpenStack", "Node Exporter"],
    links: { repo: "", demo: "" },
  },
  {
    title: {
      fr: "Projet compilateur – Analyseur JSON → génération de code",
      en: "Compiler project – JSON Analyzer → Codegen",
    },
    year: 2025,
    category: ["Systems"],
    summary: {
      fr: "Évolution d'un analyseur JSON vers un mini compilateur avec parsing et génération de code.",
      en: "Evolved a JSON analyzer into a small compiler with parsing and code generation.",
    },
    highlights: {
      fr: ["Parsing", "Génération de code", "Outil en ligne de commande"],
      en: ["Parsing", "Codegen", "CLI tooling"],
    },
    tech: ["Python", "Compilers"],
    links: { repo: "", demo: "" },
  },
  {
    title: {
      fr: "PFE – Orchestration réseau IP/MPLS (Ooredoo)",
      en: "Final-year project – IP/MPLS network orchestration (Ooredoo)",
    },
    year: 2022,
    category: ["Networking", "Automation"],
    summary: {
      fr: "Orchestrateur Django pour automatiser la configuration d'équipements réseau IP/MPLS ainsi que les services (BGP, OSPF, EIGRP, eBGP, VPN) via une plateforme web.",
      en: "Django orchestrator automating the configuration of IP/MPLS network devices and services (BGP, OSPF, EIGRP, eBGP, VPN) through a web platform.",
    },
    highlights: {
      fr: ["Templates Jinja2", "Intégration Ansible", "Orchestration IP/MPLS"],
      en: ["Jinja2 templates", "Ansible integration", "IP/MPLS orchestration"],
    },
    tech: ["Django", "Python", "Jinja2", "Ansible"],
    links: { repo: "", demo: "" },
  },
];

const EDUCATION = [
  {
    school: { fr: "Université de Lille", en: "University of Lille" },
    program: {
      fr: "Master Cloud Computing & Cybersécurité (diplômée)",
      en: "Master's in Cloud Computing & Cybersecurity (graduated)",
    },
    period: "2024 – 2026",
  },
  {
    school: "ISIMA, Clermont-Ferrand",
    program: {
      fr: "Licence – Informatique",
      en: "Bachelor's – Computer Science",
    },
    period: "2023 – 2024",
  },
  {
    school: {
      fr: "Institut Supérieur d'Informatique (ISI), Tunis",
      en: "Higher Institute of Computer Science (ISI), Tunis",
    },
    program: {
      fr: "Licence – Ingénierie des réseaux et systèmes",
      en: "Bachelor's – Network & Systems Engineering",
    },
    period: "2020 – 2023",
  },
];

const LANGS = [
  { name: { fr: "Français", en: "French" }, level: "B2" },
  { name: { fr: "Anglais", en: "English" }, level: "B2" },
];

/* =========================================================
   COMPOSANTS
   ========================================================= */
const Badge = ({ children }) => (
  <span className="inline-block rounded-full border px-2 py-0.5 text-xs">
    {children}
  </span>
);

const Section = ({ id, title, children }) => (
  <section id={id} className="scroll-mt-24 mb-10">
    <h2 className="text-2xl font-semibold mb-4 text-zinc-900">{title}</h2>
    <div className="space-y-3">{children}</div>
  </section>
);

const Card = ({ children }) => (
  <div className="rounded-2xl border p-4 shadow-sm bg-white/90">{children}</div>
);

function getInitialLang() {
  try {
    const saved = localStorage.getItem("lang");
    if (saved === "fr" || saved === "en") return saved;
  } catch {
  }
  return "fr";
}

function App() {
  const [lang, setLang] = useState(getInitialLang);
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const [projQ, setProjQ] = useState("");
  const [projCat, setProjCat] = useState("All");

  const t = UI[lang];
  const tr = (v) =>
    v && typeof v === "object" && !Array.isArray(v) && "fr" in v ? v[lang] : v;
  const catLabel = (c) => (CAT[c] ? CAT[c][lang] : c);

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem("lang", lang);
    } catch {
      /* ignore */
    }
  }, [lang]);

  const cats = useMemo(
    () => ["All", ...Array.from(new Set(PROJECTS.flatMap((p) => p.category)))],
    []
  );

  const filtered = useMemo(() => {
    return PROJECTS.filter((p) => {
      const text = (
        p.title[lang] + " " + p.summary[lang] + " " + p.tech.join(" ")
      ).toLowerCase();
      const okCat = projCat === "All" || p.category.includes(projCat);
      return okCat && text.includes(projQ.toLowerCase());
    });
  }, [projQ, projCat, lang]);

  const activeBtn = "bg-zinc-900 text-white";

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-500 via-purple-500 to-indigo-700 text-zinc-900">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          {/* Avatar + nom */}
          <div className="flex items-center gap-3">
            <img
              src="./photographie d'identité.jpg"
              alt="Ines Rabeh"
              className="w-10 h-10 rounded-full border-2 border-blue-500 object-cover"
            />
            <span className="font-semibold text-blue-600 text-lg">
              {PROFILE.name}
            </span>
          </div>

          {/* Menu */}
          <nav className="hidden md:flex gap-5 text-sm text-zinc-700">
            {[
              [t.nav.home, "#top"],
              [t.nav.about, "#about"],
              [t.nav.experience, "#experience"],
              [t.nav.skills, "#skills"],
              [t.nav.projects, "#projects"],
              [t.nav.education, "#education"],
              [t.nav.contact, "#contact"],
            ].map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="hover:text-blue-600 hover:underline"
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Choix de la langue FR / EN */}
          <div
            className="ml-4 flex rounded-xl border overflow-hidden text-xs font-semibold"
            role="group"
            aria-label="Language"
          >
            {["fr", "en"].map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                aria-pressed={lang === l}
                className={`px-2.5 py-1 ${
                  lang === l ? "bg-blue-600 text-white" : "text-zinc-700 hover:bg-zinc-100"
                }`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
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
          <p className="text-sm md:text-base mb-2 opacity-90">{t.hello}</p>

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

          <p className="text-lg md:text-2xl font-medium mb-2 opacity-95">
            {tr(PROFILE.title)}
          </p>
          <p className="inline-flex items-center gap-1 text-sm mb-4 opacity-90">
            <MapPin className="w-4 h-4" /> {tr(PROFILE.location)}
          </p>

          <p className="max-w-2xl mx-auto text-sm md:text-base opacity-90">
            {t.heroText}
          </p>

          {/* Boutons */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="#contact"
              className="px-6 py-3 rounded-full bg-yellow-400 text-blue-900 font-semibold shadow-lg shadow-yellow-500/40 hover:translate-y-[1px] transition-transform"
            >
              {t.contactBtn}
            </a>
            <a
              href={PROFILE.social.cv}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 rounded-full border border-white/70 text-white font-semibold hover:bg-white/10"
            >
              {t.cvBtn}
            </a>
          </div>
        </motion.section>

        {/* SECTION BLANCHE */}
        <div className="bg-white/95 rounded-3xl shadow-lg px-6 md:px-10 py-10">
          {/* ABOUT */}
          <Section id="about" title={t.aboutTitle}>
            <Card>
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="shrink-0">
                  <div className="w-40 h-40 rounded-3xl overflow-hidden shadow-lg bg-zinc-200">
                    <img
                      src="./photo.jpg"
                      alt="Ines Rabeh"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="text-sm md:text-base text-zinc-700">
                  <h3 className="text-xl font-semibold mb-2">{t.aboutHello}</h3>
                  {t.about.map((para, i) => (
                    <p key={i} className="mb-3">
                      {para}
                    </p>
                  ))}
                  <p>{t.availability}</p>
                </div>
              </div>
            </Card>
          </Section>

          {/* EXPERIENCE */}
          <Section id="experience" title={t.experienceTitle}>
            <div className="space-y-4">
              {EXPERIENCE.map((x, i) => (
                <Card key={i}>
                  <div className="flex flex-wrap justify-between gap-2">
                    <div>
                      <h3 className="font-semibold">{tr(x.role)}</h3>
                      <p className="text-sm text-blue-600">
                        {x.company} · {x.place}
                      </p>
                    </div>
                    <span className="text-sm text-zinc-500">{tr(x.period)}</span>
                  </div>
                  <ul className="list-disc ml-5 mt-3 space-y-1 text-sm">
                    {x.points[lang].map((p, j) => (
                      <li key={j}>{p}</li>
                    ))}
                  </ul>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {x.tags.map((tag) => (
                      <Badge key={tag}>{tag}</Badge>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </Section>

          {/* SKILLS */}
          <Section id="skills" title={t.skillsTitle}>
            <Card>
              <div className="flex items-center gap-3 mb-4">
                <Filter className="w-4 h-4" />
                <div className="flex flex-wrap gap-2 text-sm">
                  <button
                    className={`rounded-full border px-3 py-1 ${cat === "All" ? activeBtn : ""}`}
                    onClick={() => setCat("All")}
                  >
                    {t.all}
                  </button>
                  {Array.from(new Set(SKILLS.map((s) => s.cat))).map((c) => (
                    <button
                      key={c}
                      className={`rounded-full border px-3 py-1 ${c === cat ? activeBtn : ""}`}
                      onClick={() => setCat(c === cat ? "All" : c)}
                    >
                      {catLabel(c)}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2 mb-4">
                <Search className="w-4 h-4" />
                <input
                  className="w-full rounded-xl border px-3 py-2 bg-transparent"
                  placeholder={t.searchSkill}
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {SKILLS.filter(
                  (s) =>
                    (cat === "All" || s.cat === cat) &&
                    s.name.toLowerCase().includes(q.toLowerCase())
                ).map((s) => (
                  <Badge key={s.name}>{s.name}</Badge>
                ))}
              </div>
            </Card>
          </Section>

          {/* PROJECTS */}
          <Section id="projects" title={t.projectsTitle}>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              {cats.map((c) => (
                <button
                  key={c}
                  className={`rounded-full border px-3 py-1 text-sm ${c === projCat ? activeBtn : ""}`}
                  onClick={() => setProjCat(c)}
                >
                  {c === "All" ? t.all : catLabel(c)}
                </button>
              ))}
              <input
                className="ml-auto rounded-xl border px-3 py-1.5 text-sm bg-transparent"
                placeholder={t.searchProject}
                value={projQ}
                onChange={(e) => setProjQ(e.target.value)}
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {filtered.map((p, i) => (
                <Card key={i}>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-lg font-semibold">{tr(p.title)}</h3>
                      <span className="text-sm text-zinc-500">{p.year}</span>
                    </div>
                    <p className="text-sm text-zinc-600">{tr(p.summary)}</p>
                    <div className="flex flex-wrap gap-2">
                      {p.category.map((c) => (
                        <Badge key={c}>{catLabel(c)}</Badge>
                      ))}
                    </div>
                    <ul className="list-disc ml-5 text-sm">
                      {p.highlights[lang].map((h) => (
                        <li key={h}>{h}</li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-2">
                      {p.tech.map((tech) => (
                        <Badge key={tech}>{tech}</Badge>
                      ))}
                    </div>
                    <div className="flex gap-3 text-sm">
                      {p.links?.repo && (
                        <a
                          className="inline-flex items-center gap-1 hover:underline"
                          href={p.links.repo}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <Github className="w-4 h-4" /> Repo
                        </a>
                      )}
                      {p.links?.demo && (
                        <a
                          className="inline-flex items-center gap-1 hover:underline"
                          href={p.links.demo}
                          target="_blank"
                          rel="noreferrer"
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

          {/* EDUCATION + CERTS */}
          <div className="grid md:grid-cols-2 gap-4">
            <Section id="education" title={t.educationTitle}>
              {EDUCATION.map((e, i) => (
                <Card key={i}>
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-5 h-5" />
                    <div>
                      <div className="font-medium">{tr(e.school)}</div>
                      <div className="text-sm text-zinc-600">{tr(e.program)}</div>
                      <div className="text-xs text-zinc-500">{e.period}</div>
                    </div>
                  </div>
                </Card>
              ))}
            </Section>
            <Section id="certs" title={t.certsTitle}>
              <Card>
                <div className="mb-3">
                  <div className="font-medium mb-1">{t.certs}</div>
                  <ul className="list-disc ml-5 text-sm">
                    {CERTS.map((c) => (
                      <li key={c.name}>
                        {c.name} – {c.org}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="font-medium mb-1">{t.langs}</div>
                  <div className="flex gap-2 flex-wrap">
                    {LANGS.map((l) => (
                      <Badge key={l.level + tr(l.name)}>
                        {tr(l.name)} ({l.level})
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            </Section>
          </div>

          {/* CONTACT */}
          <Section id="contact" title={t.contactTitle}>
            <Card>
              <p className="text-sm text-zinc-600">{t.contactText}</p>
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
                <a
                  className="inline-flex items-center gap-2 rounded-xl border px-3 py-1.5"
                  href={PROFILE.social.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Github className="w-4 h-4" /> GitHub
                </a>
              </div>
            </Card>
          </Section>
        </div>

        {/* FOOTER */}
        <footer className="mt-10 py-6 text-center text-xs text-white/80">
          © {new Date().getFullYear()} {PROFILE.name}
        </footer>
      </main>
    </div>
  );
}

export default App;