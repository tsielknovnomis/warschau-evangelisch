import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Legacy WordPress URLs → new canonical paths (301)
      { source: "/gottesdiensttermine", destination: "/gottesdienste", permanent: true },
      { source: "/gottesdiensttermine/anfahrt", destination: "/gottesdienste/anfahrt", permanent: true },
      { source: "/uber-uns", destination: "/ueber-uns", permanent: true },
      { source: "/uber-uns/geschichte", destination: "/ueber-uns/geschichte", permanent: true },
      { source: "/uber-uns/verein", destination: "/ueber-uns/verein", permanent: true },
      {
        source: "/uber-uns/verein/satzung-des-vereins-deutschsprachige-evangelische-seelsorge-inwarschau",
        destination: "/ueber-uns/verein/satzung",
        permanent: true,
      },
      {
        source: "/satzung-des-vereins-deutschsprachige-evangelische-seelsorge-inwarschau",
        destination: "/ueber-uns/verein/satzung",
        permanent: true,
      },
      { source: "/beitrittserklaerung", destination: "/ueber-uns/verein/beitritt", permanent: true },
      { source: "/home", destination: "/", permanent: true },
      { source: "/naechster-gottesdienst", destination: "/gottesdienste", permanent: true },
      { source: "/beitraege", destination: "/gottesdienste", permanent: true },
      // Aktuelles overview merged into the Termine page
      { source: "/aktuelles", destination: "/gottesdienste", permanent: true },
      // NOTE: the ~112 legacy post slugs get redirected to /archiv/<slug> in Plan 4,
      // once the archive detail pages exist.
    ];
  },
};

export default nextConfig;
