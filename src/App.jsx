import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  GraduationCap,
  Layers,
  Waves,
  Ruler,
  Hammer,
  Mail,
  Linkedin,
  BookMarked,
  ExternalLink,
  MapPinned,
  LineChart,
  Building2,
  ChevronDown,
  ChevronUp,
  Sparkles,
  FileText
} from "lucide-react";

/** ----------------------------------------
 * Tiny runtime tests (console-only)
 * ---------------------------------------- */
const formatYearLabel = (y) => (typeof y === "string" && y.trim().length ? y : "—");
console.assert(formatYearLabel("2025") === "2025", "formatYearLabel should return year string");
console.assert(formatYearLabel(2025) === "—", "formatYearLabel should fallback for non-string input");
console.assert(formatYearLabel("") === "—", "formatYearLabel should fallback for empty string");

const isValidTimelineData = (arr) => Array.isArray(arr) && arr.every(e => e && e.year !== undefined && e.title && e.Icon);
console.assert(isValidTimelineData([{ year: "2025", title: "Sample", Icon: Sparkles }]) === true, "timeline data validator should pass for valid item");
console.assert(isValidTimelineData([{ title: "No Year", Icon: Sparkles }]) === false, "timeline data validator should fail for missing year");

// ------------------------ UI Primitives ------------------------
const Chip = ({ children }) => (
  <span className="inline-flex items-center rounded-full border border-zinc-300/60 bg-white/60 px-3 py-1 text-xs font-medium text-zinc-700 shadow-sm backdrop-blur">
    {children}
  </span>
);

const Section = ({ id, title, subtitle, icon: Icon, children }) => (
  <section id={id} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
    <div className="mb-10 flex items-center gap-3">
      {Icon && (
        <span className="rounded-2xl bg-emerald-50 p-3 ring-1 ring-emerald-200">
          <Icon className="h-5 w-5 text-emerald-700" />
        </span>
      )}
      <div>
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-zinc-900">{title}</h2>
        {subtitle && <p className="text-zinc-600 mt-1 text-sm md:text-base">{subtitle}</p>}
      </div>
    </div>
    {children}
  </section>
);

const MediaFrame = ({ children, caption }) => (
  <figure className="rounded-2xl border border-zinc-200 bg-white p-3 shadow-sm">
    <div className="aspect-[16/9] w-full overflow-hidden rounded-xl bg-gradient-to-br from-stone-200 via-zinc-100 to-stone-50">
      <div className="h-full w-full flex items-center justify-center">{children}</div>
    </div>
    {caption && <figcaption className="mt-2 text-xs text-zinc-500">{caption}</figcaption>}
  </figure>
);

// ------------------------ Inline SVGs ------------------------
const SlabColumnDiagram = () => (
  <svg viewBox="0 0 600 320" className="h-full w-full">
    <defs>
      <linearGradient id="g1" x1="0" x2="1">
        <stop offset="0%" stopColor="#a3b18a" />
        <stop offset="100%" stopColor="#588157" />
      </linearGradient>
    </defs>
    <rect x="20" y="200" width="560" height="60" rx="4" fill="#e9ecef" stroke="#9ca3af" />
    {[0,1,2,3,4].map((i)=> (
      <line key={i} x1="20" x2="580" y1={200 + i*12} y2={200 + i*12} stroke="#cbd5e1" />
    ))}
    <rect x="250" y="60" width="100" height="140" fill="url(#g1)" stroke="#2f4f4f" />
    <polygon points="230,200 370,200 340,140 260,140" fill="rgba(220,38,38,0.12)" stroke="#ef4444" />
    <text x="300" y="48" textAnchor="middle" className="fill-zinc-700" fontSize="12">Column Stub</text>
    <text x="300" y="275" textAnchor="middle" className="fill-zinc-700" fontSize="12">CLT Slab (layers shown)</text>
    <text x="300" y="132" textAnchor="middle" className="fill-red-700" fontSize="12">Indicative punching shear zone</text>
  </svg>
);

const LoadDisplacementChart = () => (
  <svg viewBox="0 0 640 360" className="h-full w-full">
    <line x1="60" y1="300" x2="600" y2="300" stroke="#64748b" />
    <line x1="60" y1="40" x2="60" y2="300" stroke="#64748b" />
    <path d="M60 300 C 180 280, 240 240, 300 200 S 420 120, 520 150" fill="none" stroke="#16a34a" strokeWidth="3" />
    <circle cx="420" cy="120" r="4" fill="#16a34a" />
    <text x="430" y="115" fontSize="12" className="fill-zinc-700">Peak load</text>
    <text x="10" y="40" fontSize="12" className="fill-zinc-700">Load</text>
    <text x="560" y="330" fontSize="12" className="fill-zinc-700">Displacement</text>
  </svg>
);

