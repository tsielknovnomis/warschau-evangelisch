import type { SiteConfig } from './types'

// Single source of truth for the parish's hard facts.
// Extracted verbatim from the legacy site (see scraped/KEY_FACTS.md).
// Fields flagged `verify` still need final confirmation — see OPEN_ITEMS.md.

export const siteConfig: SiteConfig = {
  name: 'Deutschsprachige Evangelische Seelsorge in Warschau',
  shortName: 'Evangelisch in Warschau',
  legalNameDe: 'Verein für Deutschsprachige Evangelische Seelsorge in Warschau',
  legalNamePl: 'Ewangelickie Duszpasterstwo Języka Niemieckiego w Warszawie',
  url: 'https://warschau-evangelisch.de',

  address: {
    street: 'ul. Miodowa 21',
    postalCode: '00-246', // verified via luteranie.pl / Centrum Luterańskie
    city: 'Warszawa',
    country: 'Polen',
    accessNote:
      'Zugang über ul. Leona Schillera (Rückseite des Gebäudes), 2. Stock — Synodalsaal.',
    coords: { lat: 52.2486, lng: 21.0086 }, // Centrum Luterańskie, ul. Miodowa 21
  },

  bank: {
    // TODO(verify): confirm BNP Paribas account is current; old Pekao SA account removed.
    name: 'BNP Paribas',
    holder: 'Ewangelickie Duszpasterstwo Języka Niemieckiego w Warszawie',
    pln: '13 1600 1462 1728 8283 8000 0001',
    eurIban: 'PL56 1600 1462 1728 8283 8000 0003',
    bic: 'PPABPLPK',
    verify: true,
  },

  contact: {
    general: 'info@warschau-evangelisch.de',
    pastor: 'pfarrer@warschau-evangelisch.de',
    phone: null, // no phone number — contact by email only
  },

  people: {
    // TODO(verify): is Dr. Grzegorz Olek still the acting pastor in 2026?
    pastor: { name: 'Dr. Grzegorz Olek', title: 'Pfarrer', verify: true },
    board: ['Jürgen Wandel', 'Jens Boysen', 'Simon von Kleist'],
  },

  service: {
    rhythm:
      'Im Jahresverlauf alle zwei Wochen, im Advent jeden Sonntag. Während der Sommerferien finden keine Gottesdienste statt.',
    time: '09:30 Uhr',
    summerBreak:
      'Während der Sommerferien pausieren die Gottesdienste — auf Anfrage feiern wir aber auch außer der Reihe.',
  },

  social: {
    youtube: 'https://www.youtube.com/channel/UCMf4N1R2vUnstAfN1KBxZ6g',
    youtubePlaylist:
      'https://www.youtube.com/playlist?list=PLoTDnYaedQnt8wxH4n61hMvhb_VbuRqa4',
    instagram: 'https://www.instagram.com/',
    facebook: 'https://www.facebook.com/warschauevangelisch',
  },

  krs: '0000590323',
}
