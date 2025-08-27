import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, Tag, ArrowRight, ArrowLeft } from "lucide-react";

// ------------------------------------------------------------
// Fandubbers Portfolio - Single-file React App (vgen.co inspired)
// Stack: React + TailwindCSS + Framer Motion + Lucide Icons
// Ready for GitHub/Vercel. Hash-based routing for deploy-friendly navigation.
// ------------------------------------------------------------
// Notes:
// - Tailwind is assumed available by the environment (no import needed here).
// - We inject Google Font 'Poppins' for the modern look.
// - Replace MOCK_DATA with your real profiles. Add tags freely.
// - Routes (hash-based): #/ , #/list , #/profile/<slug>
// ------------------------------------------------------------

// ---------------------------- Mock Data ----------------------------
const MOCK_DATA = [
  {
    slug: "lunaria-voice",
    name: "Lunaria Voice",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=640&auto=format&fit=crop",
    role: ["fandubber", "narrator"],
    description:
      "Fandubber enfocada en anime dramático y narraciones inmersivas. Tonos cálidos y actuaciones emotivas.",
    tags: ["fandubber", "narrador", "español-latino"],
    videos: [
      "https://www.youtube.com/embed/dQw4w9WgXcQ",
      "https://www.youtube.com/embed/oHg5SJYRHA0",
    ],
  },
  {
    slug: "aster-cover",
    name: "Aster Cover",
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=640&auto=format&fit=crop",
    role: ["coverist"],
    description:
      "Coverista con enfoque en openings y endings. Mezcla voces limpias con armonías suaves.",
    tags: ["coverista", "canto", "jpop"],
    videos: [
      "https://www.youtube.com/embed/ysz5S6PUM-U",
      "https://www.youtube.com/embed/tAGnKpE4NCI",
    ],
  },
  {
    slug: "echo-dubs",
    name: "Echo Dubs",
    avatar:
      "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=640&auto=format&fit=crop",
    role: ["fandubber"],
    description:
      "Fandubber versátil: comedia, acción y tragedia. Excelente timing y dicción.",
    tags: ["fandubber", "comedia", "acción"],
    videos: [
      "https://www.youtube.com/embed/aqz-KE-bpKQ",
      "https://www.youtube.com/embed/9bZkp7q19f0",
    ],
  },
];

// Gather available tags automatically
const allTags = Array.from(
  new Set(MOCK_DATA.flatMap((p) => p.tags))
).sort();

// ---------------------------- Utilities ----------------------------
const cls = (...arr) => arr.filter(Boolean).join(" ");

function useHashRoute() {
  const parse = () => {
    const h = window.location.hash.replace(/^#/, "");
    const path = h || "/";
    const parts = path.split("/").filter(Boolean); // e.g. ["profile", "slug"]
    return { path, parts };
  };
  const [route, setRoute] = useState(parse());
  useEffect(() => {
    const onHash = () => setRoute(parse());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  const navigate = (to) => {
    if (!to.startsWith("#/")) to = `#${to}`;
    window.location.hash = to;
  };
  return { route, navigate };
}

// Inject Google Font Poppins
function usePoppins() {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap";
    document.head.appendChild(link);
    document.documentElement.style.setProperty("--font-sans", "'Poppins', ui-sans-serif, system-ui");
    return () => {
      document.head.removeChild(link);
    };
  }, []);
}

// ---------------------------- UI Primitives ----------------------------
function Container({ children, className = "" }) {
  return <div className={cls("max-w-6xl mx-auto px-4", className)}>{children}</div>;
}

function Badge({ children, active = false, onClick }) {
  return (
    <button
      onClick={onClick}
      className={cls(
        "px-3 py-1 rounded-full text-sm border transition",
        active
          ? "bg-black text-white border-black"
          : "bg-white text-gray-700 border-gray-200 hover:border-gray-300"
      )}
    >
      <div className="flex items-center gap-1"><Tag size={14} />{children}</div>
    </button>
  );
}

function Card({ children, className = "", onClick }) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={onClick}
      className={cls(
        "rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md cursor-pointer",
        className
      )}
    >
      {children}
    </motion.div>
  );
}

function NavBar({ navigate }) {
  return (
    <header className="sticky top-0 z-30 backdrop-blur bg-white/70 border-b border-gray-100">
      <Container className="flex items-center justify-between py-3">
        <a href="#/" className="font-semibold text-lg tracking-tight">Fandub Portfolios</a>
        <nav className="flex items-center gap-2">
          <a href="#/list" className="px-3 py-1.5 text-sm rounded-full border border-gray-200 hover:bg-gray-50">Lista</a>
          <a href="#/" className="px-3 py-1.5 text-sm rounded-full border border-gray-200 hover:bg-gray-50">Inicio</a>
          <a
            href="#/list"
            className="ml-2 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black text-white text-sm"
          >
            Explorar <ArrowRight size={16} />
          </a>
        </nav>
      </Container>
    </header>
  );
}

// ---------------------------- Views ----------------------------
function HomeView() {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-gray-50 -z-10" />
      <Container className="py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight" style={{ fontFamily: "var(--font-sans)" }}>
            Registry & Portfolios for Fandubbers
          </h1>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Un registro ficticio y portafolio de fandubers y coveristas. Descubre talentos, explora etiquetas y mira sus mejores trabajos.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <a href="#/list" className="px-5 py-3 rounded-full bg-black text-white inline-flex items-center gap-2">
              Ver lista <ArrowRight size={18} />
            </a>
            <a href="#/list" className="px-5 py-3 rounded-full border border-gray-200 hover:bg-gray-50">
              Filtrar por etiquetas
            </a>
          </div>
        </motion.div>
      </Container>
    </div>
  );
}