// ------------------------ Composite UI ------------------------
const CaseStudy = ({ eyebrow, title, role, meta, bullets, media, reversed, cta }) => (
  <div className={`grid grid-cols-1 items-center gap-8 lg:grid-cols-12 ${reversed ? "lg:[&>div:first-child]:col-start-7" : ""}`}>
    <div className={`lg:col-span-6 ${reversed ? "order-last lg:order-first" : ""}`}>
      <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
        <p className="text-xs uppercase tracking-wider text-emerald-700/90 font-semibold">{eyebrow}</p>
        <h3 className="mt-1 text-2xl font-semibold text-zinc-900">{title}</h3>
        <p className="mt-1 text-sm text-zinc-600"><span className="font-medium text-zinc-800">{role}</span>{meta ? ` • ${meta}` : ""}</p>
        <ul className="mt-4 space-y-2 text-sm text-zinc-700">
          {bullets.map((b, i) => (
            <li key={i} className="flex gap-2"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-600" />{b}</li>
          ))}
        </ul>
        {cta}
      </motion.div>
    </div>
    <div className={`lg:col-span-6 ${reversed ? "lg:col-start-1" : ""}`}>
      <motion.div initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
        <MediaFrame>{media}</MediaFrame>
      </motion.div>
    </div>
  </div>
);

