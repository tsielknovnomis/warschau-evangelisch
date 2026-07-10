// Domain types shared across the site.
// Storage documents (Netlify Blobs / data/seed) and lib/seed/sermons.ts
// produce these shapes directly, so components never care about the source.

export interface ChurchEvent {
  id: string
  title: string
  startsAt: string // ISO 8601
  endsAt: string | null
  location: string
  description: string | null
  isSpecial: boolean // e.g. Easter, ecumenical
  withCommunion: boolean
  language: 'de' | 'pl' | 'multi'
}

export interface Sermon {
  id: string
  slug: string
  title: string
  preachedOn: string // ISO date (YYYY-MM-DD)
  preacher: string | null
  scripture: string | null // Bible reference
  youtubeId: string
  summary: string | null
  audioUrl: string | null
}

export interface NewsItem {
  id: string
  slug: string
  title: string
  body: string // markdown
  excerpt: string
  coverImage: string | null
  pinned: boolean // drives the AnnouncementBar
  publishedAt: string // ISO 8601
}

export interface ArchiveEntry {
  slug: string
  title: string
  date: string | null // ISO date if parseable from the legacy slug/post
  originalUrl: string
}

// A fact that may still need confirmation from the parish (see OPEN_ITEMS.md).
export interface VerifiableFact<T> {
  value: T
  verify: boolean
}

export interface SiteConfig {
  name: string
  shortName: string
  legalNameDe: string
  legalNamePl: string
  url: string
  address: {
    street: string
    postalCode: string
    city: string
    country: string
    accessNote: string
    coords: { lat: number; lng: number }
  }
  bank: {
    name: string
    holder: string
    pln: string
    eurIban: string
    bic: string
    verify: boolean
  }
  contact: {
    general: string
    pastor: string
    phone: string | null
  }
  people: {
    pastor: { name: string; title: string; verify: boolean }
    board: string[]
  }
  service: {
    rhythm: string
    time: string
    summerBreak: string
  }
  social: {
    youtube: string
    youtubePlaylist: string
    instagram: string
    facebook: string
    whatsapp: string
  }
  krs: string
}