function ListView({ profiles, navigate }) {
  const [query, setQuery] = useState("");
  const [activeTags, setActiveTags] = useState([]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return profiles.filter((p) => {
      const matchesQuery = !q ||
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q));
      const matchesTags = activeTags.length === 0 || activeTags.every((t) => p.tags.includes(t));
      return matchesQuery && matchesTags;
    });
  }, [profiles, query, activeTags]);

  const toggleTag = (t) => {
    setActiveTags((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));
  };

  return (
    <Container className="py-10 md:py-14">
      <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
        <div className="relative flex-1">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por nombre, descripción o etiqueta..."
            className="w-full rounded-full border border-gray-200 bg-white px-12 py-3 focus:outline-none focus:ring-2 focus:ring-black"
            style={{ fontFamily: "var(--font-sans)" }}
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {allTags.map((t) => (
          <Badge key={t} active={activeTags.includes(t)} onClick={() => toggleTag(t)}>
            {t}
          </Badge>
        ))}
        {activeTags.length > 0 && (
          <button
            className="ml-1 text-sm underline text-gray-600 hover:text-gray-900"
            onClick={() => setActiveTags([])}
          >
            Limpiar filtros
          </button>
        )}
      </div>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((p) => (
          <Card key={p.slug} onClick={() => (window.location.hash = `#/profile/${p.slug}`)}>
            <div className="p-4">
              <div className="flex items-center gap-4">
                <img
                  src={p.avatar}
                  alt={p.name}
                  className="w-16 h-16 rounded-full object-cover border border-gray-200"
                />
                <div>
                  <h3 className="font-semibold text-lg" style={{ fontFamily: "var(--font-sans)" }}>{p.name}</h3>
                  <div className="mt-1 flex flex-wrap gap-1.5">
                    {p.tags.slice(0, 4).map((t) => (
                      <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 border border-gray-200">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <p className="mt-4 text-sm text-gray-600 line-clamp-3">{p.description}</p>
            </div>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="mt-16 text-center text-gray-500">No se encontraron perfiles con esos filtros.</div>
      )}
    </Container>
  );
}

function ProfileView({ profile }) {
  if (!profile) return (
    <Container className="py-16">
      <div className="text-center">
        <p className="text-gray-600">Perfil no encontrado.</p>
        <a href="#/list" className="inline-flex items-center gap-2 mt-4 text-sm px-4 py-2 rounded-full border border-gray-200 hover:bg-gray-50">
          <ArrowLeft size={16} /> Volver a la lista
        </a>
      </div>
    </Container>
  );

  return (
    <Container className="py-10 md:py-14">
      <div className="flex items-start gap-6 flex-col md:flex-row">
        <img
          src={profile.avatar}
          alt={profile.name}
          className="w-28 h-28 md:w-36 md:h-36 rounded-full object-cover border border-gray-200"
        />
        <div className="flex-1">
          <h2 className="text-2xl md:text-3xl font-semibold" style={{ fontFamily: "var(--font-sans)" }}>{profile.name}</h2>
          <p className="mt-2 text-gray-700 max-w-2xl">{profile.description}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {profile.tags.map((t) => (
              <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 border border-gray-200">
                {t}
              </span>
            ))}
          </div>
          <a href="#/list" className="inline-flex items-center gap-2 mt-5 text-sm px-4 py-2 rounded-full border border-gray-200 hover:bg-gray-50">
            <ArrowLeft size={16} /> Volver a la lista
          </a>
        </div>
      </div>

      <section className="mt-10">
        <h3 className="text-lg font-medium mb-4" style={{ fontFamily: "var(--font-sans)" }}>Portafolio de videos</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {profile.videos.map((url, i) => (
            <div key={i} className="aspect-video rounded-xl overflow-hidden border border-gray-200 bg-black">
              <iframe
                className="w-full h-full"
                src={url}
                title={`video-${i}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          ))}
        </div>
      </section>
    </Container>
  );
}

// ---------------------------- App ----------------------------
export default function App() {
  usePoppins();
  const { route } = useHashRoute();

  const page = (() => {
    const [first, second] = route.parts; // e.g. ["profile", "slug"]
    if (!first) return "home";
    if (first === "list") return "list";
    if (first === "profile" && second) return "profile";
    return "home";
  })();

  const currentProfile = useMemo(() => {
    if (page !== "profile") return null;
    const slug = route.parts[1];
    return MOCK_DATA.find((p) => p.slug === slug);
  }, [page, route.parts]);

  return (
    <div className="min-h-screen bg-white text-gray-900" style={{ fontFamily: "var(--font-sans)" }}>
      <NavBar />
      {page === "home" && <HomeView />}
      {page === "list" && <ListView profiles={MOCK_DATA} />}
      {page === "profile" && <ProfileView profile={currentProfile} />}
      <footer className="mt-16 border-t border-gray-100">
        <Container className="py-8 text-sm text-gray-500 flex flex-col md:flex-row items-center justify-between gap-3">
          <span>© {new Date().getFullYear()} Fandub Portfolios</span>
          <span className="text-gray-400">Diseño inspirado en vgen.co • Build: React + Tailwind</span>
        </Container>
      </footer>
    </div>
  );
}