const Accordion = ({ items }) => {
  const [open, setOpen] = useState(null);
  return (
    <div className="divide-y divide-zinc-200 rounded-xl border border-zinc-200 bg-white">
      {items.map((it, idx) => (
        <div key={idx}>
          <button
            onClick={() => setOpen(open === idx ? null : idx)}
            className="flex w-full items-center justify-between px-4 py-4 text-left hover:bg-zinc-50"
          >
            <div>
              <p className="text-sm font-medium text-zinc-900">{it.title}</p>
              <p className="text-xs text-zinc-600">{it.subtitle}</p>
            </div>
            {open === idx ? (
              <ChevronUp className="h-4 w-4 text-zinc-500" />
            ) : (
              <ChevronDown className="h-4 w-4 text-zinc-500" />
            )}
          </button>
          {open === idx && (
            <div className="px-4 pb-4 text-sm text-zinc-700">
              <div className="grid gap-4 md:grid-cols-5">
                <div className="md:col-span-3">
                  <p className="mb-2 whitespace-pre-line">{it.body}</p>
                </div>
                <div className="md:col-span-2">
                  <MediaFrame caption={it.caption}>{it.media}</MediaFrame>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const Navbar = () => {
  const links = [
    { href: "#research", label: "Research" },
    { href: "#projects", label: "Projects" },
    { href: "#teaching", label: "Teaching" },
    { href: "#skills", label: "Skills" },
    { href: "#aim", label: "Aim" },
    { href: "#timeline", label: "Timeline" },
    { href: "#contact", label: "Contact" },
  ];
  return (
    <div className="sticky top-0 z-50 w-full border-b border-zinc-200/80 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <a href="#top" className="group inline-flex items-center gap-2">
          <span className="rounded-xl bg-emerald-600/10 p-2 ring-1 ring-emerald-600/20">
            <Sparkles className="h-4 w-4 text-emerald-700 group-hover:rotate-12 transition" />
          </span>
          <span className="text-sm font-semibold tracking-tight text-zinc-800">Jamyang Seldon</span>
        </a>
        <nav className="hidden md:flex items-center gap-6 text-sm text-zinc-700">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-emerald-700">
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
};

const Hero = () => (
  <header id="top" className="relative isolate">
    <div className="absolute inset-0 -z-10 bg-[radial-gradient(65%_60%_at_50%_0%,rgba(16,185,129,0.10),transparent_60%),linear-gradient(180deg,#f8fafc,white)]" />
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      <div className="grid items-center gap-10 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-semibold tracking-tight text-zinc-900"
          >
            Engineer • Researcher • Designer • Lecturer
          </motion.h1>
          <p className="mt-3 text-lg text-zinc-700">
            <span className="font-semibold">Jamyang Seldon</span> —
            <span className="ml-1">“Structures in Timber & Concrete — made human.”</span>
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {["CLT","LS-DYNA","AS3600","HEC-RAS","AutoCAD","HyperMesh"].map((s)=> (
              <Chip key={s}>{s}</Chip>
            ))}
          </div>
        </div>
        <div className="lg:col-span-6">
          <MediaFrame caption="Large visual placeholder: replace with hero photo, render, or diagram">
            <div className="flex h-full w-full items-center justify-center">
              <div className="w-5/6 max-w-[520px] rounded-xl bg-gradient-to-br from-stone-300 to-stone-100 p-6 ring-1 ring-zinc-300">
                <div className="aspect-[4/3] w-full rounded-lg bg-white grid grid-cols-6 gap-1 p-2">
                  {Array.from({ length: 18 }).map((_, i) => (
                    <div key={i} className="h-12 bg-emerald-100/60 ring-1 ring-emerald-200/60" />
                  ))}
                </div>
                <p className="mt-3 text-center text-xs text-zinc-500">Timber • Concrete • Analysis</p>
              </div>
            </div>
          </MediaFrame>
        </div>
      </div>
    </div>
  </header>
);

const Skills = () => (
  <Section id="skills" title="Skills" subtitle="Tools, codes, and capabilities" icon={Ruler}>
    <div className="grid gap-6 md:grid-cols-3">
      <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h4 className="mb-2 text-sm font-semibold text-zinc-800">Engineering Tools</h4>
        <div className="flex flex-wrap gap-2">
          {["LS-DYNA","HyperMesh","ETABS","AutoCAD","MATLAB"].map((s)=> <Chip key={s}>{s}</Chip>)}
        </div>
      </div>
      <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h4 className="mb-2 text-sm font-semibold text-zinc-800">Codes & Standards</h4>
        <div className="flex flex-wrap gap-2">
          {["AS3600","Eurocode"].map((s)=> <Chip key={s}>{s}</Chip>)}
        </div>
      </div>
      <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h4 className="mb-2 text-sm font-semibold text-zinc-800">Analysis & Soft Skills</h4>
        <div className="flex flex-wrap gap-2">
          {["HEC-RAS","GIS","Teaching","Coordination","Tech Writing"].map((s)=> <Chip key={s}>{s}</Chip>)}
        </div>
      </div>
    </div>
  </Section>
);

// Data
const timelineData = [
  { year: "2023", title: "Master’s Thesis — Flat-Plate Slab–Column Joints", Icon: GraduationCap },
  { year: "2024", title: "Sessional Lecturer — Griffith University", Icon: BookOpen },
  { year: "2025", title: "PhD Research — CLT Punching Shear", Icon: Layers },
  { year: "FMP", title: "Haa • Thimphu • Gelephu Airport", Icon: Waves },
  { year: "Design", title: "Multi-storey Building — Thimphu", Icon: Building2 },
];

const Timeline = () => (
  <Section id="timeline" title="Timeline" subtitle="Progression of roles & projects" icon={BookMarked}>
    <div className="relative">
      <div className="absolute left-4 top-0 h-full w-0.5 bg-emerald-600/30 sm:left-1/2" />
      <ul className="space-y-10">
        {timelineData.map((e, i) => (
          <li key={i} className="relative">
            <div className="sm:grid sm:grid-cols-12 sm:items-center sm:gap-6">
              <div className="sm:col-span-5 sm:text-right">
                <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700/90">{e.year}</p>
              </div>
              <div className="sm:col-span-2 flex justify-center">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-white ring-2 ring-emerald-600/40">
                  <e.Icon className="h-5 w-5 text-emerald-700" />
                </span>
              </div>
              <div className="sm:col-span-5">
                <p className="text-sm font-medium text-zinc-800">{e.title}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </Section>
);

const Aim = () => (
  <Section id="aim" title="Aim" subtitle="Where I’m headed" icon={LineChart}>
    <div className="grid gap-6 md:grid-cols-12">
      <div className="md:col-span-7">
        <h4 className="text-lg font-semibold text-zinc-800">Mission</h4>
        <p className="mt-2 text-sm text-zinc-700">
          Advance safe, low‑carbon structures by developing validated design methods for post‑tensioned
          CLT flat plates and translating research into practical guidance for engineers and builders.
        </p>
        <h4 className="mt-6 text-lg font-semibold text-zinc-800">Near‑Term (next 12–18 months)</h4>
        <ul className="mt-2 space-y-2 text-sm text-zinc-700">
          <li>• Complete CLT punching‑shear modelling & parameter calibration; publish 1–2 papers.</li>
          <li>• Design experimental program; validate against LS‑DYNA predictions.</li>
          <li>• Build industry collaborations on PT2CLT applications and spider connections.</li>
        </ul>
        <h4 className="mt-6 text-lg font-semibold text-zinc-800">Long‑Term</h4>
        <ul className="mt-2 space-y-2 text-sm text-zinc-700">
          <li>• Contribute to code provisions for mass timber flat plates (AS3600/Eurocode alignment).</li>
          <li>• Lead a research‑driven practice focused on timber & hybrid systems.</li>
          <li>• Mentor students and create open, reproducible workflows for structural modelling.</li>
        </ul>
      </div>
      <div className="md:col-span-5">
        <MediaFrame caption="CLT slab–column concept (illustrative)">
          <SlabColumnDiagram />
        </MediaFrame>
      </div>
    </div>
  </Section>
);

export default function App() {
  const fmpItems = useMemo(() => [
    {
      title: "Subset A — Haa FMP",
      subtitle: "River valley floodplain modelling",
      body:
        "Simulated discharge and inundation extents; identified vulnerable zones and recommended channel improvements and flood warning signage.",
      media: (
        <svg viewBox="0 0 640 360" className="h-full w-full">
          <rect x="0" y="0" width="640" height="360" fill="#ecfeff" />
          <path d="M0 220 C 120 180, 200 260, 320 200 S 520 180, 640 220" stroke="#06b6d4" strokeWidth="18" fill="none" />
          <circle cx="180" cy="210" r="6" fill="#0ea5e9" />
          <text x="190" y="205" fontSize="12" className="fill-zinc-700">Flood node</text>
        </svg>
      ),
      caption: "Illustrative floodplain profile (placeholder)"
    },
    {
      title: "Subset B — Thimphu FMP",
      subtitle: "Urban runoff & drainage analysis",
      body:
        "Mapped catchments and drainage networks; proposed stormwater management with detention and improved inlet spacing to mitigate urban flooding.",
      media: (
        <svg viewBox="0 0 640 360" className="h-full w-full">
          <rect width="640" height="360" fill="#f1f5f9" />
          {Array.from({ length: 10 }).map((_, i) => (
            <rect key={i} x={30 + i * 60} y={40 + (i % 2) * 20} width="40" height="260" fill="#94a3b8" />
          ))}
          <path d="M20 300 L620 80" stroke="#0ea5e9" strokeWidth="4" />
        </svg>
      ),
      caption: "Simplified drainage density & slope (placeholder)"
    },
    {
      title: "Subset C — Gelephu Airport FMP",
      subtitle: "Airport flood safety assessment",
      body:
        "Assessed inundation risk to runway and critical assets; recommended embankment and channel widening with staged implementation tied to return periods.",
      media: (
        <svg viewBox="0 0 640 360" className="h-full w-full">
          <rect width="640" height="360" fill="#f8fafc" />
          <rect x="80" y="160" width="480" height="28" fill="#111827" />
          <rect x="80" y="188" width="480" height="4" fill="#6b7280" />
          <path d="M60 220 C 180 200, 320 240, 580 220" stroke="#38bdf8" strokeWidth="10" fill="none" />
        </svg>
      ),
      caption: "Runway & adjacent channel (placeholder)"
    },
  ], []);

  const handleDownloadCV = () => {
    const link = document.createElement("a");
    link.href = "/CV_Jamyang_Seldon.pdf"; // Place the CV in public/
    link.download = "CV_Jamyang_Seldon.pdf";
    link.click();
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <Navbar />
      <Hero />

      <Section
        id="research"
        title="Research"
        subtitle="Depth over breadth — technical problems, rigorous methods, and measurable outcomes"
        icon={Layers}
      >
        <div className="space-y-16">
          <CaseStudy
            eyebrow="PhD Research • 2025–ongoing"
            title="Punching Shear in CLT Slab–Column Joints"
            role="PhD Researcher — Griffith University"
            meta="Layered CLT modelling, mesh convergence, fracture energies, spider connection validation"
            bullets={[
              "Developed layered CLT models (alternating local axes) with mesh convergence studies.",
              "Calibrated fracture energies; evaluated punching shear zone under biaxial loading.",
              "Validated load–displacement response vs. published experiments.",
            ]}
            media={<SlabColumnDiagram />}
          />

          <CaseStudy
            reversed
            eyebrow="Master’s Thesis • 2023–2024"
            title="Prestressing Levels & Tendon Configurations in Flat-Plate Slab–Column Joints"
            role="Researcher — Griffith University"
            meta="Prestressing influence, tendon layouts, AS3600 checks"
            bullets={[
              "Compared tendon layouts and prestressing levels for punching capacity and ductility.",
              "Used LS-DYNA + HyperMesh for parametric studies; cross-checked with AS3600.",
              "Mapped tendon efficiency vs. failure load trends; documented failure modes.",
            ]}
            media={<LoadDisplacementChart />}
          />
        </div>
      </Section>

      <Section
        id="projects"
        title="Projects"
        subtitle="Applied work across hydrology, hydraulic modelling, and building design"
        icon={Waves}
      >
        <div className="space-y-12">
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold text-zinc-900">Flood Management Projects (FMP Series)</h3>
                <p className="text-sm text-zinc-600">Role: Hydrology & Hydraulic Analyst • Tools: GIS, HEC-RAS • Outcome: floodplain maps, drainage strategies, airport mitigation plans</p>
              </div>
              <MapPinned className="h-6 w-6 text-emerald-700" />
            </div>
            <Accordion items={fmpItems} />
          </div>

          <CaseStudy
            eyebrow="Design & Analysis"
            title="Building Design & Analysis — Thimphu"
            role="Structural Designer & Analyst"
            meta="Multi-storey building • Gravity + seismic design • Coordination"
            bullets={[
              "Performed ETABS modelling and analysis for lateral and gravity systems.",
              "Coordinated structural plans and reinforcement details with architectural constraints.",
              "Delivered final drawings and a concise design report for stakeholder review.",
            ]}
            media={
              <svg viewBox="0 0 640 360" className="h-full w-full">
                <rect width="640" height="360" fill="#f8fafc" />
                {Array.from({ length: 6 }).map((_, i) => (
                  <rect key={i} x={80 + i * 80} y={60} width="40" height="240" fill="#64748b" />
                ))}
                <path d="M80 300 L560 300" stroke="#0ea5e9" strokeWidth="4" />
              </svg>
            }
          />
        </div>
      </Section>

      <Section id="teaching" title="Teaching" subtitle="Sessional Lecturer — translating theory into practice" icon={BookOpen}>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <h4 className="text-sm font-semibold text-zinc-800">Griffith University • 2024–present</h4>
            <ul className="mt-3 space-y-2 text-sm text-zinc-700">
              <li className="flex gap-2"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-600" />7304ENG — Advanced Reinforced & Prestressed Concrete</li>
              <li className="flex gap-2"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-600" />7605ENG — Industry Affiliates Program</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <h4 className="text-sm font-semibold text-zinc-800">Highlights</h4>
            <ul className="mt-3 space-y-2 text-sm text-zinc-700">
              <li className="flex gap-2"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-600" />Designed and delivered workshops on slab design, deflection, and punching shear.</li>
              <li className="flex gap-2"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-600" />Guided student projects on prestressing, reinforcement detailing, AS3600 applications.</li>
              <li className="flex gap-2"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-600" />Managed Canvas markbook and assessment feedback.</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <h4 className="text-sm font-semibold text-zinc-800">Teaching Visuals</h4>
            <MediaFrame caption="Replace with slide snapshot or whiteboard sketch">
              <svg viewBox="0 0 640 360" className="h-full w-full">
                <rect width="640" height="360" fill="#111827" />
                {Array.from({ length: 5 }).map((_, i) => (
                  <line key={i} x1={80} y1={80 + i * 40} x2={560} y2={80 + i * 40} stroke="#22c55e" strokeWidth="2" />
                ))}
                <text x="100" y="70" fontSize="14" fill="#a7f3d0">AS3600 punching shear — overview</text>
              </svg>
            </MediaFrame>
          </div>
        </div>
      </Section>

      <Aim />
      <Skills />
      <Timeline />

      <Section id="contact" title="Contact" subtitle="Let’s collaborate" icon={Mail}>
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <a href="mailto:jseldon24@gmail.com" className="inline-flex items-center gap-2 hover:text-emerald-700">
              <Mail className="h-4 w-4" /> Email
            </a>
            <span className="text-zinc-400">•</span>
            <a href="https://www.linkedin.com/in/jamyangseldon" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-emerald-700">
              <Linkedin className="h-4 w-4" /> LinkedIn
            </a>
            <span className="text-zinc-400">•</span>
            <a href="#" className="inline-flex items-center gap-2 hover:text-emerald-700">
              <BookOpen className="h-4 w-4" /> ResearchGate
            </a>
            <span className="text-zinc-400">•</span>
            <button onClick={handleDownloadCV} className="inline-flex items-center gap-2 hover:text-emerald-700">
              <FileText className="h-4 w-4" /> CV (PDF)
            </button>
          </div>
        </div>
        <p className="mt-3 text-xs text-zinc-500">Open to collaborations in structural research, timber design, and computational modelling.</p>
      </Section>

      <footer className="border-t border-zinc-200/80 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 text-xs text-zinc-500">
          © {new Date().getFullYear()} Jamyang Seldon. Built with React & Tailwind.
        </div>
      </footer>
    </div>
  );
}
