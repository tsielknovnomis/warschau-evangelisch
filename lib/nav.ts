// Primary navigation.

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export const mainNav: NavItem[] = [
  { label: "Start", href: "/" },
  { label: "Termine & Aktuelles", href: "/gottesdienste" },
  { label: "Anfahrt", href: "/gottesdienste/anfahrt" },
  {
    label: "Über uns",
    href: "/ueber-uns",
    children: [
      { label: "Die Gemeinde", href: "/ueber-uns" },
      { label: "Geschichte", href: "/ueber-uns/geschichte" },
      { label: "Predigten", href: "/predigten" },
    ],
  },
];

// Secondary links shown in the footer's "Mehr"/sitemap column.
export const footerNav: NavItem[] = [
  { label: "Predigten", href: "/predigten" },
  { label: "Verein", href: "/ueber-uns/verein" },
  { label: "Beitrittserklärung", href: "/ueber-uns/verein/beitritt" },
  { label: "Satzung", href: "/ueber-uns/verein/satzung" },
];

// Legal links shown in the footer's bottom bar.
export const legalNav: NavItem[] = [
  { label: "Impressum", href: "/impressum" },
  { label: "Datenschutz", href: "/datenschutz" },
];
