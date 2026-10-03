// Content for the loehx-style interactive rebuild.
// Personal facts stay verifiable; skill years are honest self-estimates.

export const personal = {
  name: "I Putu Alvi Rupa Dinata",
  nick: "AlpinDnt",
  short: "Alpin",
  role: "Web Developer",
  location: "Denpasar, Bali, Indonesia",
  email: "ptu.alvi@gmail.com",
  whatsappDisplay: "+62 823-2549-4970",
  whatsapp:
    "https://wa.me/6282325494970?text=Hi%20Alvi!%20I%20saw%20your%20portfolio%20and%20want%20to%20talk.",
  github: "https://github.com/AlpinDnt",
  linkedin: "https://www.linkedin.com/in/alpindnt/",
  instagram: "https://www.instagram.com/alpindnt",
};

export const hero = {
  // max ~20 words subtext (hero discipline)
  subtext:
    "Junior web developer from Bali. I build fast, clean React interfaces and e-commerce UI.",
  primaryCta: { label: "View work", href: "#work" },
  secondaryCta: { label: "Contact", href: "#contact" },
};

export const marqueeItems = [
  "The web is changing",
  "Are you?",
  "React interfaces",
  "E-commerce UI",
  "Bali, Indonesia",
];

export const skills = {
  title: "Skills / Experience",
  items: [
    {
      name: "Web Development",
      years: "2 yrs",
      tags: "HTML · CSS · JavaScript",
      desc: "Started with semantic HTML and modern CSS, now shipping responsive layouts daily. I care about clean structure before any framework magic.",
    },
    {
      name: "React",
      years: "2 yrs",
      tags: "Vite · Context API · Hooks",
      desc: "My daily driver for interactive apps — search, filters, carts, modals and checkout flows. Components stay small and predictable.",
    },
    {
      name: "Tailwind CSS",
      years: "2 yrs",
      tags: "Responsive · Design systems",
      desc: "Utility-first styling for speed without mess. I build consistent spacing, type scales and dark themes straight in markup.",
    },
    {
      name: "E-Commerce UI",
      years: "1 yr",
      tags: "Cart · Filters · Checkout",
      desc: "Built fashion and booking storefronts with live search, category filters, cart drawers and product modals that feel instant.",
    },
    {
      name: "Backend Basics",
      years: "1 yr",
      tags: "REST APIs · Node.js · LocalStorage",
      desc: "Enough backend to wire APIs cleanly, persist state, and debug across the stack while frontend stays the focus.",
    },
    {
      name: "Tooling",
      years: "2 yrs",
      tags: "Git · GitHub · Vercel · Figma · VS Code",
      desc: "Git branches, Vercel previews, Figma handoff. Small workflow, fast shipping, no drama.",
    },
  ],
};

export const services = {
  title: "What I Do",
  items: [
    {
      name: "Landing Pages",
      desc: "Responsive landing pages built with React and Tailwind — clean layout, clear sections, and fast loading on any device.",
    },
    {
      name: "Web Apps",
      desc: "Interactive React interfaces with features like search, filters, carts, and dashboards — small components, predictable state.",
    },
    {
      name: "Website Redesign",
      desc: "Rebuilding outdated pages into modern, fast React interfaces with clearer structure and better accessibility. Figma only as reference.",
    },
  ],
};

export const projects = {
  title: "Selected work",
  items: [
    {
      id: "serene",
      index: "01",
      category: "Booking · Landing",
      title: "Serene Stay",
      description:
        "Villa and stay booking site with real-time search, category and price filters, photo gallery and booking flow.",
      tech: ["React", "Tailwind", "Vite"],
      liveUrl: "https://serene-stayy.vercel.app/",
      githubUrl: "https://github.com/AlpinDnt/serene-stayy",
      year: "2026",
      image: "/images/serene-stay.png",
    },
    {
      id: "lumina",
      index: "02",
      category: "E-commerce · Web App",
      title: "Lumina Store",
      description:
        "Fashion e-commerce app with live search, category filters, cart drawer, product modals and checkout flow.",
      tech: ["React", "Tailwind", "Context API"],
      liveUrl: "https://lumina-store-online.vercel.app/",
      githubUrl: "https://github.com/AlpinDnt/Lumina-Store",
      year: "2026",
      image: "/images/lumina-store.png",
    },
    {
      id: "kroma",
      index: "03",
      category: "Brand · Landing",
      title: "Kroma Coffee",
      description:
        "Specialty coffee landing page with menu filters, roasting story, location hours and dark-theme maps.",
      tech: ["Next.js", "React", "Tailwind"],
      liveUrl: "https://kroma-coffee.vercel.app/",
      githubUrl: "https://github.com/AlpinDnt/kroma-coffee",
      year: "2026",
      image: "/images/kroma-coffee.png",
    },
  ],
};

export const archive = {
  title: "More projects",
  note: "Every build above is live. Source code is open on GitHub.",
};

export const assistantRules = [
  {
    keys: ["reach", "contact", "email", "whatsapp", "hire"],
    reply:
      "Best way: email ptu.alvi@gmail.com or WhatsApp +62 823-2549-4970. Feel free to say hello!",
  },
  {
    keys: ["available", "freelance", "open", "hire"],
    reply:
      "He is focused on building landing pages, React web apps and website redesigns. Check the What I Do and Selected work sections.",
  },
  {
    keys: ["stack", "skill", "tech", "react", "experience"],
    reply:
      "Core stack: React, JavaScript, Tailwind CSS, Vite, REST APIs and Git. He also builds e-commerce UI with carts, filters and checkout flows.",
  },
  {
    keys: ["project", "work", "portfolio", "lumina", "serene", "kroma"],
    reply:
      "Three live builds: Serene Stay (booking), Lumina Store (fashion e-commerce) and Kroma Coffee (brand landing). Scroll to Selected work to tour them.",
  },
  {
    keys: ["where", "location", "bali"],
    reply: "Based in Denpasar, Bali, Indonesia. Works remote worldwide.",
  },
  {
    keys: ["price", "cost", "rate"],
    reply:
      "Pricing depends on scope — landing pages start lean, web apps are scoped per feature. Message him on WhatsApp with your brief for a fast estimate.",
  },
];

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Skills", href: "#skills" },
  { label: "Work", href: "#work" },
  { label: "What I Do", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];
