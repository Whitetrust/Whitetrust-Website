// Curated Unsplash photography catalogue.
// All images licensed under the Unsplash license (free commercial use).
// Each entry: photographer credit kept for attribution requirement (optional).

export type Photo = {
  url: string;
  alt: string;
  credit?: { name: string; href: string };
  focal?: string; // tailwind object-position e.g. "object-[50%_30%]"
};

function u(id: string, opts: { w?: number } = {}) {
  const w = opts.w ?? 2400;
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;
}

export const photos = {
  homeHero: {
    url: u("1486325212027-8081e485255e"),
    alt: "Modern glass-and-steel high-rise at golden hour — symbolic of institutional wealth structuring.",
    credit: { name: "Sean Pollock", href: "https://unsplash.com/@seanpollock" },
    focal: "object-[50%_55%]",
  },
  aboutHero: {
    url: u("1494145904049-0dca59b4bbad"),
    alt: "Heritage colonial-era building with restrained ornamentation.",
    credit: { name: "Brandon Mowinkel", href: "https://unsplash.com/@brandonmowinkel" },
    focal: "object-[50%_60%]",
  },
  privateClientHero: {
    url: u("1448375240586-882707db888b"),
    alt: "Old-growth forest canopy — generations and legacy.",
    credit: { name: "Casey Horner", href: "https://unsplash.com/@mischievous_penguins" },
    focal: "object-[50%_45%]",
  },
  fundServicesHero: {
    url: u("1486406146926-c627a92ad1ab"),
    alt: "Financial district skyline at dusk.",
    credit: { name: "Annie Spratt", href: "https://unsplash.com/@anniespratt" },
    focal: "object-[50%_65%]",
  },
  contactHero: {
    url: u("1577412647305-991150c7d163"),
    alt: "Quiet study with leather chair and books — discretion and counsel.",
    credit: { name: "Spacejoy", href: "https://unsplash.com/@spacejoy" },
    focal: "object-[50%_55%]",
  },
  estateBand: {
    url: u("1497436072909-60f360e1d4b1"),
    alt: "Open landscape under a long sky — the wealth lifecycle.",
    credit: { name: "Sergey Pesterev", href: "https://unsplash.com/@sickle" },
    focal: "object-[50%_50%]",
  },
  trustsBand: {
    url: u("1457369804613-52c61a468e7d"),
    alt: "Old library shelves — the institutional record.",
    credit: { name: "Susan Q Yin", href: "https://unsplash.com/@syinq" },
    focal: "object-[50%_55%]",
  },
  familyOfficeBand: {
    url: u("1505691938895-1758d7feb511"),
    alt: "Family gathering at a long table — governance and continuity.",
    credit: { name: "Tyler Nix", href: "https://unsplash.com/@jtylernix" },
    focal: "object-[50%_55%]",
  },
  crossBorderBand: {
    url: u("1521295121783-8a321d551ad2"),
    alt: "Aircraft window over land — globally mobile families.",
    credit: { name: "Tom Barrett", href: "https://unsplash.com/@wistomsin" },
    focal: "object-[50%_45%]",
  },
  giftCityBand: {
    url: u("1577415124269-fc1140a69e91"),
    alt: "Modern financial centre architecture.",
    credit: { name: "Ricardo Gomez Angel", href: "https://unsplash.com/@rgaleriacom" },
    focal: "object-[50%_55%]",
  },
  aifBand: {
    url: u("1611974789855-9c2a0a7236a3"),
    alt: "Glass facade — fund structures and segregation.",
    credit: { name: "Maxime Bober", href: "https://unsplash.com/@maxbober" },
    focal: "object-[50%_50%]",
  },
  fundAdminBand: {
    url: u("1517245386807-bb43f82c33c4"),
    alt: "Concrete and glass institutional building.",
    credit: { name: "Verne Ho", href: "https://unsplash.com/@verneho" },
    focal: "object-[50%_55%]",
  },
  insightsHero: {
    url: u("1456425023611-d49b6f5cb1b8"),
    alt: "Newsprint and editorial materials.",
    credit: { name: "Patrick Tomasso", href: "https://unsplash.com/@impatrickt" },
    focal: "object-[50%_50%]",
  },
  // Founder portrait placeholders (architectural details — not actual people).
  founderNeeraj: {
    url: "/founder-neeraj.jpg",
    alt: "Neeraj Aggarwal, Founder & CEO of CAWT.",
    focal: "object-[50%_25%]",
  },
  founderNiyati: {
    url: u("1517694712202-14dd9538aa97"),
    alt: "Architectural detail — pending portrait.",
    credit: { name: "Glenn Carstens-Peters", href: "https://unsplash.com/@glenncarstenspeters" },
    focal: "object-[50%_50%]",
  },
  founderChirag: {
    url: u("1518770660439-4636190af475"),
    alt: "Architectural detail — pending portrait.",
    credit: { name: "Mike Petrucci", href: "https://unsplash.com/@mikepetrucci" },
    focal: "object-[40%_60%]",
  },
} as const satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof photos;
