// Primary navigation.

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export const mainNav: NavItem[] = [
  { label: "Start", href: "/" },
  { label: "Termine & Aktuelles", href: "/gottesdienste" },
  { label: "Anfahrt", href: "/anfahrt" },
  {
    label: "Über uns",
    href: "/ueber-uns",
    children: [
      { label: "Die Gemeinde", href: "/ueber-uns" },
      { label: "Was wir wollen und glauben", href: "/glauben" },
      { label: "Geschichte", href: "/geschichte" },
      { label: "Verein", href: "/verein" },
      { label: "Beitrittserklärung", href: "/beitritt" },
    ],
  },
];

// Secondary links shown in the footer's "Mehr"/sitemap column.
export const footerNav: NavItem[] = [
  { label: "Verein", href: "/verein" },
  { label: "Beitrittserklärung", href: "/beitritt" },
  { label: "Satzung", href: "/satzung" },
];

// Legal links shown in the footer's bottom bar.
export const legalNav: NavItem[] = [
  { label: "Impressum", href: "/impressum" },
  { label: "Datenschutz", href: "/datenschutz" },
];
